# MERN Chat App

A full-stack real-time chat application built with the MERN stack, Socket.IO, Zustand, Tailwind CSS, and DaisyUI.

This project supports authentication, one-to-one messaging, online presence, typing indicators, unread badges, image/GIF sharing, and a WebRTC-based audio/video calling flow.

## Features

- JWT-based signup, login, and logout
- Real-time one-to-one messaging with Socket.IO
- Online/offline user presence
- Typing indicator
- Unread message badges
- Image and GIF sharing from device upload
- Responsive chat UI for desktop and mobile
- Password show/hide toggle on auth screens
- Avatar fallback rendering with generated initials
- Audio and video calling UI using WebRTC signaling

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- DaisyUI
- Zustand
- React Router
- Socket.IO Client

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcryptjs

## Project Structure

```text
mern-chat-app/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Installation

Install root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

## Running Locally

### 1. Start the backend

From the project root:

```bash
npm run server
```

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

### Default ports

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## LAN Usage

This project can be used across devices on the same network.

### To access from mobile

1. Start the backend on your laptop.
2. Start the frontend with Vite.
3. Open the frontend using your laptop's LAN IP, for example:

```text
http://192.168.1.10:3000
```

### Notes for LAN use

- Chat, socket messaging, typing, and presence work over LAN.
- Audio/video calling may fail on some mobile browsers when using plain `http://LAN-IP`.
- Many mobile browsers require `HTTPS` or `localhost` for camera/microphone access.

## Available Scripts

### Root

```bash
npm run server
```

Runs the backend with nodemon.

```bash
npm start
```

Runs the backend in production mode.

```bash
npm run build
```

Installs dependencies and builds the frontend for production.

### Frontend

```bash
cd frontend
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend.

```bash
npm run preview
```

Previews the production frontend build.

## Calling Feature Notes

The app includes a basic WebRTC call flow:

- outgoing audio/video calls
- incoming call overlay
- accept / decline
- end call
- ICE candidate and SDP signaling via Socket.IO

### Important limitation

WebRTC media permissions depend on the browser and protocol:

- `localhost` usually works
- `http://<LAN-IP>` often works for chat but not for mic/camera
- `https://` is recommended for reliable mobile calling

## Authentication

Users are authenticated with JWT stored in cookies. Protected routes on the backend ensure only logged-in users can fetch users or send/read messages.

## Media Support

Users can:

- send text messages
- upload images
- upload GIF files

Uploaded media is currently sent through the chat message payload and rendered directly in the conversation UI.

## Production Build

Build the app:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

The Express server serves the built frontend from `frontend/dist`.

## Future Improvements

- delivered / seen receipts
- group chats
- persistent call history
- call timeout / busy status
- mute and camera toggle during calls
- cloud media storage
- notifications

## License

This project is licensed under the ISC License.
