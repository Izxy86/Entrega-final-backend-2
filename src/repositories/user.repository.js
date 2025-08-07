import UserDAO from '../dao/user.dao.js';
import { createHash } from '../utils/password.js';
import { isValidPassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import CartRepository from '../repositories/Cart.repository.js';

const userDAO = new UserDAO();

export default class UserRepository {
  async register(userData) {
    const existingUser = await userDAO.findByEmail(userData.email);
    if (existingUser) throw new Error('Email ya registrado');

    const hashedPassword = createHash(userData.password);
    const isAdmin = userData.email === 'admin@coder.com';
    const cartRepo = new CartRepository();
    const cart = await cartRepo.createCart();
    const newUser = await userDAO.create({
      ...userData,
      password: hashedPassword,
      cart: cart._id,
      role: isAdmin ? 'admin' : 'user'
    });
    return {
      id: newUser._id,
      name: `${newUser.first_name} ${newUser.last_name}`,
      email: newUser.email,
      role: newUser.role
    };
  }
  async login(email, password) {
    const user = await userDAO.findByEmail(email);
    if (!user) throw new Error('Mail inválido');

    const passwordOk = isValidPassword(user, password);
    if (!passwordOk) throw new Error('Contraseña inválida');

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: `${user.first_name} ${user.last_name}`
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }

  async getByEmail(email) {
    return await userDAO.findByEmail(email);
  }

  async updatePassword(userId, newHashedPassword) {
    const user = await userDAO.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    user.password = newHashedPassword;
    await user.save();
  }
}
