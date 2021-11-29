export class Battle{
    constructor(id, title, description, userID1, userID2) {
        this.battleID = id;
        this.battleTopic = title;
        this.battleDescription = description;
        this.user1 = userID1;
        this.user2 = userID2;
    }
}