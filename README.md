# Product Inventory Dashboard

A full-stack product inventory project built during the Coveda internship. The repository includes a Node/Express Products API, JWT authentication with role-based access, a Level 1 vanilla JavaScript frontend, and a Level 2 React + Tailwind CSS frontend.

## Projects Included

### Level 1 Task 2: Product API

An Express.js backend that provides CRUD endpoints for products.

- Create products
- Read all products
- Update products by ID
- Delete products by ID
- CORS enabled for frontend access

Location:

```text
level-1/task_2_product-api
```

### Level 1 Task 3: Vanilla JavaScript Frontend

A plain HTML, CSS, and JavaScript product inventory dashboard with a glass-style UI.

- Add, edit, search, and delete products
- Live inventory statistics
- Modal dialogs
- API integration

Location:

```text
level-1/task_3_frontend
```

### Level 2 Task 1: React Frontend

A modern React version of the product inventory frontend using Tailwind CSS and component-based development.

- Built with React and Vite
- Uses functional components
- Uses reducer-based state management
- Implements API calls with loading, success, validation, and error states
- Includes reusable UI components
- Includes a full-app light/dark theme toggle
- Saves the selected theme in browser `localStorage`

Location:

```text
level-2/task_1_react_frontend
```

### Level 2 Task 2: Auth API

An Express.js authentication API with JWT, bcrypt, HTTP-only cookies, and role-based route protection.

- User signup and login
- bcrypt password hashing
- JWT stored in HTTP-only cookies
- Protected routes with auth middleware
- Admin-only product creation
- Includes `test-api.http` for easy endpoint testing

Location:

```text
level-2/task_2-auth-api
```

## Tech Stack

**Backend**

- Node.js
- Express.js
- CORS
- bcryptjs
- jsonwebtoken
- cookie-parser

**Level 1 Frontend**

- HTML5
- CSS3
- Vanilla JavaScript

**Level 2 Frontend**

- React
- Vite
- Tailwind CSS
- lucide-react icons

## Project Structure

```text
coveda_internship/
├── README.md
├── level-1/
│   ├── task_2_product-api/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   └── README.md
│   │
│   └── task_3_frontend/
│       ├── index.html
│       ├── app.js
│       ├── api.js
│       ├── ui.js
│       ├── modal.js
│       └── styles.css
│
├── level-2/
│   ├── task_1_react_frontend/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tailwind.config.js
│   │   ├── vite.config.js
│   │   ├── README.md
│   │   └── src/
│   │       ├── App.jsx
│   │       ├── index.css
│   │       ├── main.jsx
│   │       ├── components/
│   │       └── services/
│   │
│   └── task_2-auth-api/
│       ├── middleware/
│       │   └── auth.js
│       ├── server.js
│       ├── test-api.http
│       ├── package.json
│       └── README.md
│
└── level-3/
```

## Getting Started

### Prerequisites

- Node.js
- npm

On Windows PowerShell, if `npm` is blocked by script policy, use:

```bash
npm.cmd
```

## Running the Level 1 Product API

```bash
cd level-1/task_2_product-api
npm install
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

## Running the Level 2 Auth API

```bash
cd level-2/task_2-auth-api
npm install
npm run dev
```

The auth API runs on:

```text
http://localhost:3000
```

See `level-2/task_2-auth-api/README.md` for signup, login, and testing instructions. Use `test-api.http` in VS Code to run all endpoint tests.

## Running the Level 1 Frontend

Open this file in a browser:

```text
level-1/task_3_frontend/index.html
```

The API URL can be changed in:

```text
level-1/task_3_frontend/api.js
```

## Running the Level 2 React Frontend

```bash
cd level-2/task_1_react_frontend
npm install
npm run dev
```

The React frontend runs on:

```text
http://127.0.0.1:5173/
```

By default, the React frontend connects to:

```text
https://coveda-internship.onrender.com/api/products
```

To use the local backend instead, create a `.env` file in `level-2/task_1_react_frontend`:

```text
VITE_PRODUCTS_API_URL=http://localhost:3000/api/products
```

## Building the React Frontend

```bash
cd level-2/task_1_react_frontend
npm run build
```

## API Endpoints

### Level 1 Product API

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/products`       | Get all products     |
| POST   | `/api/products`       | Create a new product |
| PUT    | `/api/products/:id`   | Update a product     |
| DELETE | `/api/products/:id`   | Delete a product     |

### Level 2 Auth API

| Method | Endpoint              | Access        | Description              |
| ------ | --------------------- | ------------- | ------------------------ |
| POST   | `/api/auth/signup`    | Public        | Register a new user        |
| POST   | `/api/auth/login`     | Public        | Login (sets JWT cookie)    |
| POST   | `/api/auth/logout`    | Public        | Clear auth cookie          |
| GET    | `/api/auth/me`        | Authenticated | Get current user           |
| GET    | `/api/products`       | Public        | List all products          |
| GET    | `/api/products/:id`   | Authenticated | Get one product            |
| POST   | `/api/products`       | Admin only    | Create a new product       |

Example product body:

```json
{
  "name": "Wireless Headphones",
  "price": 149.99
}
```

Example signup body:

```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

## React Theme Toggle

The Level 2 React frontend includes a full light/dark theme system.

- The toggle is in the app header
- The selected theme is saved in `localStorage`
- The storage key is `stockroom-theme`
- Theme colors are managed with CSS variables in `src/index.css`
- The app applies the theme through `data-theme` on the document root

## Common Issues

**PowerShell blocks npm**

Use `npm.cmd` instead of `npm`.

**Frontend cannot load products**

- Confirm the API URL is correct
- Confirm the backend is running if using localhost
- Check the browser console for CORS or network errors

**React theme does not appear to update**

- Hard refresh the browser with `Ctrl + F5`
- Confirm the dev server was restarted after Tailwind or CSS config changes

## Future Enhancements

- Add database persistence
- Add product categories
- Add inventory quantity tracking
- Connect React frontend to Auth API
- Add CSV export
- Add deployment links

## License

ISC

## Author

Created during the Coveda Internship.
