export class UserDTO {
  userId: number
  email: string
  firstName: string
  lastName: string
  contact: string
  role: string
  status: string

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    contact: string,
    role: string,
    status: string
  ) {
    this.userId = id
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.contact = contact
    this.role = role
    this.status = status
  }
}
