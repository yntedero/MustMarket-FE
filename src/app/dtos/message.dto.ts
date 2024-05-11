export class MessageDto {
  fromUser: string
  toUser: string
  message: string
  timestamp: string
  constructor(
    fromUser: string,
    toUser: string,
    message: string,
    timestamp: string
  ) {
    this.fromUser = fromUser
    this.toUser = toUser
    this.message = message
    this.timestamp = timestamp
  }
}
