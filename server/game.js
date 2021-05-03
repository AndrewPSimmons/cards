let game = {
    id: gameid,
    players: [],
    cards_data: {
        packs: [],
        used: []
    },
    rounds: [{
        index: roundid,
        black_card: blackcard_id,
        white_cards: {
            player_id: whitecard_id
        }
    }],
    scores: {
        player_id: score
    }
}

let room = {
    id: roomid,
    password: password,
    host: playerid,
    game_options: {},
    members: [playerid],
    game: gameid
}

let player = {
    id: playerid,
    username: username
}