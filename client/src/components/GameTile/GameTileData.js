import Fortnite from '../../resources/img/GameTile_Test_Img/Fortnite.jpg';
import LoL from '../../resources/img/GameTile_Test_Img/LoL.jpg';
import CSgo from '../../resources/img/GameTile_Test_Img/CSGO.png';
import Halo from '../../resources/img/GameTile_Test_Img/Halo.jpg';
import SSb from '../../resources/img/GameTile_Test_Img/SSB.jpg';
import Tekken from '../../resources/img/GameTile_Test_Img/tekken-7.jpg';
import pacMan from '../../resources/img/GameTile_Test_Img/pacMan.jpg';
import createImg from '../../resources/img/BigPlus.jpg';
import Apex from '../../resources/img/GameTile_Test_Img/Apex_legends.jpg';
import COD from '../../resources/img/GameTile_Test_Img/COD.jpg'
import Dota from '../../resources/img/GameTile_Test_Img/dota2.jpg'
import Dbz from '../../resources/img/GameTile_Test_Img/dragon_ballZ.jpg'
import Fifa22 from '../../resources/img/GameTile_Test_Img/fifa22.jpg'
import Fifa23 from '../../resources/img/GameTile_Test_Img/fifa23.jpg'
import MC11 from '../../resources/img/GameTile_Test_Img/header.jpg'
import Kart from '../../resources/img/GameTile_Test_Img/mario-kart-8-deluxe.jpg'
import Strikers from '../../resources/img/GameTile_Test_Img/Mario_strikers_battle_league.jpeg'
import Overwatch from '../../resources/img/GameTile_Test_Img/overwatch.jpg'
import Unite from '../../resources/img/GameTile_Test_Img/pokemon_unite.jpg'
import Rocket from '../../resources/img/GameTile_Test_Img/rocket_league.jpg'
import Splatoon from '../../resources/img/GameTile_Test_Img/Splatoon.3.jpg'
import Street from '../../resources/img/GameTile_Test_Img/street_fighter.jpg'

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
            case "Pacman":
                this.img = pacMan;
                break;
            case "Apex Legends":
                this.img = Apex;
                break;
            case "COD":
                this.img = COD;
                break;
            case "Dota":
                this.img = Dota;
                break;
            case "Dbz":
                this.img = Dbz;
                break;
            case "Fifa22":
                this.img = Fifa22;
                break;
            case "Fifa23":
                this.img = Fifa23;
                break;
            case "MC11":
                this.img = MC11;
                break;
            case "Kart":
                this.img = Kart;
                break;
            case "Strickers":
                this.img = Strikers;
                break;
            case "Overwatch":
                this.img = Overwatch;
                break;
            case "Unite":
                this.img = Unite;
                break;
            case "Rocket":
                this.img = Rocket;
                break;
            case "Splatoon":
                this.img = Splatoon;
                break;
            case "Street":
                this.img = Street;
                break;
            case "create":
                this.img = createImg;
                break
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