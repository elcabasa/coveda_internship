# Level 2 Task 2: Auth API

A Node.js/Express authentication API with JWT, bcrypt password hashing, HTTP-only cookies, and role-based route protection.

## Objectives Covered

- User signup and login with JWT
- Password hashing with bcrypt before storage
- Secure token storage via HTTP-only cookies
- Protected routes with authentication middleware
- Role-based access control (`admin` vs `user`)

## Tech Stack

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- cookie-parser
- cors

## Project Structure

```text
task_2-auth-api/
├── middleware/
│   └── auth.js          # JWT verification and role middleware
├── server.js            # Express app and routes
├── test-api.http        # Ready-to-run API tests (VS Code REST Client)
├── package.json
└── README.md
```

## Installation

```bash
cd level-2/task_2-auth-api
npm install
```

## Run the Server

```bash
npm run dev
```

Or without auto-reload:

```bash
npm start
```

The API runs at:

```text
http://localhost:3000
```

## Environment Variables (Optional)

| Variable     | Description                          | Default                        |
| ------------ | ------------------------------------ | ------------------------------ |
| `PORT`       | Server port                          | `3000`                         |
| `SECRET_KEY` | JWT signing secret                   | fallback key in `auth.js`      |
| `NODE_ENV`   | Set to `production` for secure cookies | development                  |

## API Endpoints

### Auth Routes

| Method | Endpoint            | Access        | Description                    |
| ------ | ------------------- | ------------- | ------------------------------ |
| POST   | `/api/auth/signup`  | Public        | Register a new user            |
| POST   | `/api/auth/login`   | Public        | Login and receive HTTP-only cookie |
| POST   | `/api/auth/logout`  | Public        | Clear auth cookie              |
| GET    | `/api/auth/me`      | Authenticated | Get current logged-in user     |

### Product Routes

| Method | Endpoint              | Access        | Description              |
| ------ | --------------------- | ------------- | ------------------------ |
| GET    | `/api/products`       | Public        | List all products        |
| GET    | `/api/products/:id`   | Authenticated | Get one product by ID    |
| POST   | `/api/products`       | Admin only    | Create a new product     |

## Request Examples

### Signup (admin)

```http
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

### Signup (regular user)

```json
{
  "email": "user@test.com",
  "password": "user123"
}
```

### Login

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123"
}
```

On success, the server sets an HTTP-only `token` cookie (expires in 1 hour).

### Create Product (admin only)

```http
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Monitor",
  "price": 400
}
```

### Bearer Token Alternative

If your client does not use cookies, send the JWT in the header:

```text
Authorization: Bearer <your-jwt-token>
```

## Testing

### Option 1: VS Code REST Client

Open `test-api.http` and click **Send Request** above each block. Run signup and login first so cookies are set for protected routes.

### Option 2: Postman / Thunder Client

1. Sign up an admin and a regular user
2. Login as admin — cookies are saved automatically
3. Test `GET /api/auth/me`
4. Test `GET /api/products/1`
5. Test `POST /api/products` as admin (should succeed)
6. Login as regular user and try `POST /api/products` (should return `403`)

### Option 3: Browser

Open the public route:

```text
http://localhost:3000/api/products
```

### Option 4: PowerShell

```powershell
# Signup
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/signup" -Method POST -ContentType "application/json" -Body '{"email":"admin@test.com","password":"admin123","role":"admin"}'

# Login (keeps cookie in session)
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@test.com","password":"admin123"}' -WebSession $session

# Protected route
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -WebSession $session
```

## Test Checklist

| Test                              | Expected Status |
| --------------------------------- | --------------- |
| Signup with valid data            | `201`           |
| Signup duplicate email            | `400`           |
| Login wrong password              | `401`           |
| Login success                     | `200` + cookie  |
| `GET /api/products` (no auth)     | `200`           |
| `GET /api/products/1` (no auth)   | `401`           |
| `GET /api/products/1` (logged in) | `200`           |
| `POST /api/products` as user      | `403`           |
| `POST /api/products` as admin     | `201`           |
| Logout then `GET /api/auth/me`    | `401`           |

## Security Notes

- Passwords are hashed with bcrypt (10 salt rounds) — never stored in plain text
- JWT tokens are stored in HTTP-only cookies (not accessible to JavaScript)
- Cookies use `sameSite: strict` and `secure` in production
- User data is stored in memory and resets when the server restarts

## Common Issues

**Server exits immediately after starting**

Another process may already be using port 3000. Stop other Node processes or change the `PORT` environment variable.

**`401` on protected routes after login**

Make sure your client sends cookies. In Postman, cookies are handled automatically. For fetch from a frontend, use `credentials: 'include'`.

**Users disappear after restart**

Users are stored in an in-memory array. Re-register after each server restart.

## Task Completion Status

- Express server configured
- Signup with bcrypt password hashing
- Login with JWT
- HTTP-only cookie token storage
- Auth middleware on protected routes
- Admin-only product creation
- API tested with Postman / REST Client
