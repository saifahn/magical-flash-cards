import React, { Component } from 'react';
import './Cards.css';

class Cards extends Component {
  state = {
    cards: []
  }

  fetchCards(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.storeCards(data))
      .catch(error => console.log(error)); 
  }

  storeCards = data => {
    const cards = data.data.map( card => {
      const { image_uris, name, id } = card;
      return { image_uris, name, id };
    })

    this.setState({ cards })
  }

  componentDidMount() {
    const baseUrl = `https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3ARIX`;
    this.fetchCards(baseUrl);
  }

  render() {
    return (
      <section className="c-cards">
        <div className="c-cards-container">
          <ul className="c-card-items">
            {
              this.state.cards.map( card => (
                <li key={card.id} className="c-card-items__card">
                  <img src={card.image_uris.border_crop} className="c-card-items__image"/>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    )
  }
}

export default Cards;