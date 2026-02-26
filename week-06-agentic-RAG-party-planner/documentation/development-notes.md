# Development Notes – Week 06

## Initial Setup
The project was generated using Firebase Studio’s AI prototyping workflow.
The stack included:
- Next.js
- Tailwind CSS
- ShadCN UI
- Genkit (Gemini integration)

---

## Issues Encountered

### 1. React.Children.only Error
Cause:
A component expecting a single child was receiving multiple elements.

Fix:
Corrected component nesting and ensured proper use of `asChild` prop.

---

### 2. Hydration Mismatch Error
Cause:
Client-side window checks caused SSR mismatch.

Fix:
Updated useEffect logic to ensure client-only rendering.

---

## Agentic Behavior Implementation

The app demonstrates:

- Event state retrieval
- Context-aware AI suggestions
- Budget-based reasoning
- Task generation from chat prompts

---

## Key Learning

- Difference between chatbot vs agent
- How RAG improves contextual responses
- Debugging SSR hydration issues
- Using Firebase Studio for rapid prototyping
