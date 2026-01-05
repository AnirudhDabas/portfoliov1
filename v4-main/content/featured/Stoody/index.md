---
date: '2'
title: 'Stoody — AI-Driven Study Partner Matching Platform'
cover: './demo.png'
cta: 'https://getstoody.com/'
github: 'https://github.com/AnirudhDabas'
external: 'https://getstoody.com/'
tech:
  - Next.js
  - React
  - Supabase (Postgres + Auth + RLS)
  - Edge Functions
  - AI Matching Engine
  - Embeddings
  - REST APIs
  - Vercel
---

An AI-driven platform that matches university students with compatible study partners based on course overlap, learning preferences, availability patterns, and collaboration styles.

Built the platform using Next.js with Supabase as the core backend for authentication, relational user data, and RLS-protected profiles. Implemented waitlist onboarding, profile setup, and API endpoints for course data, preferences, and behavioral signals, with edge functions handling validation and matching pipeline execution.

The AI matching engine combines deterministic course-overlap rules with similarity scoring, preference weighting, and embedding-based compatibility signals designed to improve match quality over time as interaction data is collected.

Currently operating in a controlled pre-launch state while the matching pipeline and rollout strategy are iterated on, with the full platform architecture and backend services already in place.
