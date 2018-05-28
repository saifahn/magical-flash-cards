import React, { Component } from 'react';
import Main from './main/Main';
import Header from './header/Header';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <Main />
  </div>
);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Header />
//         <Main />
//       </div>
//     );
//   }
// }

export default App;
