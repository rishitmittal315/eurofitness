# Getting Started with EuroFitness

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
cd frontend && npm install && cd ..
```

### 2. Configure Environment
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
cd ..
```

### 3. Run Application
```bash
npm start
```

The app will open at `http://localhost:3000`

## Detailed Setup Guide

### Prerequisites
- Node.js 14+
- npm 6+
- A text editor (VSCode recommended)
- Stripe account (free at stripe.com)
- Gmail account (for email notifications)

### Step-by-Step Instructions

#### 1. Clone Repository
```bash
git clone https://github.com/rishitmittal315/eurofitness.git
cd eurofitness
```

#### 2. Install Root Dependencies
```bash
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### 4. Setup Environment Variables

Create `backend/.env` file:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_key_12345_change_this

# Stripe Keys (get from https://dashboard.stripe.com)
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_password_from_gmail

# Admin Email
ADMIN_EMAIL=admin@eurofitness.com
```

#### 5. Start the Application

From the root directory:
```bash
npm start
```

This will:
- Start backend on `http://localhost:5000`
- Start frontend on `http://localhost:3000`
- Automatically open in your browser

#### 6. Create Admin Account (Optional)

Access the database:
```bash
sqlite3 eurofitness.db
```

Insert admin user:
```sql
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@eurofitness.com', 'hashed_password', 'admin');
```

## Getting Stripe Keys

1. Go to https://dashboard.stripe.com
2. Sign up for free
3. Navigate to API keys
4. Copy your test keys (start with `pk_test_` and `sk_test_`)
5. Add to `.env` file

## Getting Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to App passwords
4. Select Mail and Windows Computer
5. Copy the generated password
6. Add to `.env` as `EMAIL_PASSWORD`

## Testing the Application

### Test User Registration
1. Go to http://localhost:3000/register
2. Fill in details
3. Click Register
4. Should see success message

### Test Login
1. Go to http://localhost:3000/login
2. Enter registered email and password
3. Should redirect to dashboard

### Test Membership Purchase
1. Login as user
2. Go to /memberships
3. Click Subscribe
4. Complete checkout with test card: `4242 4242 4242 4242`

### Test Trainer Listing
1. Go to /trainers
2. Should see list of trainers
3. Can view trainer details

### Test Admin Panel
1. Login with admin account
2. Go to /admin
3. View dashboard statistics

## Running Backend Only

```bash
cd backend
node server.js
```

Backend runs on http://localhost:5000

## Running Frontend Only

```bash
cd frontend
npm start
```

Frontend runs on http://localhost:3000

## Stopping the Application

Press `Ctrl+C` in the terminal

## Common Issues & Solutions

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 or 5000 already in use
```bash
# Change port in package.json or use different port
PORT=3001 npm start
```

### Database locked error
```bash
# Delete database and restart
rm eurofitness.db
npm start
```

### CORS errors
Ensure backend is running on port 5000
Check that frontend is accessing correct API URL

## Next Steps

1. **Explore the Code**: Check out `frontend/src/pages` for all pages
2. **Customize**: Edit colors, text, and content
3. **Add Features**: Implement additional functionality
4. **Deploy**: Deploy to production servers

## Resources

- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Express.js Guide](https://expressjs.com)
- [Stripe Integration](https://stripe.com/docs)
- [SQLite Reference](https://www.sqlite.org/docs.html)

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the console for error messages
3. Check backend logs
4. Verify all environment variables are set

Good luck! 🚀
