// server/userService.js
const userRepo = require('./userRepository');

async function getUserProfile(userId) {
  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
}

async function updateProfileName(userId, newName) {
  await userRepo.updateUserName(userId, newName);
  return { success: true };
}

module.exports = {
  getUserProfile,
  updateProfileName,
};
