import React, {useEffect} from "react"

const Card = ({id}) =>{
    useEffect(() => {
        console.log("Sending API call for card info with id", id)
    }, [])
    return <h4>I am a card</h4>
}


export default Card