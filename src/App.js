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
    fetch("/api/cards")
      .then(response => {
        return response.json();
      })
      .then(cardsData => {
        this.setState({ cards: cardsData })
        console.log(JSON.stringify(cardsData))
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    const cards = this.state.cards;
    cards.push({ task: this.state.task, status: this.state.status });
    this.setState({ cards });
  };

  handleChange = e => {
    const status = e.target.status;
    this.setState({ [status]: e.target.value });
  };

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

        <div>
          <h1>To-Dos</h1>
          {cards
            .filter(x => x.status === 'TO-DO')
            .map(y => (
              <Card status={y.status} task={y.task} />
            ))}
        </div>
        <div>
          <h1>DOING</h1>
          {cards
            .filter(x => x.status === 'DOING')
            .map(y => (
              <Card status={y.status} task={y.task} />
            ))}
        </div>
        <div>
          <h1>DONE</h1>
          {cards
            .filter(x => x.status === 'DONE')
            .map(y => (
              <Card status={y.status} task={y.task} />
            ))}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input name="task" onChange={this.handleChange} type="text" />
          <input name="status" onChange={this.handleChange} type="text" />
          <input type="submit" />
        </form>

        {cards.map(card => (
          <Card
            task={card.task}
            status={card.status}
            delete={this.delete}
            edit={this.edit}
          />

        ))}

      </div>
    );
  }
}

function Card(props) {
  return (
    <div>
      <h2>TASK: {props.task}</h2>
      <h2>STATUS: {props.status}</h2>
      <button onClick={() => props.delete(props.task)}>Remove</button>
      <button onClick={() => props.edit(props.task)}>Edit</button>
    </div>
  );
}

export default App;