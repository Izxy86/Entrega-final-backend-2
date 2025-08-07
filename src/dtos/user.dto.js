export class UserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.cart = user.cart;
  }
}
