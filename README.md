# Pharma Challenge UI

This is the frontend application for the Pharma Challenge project. It is built using **React** with **TypeScript** and **Vite**.

---

## 📁 Project Structure

```bash
pharma-challenge-ui/
├── src/
│   ├── api/              # Axios API services
│   ├── assets/           # Static assets (e.g. images)
│   ├── atoms/            # Jotai atoms for global state
│   ├── components/       # Reusable UI components
│   ├── config/           # App-level configuration
│   ├── constants/        # Constant values
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components
│   ├── pages/            # Top-level views/routes
│   ├── routes/           # Route definitions
│   ├── schemas/          # Zod validation schemas
│   ├── services/         # Services for business logic
│   ├── styles/           # Global styles (e.g. CSS)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility/helper functions
├── .env                      # Environment variables
├── .env-example              # Example environment configuration
├── .env-test                 # Test environment file
├── index.html                # HTML entry point
├── main.tsx                  # Application entry file
├── vite-env.d.ts             # Vite-specific typings
├── jest.setup.ts             # Jest setup
├── setupTests.ts             # Testing utilities
├── tsconfig.json             # TypeScript base configuration
├── tsconfig.app.json         # TypeScript config for app
├── tsconfig.jest.json        # TypeScript config for tests
├── tsconfig.node.json        # TypeScript config for Node tools
├── eslint.config.js          # ESLint configuration
├── package.json              # NPM scripts and dependencies
└── README.md
```

---

## 🧪 Tech Stack

- **React 19**
- **Vite**
- **TypeScript**
- **Jotai** (state management)
- **Axios** (HTTP client)
- **Jest + Testing Library** (testing)
- **ESLint** (linting)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Copy the `.env-example` to `.env` and adjust the values:

```bash
cp .env-example .env
```

Environment variables might include:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### 3. Run the application

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

### 4. Run tests

```bash
npm test
```

---

## 🤔 Notes

- All API calls are centralized in `src/api`
- Global state is handled with **Jotai** atoms in `src/atoms`
- Form validation is done via **Yup** in `src/schemas`
- Folder structure follows a modular, scalable convention

---

## 📌 License

This project is part of a technical challenge. Company details have been anonymized.  
You may reuse or adapt the structure freely for other professional or learning purposes.