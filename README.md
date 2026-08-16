<div align="center">
  <h1>IMPACT OS</h1>
  <p><strong>Youth Opportunity Intelligence & Impact Passport Platform</strong></p>
  <p>Built for the UNESCO Youth Hackathon 2025.</p>

  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel" alt="Vercel" />
</div>

<br />

> IMPACT OS is a two-sided platform that connects young people with verified opportunities (fellowships, hackathons, research labs, volunteering) before deadlines, tracks their application progress, and converts their completed participation into a lifelong, verified "Impact Passport."

---

## 📑 Table of Contents
- [Core Features](#-core-features)
  - [For Youth](#for-youth)
  - [For Organizations](#for-organizations)
- [Platform Walkthrough](#-platform-walkthrough)
- [Local Development](#-local-development)
- [Instant Deployment](#-instant-deployment)

---

## 🎯 Core Features

### For Youth
| Feature | Description |
| :--- | :--- |
| **Opportunity Match Engine** | Browse curated programs with an AI Match Score based on your skills, interests, and eligibility. |
| **Application Tracker** | A 7-step visual stepper tracking progress from Discovery to Verification, featuring an interactive checklist. |
| **AI Eligibility Assistant** | A contextual AI chat widget on every opportunity page explaining match scores and requirements. |
| **Impact Passport** | A shareable, digital portfolio of verified contributions, skills, and impact metrics. |
| **Impact Analytics** | A visual dashboard featuring a SVG Skill Radar chart, 20-week contribution heatmap, and skill breakdowns. |

### For Organizations
| Feature | Description |
| :--- | :--- |
| **Verification Dashboard** | A dedicated portal to review student evidence (PRs, reports, videos), verify skills, and endorse impact statements. |

---

## 🗺 Platform Walkthrough

To effectively demo the platform, follow this optimized flow:

1. **` / ` Landing Page**: View the value proposition, SDG alignment (Goals 4, 8, 10, 17), and platform impact stats.
2. **` /opportunities ` Dashboard**: Browse programs and test the Client-side domain and type filters.
3. **` /opportunities/[id] ` Detail View**: Click "View & Apply". 
   - Test the interactive **Application Tracker** checklist.
   - Click the floating **AI Match Assistant** to simulate contextual AI responses.
4. **` /analytics ` Analytics**: View the student's data visualizations (SVG Skill Radar, heatmap).
5. **` /passport ` Passport**: View the verified portfolio and test the **"Share Passport"** copy-to-clipboard modal.
6. **` /verify ` Org Portal**: Switch to the organizer perspective to see and approve pending verification requests.

---

## 💻 Local Development

Clone the repository and install the dependencies:

```bash
git clone git@github.com:tm1307/impact_os.git
cd impact_os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: This project uses Webpack via `next.config.ts` to ensure build stability across environments.

---

## 🚀 Instant Deployment

This project utilizes a local simulated database (`src/data/mockDb.ts`) and requires **zero environment variables** or database provisioning to deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftm1307%2Fimpact_os)

1. Connect your GitHub repository to Vercel.
2. Use the default Next.js framework preset.
3. Click **Deploy**.
