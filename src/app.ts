import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { Server } from 'socket.io';

import { router } from './routes/routes';

const app = express();
app.use(cors());
// app.use(express.static(path.join(__dirname, '/public')));
// app.set('view engine', 'ejs');
// app.set('views', './views');

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
    // methods: ['GET', 'POST']
  }
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.get('/github', (_req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

// app.get('/', (req, res) => {
//   res.render('index')
// })

export { serverHttp, io };