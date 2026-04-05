# 🚀 DevEvents - https://dev-events-mu-lime.vercel.app/

> **A full-stack event discovery and booking platform that turns developer event traffic into measurable conversion funnels.** It solves fragmented discovery and low-intent signup drop-off by combining high-performance content delivery, resilient booking workflows, and product analytics instrumentation built for scale-ready growth teams.

## 🏗️ Architecture & Key Capabilities

- 🔁 **Connection Pool Safety (Mongoose):** Implemented global MongoDB connection caching with promise reuse to prevent hot-reload connection storms and improve reliability under repeated server invocations.
- 🧩 **Data Integrity Guardrails (MongoDB Indexes):** Enforced compound uniqueness on bookings (`eventId`, `email`, `slug`) and referential pre-save validation to block duplicate registrations and preserve transactional correctness.
- 🖼️ **Media Ingestion Pipeline (Cloudinary):** Streamed uploaded event images from API form-data buffers directly to Cloudinary in WebP format, reducing asset weight and improving page load performance at scale.
- 📈 **Conversion Observability (PostHog):** Added event-level click and booking telemetry with reverse-proxied ingest routes, improving analytics signal reliability and enabling recruiter-friendly proof of product impact.

## 🛠️ Tech Stack

- **💻 Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, OGL
- **⚙️ Backend:** Next.js Route Handlers, Server Actions, Mongoose, Cloudinary SDK
- **🗄️ Infrastructure & Ops:** MongoDB, Cloudinary CDN, PostHog Analytics, Vercel-ready deployment

## 🚀 Quick Start

```bash
git clone https://github.com/aliasif78/DevEvents.git
cd DevEvents
npm install
cat > .env.local << 'EOF'
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
EOF
npm run dev
```
