# 📝 Full-Stack Todo Web Application

A fully responsive and secure Todo Web App built with the Next.js App Router, integrated with authentication, PostgreSQL database, and protected routes.

## 🚀 Live Demo
👉 [Click here to view the deployed application](https://next-js-todo-crud-application.vercel.app)

---

## 📌 Features

- 🔐 **Authentication**
  - Sign in or Register using **Google OAuth** or **email & password** via **NextAuth**.
  - Redirect to Dashboard upon successful login.

- 📋 **Dashboard**
  - Add new tasks without refreshing the page.
  - View list of tasks with edit and delete options.
  - Fully responsive for mobile, tablet, laptop, and desktop screens.

- 🛠️ **Edit Tasks**
  - Navigate to Edit Page to update tasks.
  - Real-time UI updates after editing.

- 🧱 **Protected Routes**
  - Only accessible to authenticated users.

---

## 🧰 Tech Stack

| Category          | Tools Used                          |
|------------------|--------------------------------------|
| Frontend         | Next.js (App Router), TailwindCSS, ShadCN UI |
| Backend          | Next.js API Routes                   |
| Authentication   | NextAuth (Google + Credentials)      |
| Database         | PostgreSQL with Prisma ORM           |
| Testing          | Jest (unit + integration)            |
| Deployment       | Vercel               |

---

## 📁 Folder Structure

📦project-root ┣ 📂app ┣ 📂components ┣ 📂lib ┣ 📂prisma ┣ 📂public ┣ 📂styles ┣ 📂tests ┗ 📄

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
