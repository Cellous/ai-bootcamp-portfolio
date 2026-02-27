"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function PreviewPage() {

  const [profile, setProfile] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [aiResume, setAiResume] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const profileSnap = await getDocs(collection(db, "profile"));
      const educationSnap = await getDocs(collection(db, "education"));
      const experienceSnap = await getDocs(collection(db, "experience"));
      const projectsSnap = await getDocs(collection(db, "projects"));

      setProfile(profileSnap.docs[0]?.data());
      setEducation(educationSnap.docs.map(doc => doc.data()));
      setExperience(experienceSnap.docs.map(doc => doc.data()));
      setProjects(projectsSnap.docs.map(doc => doc.data()));
    };

    loadData();
  }, []);

  const generateAIResume = async (mode: string) => {
    setLoading(true);
  
    try {
      const resumeData = { profile, education, experience, projects };
  
      const res = await fetch("/api/resume-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, mode }),
      });
  
      const data = await res.json();
  
      console.log("API STATUS:", res.status);
      console.log("AI RAW RESPONSE:", data);
      console.log("Profile state:", profile);
  
      if (data.output) {
        setAiResume(data.output);
      } else if (data.error) {
        setAiResume("HF ERROR: " + data.error);
      } else {
        setAiResume("Unexpected response format.");
      }
  
    } catch (err) {
      console.error("Frontend error:", err);
      setAiResume("Frontend fetch failed.");
    }
  
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Resume Preview</h1>

      <button onClick={() => generateAIResume("full")}>
        Generate Professional Resume
      </button>

      <button
        onClick={() => generateAIResume("elon")}
        style={{ marginLeft: "10px" }}
      >
        Generate Elon 3-Bullet Version
      </button>

      {aiResume && (
        <div style={{ marginTop: "30px", whiteSpace: "pre-wrap" }}>
          <h2>AI Output</h2>
          <div style={{ background: "#111", padding: "20px" }}>
            {aiResume}
          </div>
        </div>
      )}
    </div>
  );
}
