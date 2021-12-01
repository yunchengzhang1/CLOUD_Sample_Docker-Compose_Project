export class Message {
    constructor(id, userID, battleID, text, senderName, date) {
        this.id = id;
        this.senderID = userID;
        this.battleID = battleID;
        this.message = text;
        this.senderName = senderName;
        this.date = date;
    }
}