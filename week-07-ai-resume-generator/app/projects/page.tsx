"use client";

import LayoutWrapper from "../components/LayoutWrapper";
import { useEffect, useState } from "react";
import { auth, db } from "./../lib/firebase";
import { storage } from "./../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Card from "../components/Card"

export default function ProjectsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);
      await fetchProjects(currentUser.uid);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchProjects = async (uid: string) => {
    const snapshot = await getDocs(collection(db, "users", uid, "projects"));
    const list: any[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setProjects(list);
  };

  const addProject = async () => {
    if (!user) return;

    if (!title || !description) {
      alert("Title and description required.");
      return;
    }

    if (!url && !file) {
      alert("You must provide at least one evidence source (URL or file).");
      return;
    }

    let fileURL = "";

    if (file) {
      const fileRef = ref(storage, `projects/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      fileURL = await getDownloadURL(fileRef);
    }

    await addDoc(collection(db, "users", user.uid, "projects"), {
      title,
      description,
      url: url || "",
      fileURL,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setUrl("");
    setFile(null);

    fetchProjects(user.uid);
  };

  const deleteProject = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "projects", id));
    fetchProjects(user.uid);
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
   <div style={{ maxWidth: "900px", margin: "40px auto", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>Projects</h1>
  
      {/* Add Project Card */}
      <div style={cardStyle}>
        <h2 style={sectionTitle}>Add Project</h2>
  
        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
  
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
  
        <input
          placeholder="Project URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={inputStyle}
        />
  
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
          style={{ marginBottom: "20px" }}
        />
  
        <button onClick={addProject} style={primaryButton}>
          Add Project
        </button>
      </div>
  
      {/* Projects List Card */}
      <div style={cardStyle}>
        <h2 style={sectionTitle}>Your Projects</h2>
  
        {projects.map((project) => (
          <div key={project.id} style={projectItem}>
            <h3 style={{ marginBottom: "8px" }}>{project.title}</h3>
            <p style={{ color: "#bbb" }}>{project.description}</p>
  
            {project.url && (
              <a href={project.url} target="_blank" style={linkStyle}>
                View URL
              </a>
            )}
  
            {project.fileURL && (
              <div>
                <a href={project.fileURL} target="_blank" style={linkStyle}>
                  View File
                </a>
              </div>
            )}
  
            <button
              onClick={() => deleteProject(project.id)}
              style={dangerButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </LayoutWrapper>
  );
}
