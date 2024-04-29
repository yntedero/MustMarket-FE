export class MessageDto {
  fromUser: string;
  toUser: string;
  message:string;
  constructor(fromUser: string,toUser: string,message:string) {
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.message = message;
  }
}
