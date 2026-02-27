"use client";

import LayoutWrapper from "../components/LayoutWrapper";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function ExperiencePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [experienceList, setExperienceList] = useState<any[]>([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsibilities1, setResponsibilities1] = useState("");
  const [responsibilities2, setResponsibilities2] = useState("");
  const [responsibilities3, setResponsibilities3] = useState("");
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);
      await fetchExperience(currentUser.uid);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchExperience = async (uid: string) => {
    const q = query(collection(db, "users", uid, "experience"));
    const snapshot = await getDocs(q);

    const list: any[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setExperienceList(list);
  };

  const addExperience = async () => {
    if (!user) return;

    if (!responsibilities1 || !responsibilities2 || !responsibilities3) {
      alert("Exactly 3 responsibilities are required.");
      return;
    }

    await addDoc(collection(db, "users", user.uid, "experience"), {
      company,
      role,
      startDate,
      endDate,
      responsibilities: [responsibilities1, responsibilities2, responsibilities3].filter(Boolean),
      createdAt: serverTimestamp(),
    });

    setCompany("");
    setRole("");
    setStartDate("");
    setEndDate("");
    setResponsibilities1("");
    setResponsibilities2("");
    setResponsibilities3("");

    await fetchExperience(user.uid);
  };

  const deleteExperience = async (id: string) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "experience", id));
    await fetchExperience(user.uid);
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  const cardStyle = {
    background: "#1c1c1c",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)"
  };
  
  const sectionTitle = {
    marginBottom: "20px",
    fontSize: "20px"
  };
  
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    background: "#2a2a2a",
    border: "1px solid #333",
    borderRadius: "6px",
    color: "white"
  };
  
  const textareaStyle = {
    ...inputStyle
  };
  
  const primaryButton = {
    background: "#2563eb",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  };
  
  const dangerButton = {
    marginTop: "15px",
    background: "#dc2626",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  };
  
  const linkStyle = {
    display: "block",
    marginTop: "10px",
    color: "#3b82f6",
    textDecoration: "underline"
  };
  
  const projectItem = {
    borderBottom: "1px solid #333",
    paddingBottom: "20px",
    marginBottom: "20px"
  };

  return (
    <LayoutWrapper>
      {/* Add Experience Card */}
      <div style={cardStyle}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Add Experience
        </h1>
  
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Start Date (YYYY-MM)"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="End Date (YYYY-MM)"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Responsibilities 1"
          value={responsibilities1}
          onChange={(e) => setResponsibilities1(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Responsibilities 2"
          value={responsibilities2}
          onChange={(e) => setResponsibilities2(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Responsibilities 3"
          value={responsibilities3}
          onChange={(e) => setResponsibilities3(e.target.value)}
          style={inputStyle}
        />
  
        <button onClick={addExperience} style={primaryButton}>
          Add Experience
        </button>
      </div>
  
      {/* Experience List Card */}
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Your Experience</h2>
  
        {experienceList.map((exp) => (
          <div key={exp.id} style={projectItem}>
            <h3>{exp.role}</h3>
            <p style={{ color: "#bbb" }}>
              {exp.company} â€¢ {exp.startDate} - {exp.endDate}
            </p>
  
            {exp.highlights?.map((h: string, index: number) => (
              <p key={index} style={{ color: "#999" }}>
                â€¢ {h}
              </p>
            ))}
  
            <button
              onClick={() => deleteExperience(exp.id)}
              style={dangerButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </LayoutWrapper>
  );
}
