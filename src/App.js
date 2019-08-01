import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {},
  //   }
  // };
    state = {
      lists: this.props.store.lists
    }

    omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
            key === keyToOmit ? newObj : {...newObj, [key]: value},
        {}
      );
    }

    newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }


    handleNewClick = (listId) => {
      const newCard = this.newRandomCard();
      this.props.store.allCards[newCard.id] = newCard;
      this.setState({
        lists: this.state.lists.map(list => {
          if (list.id === listId){
            list.cardIds.push(newCard.id);
          }
          return list;
        })
      })

    }
    

  handleDeleteClick = (cardId) => {
    this.setState({ 
      lists: this.state.lists.map(list => {
        //console.log(list.cardIds); 
        list.cardIds = list.cardIds.filter(item => item!==cardId);
        return list
      })
    })
    this.props.store.allCards = this.omit(this.props.store.allCards, cardId);
}

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.props.store.allCards[id])}
              newCard = {this.handleNewClick}
              deleteCard={this.handleDeleteClick}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
