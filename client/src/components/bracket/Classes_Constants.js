export const BRACKET = 'bracket';
export const WINNERS_BRACKET = 'bracketW';
export const LOSERS_BRACKET = 'bracketL';

export class Bracket{
    constructor(type) {
        this.type=type;
        this.rounds = [];
    }

    appendRound(round){
        this.rounds.push(round);
    }
}

export class Round{
    constructor(roundNum) {
        this.roundNum = roundNum;
        this.matches = [];
    }

    appendMatch(match){
        this.matches.push(match);
    }
}

export class Match {
    constructor(matchNum) {
        this.matchNum = matchNum;
        this.entrants = [];
        this.winner = null;
        this.loser = null;
    }

    appendEntrant(entrant){
        this.entrants.push(entrant);
    }
}

export class Entrant {
    constructor() {
        this.name = "";
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }
}
