/* Receber o código via string, 
recuperar o access token no github para
ter acesso às informações do usuário
Verificar se usuário existe no DB
Se existir, gera um token
Se não existir, cria no DB e gera um token
Retorna o token com as infos do user logado
*/

class AuthenticaUserService {
  async execute(code: string) {

  }
}

export { AuthenticaUserService }