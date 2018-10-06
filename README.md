# Magical Flash Cards

One of the greatest parts of Magic: the Gathering is the ability to interact with your opponent on not only your turn but your opponents' as well. However, not all cards have the ability to do so. Only cards with 'Flash' or the card type 'Instant' may be played outside of your turn.
This app provides a handy list of all cards that may trick you. You can use this app to learn and familiarise yourself with what your wily opponents may be holding.

## Features

As a player I want to know all instants that are available so that I can learn them and play around them.
As a player I want to know all instants that are available at a certain cost.
I want to be able to sort them by colour.
I want to be able to type in a mana cost and see what cards are playable.

## Cards

- I can show/hide cards of a colour.
- I can type in a mana cost and see what can be played.
- I can type in a name and see cards matching the name.
- I can use a cmc slider to see cards between a certain cmc range.
- I can show/hide cards of different rarities.
- I can sort the cards by colour.
- I can sort the cards by cmc.

## Tests

- Filtering by mana cost:
  - [x] There should be a filters object on state
  - [x] There is an input field for mana cost
    - [x] it should render correctly
    - [ ] it should only accept a valid mana cost
    - [x] it should call onChange when changed (set mana cost filter)
    - [x] it should filter cards according to the provided manaCost

- [x] There is a button to sort card by colour
  - [x] it should render correctly

- [x] There is a button to sort cards by cmc
  - [x] it should render correctly

- [x] There is a select element to select the set
