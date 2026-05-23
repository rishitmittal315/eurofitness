#!/bin/bash
# EuroFitness Installation Script for macOS/Linux

echo "🏋️  EuroFitness Installation Script"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo "✅ npm $(npm --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "⚙️  Setting up environment variables..."
cd backend

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please edit backend/.env with your credentials:"
    echo "   - JWT_SECRET: Change to a random string"
    echo "   - STRIPE_PUBLIC_KEY: Get from https://stripe.com"
    echo "   - STRIPE_SECRET_KEY: Get from https://stripe.com"
    echo "   - EMAIL_USER: Your Gmail address"
    echo "   - EMAIL_PASSWORD: Your Gmail app password"
else
    echo "✅ .env file already exists"
fi

cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your configuration"
echo "2. Run: npm start"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For detailed setup instructions, see SETUP.md"
