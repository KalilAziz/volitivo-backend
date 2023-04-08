// Criaremos uma classe que extende a classe Error do JavaScript para que possamos criar nossos próprios erros, deixando o código mais limpo e organizado

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists')
  }
}
