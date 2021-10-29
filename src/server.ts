import 'dotenv/config';
import { serverHttp, io } from './app';

const PORT = process.env.PORT || 4000;

serverHttp.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
