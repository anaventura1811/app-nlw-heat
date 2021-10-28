import 'dotenv/config';
import express, { response } from 'express';

const app = express();
const PORT = 4000;

app.get('/github', (_req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));