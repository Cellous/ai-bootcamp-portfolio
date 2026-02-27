"use client";

import LayoutWrapper from "../components/LayoutWrapper";
import { useEffect, useState } from "react";
import { auth, db } from "./../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
} from "firebase/firestore";

export default function EducationPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [educationList, setEducationList] = useState<any[]>([]);

  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [highlight1, setHighlight1] = useState("");
  const [highlight2, setHighlight2] = useState("");
  const [highlight3, setHighlight3] = useState("");

  const [h1, setH1] = useState("");
  const [h2, setH2] = useState("");
  const [h3, setH3] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);
      await fetchEducation(currentUser.uid);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchEducation = async (uid: string) => {
    const q = query(collection(db, "users", uid, "education"));
    const snapshot = await getDocs(q);

    const list: any[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setEducationList(list);
  };

  const addEducation = async () => {
    if (!user) return;

    if (!school || !degree || !field || !h1 || !h2 || !h3) {
      alert("All fields required. Exactly 3 highlights.");
      return;
    }

    await addDoc(collection(db, "users", user.uid, "education"), {
      school,
      degree,
      field,
      startDate,
      endDate,
      highlights: [highlight1, highlight2, highlight3].filter(Boolean),
      createdAt: serverTimestamp(),
    });

    setSchool("");
    setDegree("");
    setField("");
    setStartDate("");
    setEndDate("");
    setHighlight1("");
    setHighlight2("");
    setHighlight3("");

    fetchEducation(user.uid);
  };

  const deleteEducation = async (id: string) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "education", id));
    fetchEducation(user.uid);
  };

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

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
      {/* Add Education Card */}
      <div style={cardStyle}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Add Education
        </h1>
  
        <input
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Field of Study"
          value={field}
          onChange={(e) => setField(e.target.value)}
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
          placeholder="Highlight 1"
          value={highlight1}
          onChange={(e) => setHighlight1(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Highlight 2"
          value={highlight2}
          onChange={(e) => setHighlight2(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Highlight 3"
          value={highlight3}
          onChange={(e) => setHighlight3(e.target.value)}
          style={inputStyle}
        />
  
        <button onClick={addEducation} style={primaryButton}>
          Add Education
        </button>
      </div>
  
      {/* Education List Card */}
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Your Education</h2>
  
        {educationList.map((edu) => (
          <div key={edu.id} style={projectItem}>
            <h3>{edu.degree}</h3>
            <p style={{ color: "#bbb" }}>
              {edu.school} â€¢ {edu.startDate} - {edu.endDate}
            </p>
  
            {edu.highlights?.map((h: string, index: number) => (
              <p key={index} style={{ color: "#999" }}>
                â€¢ {h}
              </p>
            ))}
  
            <button
              onClick={() => deleteEducation(edu.id)}
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
