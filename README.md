# NovaShop — Registration & Login Service Frontend

A modern, production-oriented authentication web application for an e-commerce platform. Built with **React 18**, **TypeScript**, **Tailwind CSS**, **React Router v6**, **React Hook Form**, and **Zod**. Integrated with a Spring Boot backend via secure **HttpOnly cookie-based session management** and **CSRF token synchronization**.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture & Directory Structure](#architecture--directory-structure)
- [Prerequisites](#prerequisites)
- [Local Setup & Development](#local-setup--development)
- [Environment Configuration](#environment-configuration)
- [Running Automated Tests](#running-automated-tests)
- [Production Build](#production-build)
- [Backend API Integration & Security Architecture](#backend-api-integration--security-architecture)
- [Pages & Routes](#pages--routes)

---

## Features

- **User Registration**: Real-time password requirement checklist, password confirmation validation, email normalization, and backend conflict handling (HTTP 409).
- **Flexible Login**: Single identifier field accepting either registered email address or 10-digit mobile number, with privacy-conscious "remember identifier" option (never stores password).
- **Password Recovery**: Secure email OTP workflow (6-digit passcode verification, 60-second resend cooldown timer, single-use reset token stored exclusively in memory).
- **Password Reset & Change**: Password strength meter, matching confirmation, and automatic session revocation across devices.
- **Authenticated Dashboard**: Displays verified customer name, email, and mobile number retrieved dynamically from the backend session (`GET /api/v1/auth/me`).
- **Secure Session Management**: Protected routes, automatic session expiration handling, and clean logout state teardown.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Forms | React Hook Form 7 |
| Validation | Zod 3 |
| Icons | Lucide React |
| Testing | Vitest 2 + React Testing Library + Jest DOM |

---

## Architecture & Directory Structure

```
src/
├── app/
│   └── App.tsx                           # Root application provider wrapper
├── components/
│   ├── common/                           # LoadingSpinner, PrimaryButton, FormError, Toast
│   ├── forms/                            # FormField, TextInput, PasswordInput, PasswordStrengthIndicator
│   └── layout/                           # AuthLayout, AppHeader, ProtectedRoute
├── context/
│   └── AuthContext.tsx                   # Centralized authentication & in-memory recovery state
├── pages/
│   ├── Login/LoginPage.tsx               # /login
│   ├── Register/RegisterPage.tsx         # /register
│   ├── ForgotPassword/ForgotPasswordPage.tsx # /forgot-password
│   ├── VerifyOtp/VerifyOtpPage.tsx       # /verify-otp
│   ├── ResetPassword/ResetPasswordPage.tsx   # /reset-password
│   ├── Dashboard/DashboardPage.tsx       # /dashboard (Protected)
│   └── ChangePassword/ChangePasswordPage.tsx # /change-password (Protected)
├── routes/
│   └── AppRoutes.tsx                     # Route declarations & navigation guards
├── schemas/
│   └── authSchemas.ts                    # Zod validation schemas
├── services/
│   ├── apiClient.ts                      # Centralized Fetch API client (credentials + CSRF)
│   └── authService.ts                    # Authentication endpoints
├── types/
│   └── auth.ts                           # TypeScript request/response contracts
└── test/
    ├── setup.ts                          # Vitest & Jest DOM setup
    ├── apiClient.test.ts                 # API client & CSRF tests
    ├── authSchemas.test.ts               # Form validation unit tests
    ├── LoginPage.test.tsx                # Login integration tests
    ├── RegisterPage.test.tsx             # Registration integration tests
    ├── VerifyOtpPage.test.tsx            # OTP verification integration tests
    └── ProtectedRoute.test.tsx           # Route protection tests
```

---

## Prerequisites

- **Node.js**: v18+ (tested on Node v22.19.0)
- **npm**: v9+ (tested on npm 11.12.0)
- **Backend Service**: Spring Boot backend running on `http://localhost:8080` (or configured API URL)

---

## Local Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/Ansharrmaa/REG-LOG-FRONTEND-APP.git
cd REG-LOG-FRONTEND-APP
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create `.env` from `.env.example`:
```bash
cp .env.example .env
```
Default content:
```ini
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### 4. Start local development server
```bash
npm run dev
```
The frontend will start at **`http://localhost:5173`**.

---

## Running Automated Tests

Run all unit and component tests with Vitest:
```bash
npm test
```
To run tests in watch mode:
```bash
npm run test:watch
```

---

## Production Build

Typecheck and bundle for production:
```bash
npm run build
```
The optimized assets are output to `dist/`. Preview the production build locally:
```bash
npm run preview
```

---

## Backend API Integration & Security Architecture

1. **HttpOnly Cookie Authentication**:
   - The backend issues signed JWTs via an `AUTH_TOKEN` HttpOnly cookie.
   - The browser automatically handles storing and transmitting this cookie via `credentials: "include"`.
   - JavaScript has zero direct access to the authentication token, mitigating Cross-Site Scripting (XSS) token theft.

2. **CSRF Protection**:
   - On application mount, `apiClient` queries `GET /api/v1/auth/csrf`.
   - The CSRF token is kept in memory and passed in the `X-XSRF-TOKEN` header on all mutating requests (`POST`, `PUT`, `DELETE`).
   - If a 403 CSRF challenge occurs, `apiClient` automatically fetches a fresh token and retries once.

3. **In-Memory Credential Safety**:
   - Raw passwords, OTP codes, and password-reset tokens are **never** persisted in `localStorage` or `sessionStorage`.
   - The temporary reset token received from `/auth/verify-reset-otp` is kept strictly in React application memory (`AuthContext`) and cleared immediately upon password reset or page unload.

4. **Zero Account Enumeration**:
   - `/auth/forgot-password` always renders a generic success message regardless of whether an account exists.
   - `/auth/login` renders an identical generic error on bad credentials whether the identifier exists or not.

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Automatic redirect: if authenticated $\to$ `/dashboard`, else $\to$ `/login` |
| `/login` | Public Only | Sign in via email or 10-digit mobile number |
| `/register` | Public Only | Create customer account with real-time password policy validation |
| `/forgot-password` | Public Only | Request 6-digit recovery OTP |
| `/verify-otp` | Public Only | Verify 6-digit email OTP (receives single-use reset token) |
| `/reset-password` | Public Only | Set new password using single-use reset token |
| `/dashboard` | Protected | Authenticated customer overview with live profile data |
| `/change-password` | Protected | Change password for authenticated session (revokes active sessions) |
