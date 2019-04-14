import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllTasks } from './actions/actions.js'


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        // { task: 'BUY FOOD', status: 'DONE' },
        // { task: 'CHEF UP YUMMY GRINDS', status: 'DOING' },
        // { task: 'ENJOY THEM TASTY GRINDS', status: 'TO-DO' },
      ],
      task: '',
      status: ''
    };
  }



  //DISPLAY CARDS DATA & MOUNT FOR CLIENT IN BROWSER//
  componentDidMount = e => {
    // fetch("/kanban")
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(cardsData => {
    //     this.setState({ cards: cardsData })
    //   })
    this.props.getAllTasks()
  }



  //THIS SUBMITS & ADDS CARD TASK/STATUS CONNECTED TO FORM & POSTS BROWSER & DATABASE//
  handleSubmit = e => {
    // console.log("submitted status", this.state.status)
    // console.log("submitted task", this.state.task)
    e.preventDefault();
    const cards = this.state.cards;
    cards.push({ task: this.state.task, status: this.state.status });
    this.setState({ cards });
    // console.log('cards', cards)
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value },
      function () {
        // console.log('this.state after handlechange', this.state)
      });
  };

  submittedCard() {
    const cardData = {
      task: this.state.task,
      status: this.state.status
    }
    const headers = { 'Content-Type': 'application/json' };
    fetch('/kanban', { method: 'POST', body: JSON.stringify(cardData), headers })
      .then((res) => {
        return fetch('/kanban')
          .then((res) => { return res.json() })
          .then((body) => { this.setState({ cards: body }) })
      })
  }

  //THIS ALLOWS CLIENT TO DELETE CARDS VIA BROWSER//
  removedCard = id => {
    const headers = { 'Content-Type': 'application/json' };
    let cardData = { chosen: id };
    // console.log("THIS IS THE CARD DATA", cardData)
    fetch(`/kanban`, { method: 'DELETE', body: JSON.stringify(cardData), headers })
      .then(res => {
        return fetch('/kanban')
          .then((res) => { return res.json() })
          .then((body) => { this.setState({ cards: body }) })
      })
  }

  editedCard = id => {
    const headers = { 'Content-Type': 'application/json' };
    let cardData = { chosen: id };
    console.log("-------->THIS IS THE CARD DATA SELECTED TO BE EDITED")
    fetch(`/kanban`, { method: 'POST', body: JSON.stringify(cardData), headers })
      .then(res => {
        return fetch('/kanban')
          .then((res) => { return res.json() })
          .then((body) => { this.setState({ cards: body }) })
      })
  }

  //THIS WILL HOPEFULLY ALLOW EDIT TO WORK THROUGH THE BROWSER//
  // handleUpdate = cards => {
  //   let editCard = { chosen: id };
  //   const headers = { 'Content-Type': 'application/json' };
  //   fetch(`/kanban`, { method: 'PUT', body: JSON.stringify(editCard), headers })
  //     .then(res => {
  //       this.updateCards(cards)
  //     })
  // }

  // updateCards = cards => {
  //   let newEditCard = this.state.cards.filter((f) => f.id !== cards.id)
  //   newCards.push(cards)
  //   this.setState({
  //     cards: newCards
  //   })
  // }

  //This was allowing delete through the browser, but was not connected to the database//
  // delete = task => {
  //   const cards = this.state.cards.filter(card => task !== card.task);
  //   this.setState({ cards });
  // }

  // edit = task => {
  //   const cards = this.state.cards.filter(card => task === card.task);
  //   this.setState({ cards });
  // }


  render() {
    const { cards } = this.props;
    console.log("THIS.PROPS APP.js", this.props.cards)


    return (

      <div className="kanban">
        <form action="/kanban" method='POST'>
          <input name="task" onChange={this.handleChange} type="text" />
          <input name="status" onChange={this.handleChange} type="text" />
          <input type="submit" />
        </form>

        <div>
          <div className="column"><h1>To-Dos</h1>
            {cards
              .filter(x => x.status === 'TO-DO')
              .map((y, i) => (
                <Card
                  key={i}
                  status={y.status}
                  task={y.task}
                  id={y.id}
                  delete={this.removedCard}
                  edit={this.editedCard} />
              ))}
          </div>
        </div>
        <div>
          <div className="column"><h1>DOING</h1>
            {cards
              .filter(x => x.status === 'DOING')
              .map((y, i) => (
                <Card
                  key={i}
                  status={y.status}
                  task={y.task}
                  id={y.id}
                  delete={this.removedCard}
                  edit={this.editedCard} />
              ))}
          </div>
        </div>
        <div>
          <div className="column"><h1>DONE</h1>
            {cards
              .filter(x => x.status === 'DONE')
              .map((y, i) => (
                <Card
                  key={i}
                  status={y.status}
                  task={y.task}
                  id={y.id}
                  delete={this.removedCard}
                  edit={this.editedCard} />
              ))}
          </div>
        </div>

      </div>
    );
  }
}

function Card(props) {


  return (
    <div className="card">
      <h2>TASK: {props.task}</h2>
      <h2>STATUS: {props.status}</h2>
      <button onClick={() => props.delete(props.id)}>Remove</button>
      <button onClick={() => props.edit(props.id)}>Edit</button>
    </div>
  );
}

const mapStateToProps = storeState => ({ cards: storeState })

const ConnectedApp = connect(mapStateToProps, { getAllTasks })(App);

export default ConnectedApp;