import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOtPa_VMf3DiZYlx5FT9strjzZSLzI7JQ",
  authDomain: "aksha-portfolio.firebaseapp.com",
  projectId: "aksha-portfolio",
  storageBucket: "aksha-portfolio.firebasestorage.app",
  messagingSenderId: "200424297525",
  appId: "1:200424297525:web:e5a32201526ce3cac80d7c",
  measurementId: "G-G2097TN5S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchPortfolioData() {
  try {
    const docRef = doc(db, "portfolio", "aksha");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      renderData(docSnap.data());
    } else {
      console.log("No such document! Falling back to static data if needed.");
      // Fallback data could go here, but assuming data is uploaded
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderData(data) {
  // Hero Section
  document.getElementById('profile-img').src = data.photoUrl;
  document.getElementById('profile-img').classList.remove('skeleton');
  
  const objEl = document.getElementById('objective');
  objEl.textContent = data.personalInfo.objective;
  objEl.classList.remove('skeleton-text');

  const linksContainer = document.getElementById('social-links');
  linksContainer.innerHTML = `
    <a href="${data.personalInfo.linkedin}" target="_blank">LinkedIn</a>
    <a href="${data.personalInfo.github}" target="_blank">GitHub</a>
    <a href="${data.personalInfo.leetcode}" target="_blank">Leetcode</a>
    <a href="mailto:${data.personalInfo.email}">Email</a>
  `;

  if (data.resumeUrl) {
    const resumeBtn = document.getElementById('resume-btn');
    resumeBtn.href = data.resumeUrl;
    resumeBtn.style.display = 'inline-block';
  }

  // Education Section
  const eduContainer = document.getElementById('education-list');
  eduContainer.innerHTML = data.education.map(edu => `
    <div class="timeline-item">
      <h4>${edu.degree}</h4>
      <div class="timeline-meta">${edu.institution} | ${edu.duration}</div>
      <div class="timeline-content">${edu.score}</div>
    </div>
  `).join('');

  // Skills Section
  const skillsContainer = document.getElementById('skills-grid');
  const skillCategories = [
    { key: 'programming', label: 'Programming Languages' },
    { key: 'scripting', label: 'Scripting Languages' },
    { key: 'databases', label: 'Databases' },
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'tools', label: 'Tools/Platforms' },
    { key: 'coursework', label: 'Coursework' }
  ];

  skillsContainer.innerHTML = skillCategories.map(cat => {
    if(data.skills[cat.key]) {
      return `
        <div class="skill-card">
          <h4>${cat.label}</h4>
          <p>${data.skills[cat.key]}</p>
        </div>
      `;
    }
    return '';
  }).join('');

  // Projects Section
  const projContainer = document.getElementById('projects-list');
  projContainer.innerHTML = data.projects.map(proj => `
    <div class="project-card">
      <h4>${proj.name}</h4>
      <div class="project-tech">${proj.tech}</div>
      <ul>
        ${proj.points.map(pt => `<li>${pt}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Experience Section
  const expContainer = document.getElementById('experience-list');
  expContainer.innerHTML = data.experience.map(exp => `
    <div class="timeline-item">
      <h4>${exp.role}</h4>
      <div class="timeline-meta">${exp.duration}</div>
      <div class="timeline-content">
        <ul>
          ${exp.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  // Positions Section
  const posContainer = document.getElementById('positions-list');
  posContainer.innerHTML = data.positions.map(pos => `
    <div class="timeline-item">
      <h4>${pos.title}</h4>
      <div class="timeline-content">
        <p>${pos.description}</p>
      </div>
    </div>
  `).join('');

  // Certifications Section
  const certContainer = document.getElementById('certifications-list');
  certContainer.innerHTML = data.certifications.map(cert => `
    <li class="cert-item">${cert}</li>
  `).join('');
}

// Load data on start
fetchPortfolioData();
