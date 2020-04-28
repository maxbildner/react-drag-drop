import React from 'react';
import './App.css';


const LOGO_PATHS = [
  process.env.PUBLIC_URL + '/images/react-logo.png',
  process.env.PUBLIC_URL + '/images/ruby-logo.png'
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category1: [LOGO_PATHS[0], LOGO_PATHS[1], null, null],
      category2: [null, null, null, null],
    }
  }


  handleOnDragStart = (e, logoPath) => {
    console.log(logoPath);
    e.dataTransfer.setData("id", logoPath);
  }

  handleOnDragOver = (e, idx) => {
    e.preventDefault();
  }

  handleOnDragEnter = (e, idx) => {
    e.preventDefault();
    e.target.className += ' hovered';
  }

  handleOnDragLeave = (e, idx) => {
    e.preventDefault();
    e.target.className = 'category-li';
  }


  handleOnDrop = (e, idx, type) => {
    let id = e.dataTransfer.getData("id");

    let newState = {
      category1: this.state.category1.slice(),
      category2: this.state.category2.slice(),
    }
    
    // loop through each category array in state
    for (let category in newState) {
      
      // loop through each url path in category array
      newState[category].forEach((logoPath, i) => {
        
        // if there's a match, reset old value to null
        if (logoPath === id) {
          newState[category][i] = null;
        }
      });
    }

    newState['category' + type][idx] = id;

    e.target.className = 'category-li';
  
    this.setState({
      ...newState
    });
  }


  renderCategories = (type) => {
    return(
      this.state['category' + type].map((logoPath, idx) => {

        // add onDragStart event listeners to all images
        if (logoPath) {
          return (
            <li 
              key={idx}
              className="category-li"
            >
              <img 
                src={logoPath} 
                className="logos"
                onDragStart={(e)=> this.handleOnDragStart(e, logoPath)}
              />
            </li>
          );
        } else {
          // add onDragOver and onDrop event listeners to all li's
          return(
            <li 
              key={idx}
              onDragOver={(e)=> this.handleOnDragOver(e, idx)}
              onDragEnter={e=> this.handleOnDragEnter(e, idx)}
              onDragLeave={e=> this.handleOnDragLeave(e, idx)}
              onDrop={(e)=> this.handleOnDrop(e, idx, type)}
              className="category-li"
            >
            </li>
          );
        }
      })
    );
  }


  render() {
    return (
      <div className="App">
        <ul className="category1">
          {this.renderCategories(1)}
        </ul>

        <ul className="category2">
          {this.renderCategories(2)}
        </ul>
      </div>
    );
  }
}

export default App;
