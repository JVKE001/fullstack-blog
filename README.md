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
├── client/                     # React frontend (Vite)
│   ├── public/                 # Static assets (favicon, logo, etc.)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level views (Home, Login etc.)
│   │   ├── context/            # React Context
│   │   ├── hooks/              # Custom hooks (e.g., useAuth, useFetch)
│   │   ├── utils/              # Frontend helpers (formatDate, validators)
│   │   ├── assets/             # Images, fonts, icons
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend (Express + MongoDB)
│   ├── database/                 # DB connection, environment setup
│   │   └── mongodb_config.js
│   ├── controllers/            # Route handlers (postController, userController)
│   ├── middleware/             # Auth, error handlers, multer setup
│   ├── models/                 # Mongoose schemas (User, Post, etc.)
│   ├── routes/                 # Express route definitions
│   ├── uploads/                # Uploaded images (should be gitignored)
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env                    # Environment variables (ignored)
│
├── .gitignore                  # Ignore node_modules, .env, dist, uploads
├── README.md                   # Project documentation
├── LICENSE                     # License (MIT, etc.)
└── package.json                # Optional root-level scripts for both client & server



## Setup (dev)
### 1. Clone repo
```bash
git clone https://github.com/JVKE001/fullstack-blog.git
cd fullstack-blog
```

### 2. Install dependencies
```bash
cd server
npm install
```

```bash
cd client
npm install
```

### 3. Run the server
```bash
cd server
nodemon server
```

### 4. Run the frontend
```bash
cd client
npm run dev
```

---


## Author

**JVKE**  
Full Stack Developer  

