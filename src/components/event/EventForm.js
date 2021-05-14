import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState({})
    const {getGames, games, gamers, getGamers } = useContext(GameContext)
    const {createEvent} = useContext(EventContext)

    useEffect(() => {
        getGames()
        getGamers()
    }, [])

    const changeEventState = (domEvent) => {
        const copyEvent = {...currentEvent}
        copyEvent[domEvent.target.name] = domEvent.target.value

        setEvent(copyEvent)
    }

    const changeGamerState = (event) => {
        console.log(event.target.value)
        const copyEvent = {...currentEvent}
        if (copyEvent.gamers) {
            // if value is already in array, remove on second click
            if (copyEvent.gamers.includes(event.target.value)) {
                // remove the id
                copyEvent.gamers = copyEvent.gamers.filter(g => g !== event.target.value)
            } else {
                copyEvent.gamers.push(event.target.value)
            }
        } else {
            copyEvent.gamers = [event.target.value]
        }
        setEvent(copyEvent)
        console.log(copyEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gamers">Gamers: </label>
                    <select name="gamers"  multiple
                        value={currentEvent.gamers}
                        onChange={ changeGamerState }>
                        <option value="0">Select Gamers...</option>
                        {
                            gamers.map(gamer => (
                                <option key={gamer.id} value={gamer.id}>{gamer.user?.first_name} {gamer.user?.last_name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input name="description" type="text" onChange={ changeEventState } value={currentEvent.description}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date: </label>
                    <input name="startDate" type="datetime-local" onChange={ changeEventState } value={currentEvent.startDate}/>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {...currentEvent}
                    event.gameId = parseInt(event.gameId)
                    createEvent(event).then(res => history.push('/events'))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
