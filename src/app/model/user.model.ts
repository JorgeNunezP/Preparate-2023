export class User {
  constructor(uid: string, name: string, email: string, type: boolean) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.type = type;
  }

  uid: string = '';
  name: string = '';
  email: string = '';
  type: boolean = false;
}
