const express = require("express")
const cors = require("cors")
const path = require("path")
const { stringify } = require("querystring")
const io = require("socket.io")(3002, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.PORT || 3001

//==== Game Variables ====
let rooms = {}
let games = {}

//id: socket
let users = {}

//==== Functions ====
const get_room_data = (socket) => {
    let response = {
        members_data: []
    }
    const room = rooms[socket.qdata.roomcode]
    if(room==null){
        
        return
    }
    room.members.forEach((member) => {
        response.members_data.push({username: users[member].username, id: users[member].id})
    })
    return response
}

const remove_user = (socket) => {
    const userid = socket.qdata.id
    delete users[userid]
}
const remove_user_from_room = (socket) => {
    let arr = rooms[socket.qdata.roomcode].members
    const pos = arr.indexOf(socket.qdata.id)
    rooms[socket.qdata.roomcode].members.splice(pos, 1)
}
const remove_room = (socket) => {
    delete rooms[socket.qdata.roomcode]
}
const remove_user_from_socket_room = (socket) => {
    socket.leave(rooms[socket.qdata.roomcode])
}
const user_disconnected = (socket) => {
    console.log("disconing", socket.id)
    console.log("qdata", socket.qdata)
    remove_user_from_room(socket)
    remove_user(socket)
}
const new_code = () => {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for ( var i = 0; i < 4; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    while (result in Object.keys(rooms)){
        result = new_code()
    }
    return result;
}
const new_id = () => {
    let randomChars = '0123456789';
    let result = '';
    for ( var i = 0; i < 6; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    while (result in Object.keys(users)){
        result = new_id()
    }
    return result;
}
//==== Server Setup ====
const app = express();
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
app.use(cors())
app.use(express.static(path.join(__dirname, './client/public')));
app.use("/dist/bundle.js", express.static(path.join(__dirname, "./client/dist/bundle.js")))
//=====================================
app.get("/create_room", (req, res) => {
    let response = {}
    const id = new_id()
    const {username} = Object(req.query)
    if(username.length == 0){
        response["room_created"] = false
        response["error"] = true
        response["error_code"] = "0101"
        response["message"] = "empty data"
        res.send(JSON.stringify(response))
    }
    let code = new_code()
    rooms[code] = {host: null, members: []}
    rooms[code].members.push(id)
    rooms[code].host = id
    users[id] = {id: id, socket: null, username: username, room: code}

    response["room_created"] = true,
    response["data"] = {
        "roomcode": code,
        "host": true,
        "username": username,
        "id": id
    }
    res.send(JSON.stringify(response))
})

app.get("/join_room", (req, res) => {
    const id = new_id()
    let response = {}
    const {username, roomcode} = Object(req.query)
    if (username.length == 0 || roomcode.length == 0){
        response["room_joined"] = false
        response["error"] = true
        response["error_code"] = "0201"
        response["message"] = "empty data"
        res.send(JSON.stringify(response))
    }
    if (!(roomcode in rooms)){
        response["room_joined"] = false
        response["error"] = true
        response["error_code"] = "0202"
        response["message"] = "no room code"
        res.send(JSON.stringify(response))
    }
    rooms[roomcode].members.forEach((member) => {
        if (username == users[member].username){
            response["room_joined"] = false
            response["error"] = true
            response["error_code"] = "0203"
            response["message"] = "username already exists in room"
            res.send(JSON.stringify(response))
        }
    })
    rooms[roomcode].members.push(id)
    users[id] = {id: id, socket: null, username: username, room: roomcode}
    response["room_joined"] = true,
    response["error"] = false
    response["data"] = {
        "roomcode": roomcode,
        "host": false,
        "username": username,
        "id": id
    }
    res.send(JSON.stringify(response))
})

app.get("/show_rooms", (req, res) => {
    const data = {
        rooms: rooms,
        users: users,
        games: games
    }
    res.send(JSON.stringify(data))
})

app.get("/validate_user_in_room", (req, res) => {
    let response = {}
    const data = JSON.parse(req.query.data)
    if(!(data.roomcode in rooms)){
        response["valid_user"] = false
        response["error"] = true
        response["error_code"] = "0301"
        response["message"] = "room does not exist"
        res.send(JSON.stringify(response))
    }
    else if(!(rooms[data.roomcode].members.includes(data.id))){
        console.log("REMEMER ANDREW this is for when the restart the server and ther user does not exist in the room. This prob wont happen but if it does search for this zzzaaa")
        response["valid_user"] = false
        response["error"] = true
        response["error_code"] = "0302"
        response["message"] = "room does not exist"
        res.send(JSON.stringify(response))
    }
    else{
        response["valid_user"] = true
        response["error"] = false
        response["message"] = "valid user in valid room"
        res.send(JSON.stringify(response))
    }
})
//=====================================
io.on("connection", socket => {
    const data = socket.handshake.query
    socket.qdata = data
    let users_data = users[data.id]
    socket.join(data.roomcode)
    if(users_data){
        users_data.socket = socket.id
    }
    users[data.id] = users_data
    console.log("connected")

    console.log(io.sockets.adapter.rooms)
    io.to(data.roomcode).emit("gameroom_data", get_room_data(socket))
    socket.on("disconnect", reason => {
        console.log("socket ", socket.id, " disconected")
    })
    socket.on("room_leave", (data) =>{
        remove_user_from_socket_room(socket)
        remove_user_from_room(socket)
        remove_user(socket)

        io.to(data.roomcode).emit("gameroom_data", get_room_data(socket))
    })
    socket.on("room_close", data=>{
        console.log(io.sockets.adapter.rooms)
        remove_user_from_room(socket)
        remove_user(socket)
        remove_room(socket) 
        remove_user_from_socket_room(socket)
        io.to(data.roomcode).emit("room_close")
    })

    socket.on("new_message", message=>{
        console.log("new message emited: ", message)
        io.to(socket.qdata.roomcode).emit("new_message", {message: message, username: socket.qdata.username})
    })
})


io.on
