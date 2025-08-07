import UserRepository from '../repositories/user.repository.js';

const userRepo = new UserRepository();

export default class UserService {
  async register(userData) {
    return await userRepo.register(userData);
  }

  async login(email, password) {
    return await userRepo.login(email, password);
  }

  async getByEmail(email) {
    return await userRepo.getByEmail(email);
  }

  async getById(id) {
    return await userRepo.getById(id);
  }

  async updatePassword(userId, newPassword) {
    return await userRepo.updatePassword(userId, newPassword);
  }
}
