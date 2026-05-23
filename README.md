# EuroFitness - 3D Gym Website

A comprehensive, fully-functional 3D gym website with admin panel, payment integration, diet plans, and membership management built with React, Node.js, PHP, and SQLite.

## Features

### 🎯 Core Features
- **3D Visualization**: Interactive 3D gym equipment visualization using Three.js
- **User Management**: Complete user registration and authentication system
- **Trainer Profiles**: Browse and hire certified fitness trainers
- **Membership Plans**: Multiple flexible membership options with automatic billing
- **Diet Plans**: Personalized nutrition plans with macro tracking
- **Payment Integration**: Secure payment processing with Stripe
- **Admin Dashboard**: Comprehensive admin panel with analytics and statistics
- **Contact Management**: Contact form with email notifications
- **User Dashboard**: Personal profile, membership tracking, and payment history

### 🔐 Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- Secure payment processing
- CORS protection

### 📊 Admin Features
- User and trainer statistics
- Revenue tracking
- Contact message management
- System analytics

## Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Three.js & @react-three/fiber** - 3D visualization
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **Chart.js** - Analytics charts
- **React Icons** - Icon library

### Backend
- **Node.js & Express** - Server framework
- **PHP** - Alternative backend API
- **SQLite** - Database (no MongoDB)
- **JWT** - Authentication
- **Stripe API** - Payment processing
- **Nodemailer** - Email notifications

### DevOps
- **npm** - Package management
- **Concurrently** - Run multiple servers

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- PHP (v7.4 or higher) - Optional, for PHP backend
- Stripe API keys (from https://stripe.com)

### Step 1: Clone the Repository
```bash
git clone https://github.com/rishitmittal315/eurofitness.git
cd eurofitness
```

### Step 2: Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and update with your credentials:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@eurofitness.com
```

### Step 4: Initialize Database
The SQLite database will be automatically created on first run. Tables are initialized in `backend/config/database.js`.

### Step 5: Run the Application

**Option A: Using npm (Recommended)**
```bash
npm start
```

This will:
- Start the Node.js backend on `http://localhost:5000`
- Start the React frontend on `http://localhost:3000`
- Open the app in your browser

**Option B: Run Separately**

Terminal 1 - Backend:
```bash
cd backend
node server.js
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

## Project Structure

```
eurofitness/
├── backend/
│   ├── config/
│   │   └── database.js          # SQLite configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── users.js             # User endpoints
│   │   ├── trainers.js          # Trainer endpoints
│   │   ├── memberships.js       # Membership endpoints
│   │   ├── dietPlans.js         # Diet plan endpoints
│   │   ├── payments.js          # Payment endpoints
│   │   ├── admin.js             # Admin endpoints
│   │   └── contact.js           # Contact endpoints
│   ├── php/
│   │   ├── config.php           # PHP config
│   │   ├── api.php              # PHP API routes
│   │   └── auth.php             # PHP auth
│   ├── server.js                # Express server
│   ├── .env.example             # Environment variables template
│   └── .env                     # Environment variables (create this)
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   └── Footer.js        # Footer
│   │   ├── pages/
│   │   │   ├── Home.js          # Home page with 3D visualization
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Trainers.js      # Trainers listing
│   │   │   ├── Memberships.js   # Membership plans
│   │   │   ├── DietPlans.js     # Diet plans
│   │   │   ├── Dashboard.js     # User dashboard
│   │   │   ├── AdminPanel.js    # Admin dashboard
│   │   │   ├── About.js         # About page
│   │   │   ├── Contact.js       # Contact page
│   │   │   └── Checkout.js      # Checkout page
│   │   ├── App.js               # Main app component
│   │   ├── App.css              # App styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── .gitignore
├── package.json                 # Root dependencies
├── eurofitness.db              # SQLite database (created on first run)
├── README.md                    # This file
└── .gitignore
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/register-trainer` - Register trainer
- `POST /api/auth/login-trainer` - Login trainer

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get trainer details
- `PUT /api/trainers/profile` - Update trainer profile

### Memberships
- `GET /api/memberships/plans` - Get all membership plans
- `POST /api/memberships/plans` - Create membership plan (admin)
- `GET /api/memberships/user/current` - Get user's current membership
- `POST /api/memberships/subscribe` - Subscribe to membership

### Diet Plans
- `GET /api/diet-plans` - Get all diet plans
- `GET /api/diet-plans/:id` - Get diet plan details
- `POST /api/diet-plans` - Create diet plan (admin)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/record-payment` - Record payment
- `GET /api/payments/history` - Get payment history

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard statistics
- `GET /api/admin/messages` - Get contact messages
- `PUT /api/admin/messages/:id` - Mark message as read
- `DELETE /api/admin/messages/:id` - Delete message

### Contact
- `POST /api/contact/send` - Send contact message

## Database Schema

### Tables

**users**
- id, name, email, password, phone, age, gender
- membership_plan, membership_start_date, membership_end_date
- profile_image, created_at, updated_at

**trainers**
- id, name, email, password, phone, specialization, experience, bio
- profile_image, hourly_rate, is_available, rating
- created_at, updated_at

**membership_plans**
- id, name, duration_months, price, description, features
- created_at

**diet_plans**
- id, name, description, calories, protein, carbs, fats
- duration_days, price, image_url, created_at

**payments**
- id, user_id, amount, payment_method, payment_type
- stripe_payment_id, status, description, created_at

**contact_messages**
- id, name, email, subject, message, phone, status, created_at

**trainer_sessions**
- id, user_id, trainer_id, session_date, duration_minutes
- completed, notes, created_at

## Usage Guide

### For Users
1. **Register**: Create an account on the Register page
2. **Browse Trainers**: View all available trainers on the Trainers page
3. **Choose Membership**: Select a membership plan from the Memberships page
4. **Purchase Diet Plan**: Browse and purchase customized diet plans
5. **Checkout**: Complete payment on the Checkout page
6. **Dashboard**: Track your memberships and payments in your Dashboard

### For Admins
1. **Login**: Login with admin credentials
2. **Dashboard**: View statistics and recent contact messages
3. **Manage Users**: View and manage all registered users
4. **Manage Trainers**: View and manage trainer profiles
5. **Contact Messages**: Review and respond to customer inquiries

## Payment Integration

### Stripe Setup
1. Sign up at https://stripe.com
2. Get your API keys from the Dashboard
3. Add keys to `.env` file:
   ```
   STRIPE_PUBLIC_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx
   ```

### Testing Payments
Use Stripe test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## Email Configuration

For contact form email notifications:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

## 3D Visualization

The home page features an interactive 3D gym visualization using Three.js:
- Rotating dumbbells and equipment
- OrbitControls for user interaction
- Real-time rendering
- Responsive to different screen sizes

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/build`.

### Backend Production

1. Set environment to production:
   ```
   NODE_ENV=production
   ```

2. Use a production server:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js
   ```

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env or use different port
PORT=5001 npm start
```

### Database Errors
```bash
# Delete the database file and restart (creates new one)
rm eurofitness.db
npm start
```

### Payment Errors
- Verify Stripe keys are correct
- Check network connectivity
- Review Stripe dashboard for errors

### CORS Issues
- Ensure frontend URL is allowed in CORS config
- Check backend `.env` settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact: info@eurofitness.com
- Phone: +1 (555) 123-4567

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Video training tutorials
- [ ] Social features (friend requests, leaderboards)
- [ ] AI-powered workout recommendations
- [ ] Wearable device integration
- [ ] Live trainer sessions
- [ ] Multi-language support

## Credits

Built with ❤️ by the EuroFitness team.

---

**Made with React, Node.js, Three.js, and SQLite**
