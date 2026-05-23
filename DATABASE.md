# EuroFitness - Database Schema Documentation

## Overview

EuroFitness uses SQLite as its database. All tables are automatically created on first run.

## Tables

### 1. Users Table

Stores user account information and membership details.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  gender TEXT,
  membership_plan TEXT,
  membership_start_date TEXT,
  membership_end_date TEXT,
  profile_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `id`: Unique user identifier
- `name`: Full name of user
- `email`: Email address (unique)
- `password`: Hashed password
- `phone`: Contact phone number
- `age`: User age
- `gender`: User gender (male, female, other)
- `membership_plan`: Current membership plan name
- `membership_start_date`: When membership started
- `membership_end_date`: When membership expires
- `profile_image`: URL to profile image
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### 2. Trainers Table

Stores trainer profiles and information.

```sql
CREATE TABLE trainers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  specialization TEXT,
  experience INTEGER,
  bio TEXT,
  profile_image TEXT,
  hourly_rate REAL,
  is_available BOOLEAN DEFAULT 1,
  rating REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `id`: Unique trainer identifier
- `name`: Trainer's full name
- `email`: Email address (unique)
- `password`: Hashed password
- `phone`: Contact number
- `specialization`: Area of expertise (e.g., "Cardio", "Strength")
- `experience`: Years of experience
- `bio`: Professional biography
- `profile_image`: URL to profile photo
- `hourly_rate`: Cost per hour (USD)
- `is_available`: Availability status (1=available, 0=unavailable)
- `rating`: Average rating (0-5)
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### 3. Membership Plans Table

Stores available membership plan templates.

```sql
CREATE TABLE membership_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  duration_months INTEGER NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  features TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `id`: Unique plan identifier
- `name`: Plan name (e.g., "Basic", "Premium")
- `duration_months`: Subscription length in months
- `price`: Monthly price (USD)
- `description`: Plan description
- `features`: JSON array of features
- `created_at`: Plan creation timestamp

**Example Features JSON:**
```json
["Full gym access", "Equipment usage", "Member support", "Progress tracking"]
```

### 4. Diet Plans Table

Stores available diet plan templates.

```sql
CREATE TABLE diet_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  calories INTEGER,
  protein REAL,
  carbs REAL,
  fats REAL,
  duration_days INTEGER,
  price REAL,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `id`: Unique plan identifier
- `name`: Diet plan name (e.g., "High Protein", "Lean Mass")
- `description`: Plan description
- `calories`: Daily calorie target
- `protein`: Daily protein in grams
- `carbs`: Daily carbs in grams
- `fats`: Daily fats in grams
- `duration_days`: Plan duration in days
- `price`: Plan price (USD)
- `image_url`: URL to plan image
- `created_at`: Plan creation timestamp

### 5. Payments Table

Records all payment transactions.

```sql
CREATE TABLE payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  amount REAL NOT NULL,
  payment_method TEXT,
  payment_type TEXT,
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

**Fields:**
- `id`: Unique transaction identifier
- `user_id`: User making payment (foreign key)
- `amount`: Transaction amount (USD)
- `payment_method`: Method used (e.g., "card", "bank")
- `payment_type`: Type of payment ("membership", "diet_plan", "trainer_session")
- `stripe_payment_id`: Stripe transaction ID
- `status`: Payment status ("pending", "completed", "failed")
- `description`: Transaction description
- `created_at`: Transaction timestamp

### 6. Contact Messages Table

Stores contact form submissions.

```sql
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'unread',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `id`: Unique message identifier
- `name`: Sender's name
- `email`: Sender's email
- `subject`: Message subject
- `message`: Message content
- `phone`: Sender's phone (optional)
- `status`: Message status ("unread", "read", "replied")
- `created_at`: Submission timestamp

### 7. Trainer Sessions Table

Records personal training sessions.

```sql
CREATE TABLE trainer_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  trainer_id INTEGER,
  session_date TEXT,
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT 0,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (trainer_id) REFERENCES trainers(id)
)
```

**Fields:**
- `id`: Unique session identifier
- `user_id`: User attending session (foreign key)
- `trainer_id`: Trainer conducting session (foreign key)
- `session_date`: Date/time of session
- `duration_minutes`: Session length in minutes
- `completed`: Whether session was completed (1=yes, 0=no)
- `notes`: Session notes/feedback
- `created_at`: Record creation timestamp

## Data Types

- **INTEGER**: Whole numbers (IDs, ages, durations)
- **TEXT**: Text strings (names, emails, descriptions)
- **REAL**: Decimal numbers (prices, ratings, macros)
- **BOOLEAN**: True/False values (0 or 1)
- **DATETIME**: Date and time

## Constraints

- **PRIMARY KEY**: Ensures unique row identification
- **UNIQUE**: Ensures no duplicate emails
- **NOT NULL**: Ensures field is always populated
- **DEFAULT**: Provides default values
- **FOREIGN KEY**: Links tables together

## Indexes (for performance)

Consider adding indexes for frequent queries:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trainers_email ON trainers(email);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_contact_created ON contact_messages(created_at);
```

## Relationships

- **Users → Payments**: One user can have many payments
- **Users → Trainer Sessions**: One user can have many sessions
- **Trainers → Trainer Sessions**: One trainer can have many sessions
- **Membership Plans**: Standalone (referenced by users.membership_plan)
- **Diet Plans**: Standalone (referenced indirectly through payments)

## Sample Data

### Insert Sample Membership Plans
```sql
INSERT INTO membership_plans (name, duration_months, price, description, features) VALUES
('Basic', 1, 29.99, 'Perfect for beginners', '["Full gym access", "Basic support"]'),
('Premium', 3, 79.99, 'Most popular', '["Full gym access", "Trainer consultation", "Diet planning"]'),
('Elite', 12, 299.99, 'Complete package', '["Full gym access", "Personal trainer", "Diet planning", "24/7 support"]');
```

### Insert Sample Diet Plans
```sql
INSERT INTO diet_plans (name, description, calories, protein, carbs, fats, duration_days, price) VALUES
('Muscle Building', 'High protein diet for muscle gain', 2500, 200, 250, 83, 30, 49.99),
('Fat Loss', 'Low calorie diet for weight loss', 1800, 150, 150, 50, 30, 39.99),
('Balanced', 'Balanced macros for health', 2000, 140, 200, 67, 30, 34.99);
```

## Backup & Recovery

### Backup Database
```bash
cp eurofitness.db eurofitness.db.$(date +%Y%m%d).backup
```

### Restore Database
```bash
cp eurofitness.db.YYYYMMDD.backup eurofitness.db
```

## Query Examples

### Get User with Active Membership
```sql
SELECT * FROM users 
WHERE membership_end_date > datetime('now')
AND membership_plan IS NOT NULL;
```

### Get Total Revenue
```sql
SELECT SUM(amount) as total_revenue 
FROM payments 
WHERE status = 'completed';
```

### Get Trainer with Most Sessions
```sql
SELECT t.*, COUNT(s.id) as session_count 
FROM trainers t
LEFT JOIN trainer_sessions s ON t.id = s.trainer_id
GROUP BY t.id
ORDER BY session_count DESC
LIMIT 1;
```

### Get Recent Contact Messages
```sql
SELECT * FROM contact_messages
ORDER BY created_at DESC
LIMIT 10;
```

## Maintenance Tasks

### Regular Backups
Set up automatic backups (daily or weekly)

### Optimize Database
```sql
VACUUM;  -- Reclaim unused space
ANALYZE; -- Update statistics
```

### Monitor Database Size
```bash
ls -lh eurofitness.db
```

## Security Notes

- Passwords are hashed using bcryptjs
- Never store plain text passwords
- Regularly backup database
- Restrict database file permissions (chmod 664)
- Use parameterized queries to prevent SQL injection

For more information, visit: https://www.sqlite.org/docs.html
