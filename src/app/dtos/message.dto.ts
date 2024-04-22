export class MessageDto {
  id: number;
  senderId: string;
  receiverId: string;
  content:string;
  timestamp:string;

  constructor(id: number, senderId: string,receiverId: string,content:string, timestamp:string) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = senderId;
    this.content = content;
    this.timestamp = timestamp
  }
}
