const userValid = {
  id: 1,
  fullName: 'Samuel Morais Garcia',
  email: 'moraissamuel009@gmail.com',
  password: 'S@muel123',
  phone: '38988449448',
};

const invalidCreateUser = {
  id: 3,
  fullName: 'Samuel Morais',
  email: 'invalidEmail',
  password: 'Password',
  phone: '(38) 98844-9448',
}

const invalidCreateUserPassword = {
  id: 3,
  fullName: 'Samuel Morais',
  email: 'moraissamuel009@gmail.com',
  password: 'inv',
  phone: '(38) 98844-9448',
}

const invalidCreateUserFullName = {
  id: 3,
  fullName: 'Samu',
  email: 'moraissamuel009@gmail.com',
  password: 'S@muel123',
  phone: '38988449448',
}

const invalidCreateUserPhone = {
  id: 3,
  fullName: 'Samuel Morais',
  email: 'moraissamuel009@gmail.com',
  password: 'S@muel123',
  phone: '389449448',
}

const updateUser = {
  id: 1,
  fullName: 'Samuel Morais',
  password: 'S@muel123',
  email: 'moraissamuel042@gmail.com',
  phone: '(38) 98844-9448',
};

const newUser = {
  id: 2,
  fullName: 'Lucas Silva',
  email: 'lucas123@gmail.com',
  password: 'Lucas123',
  phone: '(38) 98822-8793',
};

export {
  userValid,
  updateUser,
  newUser,
  invalidCreateUser,
  invalidCreateUserPassword,
  invalidCreateUserFullName,
  invalidCreateUserPhone,
}