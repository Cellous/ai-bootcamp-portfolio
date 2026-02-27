"use client";

import LayoutWrapper from "../components/LayoutWrapper";
import { useEffect, useState } from "react";
import { auth, db } from "./../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const profileRef = doc(db, "users", currentUser.uid, "profile", "main");
      const snap = await getDoc(profileRef);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setTitle(data.title || "");
        setShortBio(data.shortBio || "");
        setAbout(data.about || "");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveProfile = async () => {
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid, "profile", "main"),
      {
        name,
        title,
        shortBio,
        about,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
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
      <div style={cardStyle}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Profile</h1>
  
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
  
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
  
        <textarea
          placeholder="Short Bio (1–2 sentences)"
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
          rows={2}
          style={textareaStyle}
        />
  
        <textarea
          placeholder="About (80–120 words)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
  
        <button onClick={saveProfile} style={primaryButton}>
          Save Profile
        </button>
      </div>
    </LayoutWrapper>
  );
}
