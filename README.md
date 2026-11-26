# EcoBike Manager

## Technology Stack

- React + Vite + TypeScript
- Tailwind CSS
- NestJS + TypeScript
- PostgreSQL
- npm Workspaces

## Installation

npm ci

## Environment

Copy backend/.env.example to backend/.env
and configure your local PostgreSQL password.

## Development

Backend: npm run dev:backend

Frontend: npm run dev:frontend

## URLs

Frontend: http://127.0.0.1:5175

Backend: http://127.0.0.1:3000/api/health

Database: http://127.0.0.1:3000/api/health/database

## Git

Never commit .env or node_modules.
Commit package-lock.json.

## Status

Development foundation.
Business modules are not implemented yet.