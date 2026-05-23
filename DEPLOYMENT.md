# EuroFitness Installation & Deployment Guide

## Installation on Different Operating Systems

### Windows

#### Prerequisites
1. Download and install Node.js from https://nodejs.org/ (LTS version)
2. Download and install Git from https://git-scm.com/
3. Download and install a text editor (VSCode recommended)

#### Installation Steps
1. Open Command Prompt
2. Navigate to desired directory:
   ```cmd
   cd Desktop
   ```
3. Clone repository:
   ```cmd
   git clone https://github.com/rishitmittal315/eurofitness.git
   cd eurofitness
   ```
4. Install dependencies:
   ```cmd
   npm install
   cd frontend
   npm install
   cd ..
   ```
5. Configure environment:
   ```cmd
   cd backend
   copy .env.example .env
   ```
6. Edit `.env` with your text editor
7. Start application:
   ```cmd
   npm start
   ```

### macOS

#### Prerequisites
1. Install Homebrew:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install Node.js:
   ```bash
   brew install node
   ```
3. Install Git:
   ```bash
   brew install git
   ```

#### Installation Steps
```bash
# Clone repository
git clone https://github.com/rishitmittal315/eurofitness.git
cd eurofitness

# Install dependencies
npm install
cd frontend
npm install
cd ..

# Configure environment
cd backend
cp .env.example .env
# Edit .env with your text editor
cd ..

# Start application
npm start
```

### Linux (Ubuntu/Debian)

#### Prerequisites
```bash
# Update system
sudo apt update
sudo apt upgrade

# Install Node.js and npm
sudo apt install nodejs npm

# Install Git
sudo apt install git
```

#### Installation Steps
```bash
# Clone repository
git clone https://github.com/rishitmittal315/eurofitness.git
cd eurofitness

# Install dependencies
npm install
cd frontend
npm install
cd ..

# Configure environment
cd backend
cp .env.example .env
nano .env  # Edit with nano editor
cd ..

# Start application
npm start
```

## Deployment to Production

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Windows/macOS/Linux - download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Add Buildpacks**
   ```bash
   heroku buildpacks:add heroku/nodejs
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set STRIPE_PUBLIC_KEY=your_key
   heroku config:set STRIPE_SECRET_KEY=your_key
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASSWORD=your_password
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to AWS

1. **Create EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - t2.micro (free tier eligible)
   - Create security group allowing ports 80, 443, 3000, 5000

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm git
   ```

4. **Clone and Setup**
   ```bash
   git clone https://github.com/rishitmittal315/eurofitness.git
   cd eurofitness
   npm install
   cd frontend && npm install && cd ..
   ```

5. **Configure Environment**
   ```bash
   cd backend
   nano .env  # Add your configuration
   cd ..
   ```

6. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

7. **Start Application**
   ```bash
   pm2 start backend/server.js
   pm2 start "npm start --prefix frontend"
   pm2 save
   pm2 startup
   ```

### Deploy to DigitalOcean

1. **Create Droplet**
   - Choose Ubuntu 20.04
   - Basic plan ($5/month)

2. **Connect via SSH**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Dependencies**
   ```bash
   apt update
   apt install nodejs npm git curl
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/rishitmittal315/eurofitness.git
   cd eurofitness
   npm install && cd frontend && npm install && cd ..
   ```

5. **Configure .env**
   ```bash
   cd backend && cp .env.example .env
   nano .env  # Add configuration
   cd ..
   ```

6. **Setup Nginx as Reverse Proxy**
   ```bash
   apt install nginx
   ```
   
   Create `/etc/nginx/sites-available/eurofitness`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           proxy_pass http://localhost:3000;
       }
   }
   ```

   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/eurofitness /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

7. **Install PM2**
   ```bash
   npm install -g pm2
   pm2 start backend/server.js
   pm2 start "npm start --prefix frontend"
   pm2 startup
   pm2 save
   ```

## Docker Deployment

### Create Dockerfile

Create `Dockerfile` in root directory:
```dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY backend/.env.example backend/.env

RUN cd frontend && npm install

EXPOSE 3000 5000

CMD ["npm", "start"]
```

### Build and Run Docker

```bash
# Build image
docker build -t eurofitness .

# Run container
docker run -p 3000:3000 -p 5000:5000 eurofitness
```

## Performance Optimization

### Frontend Optimization
```bash
cd frontend
npm run build
# Creates optimized build in frontend/build
```

### Backend Optimization
1. Enable gzip compression
2. Use production environment
3. Configure database connection pooling
4. Implement caching
5. Use CDN for static assets

## Database Backup

```bash
# Backup SQLite database
cp eurofitness.db eurofitness.db.backup

# Restore from backup
cp eurofitness.db.backup eurofitness.db
```

## Monitoring and Maintenance

### Check Application Status
```bash
pm2 status
```

### View Logs
```bash
pm2 logs
```

### Restart Application
```bash
pm2 restart all
```

## SSL/HTTPS Configuration

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d your-domain.com

# Update Nginx config
sudo nano /etc/nginx/sites-available/eurofitness
```

Add to Nginx config:
```nginx
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

## Troubleshooting Production Issues

### Application Won't Start
```bash
pm2 logs  # Check error messages
node backend/server.js  # Run directly to see errors
```

### Database Errors
```bash
# Check database permissions
ls -la eurofitness.db
chmod 664 eurofitness.db
```

### Memory Issues
```bash
pm2 monit  # Monitor memory usage
pm2 delete all
pm2 start backend/server.js --max-memory-restart 300M
```

## Cost Estimation

### Free Tier
- Heroku Free (limited)
- AWS Free Tier (1 year)
- GitHub Hosting (frontend only)

### Paid Options
- **DigitalOcean**: $5-20/month
- **AWS**: $5-50/month (depending on usage)
- **Heroku**: $7-50/month
- **AWS RDS**: $15-50/month (database hosting)

## Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update Stripe keys to production keys
- [ ] Configure HTTPS/SSL
- [ ] Enable firewall rules
- [ ] Setup database backups
- [ ] Configure environment variables on server
- [ ] Enable rate limiting
- [ ] Setup logging and monitoring
- [ ] Keep dependencies updated
- [ ] Regular security audits

For more help, refer to README.md or SETUP.md
