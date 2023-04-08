// importar dotenv para que possamos utilizar as variáveis de ambiente definidas no arquivo .env neste arquivo
import 'dotenv/config'

// importar zod para validar nossas variáveis de ambiente
import { z } from 'zod'

// definir o schema de validação
const envSchema = z.object({
  // Mesmo que não tenhamos definido uma variável de ambiente para PORT, em nosso schema, ela será definida como string e terá o valor default de "3333", caso não seja definida. Se no futuro adicionarmos uma variável de ambiente para PORT, ela será substituida pelo valor definido no .env
  PORT: z.coerce.number().default(3333),
  // Iremos definir o NODE_ENV como um enum, ou seja, apenas "dev", "production" ou "test" serão aceitos. Caso não seja definido, o valor default será "dev"
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  // Iremos utilizar o NODE_ENV para definir em qual estamos da aplicação.
})

// Estamos utilizando o parse para validar as variáveis de ambiente, caso alguma delas não esteja de acordo com o schema, o parse irá lançar um erro.
const _env = envSchema.parse(process.env)

// Exportando as variáveis de ambiente para que possamos utilizá-las em outros arquivos, vale lembrar que como colocamos a tipagem, o VSCode irá nos ajudar a identificar quais variáveis de ambiente estão disponíveis.
export const env = _env
