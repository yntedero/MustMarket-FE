export class UserDTO {
  id: number;
  contact: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;

  constructor() {
    this.id = 0;
    this.contact = "";
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.role = "USER";
    this.status = "ACTIVE";
  }
}
