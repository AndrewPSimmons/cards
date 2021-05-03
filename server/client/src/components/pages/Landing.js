import React, {useState} from "react"
import axios from "axios"


import "./Landing.css"

const create_room = ({username}, set_data, set_in_room) => {
    if(username.length < 1){
        console.log("NO UNSERNAME ")
        return
    }
    axios(`http://localhost:3001/create_room`,{
        method: "GET",
        mode: "no-cors",    
        params: {
            username: username
        }
    }).then((response) => {
        set_data(response.data.data)
    }).then(() => set_in_room("true"))
}

const join_room = ({username, roomcode}, set_data, set_in_room) => {
    if(username.length < 1){
        console.log("NO UESRNAME")
        return
    }
    if(roomcode.length < 1){
        console.log("NO ROOMCODE")
        return
    }
    axios("http://localhost:3001/join_room", {
        method: "GET",
        mode: "no-cors",
        params: {
            username: username,
            roomcode: roomcode.toUpperCase()
        }
    }).then((response) => {
        if(response.data.room_joined){
            set_data(response.data.data)
            return true
        }
    }).then(real_room => {real_room ? set_in_room("true") : null})
}
const Join = ({set_data, set_in_room}) => {
    const [username, set_username] = useState("")
    const [roomcode, set_roomcode] = useState("")
    return (
        <React.Fragment>
            <div className="choice-container">
                <label htmlFor="username">Username</label>
                <input name="username" type="text" onChange={(e)=>set_username(e.target.value)}></input>
                <label htmlFor="roomcode">Room Code</label>
                <input name="roomcode" type="text" onChange={(e)=>set_roomcode(e.target.value)}></input>
                <button onClick={() => join_room({username: username, roomcode: roomcode}, set_data, set_in_room)}>Join</button>
            </div>
        </React.Fragment>
    )
}
const Create = ({set_data, set_in_room}) => {
    const [username, set_username] = useState("")
    return (
        <React.Fragment>
        <div className="choice-container">
            <label htmlFor="username">Username</label>
            <input name="username" type="text" onChange={(e)=>set_username(e.target.value)}></input>
            <button onClick={() => create_room({username: username}, set_data, set_in_room)}>Create</button>
        </div>
        </React.Fragment>
    )
}

const Landing = ({set_in_room, set_data}) => {
    const [button_choice, set_button_choice] = useState("")
    return (
        <React.Fragment>
            <div className="landing-container">
                <div className="landing-box">
                    <div className="landing-head">
                        <h1 className="landing-title">COME PLAY CARDS</h1>
                    </div>
                    <div className="landing-body">
                        <div className="landing-item">
                            <button className="landing-butt landing-butt-create" onClick={() => set_button_choice("create")}>Create Room</button>
                        </div>
                        <div className="landing-item">
                            <button className="landing-butt landing-butt-join" onClick={() => set_button_choice("join")}>Join Room</button>
                        </div>
                    </div>
                </div>

            {button_choice == "create" ? <Create set_data={set_data} set_in_room={set_in_room}/> : null}
            {button_choice == "join" ? <Join set_data={set_data} set_in_room={set_in_room}/>: null}
            </div>
        </React.Fragment>
    )
}

export default Landing