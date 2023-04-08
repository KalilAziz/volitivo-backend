// Importando nossa instância do app
import { app } from './app'
// Importando o arquivo de variáveis de ambiente
import { env } from './env'

// Iniciando o servidor
app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${env.PORT}`)
  )
