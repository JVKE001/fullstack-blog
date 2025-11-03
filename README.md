# Full-Stack Blog Page — CRUD + Auth

## Features
- Register / Login with JWT
- Create, Read, Update, Delete posts (owner-only for write ops)
- Pagination and search (title / username)
- Client-side & server-side validation
- .env.example, seed script, Postman collection

## Tech stack
- Backend: Node.js, Express, MongoDB, Mongoose, bcrypt, jsonwebtoken
- Frontend: React, Axios, Tailwind CSS, Daisy UI

## Repo layout
fullstack-blog/
├─ client/     → React frontend (UI)
├─ server/     → Node.js + Express backend (API)
├─ .gitignore  → ignores .env, node_modules, build files
├─ README.md
├─ LICENSE


## Setup (dev)
### 1. Clone repo
```bash
git clone https://github.com/JVKE001/fullstack-blog.git
cd fullstack-blog
```

###2. Install dependencies
```bash
cd server
npm install
```

```bash
cd client
npm install
```

###3. Run the server
```bash
cd server
nodemon server
```

###4. Run the frontend
```bash
cd client
npm run dev
```

---


## Author

**JVKE**  
Full Stack Developer  

