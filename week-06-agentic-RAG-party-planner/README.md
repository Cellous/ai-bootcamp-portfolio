![AI Agents](https://img.shields.io/badge/AI-Agentic-purple)
![LLM](https://img.shields.io/badge/LLM-Gemini-blueviolet)
![RAG](https://img.shields.io/badge/RAG-Agentic-green)
![Cloud](https://img.shields.io/badge/Cloud-Firebase-orange)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

# Week 06 – Agentic RAG Party Planner 

## Overview

This project demonstrates an **Agentic RAG (Retrieval-Augmented Generation)** AI application built using **Firebase Studio** and **Gemini (via Genkit)**.

The application is a fully functional AI-powered Party Planner that:

- Uses an LLM (Gemini) for intelligent reasoning
- Retrieves and reasons over stored event data
- Provides contextual AI suggestions
- Supports two-way interaction (user ↔ AI)
- Demonstrates agentic behavior

---

## Objective

Build an Agentic RAG pipeline that:

- Combines an LLM with retrieval
- Answers questions about events
- Uses Firebase Studio for AI-assisted development

---

## Tech Stack

- Firebase Studio
- Gemini API (Genkit)
- Next.js
- Tailwind CSS
- ShadCN UI
- Firestore (event state retrieval)

---

## Key Features

### Event Creation
Users can create and manage events with:
- Name
- Date
- Location
- Description

### 💬 Two-Way AI Chat
The AI agent:
- Suggests themes, food, and activities
- Generates checklists
- Provides budget-aware recommendations
- Responds dynamically based on stored event data

### Agentic Behavior
The application demonstrates:

- Context awareness (reads event state)
- Multi-step reasoning
- Constraint handling (budget-based suggestions)
- Task generation from conversational input
- Retrieval of structured event data

---

## Agentic RAG Explanation

This project implements an **Agentic RAG-lite architecture**:

1. User creates or updates event data
2. Event data is stored (retrieval layer)
3. Gemini retrieves contextual information
4. The agent reasons over that data
5. Personalized suggestions are generated

This satisfies the requirements of:
- LLM + Retrieval
- Context-based response generation
- AI-driven workflow orchestration

---

## Development Notes

During development, several issues were resolved:

- Fixed React `Children.only` component structure errors
- Resolved hydration mismatches caused by client/server rendering differences
- Adjusted form composition to ensure single-child component rendering
- Iterated on AI suggestion logic for personalization
- Enhanced visual theme consistency

---

## Live Preview

> Submitted via Firebase Studio Share Preview link in Canvas.

---

## What I Learned

- How agentic systems differ from static chatbots
- How retrieval enhances contextual AI responses
- How Firebase Studio abstracts backend orchestration
- How to debug SSR hydration mismatches in Next.js
- How AI-assisted development accelerates prototyping

---

## Status

✅ Completed  
📅 AI Bootcamp – Week 06  
