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
        WCs: {
            player_id: WC_id
        }
    }],
    scores: {
        player_id: score
    }
}

let server_side_game_data = {
    phase: /*One of many */ "collecting",
    round_number: 3,
    used_cards: {
        WC: [32, 47, 64, 106, 123, 15, 57, 91],
        BC: [8, 102]
    },
    round_history: {
        "1": [{ round: 1, BC: 8, WC: 32 }],
        "2": [],
        "3": [{ rount: 2, BC: 102, WC: 91 }],
        "4": []
    },
    player_data: {
        "1": {
            hand: [{ id: 13, text: "Koolaid Man" }, { id: 54, text: "Kids with ass cancer" }],
            blank_cards_used: 0
        },
        "2": {
            hand: [{ id: 7, text: "Barney" }, { id: 143, text: "Jimmy's little cousin who died" }],
            blank_cards_used: 1
        },
        "3": {
            hand: [{ id: 3, text: "The inevitible heat death of the universe" }, { id: 32, text: "Hitler" }],
            blank_cards_used: 0
        },
        "4": {
            hand: [{ id: 71, text: "John Cena" }, { id: 44, text: "The Legendary Bannana" }],
            blank_cards_used: 2
        }
    },
    table_data: {
        BC: { BC_id: 52, text: "They told be I could never be president of the USA, so to prove them wrong I _" },
        //I am not sure which option will work best.
        WC_option1: { "1": { id: 13, text: "Koolaid Man" }, "3": { id: 32, text: "Hitler" } },
        WC_option2: [{ id: 13, text: "Koolaid Man", player: "1"}, { id: 32, text: "Hitler", player: 3} ]
    },
    settings: {
        packs: [1, 3, 5, 16],
        only_single_WCs: true,
        hand_size: 2,
        blank_card_max: 12,
        win_conidtion /* wither score or rounds */: { type: "score", number: 10 }
    }
}

let client_side_game_data = {
    
}
class Game {
    constructor() {
        this.phase = "preflight"
    }
    get WCready() {
        return this.calcWCready()
    }
    calcScore() {
        let player_to_wins = {}
        for (player in this.round_history) {
            player_to_wins[player] = this.round_history[player].length
        }
        return player_to_wins
    }
    calcWCready() {
        return this.table_data.cards_turned_in.length
    }
}
let game_functions = {
    WC_submited: () => {

        return
    },
    draw_new_cards: (packs) => {

        return
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