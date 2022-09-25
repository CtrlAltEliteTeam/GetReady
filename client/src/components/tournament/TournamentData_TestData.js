import  SSimg  from "../../resources/img/Tournament_TestImg/SStest.jpg";
import  SSb  from "../../resources/img/GameTile_Test_Img/SSB.jpg";

export const TournamentData_TestData = [
    //Tournament
    {
        tournament: {
            id: 1,
            title: 'UltimateBrawl',
            img: SSimg,
            alt: "SSimg",
            creator: "Percy Vere",
            desc: "The top up and coming Super Smash players",
            sTime: "14:00:00",
            sDate: "2022-12-12",
            eDate: "2022-12-13",
            participants: 4,
            participantsMax: 16,
            participantsPermission: true,
        },
        game: {
            id: 5,
            name: 'Super Smash Bros',
            img: SSb,
            alt: 'Super Smash Bros',
            content: 'GAME',
            user: 1,
        },
        participants : {
            participants:
            [
                {
                    playerName: "Ray Sin",
                },
                {
                    playerName: "Fay Daway",
                },
                {
                    playerName: "Rod Knee",
                },
                {
                    playerName: "Ben Dover",
                }
            ]
        }
    }
]