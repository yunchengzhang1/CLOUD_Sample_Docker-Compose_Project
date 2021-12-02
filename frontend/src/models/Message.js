export class Message {
    constructor(messageID, battleID, message, senderName, userID, date) {
        this.messageID = messageID;
        this.battleID = battleID;
        this.message = message;
        this.senderName = senderName;
        this.userID = userID;
        this.date = date;
    }
}