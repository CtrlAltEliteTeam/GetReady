export class TournamentData {
    constructor(id, name, game, img, alt, creator, desc, time, s, e ,par, max){
        this.id = id;
        this.title = name;
        this.Game = game;
        this.img = img;
        this.alt = alt;
        this.creator = creator;
        this.desc = desc;
        this.sTime = time;
        this.sDate = s;
        this.eDate = e;
        this.participants = par;
        this.participantsMax = max;
    }
}