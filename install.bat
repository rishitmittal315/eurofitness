@echo off
REM EuroFitness Installation Script for Windows

echo.
echo 🏋️  EuroFitness Installation Script
echo ====================================="
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed.
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo ✅ npm found
echo.

echo 📦 Installing dependencies...
call npm install

echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ⚙️  Setting up environment variables...
cd backend

if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file from template
    echo.
    echo ⚠️  Please edit backend\.env with your credentials:
    echo    - JWT_SECRET: Change to a random string
    echo    - STRIPE_PUBLIC_KEY: Get from https://stripe.com
    echo    - STRIPE_SECRET_KEY: Get from https://stripe.com
    echo    - EMAIL_USER: Your Gmail address
    echo    - EMAIL_PASSWORD: Your Gmail app password
) else (
    echo ✅ .env file already exists
)

cd ..

echo.
echo ✅ Installation complete!
echo.
echo Next steps:
echo 1. Edit backend\.env with your configuration
echo 2. Run: npm start
echo 3. Open http://localhost:3000 in your browser
echo.
echo For detailed setup instructions, see SETUP.md
echo.
pause
