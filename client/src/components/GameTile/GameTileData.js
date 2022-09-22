export class GameTileData{
    constructor(id, name, img, alt, count, content, user){
        this.id = id;
        this.name = name;
        this.img = img;
        this.alt = alt;
        this.count = count;
        this.content = content;
        this.user = user;
    }
}

//content is whether a game catagory or an indiviual tournament is stored in the object

//TODO
//this should recive a game nor na image and alt **fix later

//Can add editable stuff later
/* this.editable = edit to make the popup menu appear as seen in the UI diagrams  */