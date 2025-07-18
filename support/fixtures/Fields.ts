import { faker } from '@faker-js/faker/locale/pt_BR'

export const Fields = () => {
  const name = faker.person.firstName().toLowerCase()
  const mailto = faker.string.alphanumeric(6).toLowerCase()

  return {
    success: {
      nome: name,
      username: name,
      email: `${name}@teste.ai`,
      senha: 'teste123',
      confirmaSenha: 'teste123'
    },
    passwordMismatch: {
      nome: name,
      username: name,
      email: `${name}@teste.ai`,
      senha: 'teste123',
      confirmaSenha: 'teste321'
    },
    shortPassword: {
      nome: name,
      username: name,
      email: `${mailto}@teste.ai`,
      senha: 'teste',
      confirmaSenha: 'teste'
    },
    emptyName: {
      nome: '',
      username: name,
      email: `${mailto}@teste.ai`,
      senha: 'teste123',
      confirmaSenha: 'teste123'
    },
    emptyUsername: {
      nome: name,
      username: '',
      email: `${mailto}@teste.ai`,
      senha: 'teste123',
      confirmaSenha: 'teste123'
    },
    invalidUsername: {
      nome: name,
      username: 't!-s-t#',
      email: `${mailto}@teste.ai`,
      senha: 'teste123',
      confirmaSenha: 'teste123'
    },
    emptyEmail: {
      nome: 'teste',
      username: 'teste',
      email: '',
      senha: 'teste111',
      confirmaSenha: 'teste111'
    },
    allFieldsEmpty: {
      nome: '',
      username: '',
      email: '',
      senha: '',
      confirmaSenha: ''
    },
    existingEmail: {
      nome: name,
      username: name,
      email: 'fabianofda@linkai.com',
      senha: 'teste123',
      confirmaSenha: 'teste123'
    },
    existingUsername: {
      nome: 'fabianofda',
      username: 'fabianofda',
      email: `${mailto}@teste.ai`,
      senha: 'teste123',
      confirmaSenha: 'teste123'
    },
    invalidEmail: {
      nome: 'ttesste',
      username: 'ttesste',
      email: 'teste',
      senha: 'teste123',
      confirmaSenha: 'teste123'
    }
  }
}