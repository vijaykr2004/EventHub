# Event Management System

A full-stack Event Management System built using the MERN Stack. The application allows users to browse events, register for events, cancel registrations, and manage their registered events through a personalized dashboard.

## 🌐 Live Demo


---
## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Events
- Browse all events
- View event details
- Search events
- Filter by category
- Filter by location
- Filter by date
- Pagination

### Registration
- Register for an event
- Cancel event registration
- Seat availability updates automatically
- Prevent duplicate registrations

### Dashboard
- User Dashboard
- My Registered Events
- Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

```
Event-Manager
│
├── Client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── Server
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Event-Manager.git
```

---

### Backend Setup

```bash
cd Server
npm install
```

Create a `.env` file inside the Server folder.

```env
PORT=9091
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Client
npm install
```

Create a `.env` file inside the Client folder.

```env
VITE_API_URL=http://localhost:9091/api
```

Run the frontend:

```bash
npm run dev
```


## 📌 Future Improvements

- Admin Dashboard
- Create/Edit/Delete Events
- Event Categories Management
- Email Notifications
- Payment Integration
- Event Images Upload
- User Profile
- Event Reviews
- Event Wishlist

---

## 👨‍💻 Author

**Vijay Kumar Gupta**

- GitHub: https://github.com/vijaykr2004

---

## 📄 License

This project is created for learning and portfolio purposes.