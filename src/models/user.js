export default class User {
  constructor(user) {
    this.id = user[`id`] || ``;
    this.email = user[`email`] || ``;
    this.name = user[`name`] || ``;
    this.avatarUrl = user[`avatar_url`] || ``;
  }

  static parseUser(user) {
    return new User(user);
  }
}
