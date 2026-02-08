# Week 05 — Agent Execution Loops & Memory

This week focuses on how autonomous AI agents reason, act, and reflect over multiple steps, and how they persist actions in memory to maintain context.

## Concepts Covered
- Reason → Act → Reflect execution loop
- Persistent memory across agent steps
- ActionStep-style logging (inputs, actions, outputs)
- Offline agent systems (no API keys required)
- Gradio-based agent interfaces

## Projects

### Unit 2.1 — Simple AI Agent with Memory
**Notebook:** `Week5_Unit2_1_Simple_AI_Agent_With_Memory.ipynb`

- Built a lightweight offline AI agent
- Implemented persistent memory using a local text file
- Demonstrated recall of prior user inputs

### Unit 2.2 — The Agent Execution Loop
**Notebook:** `Week5_Unit2_2_The_Agent_Execution_Loop.ipynb`

- Simulated the Reason → Act → Reflect loop
- Agent reasons about user input, performs an action, and reflects on memory state
- Implemented using Python and Gradio in a notebook environment

### Unit 2.3 — Saving Actions in Memory (ActionStep)
**Notebook:** `Week5_Unit2_3_Saving_Actions_in_Memory.ipynb`

- Extended the agent to log each interaction as an ActionStep
- Stored user inputs, agent responses, and timestamps
- Enabled traceability of how decisions were reached
- Fully offline execution (no Hugging Face inference APIs)

## Tools & Technologies
- Python
- Hugging Face Transformers (local models only)
- Gradio
- Jupyter / Google Colab

## Key Takeaway
This week demonstrates how agentic systems maintain reasoning continuity by persisting actions and reflections, forming the foundation for more advanced autonomous and multi-agent workflows.
