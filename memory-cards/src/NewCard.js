// input for title, url for pic, system, date
// username and current date is automatically sent to firebase
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from './firebase'

class NewCard extends Component {
  constructor () {
    super()
    this.state = {
      gameTitle: '',
      games: []

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    const gamesRef = firebase.database().ref('games')
    const game = {
      gameTitle: this.state.gameTitle
    }
    gamesRef.push(game)
    this.setState({
      gameTitle: ''
    })
  }

  componentDidMount () {
    const gamesRef = firebase.database().ref('games')
    gamesRef.on('value', (snapshot) => {
      let games = snapshot.val()
      let newState = []
      for (let game in games) {
        newState.push({
          id: game,
          gameTitle: games[game].gameTitle
        })
      }
      this.setState({
        game: newState
      })
    })
  }

  render () {
    return (
      <div className='new-note-container'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='gameTitle' onChange={this.handleChange} value={this.state.gameTitle} placeholder='Add a favorite video game.' />
          <button>Add Game!</button>
          
        </form>
        <div>
            <ul>
              {this.state.games.map((game) => {
                return (
                  <li key={game.id}>
                    <h3>{game.gameTitle}</h3>
                  </li>
                )
              })}
            </ul>
          </div>
      </div>
    )
  }
}

export default NewCard
