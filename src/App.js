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
      store: this.props.store
    }

    omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
            key === keyToOmit ? newObj : {...newObj, [key]: value},
        {}
      );
    }
    

  handleDeleteClick = (cardId) => {
    console.log(cardId);
    console.log(this.state.store.lists)
  //   this.state.store.lists.map(list => {console.log(list.cardIds); 
  //   list.cardIds = list.cardIds.filter(item => item!==cardId);
  //   return list
  // });

    console.log(this.state.store.lists)
  
      this.setState({ 
      store: this.state.store.lists.map(list => {console.log(list.cardIds); 
      list.cardIds = list.cardIds.filter(item => item!==cardId);
      return list
      })
    })
}

  render() {
    //const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.store.allCards[id])}
              deleteCard={this.handleDeleteClick}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
