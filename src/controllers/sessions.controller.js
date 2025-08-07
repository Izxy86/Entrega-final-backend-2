import UserService from '../services/user.service.js';
import { UserDTO } from '../dtos/user.dto.js';
import { generateResetToken, verifyResetToken } from '../utils/token.js';
import { sendRecoveryEmail } from '../utils/mailer.js';
import { isValidPassword } from '../utils/password.js';

const userService = new UserService();

export const current = (req, res) => {
  const user = req.user;
  const safeUser = new UserDTO(user);
  res.json({ status: 'success', user: safeUser });
};

export const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ status: 'success', user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
      })
      .json({ status: 'success', token });
  } catch (error) {
    res.status(401).json({ status: 'error', message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie('token')
    .json({ status: 'success', message: 'Sesión finalizada' });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userService.getByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const token = generateResetToken(email);
    await sendRecoveryEmail(email, token);

    res.json({
      status: 'success',
      message: 'Correo enviado con instrucciones'
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const data = verifyResetToken(token);
  if (!data) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Token inválido o expirado' });
  }

  const user = await userService.getByEmail(data.email);
  if (!user) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Usuario no encontrado' });
  }

  if (isValidPassword(user, password)) {
    return res
      .status(400)
      .json({
        status: 'error',
        message: 'No podés usar la misma contraseña anterior'
      });
  }

  const newHashedPassword = createHash(password);
  await userService.updatePassword(user._id, newHashedPassword);

  res.json({
    status: 'success',
    message: 'Contraseña actualizada correctamente'
  });
};
