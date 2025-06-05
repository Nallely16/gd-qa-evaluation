// server/userRepository.js

async function findUserByEmail(email) {
  return null;
}

async function saveUser(userData) {
  return {
    id: 1,
    ...userData,
  };
}

module.exports = {
  findUserByEmail,
  saveUser,
};
