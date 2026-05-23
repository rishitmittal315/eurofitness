# EuroFitness - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

### macOS/Linux
```bash
bash install.sh
npm start
```

### Windows
```cmd
install.bat
npm start
```

## 📋 What's Included

### Frontend (React)
- 🎨 Beautiful UI with Styled Components
- 🔐 User authentication and authorization
- 💳 Payment checkout page
- 📊 User dashboard
- 👥 Trainer browsing
- 🏋️ Membership plans
- 🥗 Diet plans
- 📧 Contact form
- 📱 Responsive design
- 🎥 3D gym visualization

### Backend (Node.js + Express)
- 🔑 JWT authentication
- 💾 SQLite database
- 🔒 Password hashing
- 💳 Stripe payment integration
- 📧 Email notifications
- 👨‍💼 User management
- 👨‍🏫 Trainer management
- 📋 Membership system
- 🥘 Diet plan management
- 📊 Admin statistics

### PHP Backend (Optional)
- Alternative API endpoints
- Database integration
- Authentication helpers

## 🔧 Configuration

### Essential Setup

1. **Get Stripe Keys** (Free)
   - Visit https://stripe.com
   - Sign up (takes 2 minutes)
   - Get test keys from Dashboard
   - Add to `backend/.env`:
   ```
   STRIPE_PUBLIC_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx
   ```

2. **Get Gmail App Password** (Free)
   - Go to https://myaccount.google.com/security
   - Enable 2-Factor Authentication
   - Generate App Password for Mail
   - Add to `backend/.env`:
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=generated_password
   ```

3. **Generate JWT Secret**
   - Use any random string (recommend 32+ characters)
   - Add to `backend/.env`:
   ```
   JWT_SECRET=your_random_secret_key_here
   ```

## 🌐 URLs

| Page | URL |
|------|-----|
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

## 💾 Database

Automatic SQLite database with these tables:
- users
- trainers
- membership_plans
- diet_plans
- payments
- contact_messages
- trainer_sessions

## 🧪 Test Data

### Test Payment Card
- **Number**: 4242 4242 4242 4242
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits

### Test User Account
```
Email: test@example.com
Password: Test123!
```

## 📁 Directory Structure

```
eurofitness/
├── backend/              # Node.js server
│   ├── config/          # Database config
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication
│   ├── php/             # PHP alternative
│   ├── server.js        # Main server
│   └── .env             # Configuration
├── frontend/            # React app
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── App.js       # Main component
│   └── package.json
├── README.md            # Full documentation
├── SETUP.md             # Detailed setup
├── DEPLOYMENT.md        # Deployment guide
├── DATABASE.md          # Database schema
├── package.json         # Root dependencies
├── install.sh           # macOS/Linux installer
└── install.bat          # Windows installer
```

## 🛠️ Common Commands

### Install
```bash
npm install                 # Install all dependencies
npm run install-all        # Install all dependencies
```

### Development
```bash
npm start                  # Start both frontend and backend
npm run dev                # Same as npm start
npm run client             # Start frontend only
npm run server             # Start backend only
```

### Build
```bash
npm run build              # Build frontend for production
```

### Database
```bash
sqlite3 eurofitness.db     # Open database
.tables                     # List tables
.schema users              # Show users table schema
.quit                      # Exit sqlite3
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
PORT=5001 npm start
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database Issues
```bash
# Reset database
rm eurofitness.db
npm start  # Creates new database
```

### CORS Errors
- Ensure backend is running on port 5000
- Check frontend API URLs
- Verify CORS headers in backend

## 📚 Documentation

- **README.md** - Complete project documentation
- **SETUP.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Production deployment guide
- **DATABASE.md** - Database schema reference
- **QUICKSTART.md** - This file

## 🌟 Features Highlights

### Authentication
- ✅ User registration and login
- ✅ Trainer authentication
- ✅ JWT-based sessions
- ✅ Password hashing

### User Features
- ✅ Profile management
- ✅ Membership subscription
- ✅ Payment history
- ✅ Diet plan purchase
- ✅ Trainer browsing

### Trainer Features
- ✅ Profile creation
- ✅ Availability management
- ✅ Ratings system
- ✅ Session tracking

### Admin Features
- ✅ Dashboard statistics
- ✅ User management
- ✅ Trainer management
- ✅ Contact message handling
- ✅ Revenue tracking

### Payment
- ✅ Stripe integration
- ✅ Membership billing
- ✅ Payment history
- ✅ Secure checkout

## 🚀 Deployment

### Quick Deployment Options
1. **Heroku** (Free tier available)
2. **AWS** (Free tier available)
3. **DigitalOcean** ($5/month)
4. **Netlify** (Frontend only)
5. **Vercel** (Frontend only)

See `DEPLOYMENT.md` for detailed instructions.

## 💬 Support

- 📖 Check documentation files
- 🐛 Review troubleshooting section
- 📧 Contact: info@eurofitness.com
- 📱 Phone: +1 (555) 123-4567

## 📝 License

MIT License - Free to use for personal or commercial projects

## 🎯 Next Steps

1. ✅ Run `bash install.sh` (or `install.bat` on Windows)
2. ✅ Configure `backend/.env`
3. ✅ Run `npm start`
4. ✅ Open http://localhost:3000
5. ✅ Test registration and payment
6. ✅ Deploy to production

Happy coding! 🚀
