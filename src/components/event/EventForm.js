import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState({})
    const {getGames, games} = useContext(GameContext)
    const {createEvent} = useContext(EventContext)

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const copyEvent = {...currentEvent}
        copyEvent[domEvent.target.name] = domEvent.target.value

        setEvent(copyEvent)
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
