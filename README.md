# RTO Vehicle Information & Management App

A comprehensive full-stack Next.js application for fetching, managing, and storing RTO (Regional Transport Office) vehicle details. This robust platform features secure user authentication, an OCR-powered number plate scanner, role-based dashboards, and PDF report generation.

## 🚀 Key Features

*   **🔍 Vehicle Search**: Real-time vehicle information fetching and display.
*   **📸 Number Plate OCR**: Integrated scanner to automatically extract registration numbers from images.
*   **🔒 Secure Authentication**: NextAuth.js configured with strict session controls and bcrypt encryption.
*   **👥 Role-Based Access Control**:
    *   **User Dashboard**: Keep track of search history, save specific vehicles, and manage profiles.
    *   **Admin Dashboard**: Manage users, view comprehensive analytics, and configure system settings.
*   **⚙️ Performance & Security**:
    *   Custom rate-limiting configuration.
    *   API response caching for accelerated repeated lookups.
*   **📄 PDF Generation**: Generate dynamic PDF reports for fetched vehicle details.
*   **🐳 Docker Ready**: Streamlined deployment via Docker and Docker Compose.

## 💻 Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Auth**: [NextAuth.js v5](https://next-auth.js.org/)
*   **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Framer Motion
*   **UI Components**: Custom reusable components, Lucide Icons, React Hot Toast
*   **Validation**: [Zod](https://zod.dev/)

## 📁 Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router endpoints, pages, layouts
│   │   ├── (auth)/         # Login & Signup flows
│   │   ├── admin/          # Admin dashboard & analytics
│   │   ├── dashboard/      # User dashboard (history, saved items)
│   │   ├── api/            # Serverless API routes (auth, vehicle, admin)
│   │   └── vehicle/        # Dynamic vehicle details pages
│   ├── components/         # Reusable React components (UI, Admin, Dashboard, OCR)
│   └── lib/                # Core logic (DB context, NextAuth models, rate config, services)
├── docker-compose.yml      # Multi-container local orchestration
└── Dockerfile              # Container building instructions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB connection string (Local or MongoDB Atlas)
- Docker & Docker Compose (optional for containerized setup)

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_string

# MongoDB
MONGODB_URI=mongodb://localhost:27017/rto-app

# External APIs
# RTO_API_KEY=your_api_key_here
```

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup

To spin up the entire application stack using Docker:

```bash
docker-compose up -d --build
```
The application will be accessible at `http://localhost:3000`.

## 📜 Scripts

*   `npm run dev` - Starts the Next.js development server.
*   `npm run build` - Builds the application for production deployment.
*   `npm run start` - Starts the Next.js production server.
*   `npm run lint` - Lints the codebase using ESLint.

## 🛡️ License & Legal

Please refer to the terms of serving and privacy policies accessible in the app's footer. All usage of RTO data should comply with standard local traffic authority regulations.

---
*Bootstrapped with Next.js*
