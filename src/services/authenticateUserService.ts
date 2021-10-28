import "dotenv/config";
import axios from "axios";

class AuthenticaUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    });

    return response.data;
  }
}

export { AuthenticaUserService }

/* Receber o código via string, 
recuperar o access token no github para
ter acesso às informações do usuário
Verificar se usuário existe no DB
Se existir, gera um token
Se não existir, cria no DB e gera um token
Retorna o token com as infos do user logado
*/