import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { router } from './routes/routes';

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(router);

app.get('/github', (_req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));