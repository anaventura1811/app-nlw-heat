import "dotenv/config";
import axios from "axios";
import prisma from '../prisma';

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  github_id: number,
  name: string,
  email: string
}

class AuthenticaUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    const { login, github_id, avatar_url, name, email } = response.data;
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        github_id,
        avatar_url,
        login,
      },
	}).then((userData) => console.log('user', userData)).catch((e) => console.log(e));
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