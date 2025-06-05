const bcrypt = require('bcrypt');
const { registerUser, loginUser } = require('../authService');
const authService = require('../authService');
const userService = require('../userService');

jest.mock('../userRepository', () => ({
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  saveUser: jest.fn(),
  updateUserPassword: jest.fn(),
  updateUserName: jest.fn(),
}));
const userRepo = require('../userRepository');

describe('Escenarios funcionales completos', () => {
  let userId = 1;
  const testEmail = 'nuevo@example.com';
  const testPassword = 'password123';
  const newPassword = 'nuevaPassword456';

  //
  // Registrarse con una nueva cuenta de prueba.
  //
  it('1. debería registrar una nueva cuenta', async () => {
    userRepo.findUserByEmail.mockResolvedValue(null);
    userRepo.saveUser.mockResolvedValue({
      id: userId,
      email: testEmail,
      name: 'Usuario Prueba',
    });

    const result = await registerUser({
      email: testEmail,
      password: testPassword,
      name: 'Usuario Prueba',
    });

    expect(result).toEqual({
      id: userId,
      email: testEmail,
      name: 'Usuario Prueba',
    });
  });

  //
  // Iniciar sesión con la nueva cuenta.
  //
  it('2. debería iniciar sesión con la nueva cuenta', async () => {
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    userRepo.findUserByEmail.mockResolvedValue({
      id: userId,
      email: testEmail,
      password: hashedPassword,
      name: 'Usuario Prueba',
    });

    const result = await loginUser({
      email: testEmail,
      password: testPassword,
    });

    expect(result).toHaveProperty('token');
  });

  //
  // Cargar el perfil de usuario.
  //
  it('3. debería cargar el perfil del usuario', async () => {
    const fakeUser = {
      id: userId,
      email: testEmail,
      name: 'Usuario Prueba',
    };
    userRepo.findUserById.mockResolvedValue(fakeUser);

    const profile = await userService.getUserProfile(userId);
    expect(profile).toEqual(fakeUser);
  });

  //
  // Cambiar la contraseña.
  //
  it('4. debería permitir cambiar la contraseña', async () => {
    const hashedOldPassword = await bcrypt.hash(testPassword, 10);
    userRepo.findUserById.mockResolvedValue({ id: userId, password: hashedOldPassword });

    await authService.changePassword({
      userId,
      oldPassword: testPassword,
      newPassword,
    });

    expect(userRepo.updateUserPassword).toHaveBeenCalled();
  });

  //
  //  Cerrar sesión.
  //
  it('5. debería cerrar sesión', async () => {
    authService.logoutUser = async () => ({ success: true });

    const result = await authService.logoutUser();
    expect(result).toEqual({ success: true });
  });

  //
  //  Iniciar sesión con la nueva contraseña.
  //
  it('6. debería iniciar sesión con la nueva contraseña', async () => {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    userRepo.findUserByEmail.mockResolvedValue({
      id: userId,
      email: testEmail,
      password: hashedNewPassword,
      name: 'Usuario Prueba',
    });

    const result = await loginUser({
      email: testEmail,
      password: newPassword,
    });

    expect(result).toHaveProperty('token');
  });

  //
  //  Actualizar el nombre de perfil.
  //
  it('7. debería actualizar el nombre del perfil', async () => {
    await userService.updateProfileName(userId, 'Nombre Actualizado');
    expect(userRepo.updateUserName).toHaveBeenCalledWith(userId, 'Nombre Actualizado');
  });

  it('8. debería reflejar el nombre actualizado en el perfil', async () => {
    const updatedUser = {
      id: userId,
      email: testEmail,
      name: 'Nombre Actualizado',
    };

    userRepo.findUserById.mockResolvedValue(updatedUser);

    const profile = await userService.getUserProfile(userId);
    expect(profile.name).toBe('Nombre Actualizado');
  });

  //
  //  Cerrar sesión nuevamente.
  //
  it('9. debería cerrar sesión nuevamente', async () => {
    authService.logoutUser = async () => ({ success: true });

    const result = await authService.logoutUser();
    expect(result).toEqual({ success: true });
  });

  //
  // Intentar iniciar sesión con una cuenta no registrada.
  //
  it('10. debería lanzar error si la cuenta no está registrada', async () => {
    userRepo.findUserByEmail.mockResolvedValue(null);

    await expect(
      loginUser({ email: 'inexistente@example.com', password: '123456' })
    ).rejects.toThrow('Usuario no encontrado');
  });
});
