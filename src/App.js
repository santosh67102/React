import React, { Component } from "react";
import AppStyle from "./App.css";
import Person from "./Components/Person";

class App extends Component {
  state = {
    persons: [
      { id: "a123b", name: "Max", age: 28 },
      { id: "b234c", name: "Santosh", age: 27 },
      { id: "c345d", name: "Manu", age: 37 }
    ],
    otherState: " some other value",
    showContent: false
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    }; //const person = Object.assign({}, this.state.persons[personIndex])  this is if we are not using spread.. to assign another similar object.. primitive method
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  };

  toggleDivPresentation = () => {
    const toggleDisplay = this.state.showContent;
    this.setState({
      showContent: !toggleDisplay
    });
  };
  deletePerson = deleteIndex => {
    const persons = [...this.state.persons];
    persons.splice(deleteIndex, 1);
    this.setState({
      persons: persons
    });
  };

  render() {   
    let persons = null;
    let btnClass = '';

    if (this.state.showContent) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                click={() => this.deletePerson(index)}
                age={person.age}
                key={person.id}
                change={event => this.nameChangeHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      btnClass= AppStyle.Red;     
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(AppStyle.red); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push(AppStyle.bold); //classes =['red', 'bold']
    }

    return (
        <div className={AppStyle.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is my fisrt react project</p>
          <hr />
          <button 
          className={btnClass}
          onClick={this.toggleDivPresentation}>
            Display content
          </button>

          {persons}
        </div>
    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!'));
  }
}
export default App;
