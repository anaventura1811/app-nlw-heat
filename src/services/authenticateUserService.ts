import "dotenv/config";
import axios from "axios";
import prisma from '../prisma';
import { sign } from "jsonwebtoken";
import "dotenv/config";

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
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

    let user = null;

    const { login, id, avatar_url, name, email } = response.data;
    
    user = await prisma.user.findFirst({
			where: {
				github_id: id,
			},
		});

    if (!user) {
     user = await prisma.user.create({
        data: {
          email,
          name,
          github_id: id,
          avatar_url,
          login
        }
      }).then((userData) => console.log('user', userData))
      .catch((e) => console.log(e));
    }

    const token = sign(
			{
				user: {
					name: user.name,
					avatar_url: user.avatar_url,
					id: user.id,
				},
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: '30d',
				algorithm: 'HS256',
			}
		);

    return { token, user};
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