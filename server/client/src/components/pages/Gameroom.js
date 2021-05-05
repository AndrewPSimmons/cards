
import axios from "axios"
import React, {useEffect, useState} from "react"
import {io} from "socket.io-client"
import "./Gameroom.css"

console.log(process.env)
const invalid_user = (set_in_room, set_data) => {
    set_data({"data": null})
    set_in_room("false")
}

const Chat = ({message_data}) => {
    return (
        <React.Fragment>
            <div>{JSON.stringify(message_data)}</div>
        </React.Fragment>
    )
}
const RoomMember = ({member}) => {
    const {username, id} = member
    return(
        <React.Fragment>
            <div>{username}</div>
        </React.Fragment>
    )
}

const Gameroom = ({set_in_room, set_data, data}) => {
    const [messages, set_messages] = useState([])
    const [message_input, set_message_input] = useState("")
    const [members, set_members] = useState([])
    const [socket, set_socket] = useState()

    const leave_room = () => {
        socket.emit("room_leave", data)
        set_messages([])
        set_data({"data": null})
        set_in_room(false)
    }
    const close_room = () => {
        socket.emit("room_close", data)
        set_data({"dataaa": null})
        set_in_room(false)
        set_messages([])
        //Emit that the room is no longer valid
    }

    const send_message = () => {
        socket.emit("new_message", message_input)
        console.log("1. mesasges in send_message()", messages)
    }
    const new_message = (message) => {
        console.log("2. current messages: ", messages)
        console.log("3. new incoming message", message)
        set_messages((messages)=>[...messages, message])
    }
    useEffect(()=>{
        axios(`http://localhost:3001/validate_user_in_room`,{
        method: "GET",
        mode: "no-cors",
        params: {
            data: JSON.stringify(data)
        }}).then((response) => {
            if(!(response.data.valid_user)){
                invalid_user(set_in_room, set_data)
            }
            else{
                //TIME TO SETUP SOCKET.IO when this comonent renders we want to see if the roomid exists and if it does not then set_in_room should be false
                const s = io("http://localhost:3002", {query: data})
                s.on("disconnect", data => {
                    set_data({"data": null})
                })
                s.on("gameroom_data", data => {
                    set_members(data.members_data)
                })
                s.on("room_close", ()=>{
                    set_data({"data": null})
                    set_in_room("false")
                })
                s.on("abort_room", ()=>{
                    set_data({"data": null})
                    set_in_room("false")
                })
                s.on("new_message", message=>{
                    new_message(message)
                })
                set_socket(s)
                console.log("socket is set to: ", s)
            }
        })
    }, [])

    
    return (
    <React.Fragment>
        {data.host ? <button onClick={()=>close_room()}>Close Room</button> : <button onClick={()=>leave_room()}>Leave Room</button>}
        <div className="gameroom-container">
            <div className="gameroom-chat">
                <div className="gameroom-chat-list">
                    {messages.map((message, index)=>{
                        return <div key={index}>{message.username} - {message.message}</div>
                    })}
                </div>
                <div className="gameroom-chat-control">
                    <input type="text" onChange={(e)=>set_message_input(e.target.value)}></input>
                    <button onClick={()=>send_message()}>Send</button>
                </div>
            </div>
            <div className="gameroom-members">
                <h2>Members</h2>
                {members.map((member, index) => {
                    return <RoomMember key={index} member={member}/>
                })}
            </div>
           
            
        </div>
    </React.Fragment>)
}

export default Gameroom