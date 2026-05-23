# 📦 EuroFitness - Complete Documentation Package

## 🎯 Welcome to EuroFitness!

This is your complete, production-ready **3D Gym Website** with all features fully implemented.

---

## 📚 Documentation Files Included

### 1. **README.md** - Main Documentation
Complete overview of the project including:
- All features and tech stack
- Installation instructions
- Configuration guide
- API endpoints reference
- Database schema
- Deployment options

### 2. **QUICKSTART.md** - Quick Reference Guide
Get started in 30 seconds:
- Fast installation commands
- Essential configuration
- Test data and credentials
- Common commands
- Troubleshooting

### 3. **SETUP.md** - Detailed Setup Instructions
Step-by-step guide including:
- Detailed installation steps
- Environment configuration
- Getting Stripe keys
- Gmail setup
- Testing procedures
- Common issues and solutions

### 4. **DATABASE.md** - Database Reference
Complete database documentation:
- Schema definitions
- Table structures
- Relationships
- Sample queries
- Database management

### 5. **DEPLOYMENT.md** - Production Deployment
Deploy to production:
- Heroku deployment
- AWS setup
- DigitalOcean guide
- Netlify/Vercel frontend
- Environment variables
- Security checklist

### 6. **PROJECT_SUMMARY.md** - Implementation Summary
Complete summary of what's been built

### 7. **INSTALLATION_GUIDE.md** - Installation Guide
This file - complete documentation of all files

---

## 🚀 Quick Start (Choose Your OS)

### For macOS/Linux:
```bash
bash install.sh
npm start
```

### For Windows:
```cmd
install.bat
npm start
```

Application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📦 What's Included in This Package

```
eurofitness/
│
├── 📄 Documentation Files
│   ├── README.md                    (Complete guide)
│   ├── QUICKSTART.md                (Quick reference)
│   ├── SETUP.md                     (Detailed setup)
│   ├── DEPLOYMENT.md                (Production guide)
│   ├── DATABASE.md                  (Database schema)
│   ├── PROJECT_SUMMARY.md           (Summary)
│   └── COMPLETE_DOCUMENTATION.md    (This file)
│
├── 🔧 Installation Scripts
│   ├── install.sh                   (macOS/Linux installer)
│   └── install.bat                  (Windows installer)
│
├── 📁 Frontend (React)
│   ├── src/
│   │   ├── pages/                   (12 page components)
│   │   ├── components/              (Navbar, Footer)
│   │   ├── App.js                   (Main component)
│   │   └── index.js                 (Entry point)
│   ├── public/
│   │   └── index.html               (HTML template)
│   └── package.json                 (Dependencies)
│
├── 🖥️ Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js              (SQLite setup)
│   ├── routes/
│   │   ├── auth.js                  (Authentication)
│   │   ├── users.js                 (User management)
│   │   ├── trainers.js              (Trainer profiles)
│   │   ├── memberships.js           (Membership plans)
│   │   ├── dietPlans.js             (Diet plans)
│   │   ├── payments.js              (Payment processing)
│   │   ├── admin.js                 (Admin dashboard)
│   │   └── contact.js               (Contact form)
│   ├── middleware/
│   │   └── auth.js                  (JWT authentication)
│   ├── php/                         (Alternative PHP backend)
│   ├── server.js                    (Express server)
│   ├── .env.example                 (Configuration template)
│   └── package.json                 (Dependencies)
│
├── 💾 Database
│   └── eurofitness.db               (SQLite - auto-created)
│
├── 🔑 Configuration Files
│   ├── package.json                 (Root dependencies)
│   └── .gitignore                   (Git ignore rules)
│
└── 📚 This Documentation Package
    └── All guides and references
```

---

## 🎯 Features Overview

### ✨ User Features
- ✅ User registration and login
- ✅ Profile management
- ✅ Browse and hire trainers
- ✅ Subscribe to membership plans
- ✅ Purchase diet plans
- ✅ Secure payment with Stripe
- ✅ View payment history
- ✅ Contact support
- ✅ 3D gym visualization

### 👨‍🏫 Trainer Features
- ✅ Create professional profile
- ✅ Manage availability
- ✅ Track client sessions
- ✅ Set hourly rates
- ✅ Receive ratings and reviews

### 👨‍💼 Admin Features
- ✅ User and trainer statistics
- ✅ Revenue tracking
- ✅ Manage contact messages
- ✅ Create membership plans
- ✅ Create diet plans
- ✅ System analytics

---

## 💻 Technology Stack

### Frontend
- React 18
- React Router DOM
- Three.js & React Three Fiber (3D)
- Styled Components
- Axios
- Chart.js
- React Icons
- Stripe React

### Backend
- Node.js
- Express.js
- SQLite3
- JWT
- bcryptjs
- Stripe API
- Nodemailer
- CORS

### DevOps
- npm
- Concurrently

---

## 🔑 Essential Configuration

### 1. Stripe Keys (Free)
- Go to https://stripe.com
- Sign up or login
- Get test keys from Dashboard
- Add to `backend/.env`:
```
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

### 2. Gmail App Password (Free)
- Go to https://myaccount.google.com/security
- Enable 2-Factor Authentication
- Generate App Password
- Add to `backend/.env`:
```
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=generated_password
```

### 3. JWT Secret
- Generate a random 32+ character string
- Add to `backend/.env`:
```
JWT_SECRET=your_random_secret_key_here
```

---

## 📋 Environment Variables (.env)

Create `backend/.env` with:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@eurofitness.com
```

---

## 🌐 URLs & Ports

| Resource | URL |
|----------|-----|
| Home | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Register | http://localhost:3000/register |
| Trainers | http://localhost:3000/trainers |
| Memberships | http://localhost:3000/memberships |
| Diet Plans | http://localhost:3000/diet-plans |
| About | http://localhost:3000/about |
| Contact | http://localhost:3000/contact |
| Dashboard | http://localhost:3000/dashboard |
| Admin | http://localhost:3000/admin |
| Backend API | http://localhost:5000/api |

---

## 🧪 Test Data

### Test Payment Card
```
Number:  4242 4242 4242 4242
Expiry:  Any future date (e.g., 12/25)
CVC:     Any 3 digits (e.g., 123)
ZIP:     Any 5 digits
```

### Test User Account
```
Email:    test@example.com
Password: Test123!
```

---

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register           - Register new user
POST /api/auth/login              - Login user
POST /api/auth/register-trainer   - Register trainer
POST /api/auth/login-trainer      - Login trainer
```

### Users
```
GET  /api/users/profile           - Get user profile
PUT  /api/users/profile           - Update profile
GET  /api/users                   - Get all users (admin)
```

### Trainers
```
GET  /api/trainers                - Get all trainers
GET  /api/trainers/:id            - Get trainer details
PUT  /api/trainers/profile        - Update trainer profile
```

### Memberships
```
GET  /api/memberships/plans       - Get all plans
POST /api/memberships/plans       - Create plan (admin)
GET  /api/memberships/user/current - Get user's membership
POST /api/memberships/subscribe   - Subscribe to plan
```

### Diet Plans
```
GET  /api/diet-plans              - Get all diet plans
GET  /api/diet-plans/:id          - Get plan details
POST /api/diet-plans              - Create plan (admin)
```

### Payments
```
POST /api/payments/create-payment-intent - Create Stripe intent
POST /api/payments/record-payment        - Record payment
GET  /api/payments/history               - Payment history
```

### Admin
```
GET  /api/admin/dashboard         - Get statistics
GET  /api/admin/messages          - Get contact messages
PUT  /api/admin/messages/:id      - Mark as read
DELETE /api/admin/messages/:id    - Delete message
```

### Contact
```
POST /api/contact/send            - Send contact message
```

---

## 🛠️ Common Commands

### Installation
```bash
npm install                    # Install all dependencies
npm run install-all           # Alternative
```

### Running Application
```bash
npm start                     # Start both frontend and backend
npm run dev                   # Same as npm start
npm run client               # Start frontend only
npm run server               # Start backend only
```

### Building for Production
```bash
npm run build                # Build frontend for production
```

### Database Commands
```bash
sqlite3 eurofitness.db       # Open database
.tables                       # List all tables
.schema users                 # Show users table schema
.quit                         # Exit sqlite3
```

---

## 📁 Directory Structure Explained

### `/backend`
Node.js Express server with:
- **config/** - Database configuration
- **routes/** - API endpoints
- **middleware/** - Authentication and other middleware
- **php/** - Optional PHP backend
- **server.js** - Main server file

### `/frontend`
React application with:
- **public/** - Static assets and index.html
- **src/pages/** - Page components (Login, Register, Trainers, etc.)
- **src/components/** - Reusable components (Navbar, Footer)
- **src/App.js** - Main app component
- **src/index.js** - React entry point

### `/Documentation`
All documentation files (README, guides, references)

### Installation Scripts
- **install.sh** - For macOS/Linux
- **install.bat** - For Windows

---

## 🚀 Step-by-Step Getting Started

### Step 1: Extract ZIP File
```bash
unzip eurofitness.zip
cd eurofitness
```

### Step 2: Install Dependencies
Choose one based on your OS:

**macOS/Linux:**
```bash
bash install.sh
```

**Windows:**
```cmd
install.bat
```

Or manually:
```bash
npm install
cd frontend && npm install && cd ..
```

### Step 3: Configure Environment
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:
- Stripe keys
- Gmail credentials
- JWT secret

### Step 4: Start the Application
```bash
npm start
```

Wait for both servers to start:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Step 5: Test the Application
1. Open http://localhost:3000
2. Register a new account
3. Browse trainers
4. Try purchasing a membership
5. Use test card: 4242 4242 4242 4242

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: "Port 3000 already in use"
**Solution**: Use different port
```bash
PORT=3001 npm start
```

### Issue: "CORS Error"
**Solution**: Ensure backend is running on port 5000

### Issue: "EACCES: permission denied"
**Solution**: Use sudo or fix permissions
```bash
sudo chown -R $USER /usr/local/lib/node_modules
```

### Issue: "Database locked"
**Solution**: Delete database and restart
```bash
rm eurofitness.db
npm start
```

### Issue: "Cannot find module"
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Getting Help

### Check Documentation
1. README.md - Complete guide
2. SETUP.md - Step-by-step setup
3. QUICKSTART.md - Quick reference
4. DATABASE.md - Database information

### Check Console
- Browser console: Press F12
- Terminal: Check for error messages

### Common Issues
- Port already in use → Change port
- CORS errors → Check backend running
- Database errors → Delete eurofitness.db

---

## 🔐 Security Best Practices

### Before Deploying to Production

1. **Change JWT Secret**
   - Generate new random string
   - Update in .env

2. **Update Stripe Keys**
   - Use production keys (pk_live_ and sk_live_)
   - Update in .env

3. **Update Email Credentials**
   - Use production email account
   - Generate new app password

4. **Enable HTTPS**
   - Use SSL certificate
   - Redirect HTTP to HTTPS

5. **Set NODE_ENV**
   ```
   NODE_ENV=production
   ```

6. **Secure Admin Panel**
   - Change default admin credentials
   - Use strong passwords

---

## 📚 Learning Resources

### Official Documentation
- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Express.js Guide](https://expressjs.com)
- [Stripe Integration](https://stripe.com/docs)
- [SQLite Reference](https://www.sqlite.org/docs.html)
- [Node.js Guide](https://nodejs.org/en/docs)

### Tutorials
- React: https://react.dev/learn
- Three.js: https://threejs.org/manual
- Express: https://expressjs.com/en/starter/hello-world.html
- Stripe: https://stripe.com/docs/payments

---

## 🎉 Summary

You now have a complete, fully-functional 3D gym website with:

✅ **Frontend**
- Modern React UI
- 3D visualization
- User authentication
- Payment checkout
- Admin dashboard

✅ **Backend**
- RESTful API
- SQLite database
- JWT authentication
- Stripe integration
- Email notifications

✅ **Database**
- 7 tables
- User management
- Trainer management
- Membership system
- Payment tracking

✅ **Documentation**
- Complete README
- Setup guide
- Quick reference
- Deployment guide
- Database reference

---

## 🚀 Next Steps

1. **Extract the ZIP file**
2. **Run install.sh or install.bat**
3. **Configure .env file**
4. **Run npm start**
5. **Test the application**
6. **Customize for your needs**
7. **Deploy to production**

---

## 📞 Support Contact

**EuroFitness**
- Email: info@eurofitness.com
- Phone: +1 (555) 123-4567
- Website: https://eurofitness.com

---

## 📄 License

MIT License - Free for personal and commercial use

---

## ✨ Thank You!

Thank you for using EuroFitness! We hope you enjoy building amazing gym experiences.

**Happy coding!** 🚀

---

*Last Updated: 2026-05-23*
*EuroFitness v1.0.0*
