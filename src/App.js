import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { task: 'BUY FOOD', status: 'DONE' },
        { task: 'CHEF UP YUMMY GRINDS', status: 'DOING' },
        { task: 'ENJOY THEM TASTY GRINDS', status: 'TO-DO' },
      ],
      task: '',
      status: ''
    };
  }

  componentDidMount = e => {
    console.log("mounted")
    fetch("/kanban")
      .then(response => {
        return response.json();
      })
      .then(cardsData => {
        this.setState({ cards: cardsData })
        console.log(JSON.stringify(cardsData))
      })
  }

  handleSubmit = e => {
    console.log("submitted status", this.state.status)
    console.log("submitted task", this.state.task)
    e.preventDefault();
    const cards = this.state.cards;
    cards.push({ task: this.state.task, status: this.state.status });
    this.setState({ cards });
    console.log('cards', cards)
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value },
      function () {
        console.log('this.state after handlechange', this.state)

      });
  };

  submittedCard() {
    const cardData = {
      task: this.state.task,
      status: this.state.status
    }
    const headers = { 'Content-Type': 'application/json' };
    fetch('/api/cards', { method: 'POST', body: JSON.stringify(cardData), headers })
      .then((res) => {
        return fetch('/api/cards')
          .then((res) => { return res.json(); })
          .then((body) => { this.setState({ cards: body }) })
      })
  }

  delete = task => {
    const cards = this.state.cards.filter(card => task !== card.task);
    this.setState({ cards });
  };

  // edit = task => {
  //   const cards = this.state.cards.filter(card => task === card.task);
  //   this.setState({ cards });
  // }


  render() {
    const { cards } = this.state;


    return (
      <div className="kanban">
        <form action="/kanban" method="post">
          <input name="task" onChange={this.handleChange} type="text" />
          <input name="status" onChange={this.handleChange} type="text" />
          <input type="submit" />
        </form>

        <div>
          <div className="column"><h1>To-Dos</h1>
            {cards
              .filter(x => x.status === 'TO-DO')
              .map(y => (
                <Card status={y.status}
                  task={y.task}
                  delete={this.delete} />
              ))}
          </div>
        </div>
        <div>
          <div className="column"><h1>DOING</h1>
            {cards
              .filter(x => x.status === 'DOING')
              .map(y => (
                <Card status={y.status}
                  task={y.task}
                  delete={this.delete} />
              ))}
          </div>
        </div>
        <div>
          <div className="column"><h1>DONE</h1>
            {cards
              .filter(x => x.status === 'DONE')
              .map(y => (
                <Card status={y.status}
                  task={y.task}
                  delete={this.delete} />
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
      <button onClick={() => props.delete(props.task)}>Remove</button>
      <button onClick={() => props.edit(props.task)}>Edit</button>
    </div>
  );
}

export default App;