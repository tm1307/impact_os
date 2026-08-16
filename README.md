# IMPACT OS

> **Youth Opportunity Intelligence & Impact Passport Platform**
> Built for the UNESCO Youth Hackathon 2025.

IMPACT OS is a two-sided platform that connects young people with verified opportunities (fellowships, hackathons, research labs, volunteering) before deadlines, tracks their application progress, and converts their completed participation into a lifelong, verified "Impact Passport."

---

## Key Features

### For Youth (Students & Young Professionals)
1. **Opportunity Match Engine:** Browse curated programs with an AI Match Score based on your skills, interests, and eligibility.
2. **Application Tracker:** A 7-step visual stepper (Discover → Review → Prepare → Submit → Participate → Upload Evidence → Get Verified) with an interactive preparation checklist for every opportunity.
3. **AI Eligibility Assistant:** A contextual AI chat widget on every opportunity page that explains your match score, clarifies eligibility requirements, and suggests how to improve your application.
4. **Impact Passport:** A shareable, digital portfolio of verified contributions, skills, and impact metrics that proves what traditional certificates can't.
5. **Impact Analytics:** A visual dashboard featuring a Skill Radar chart, a 20-week contribution heatmap, skill breakdown bars, and a monthly activity timeline.

### For Organizations (Verifiers & Mentors)
6. **Verification Dashboard:** A dedicated portal for program organizers to review student evidence (GitHub PRs, reports, videos), verify skills, and endorse impact statements to be permanently added to the student's Passport.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Data:** Simulated async API using typed local datasets (`src/data/mockDb.ts`) for zero-configuration deployment.
- **Components:** Custom B2B SaaS UI components (Cards, Badges, Buttons, Steppers) designed with a minimalist aesthetic inspired by Vercel and Linear.

---

## Walkthrough: How to Demo the MVP

1. **Landing Page (`/`):** Start here to see the value proposition, SDG alignment (Goals 4, 8, 10, 17), and platform impact statistics.
2. **Opportunities (`/opportunities`):** View the dashboard of available programs. Use the Client-side filters (Domain, Type) to sort.
3. **Opportunity Detail (`/opportunities/[id]`):** Click "View & Apply" on any opportunity. 
   - Test the interactive **Application Tracker** checklist.
   - Click the floating **AI Match Assistant** button in the bottom right and ask "Am I eligible?" or "How can I improve my match?".
   - Click "Apply Now" to see the state change.
4. **Impact Analytics (`/analytics`):** View the student's data visualizations, including the SVG Skill Radar and contribution heatmap.
5. **Impact Passport (`/passport`):** View the verified portfolio. Click **"Share Passport"** to test the copy-to-clipboard modal UI.
6. **Organization Verification (`/verify`):** Switch to the organizer's perspective to see pending verification requests and approve them.

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

*Note: If you experience build issues with Turbopack, run the production build using Webpack via `npm run build`.*

---

## Deployment Details

This project is built to be deployed instantly on Vercel with zero configuration required.

### Deploying to Vercel (Recommended)

1. Push this repository to GitHub.
2. Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave all build settings as default:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Click **Deploy**. 

Because all mock data is bundled locally, no database provisioning or environment variables (`.env`) are required for this MVP to work flawlessly in production.
