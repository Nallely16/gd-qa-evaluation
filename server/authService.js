// server/authService.js
const userRepo = require('./userRepository');
const bcrypt = require('bcrypt');

// 1. Registro de usuario
async function registerUser({ email, password, name }) {
  if (!email || !password || !name) {
    throw new Error('Todos los campos son requeridos');
  }
  const existing = await userRepo.findUserByEmail(email);
  if (existing) {
    throw new Error('Usuario ya existe');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepo.saveUser({ email, name, password: hashedPassword });
  return { id: newUser.id, email: newUser.email, name: newUser.name };
}

// 2. Login de usuario
async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }
  return { id: user.id, email: user.email, name: user.name, token: 'fake-jwt-token' };
}

// 3. Obtener perfil de usuario
async function getUserProfile(userId) {
  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return { id: user.id, email: user.email, name: user.name };
}

// 4. Cambiar contraseña
async function changePassword({ userId, oldPassword, newPassword }) {
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('Contraseña actual incorrecta');

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await userRepo.updateUserPassword(userId, hashedNewPassword);

  return { success: true };
}

// 5. Cerrar sesión (simulación)
async function logoutUser() {
  return { success: true };
}

// 6. Actualizar nombre de perfil
async function updateProfileName(userId, newName) {
  await userRepo.updateUserName(userId, newName);
  return { success: true };
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
  logoutUser,
  updateProfileName,
};
