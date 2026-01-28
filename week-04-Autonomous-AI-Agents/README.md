![AI Bootcamp](https://img.shields.io/badge/AI%20Bootcamp-Portfolio-0A66C2?style=for-the-badge)
![Autonomous Agents](https://img.shields.io/badge/Autonomous%20AI-Agents-6F42C1?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-Programming-3776AB?style=for-the-badge&logo=python&logoColor=white)
![LLMs](https://img.shields.io/badge/LLMs-Reasoning%20%26%20Planning-FF6F00?style=for-the-badge)
![Prompt Engineering](https://img.shields.io/badge/Prompt-Engineering-2DA44E?style=for-the-badge)
![Workflow Automation](https://img.shields.io/badge/Workflow-Automation-0969DA?style=for-the-badge)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Agents%20Course-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

# 🤖 Week 4 — Autonomous AI Agents
**AI Bootcamp · Agents Track**

---

## Overview
This module focuses on **Autonomous AI Agents**—AI systems designed to reason, plan, and act across tools and workflows. The objective is to move beyond single-prompt interactions toward **goal-driven, multi-step agent behavior** suitable for real-world operational use cases.

---

## Key Concepts Covered
- **Agent Architecture** — reasoning loops, memory, tools, and actions  
- **Autonomy & Planning** — decomposing goals into executable steps  
- **Tool Integration** — APIs, functions, and external systems  
- **Multi-Agent Patterns** — coordinating specialized agents  
- **Error Handling** — iteration, correction, and recovery strategies  

---

## Practical Takeaways
- Build agents that operate with **minimal human intervention**
- Design **repeatable and auditable** agent workflows
- Apply agent-based thinking to **business automation and analytics**
- Lay groundwork for **scalable AI systems**, not demos

---

## Understanding Tools in Agent Systems
In agent-based systems, **LLMs do not execute tools directly**. Instead, the agent:
1. Interprets user input  
2. Determines whether a tool is required  
3. Generates a structured tool call  
4. Receives the tool’s output  
5. Incorporates the result into a user-facing response  

This pattern enables safe, modular, and explainable AI behavior.  
Future applications of this concept include **simulated operational tools** such as:
- Runbook lookup
- Incident classification
- Training and procedural guidance

---

## Alignment with AI Bootcamp Playbooks
This module directly supports the **Business Prompt Playbook Collection**, enabling:

- Autonomous research agents  
- Decision-support agents  
- Workflow automation agents  
- Internal consulting copilots  

These patterns are intended for **freelance consulting, internal automation, and future paid AI products**.

---

## 🧠 Step 4 — Running Models Locally with Ollama  
**Fallback Strategy for Credit / API Limits**

### Purpose
This step documents how to run large language models locally using **Ollama** as an alternative when cloud API credits are limited or unavailable. Local execution enables continued experimentation with autonomous agents while maintaining control over **cost, privacy, and compute resources**.

### Tooling
- **Ollama** — Local LLM runtime  
- **Models Tested / Available**
  - `qwen3:4b`
  - `qwen3:8b`
  - `qwen3:30b`
  - `qwen3-coder:30b`
  - `qwen3-vl:4b / 8b / 30b`
  - `gemma3:4b`

### Installation
Follow the official Ollama installation instructions:  
https://ollama.com

### Pulling a Model Locally
Example command used during this module:
```bash
ollama pull qwen3:8b

