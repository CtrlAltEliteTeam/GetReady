import Fortnite from '../../resources/img/GameTile_Test_Img/Fortnite.jpg';
import LoL from '../../resources/img/GameTile_Test_Img/LoL.jpg';
import CSgo from '../../resources/img/GameTile_Test_Img/CSGO.png';
import Halo from '../../resources/img/GameTile_Test_Img/Halo.jpg';
import SSb from '../../resources/img/GameTile_Test_Img/SSB.jpg';
import Tekken from '../../resources/img/GameTile_Test_Img/tekken-7.jpg';
import pacMan from '../../resources/img/GameTile_Test_Img/pacMan.jpg';

export class GameTileData{
    constructor(id, name, game, content, user, count){
        this.id = id;
        this.name = name;
        this.game = game;
        switch(game){
            case "Fortnite":
                this.img = Fortnite;
                break;
            case "League of Legends":
                this.img = LoL;
                break;
            case "CSGO":
                this.img = CSgo;
                break;
            case "Halo":
                this.img = Halo;
                break;
            case "Super Smash bros":
                this.img = SSb;
                break;
            case "Tekken 7":
                this.img = Tekken;
                break;
            case "pacman":
                this.img = pacMan;
                break;
        }
        this.alt = "TournamentImage";
        this.content = content;
        this.user = user;
        this.count = count;
    }
}

//content is whether a game catagory or an indiviual tournament is stored in the object

//TODO
//this should recive a game nor na image and alt **fix later

//Can add editable stuff later
/* this.editable = edit to make the popup menu appear as seen in the UI diagrams  */