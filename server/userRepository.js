// server/userRepository.js

async function findUserByEmail(email) {
  // Esta función será mockeada en los tests
  return null;
}

async function saveUser(userData) {
  // También será mockeada
  return {
    id: 1,
    ...userData,
  };
}

module.exports = {
  findUserByEmail,
  saveUser,
};
