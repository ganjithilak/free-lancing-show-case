# ThilakGanji Portfolio

Full-stack freelance showcase portfolio for **Thilak Ganji** — Data Analyst, BI Developer & Full-Stack Web Developer.

**Live URL:** `http://<EC2-PUBLIC-IP>` *(update after EC2 public IP is confirmed)*
**GitHub:** https://github.com/ganjithilak/free-lancing-show-case

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT (Bearer token) |
| Hosting | AWS EC2 (Ubuntu) |
| Reverse Proxy | Nginx |
| Process Manager | PM2 |
| CI/CD | GitHub Actions |

---

## Project Structure

```
free-lancing-show-case/
├── backend/
│   ├── src/
│   │   ├── controllers/     # authController, projectController, contactController
│   │   ├── middleware/      # authMiddleware (protect, adminOnly)
│   │   ├── models/          # User, Project, Contact
│   │   ├── routes/          # authRoutes, projectRoutes, contactRoutes
│   │   ├── server.js        # Express entry point
│   │   └── seed.js          # Database seeder
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # axios helpers
│   │   ├── components/      # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   │   ├── context/         # AuthContext (JWT state)
│   │   ├── pages/           # Home, Login, Dashboard
│   │   └── App.jsx
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
└── README.md
```

---

## Local Development Setup

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (free tier is fine)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ganjithilak/free-lancing-show-case.git
cd free-lancing-show-case
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env — fill in MONGO_URI and JWT_SECRET
npm install
npm run dev       # starts on http://localhost:5000
```

### 3. Seed the database (first time only)

```bash
cd backend
node src/seed.js
```

### 4. Frontend setup

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173
```

Open http://localhost:5173 — the frontend proxies `/api` calls to the backend automatically.

---

## Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/thilakganji
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## API Endpoints

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Private | Get current user |

### Projects
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/projects` | Public | List all projects |
| GET | `/api/projects/:id` | Public | Get single project |
| POST | `/api/projects` | Admin | Create project |
| PUT | `/api/projects/:id` | Admin | Update project |
| DELETE | `/api/projects/:id` | Admin | Delete project |

### Contact
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/contact` | Admin | View all messages |
| PATCH | `/api/contact/:id/read` | Admin | Mark message read |

---

## Admin Access

After seeding:

| Field | Value |
|-------|-------|
| URL | `http://<your-domain>/login` |
| Email | `admin@thilakganji.com` |
| Password | `ThilakAdmin@123` |

> **Change the password after first login.**

---

## EC2 Deployment (Manual First Time)

### 1. SSH into the instance

```bash
ssh -i ~/Downloads/Myfreelance.pem ubuntu@<EC2-PUBLIC-IP>
```

### 2. Install dependencies on EC2

```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 + Nginx
sudo npm install -g pm2
sudo apt-get install -y nginx

# MongoDB client (optional)
sudo apt-get install -y mongodb-clients
```

### 3. Clone repo and configure

```bash
cd /home/ubuntu
git clone https://github.com/ganjithilak/free-lancing-show-case.git portfolio
cd portfolio/backend
cp .env.example .env
nano .env   # fill in MONGO_URI, JWT_SECRET, set NODE_ENV=production, FRONTEND_URL=http://<YOUR-IP>
```

### 4. Build frontend

```bash
cd /home/ubuntu/portfolio/frontend
npm install
npm run build
```

### 5. Start backend with PM2

```bash
cd /home/ubuntu/portfolio/backend
npm install --production
pm2 start src/server.js --name thilakganji-api
pm2 save
pm2 startup   # follow the printed command to auto-start on reboot
```

### 6. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/thilakganji
```

Paste:

```nginx
server {
    listen 80;
    server_name thilakganji.com www.thilakganji.com <EC2-PUBLIC-IP>;

    # Serve React build
    root /home/ubuntu/portfolio/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to Node.js
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/thilakganji /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Open EC2 Security Group ports

In AWS Console → EC2 → Security Groups → Inbound Rules:
- **HTTP** (port 80) — Source: `0.0.0.0/0`
- **HTTPS** (port 443) — Source: `0.0.0.0/0`
- **SSH** (port 22) — Source: your IP only

---

## Domain Setup (ThilakGanji)

To get a public URL at **thilakganji.com**:

1. Register `thilakganji.com` at Namecheap / GoDaddy / Cloudflare (≈ $12/year)
2. In your DNS settings, add an **A record**:
   - Name: `@` → Value: `<EC2-PUBLIC-IP>`
   - Name: `www` → Value: `<EC2-PUBLIC-IP>`
3. Optionally allocate an **Elastic IP** in AWS and attach it to your EC2 instance so the IP never changes.
4. For HTTPS (free SSL):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d thilakganji.com -d www.thilakganji.com
   ```

---

## CI/CD Pipeline (GitHub Actions)

The `.github/workflows/deploy.yml` pipeline:

1. **On every push / PR to `main`**: runs tests + builds frontend
2. **On merge to `main`**: SSH deploys to EC2, restarts PM2, reloads Nginx

### Required GitHub Secrets

Go to: **GitHub repo → Settings → Secrets → Actions → New repository secret**

| Secret | Value |
|--------|-------|
| `EC2_HOST` | Your EC2 public IP (e.g. `13.211.x.x`) |
| `EC2_SSH_KEY` | Contents of `Myfreelance.pem` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `VITE_API_URL` | `http://<EC2-PUBLIC-IP>/api` |

---

## Branching Strategy

```
main          ← production (protected, requires PR review)
develop       ← integration branch
feature/*     ← new features  (e.g. feature/admin-dashboard)
fix/*         ← bug fixes     (e.g. fix/auth-token-expiry)
chore/*       ← maintenance   (e.g. chore/update-deps)
```

### Workflow
1. Branch from `develop`: `git checkout -b feature/my-feature`
2. Commit your changes
3. Open a PR to `develop` → review → merge
4. Open a PR from `develop` to `main` → CI passes → deploy

---

## Health Check

```bash
curl http://<EC2-PUBLIC-IP>/api/health
# {"status":"OK","message":"ThilakGanji Portfolio API is running"}
```
