import React, { useEffect, useState } from "react"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import ReactDOM from "react-dom"

import "./App.css"
//pages
import Gameroom from "./components/pages/Gameroom"
import Landing from "./components/pages/Landing"


function App(){
    const [in_room, set_in_room] = useState("false")
    const [data, set_data] = useState({})


    useEffect(() => {
        const in_room =  localStorage.getItem("in_room")
        const data = JSON.parse(localStorage.getItem("data"))
        set_in_room(in_room)
        set_data(data)
    }, [])

    useEffect(() => {
        localStorage.setItem("in_room", in_room)
    }, [in_room])

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data))
    }, [data])

    return (
        <Router>
            data = {JSON.stringify(data)}
            <Switch>
                <Route path="/about">
                    <Gameroom></Gameroom>
                </Route>
                <Route path="/">
                    {in_room == "true"
                    ? <Gameroom set_in_room={set_in_room} set_data={set_data} data={data}/> 
                    : <Landing set_in_room={set_in_room} set_data={set_data}/>}
                    
                </Route>
            </Switch>
        </Router>
    )
}
export default App