# AI Prompt Playground

A full-stack application for experimenting with AI language models, allowing users to adjust parameters like model selection and temperature to understand their effects on AI responses.

## ✨ Features

* 🤖 **Multiple AI Model Selection** — Choose between different model tiers
* 🌡️ **Temperature Control (0-1)** — Adjust response creativity vs consistency
* 📜 **Conversation History** — Timeline of all prompts and responses with timestamps
* 🎨 **Modern, Responsive UI** — Clean interface with Tailwind CSS
* 📝 **Real-time Response Generation** — Instant feedback with loading states
* 🔄 **Mock Mode** — Test without OpenAI API key using intelligent simulation
* 📚 **API Documentation** — Interactive Swagger docs for backend
* ✅ **Form Validation** — Real-time input validation with helpful error messages
* 🔔 **Toast Notifications** — User-friendly success and error feedback

## 🛠️ Tech Stack

**Frontend:**
* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* Shadcn UI Components
* Axios for API requests

**Backend:**
* Node.js + Express.js
* OpenAI API Integration
* Express Validator for input validation
* Swagger/OpenAPI Documentation

## 📦 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (optional — works in mock mode without it)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Edit .env and configure:
# - OPENAI_API_KEY=your_key_here (optional)
# - USE_REAL_LLM=false (set to true to use real OpenAI)

npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### Access Points
- **Application**: `http://localhost:3000`
- **API Documentation**: `http://localhost:5000/api-docs`
- **API Base**: `http://localhost:5000/api`

---

## 🧠 LLM Understanding

### What is an LLM?

A **Large Language Model (LLM)** is an artificial intelligence system trained on vast amounts of text data to understand and generate human-like language. LLMs learn patterns, grammar, facts, and reasoning capabilities from this training data.

**Key capabilities:**
- Answer questions and explain concepts
- Write creative content (stories, code, essays)
- Translate between languages
- Summarize long documents
- Solve problems through reasoning

**Popular examples:** GPT-4, Claude, Gemini, LLaMA

### What Does Temperature Mean?

Temperature is a parameter (0–1) that controls the **randomness** of the model's responses:

| Temperature | Behavior | Best For |
|------------|----------|----------|
| **Low (0–0.3)** | Deterministic, focused, consistent | Code generation, factual Q&A, math problems |
| **Medium (0.4–0.7)** | Balanced creativity and coherence | General conversation, content writing |
| **High (0.8–1.0)** | Creative, diverse, unpredictable | Brainstorming, storytelling, creative writing |

**Technical explanation:** Temperature adjusts the probability distribution over possible next tokens. Lower values make the model choose more likely tokens (conservative), while higher values flatten the distribution (exploratory).

### Choosing Bigger vs Smaller Models

| Aspect | Smaller Models (e.g., GPT-4o Mini) | Larger Models (e.g., GPT-4o) |
|--------|-----------------------------------|------------------------------|
| **Speed** | Fast (100-200ms) | Slower (500-1500ms) |
| **Cost** | Very cheap ($0.15/$0.60 per 1M tokens) | More expensive ($2.50/$10 per 1M tokens) |
| **Quality** | Good for straightforward tasks | Better reasoning, nuance, accuracy |
| **Context** | Smaller context window (16k-32k tokens) | Larger context window (128k+ tokens) |
| **Use Cases** | Chatbots, simple Q&A, classification | Complex analysis, coding, research |

**Rule of Thumb:** Start with the smallest model that meets your needs. Scale up only when you encounter limitations in reasoning, accuracy, or context length.

---

## 💭 Development Reflections

### Planning Approach
I began this project with physical notepad planning before writing any code. I sketched out the architecture, broke down tasks into time-boxed chunks, and estimated approximately 5 hours of work. This hands-on planning approach helped me visualize the component structure and data flow clearly. After completing the project, I formalized this planning into PLAN.md with both my original estimates and actual time spent. 

**Reflection:** While the notepad approach worked well for this individual task, for future projects I would create the formal PLAN.md document upfront, as it's more suitable for team collaboration and provides better documentation from the start.

### Task Completion
* **Estimated:** 5 hours (from notepad planning)
* **Actual:** 5 hours
* Task complexity was well-suited to the timeframe

### Development Approach
* **~90% self-written code** — Core architecture, business logic, and features
* **~10% assisted** — Some configuration boilerplate and styling patterns
* With heavy AI assistance: Could have built minimal version in ~30 minutes
* With moderate AI assistance: Could have built similar version in ~1.5-2 hours
* Chose manual approach to demonstrate problem-solving and architectural skills

### Hardest Part
No significant blockers, as I have experience with similar full-stack projects. The main challenges were:
- Balancing feature completeness with time constraints
- Deciding which "nice-to-have" features to include vs document for future

### Problem-Solving Approach
1. **Started with architecture** — Sketched component relationships and API structure on notepad
2. **Used TypeScript** — Type safety caught errors early, saved debugging time
3. **Built mock mode first** — Enabled rapid frontend development without API costs
4. **Incremental testing** — Tested each component as built rather than all at end

### What I Learned
- Balancing polish with time constraints
- Value of architectural decisions (services pattern made testing easier)

### What I Would Improve in Code/Structure

**If Given One More Day:**

#### High Priority (2-3 hours)
1. **Streaming Responses** 
   - Implement Server-Sent Events (SSE) for real-time chunk-by-chunk display
   - Better UX for longer responses (users see text appearing live)
   - Use OpenAI's streaming API with `stream: true`
   - Add abort controller to cancel in-flight requests
   - **Estimated:** 1.5 hours

2. **Database Integration**
   - PostgreSQL or MongoDB for persistent history
   - User authentication (JWT) for multi-user support
   - Cross-device history synchronization
   - Response caching to reduce API costs
   - **Estimated:** 2.5 hours

#### Medium Priority (1-2 hours)
3. **Enhanced UX Features**
   - Copy response to clipboard button
   - Export conversation history as JSON/PDF
   - Keyboard shortcuts (Ctrl+Enter to submit)
   - Dark mode toggle with theme persistence
   - Response regeneration button

4. **Production Readiness**
   - Rate limiting (prevent API abuse)
   - Request queuing for high traffic
   - Better error boundaries in React
   - Monitoring and logging (Winston/Pino)
   - Unit tests (Jest/Vitest)

#### Low Priority (1 hour)
5. **DevOps & Deployment**
   - Docker containerization
   - CI/CD pipeline (GitHub Actions)
   - Deploy frontend to Vercel
   - Deploy backend to Railway/Render
   - Environment-specific configs

**Current Strengths:**
- ✅ Clean, maintainable architecture
- ✅ Comprehensive error handling
- ✅ Professional API documentation
- ✅ Type-safe frontend
- ✅ Mock mode for cost-effective development

---

## 📁 Project Structure
```
├── backend/
│   ├── src/
│   │   ├── config/          # OpenAI client, Swagger setup
│   │   ├── controllers/     # Request handlers (prompt.controller.js)
│   │   ├── middlewares/     # Validation, error handling
│   │   ├── routes/          # API routes (prompt.routes.js)
│   │   └── services/        # Business logic (llm.service.js)
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js            # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages (layout.tsx, page.tsx)
│   │   ├── components/      # React components (PromptForm, ResponseCard, etc.)
│   │   │   └── ui/          # Shadcn UI primitives
│   │   └── lib/             # API client (api.ts), types (types.ts), utils
│   ├── .env.local
│   ├── .env.example
│   ├── package.json
│   └── next.config.js
│
├── PLAN.md                  # Time estimates and reflections
└── README.md                # This file
```

---

## 🚀 API Endpoints

### `POST /api/generate`
Generate an AI response from a prompt.

**Request:**
```json
{
  "prompt": "Explain quantum computing",
  "model": "gpt-4o-mini",
  "temperature": 0.7
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reply": "Quantum computing is...",
    "usedModel": "gpt-4o-mini", 
    "temperature": 0.7,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "metadata": {
      "source": "mock",
      "responseTime": "150ms"
    }
  }
}
```

### `GET /api/models`
Get list of available AI models.

**Response:**
```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": "gpt-4o-mini",
        "name": "GPT-4o Mini",
        "description": "Fast and affordable - perfect for everyday tasks",
        "pricing": "Very affordable: $0.15/$0.60 per 1M tokens",
        "maxTokens": 16384,
        "recommended": true,
        "speed": "Fastest"
      },
      {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "description": "Most capable model for complex reasoning",
        "pricing": "Premium: $2.50/$10.00 per 1M tokens",
        "maxTokens": 128000,
        "recommended": true,
        "speed": "Fast"
      },
      {
        "id": "gpt-4-turbo",
        "name": "GPT-4 Turbo",
        "description": "Previous generation flagship model with large context",
        "pricing": "Standard: $10.00/$30.00 per 1M tokens",
        "maxTokens": 128000,
        "recommended": false,
        "speed": "Moderate"
      }
    ]
  }
}
```

---

## 🧪 Testing

**Test the backend:**
```bash
# Using curl
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello","model":"gpt-4o-mini","temperature":0.7}'

# Or visit Swagger docs at http://localhost:5000/api-docs
```


---

## 📝 License

MIT

---

## 👤 Author

**Imran Bin Hasan**

*Built as a technical assessment for Core Devs Ltd.*
