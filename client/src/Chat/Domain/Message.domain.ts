export default class MessageDomain {
  static isSent(sender: string, activeUser: string): boolean {
    return sender === activeUser;
  }
}
