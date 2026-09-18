import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOtPa_VMf3DiZYlx5FT9strjzZSLzI7JQ",
  authDomain: "aksha-portfolio.firebaseapp.com",
  projectId: "aksha-portfolio",
  storageBucket: "aksha-portfolio.firebasestorage.app",
  messagingSenderId: "200424297525",
  appId: "1:200424297525:web:e5a32201526ce3cac80d7c",
  measurementId: "G-G2097TN5S8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CLOUD_NAME = 'kodjpuuo';
const UPLOAD_PRESET = 'portfolio';

const uploadToCloudinary = async (filePath, resourceType) => {
  try {
    console.log(`Uploading ${filePath} to Cloudinary...`);
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('upload_preset', UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      form,
      { headers: form.getHeaders() }
    );
    console.log(`Uploaded! URL: ${res.data.secure_url}`);
    return res.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.response?.data || error.message);
    throw error;
  }
};

const portfolioData = {
  personalInfo: {
    name: "AKSHA DADALA",
    phone: "+91-9398123633",
    email: "akshadadala@gmai.com",
    linkedin: "https://www.linkedin.com/in/", // Link placeholder, as it wasn't full in OCR
    github: "https://github.com/",
    leetcode: "https://leetcode.com/",
    objective: "Friendly and engaging team player and leader able to inspire staff to perform their best. Detail oriented to play a challenging role in a growth-oriented organization, to prove my skills, update Myself with the latest technologies and add value to the organization."
  },
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Pragati Engineering College",
      duration: "2022 - May 2026",
      score: "GPA: 8.67"
    },
    {
      degree: "Senior Secondary",
      institution: "Sri Vikas Junior College",
      duration: "2020 - 2022",
      score: "Score: 85%"
    },
    {
      degree: "Higher Secondary",
      institution: "ZPP High School",
      duration: "2019 - 2020",
      score: "GPA: 97%"
    }
  ],
  skills: {
    programming: "Python, Java, C programming",
    scripting: "HTML, CSS, JavaScript",
    databases: "SQL",
    problemSolving: "DSA, Objective-Oriented Programming",
    coursework: "Operating System, DBMS, CN",
    tools: "Visual Studio Code, Github"
  },
  projects: [
    {
      name: "Library Management System",
      tech: "ServiceNow Platform",
      points: [
        "Designed and developed a custom ServiceNow application by creating and extending tables (Books, Members, Transactions) with relationships, ensuring structured data management.",
        "Implemented automation using Business Rules, UI Policies, UI Actions, ACLs, and Record Producers to manage book borrowing/return workflows with role-based access control."
      ]
    },
    {
      name: "Intrusion Detection System Performance",
      tech: "Jupyter Notebook, Python, Machine learning",
      points: [
        "Implemeted and compared ML classifiers (RF, DT, KNN, etc.) for anomaly detection using CICIDS2018 dataset.",
        "Applied SMOTE and normalisation to improve model accuracy"
      ]
    }
  ],
  certifications: [
    "Certified System Administrator, Certified Application Developer - ServiceNow",
    "Certification from Google Cloud Computing Foundations (GCCF)",
    "AI Associate Global Certification – SALESFORCE",
    "Certification from IBM Cloud regarding Development and Creating Chatbots (IBM)",
    "Introduction to Data Science – CISCO",
    "NPTEL Certification in Java , GCCF(Google Cloud Computing Foundations) & Foundation of Cloud IOT Edge ML"
  ],
  experience: [
    {
      role: "AWS Cloud Virtual Internship - Amazon Web Services",
      duration: "July 2024 - September 2024",
      points: [
        "Completed a virtual internship focused on core AWS services, cloud concepts, and architecture.",
        "Gained foundational knowledge of cloud computing and deployment models."
      ]
    }
  ],
  positions: [
    {
      title: "Book Publications Coordinator",
      description: "Coordinated the end-to-end publication process, including editing, design, printing, and distribution."
    },
    {
      title: "Strides Technical Event (2025) Coordinator",
      description: "Served as Coordinator for strides technical event (2025), overseeing planning, organization and execution."
    },
    {
      title: "Community Service Project Leader",
      description: "Led a community project to support handloom artisans by organizing fundraising, exhibitions, and awareness campaigns, increasing their sales and visibility."
    }
  ]
};

const runSetup = async () => {
  try {
    const resumeUrl = await uploadToCloudinary('C:\\Users\\pradh\\.gemini\\antigravity-ide\\brain\\ae23b90d-a8fb-420a-bfd6-f79e160ed254\\.user_uploaded\\media_1789732271059.pdf', 'raw');
    const photoUrl = await uploadToCloudinary('C:\\Users\\pradh\\.gemini\\antigravity-ide\\brain\\ae23b90d-a8fb-420a-bfd6-f79e160ed254\\.user_uploaded\\media_1789732379996.jpg', 'image');

    portfolioData.resumeUrl = resumeUrl;
    portfolioData.photoUrl = photoUrl;

    console.log("Saving data to Firestore...");
    await setDoc(doc(db, "portfolio", "aksha"), portfolioData);
    console.log("Data successfully saved to Firestore!");

    process.exit(0);
  } catch (err) {
    console.error("Setup failed:", err);
    process.exit(1);
  }
};

runSetup();
