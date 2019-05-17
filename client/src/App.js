import React from 'react';
import logo from './logo.svg';
import './App.css';

import Register from "./Register";
import Registries from "./Registries";


class App extends React.Component {

  state = { loading: true, drizzleState: null };


  componentDidMount() {
    const { drizzle } = this.props;

    //subscribe the changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      //every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      //check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">

        <Registries
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <Register
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );

  }
}

export default App;