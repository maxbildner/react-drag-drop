import React from 'react';
import './App.css';


const LOGO_PATHS = [
  process.env.PUBLIC_URL + '/images/react-logo.png',
  process.env.PUBLIC_URL + '/images/ruby-logo.png',
  process.env.PUBLIC_URL + '/images/html5-logo.png',
  process.env.PUBLIC_URL + '/images/rails-logo.png',
  process.env.PUBLIC_URL + '/images/psql-logo.jpg',
];

class App2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category1: [0, 1, 2, 3],          // nums refer to indexes in LOGO_PATHS
      category2: [4, null, null, null],
    }
  }


  handleOnDragStart = (e, oldCategory, idx) => {
    e.dataTransfer.setData("categoryPlusIdx", oldCategory + ' ' + idx);
  }


  handleOnDragOver = (e) => { 
    e.preventDefault();
    // debugger 
    console.log('dragover');
    e.currentTarget.style.backgroundColor = "lightblue";
  }


  handleOnDragEnter = (e) => {
    e.preventDefault();
    // e.currentTarget == <ul id="category2" class="container"><li class="category-li"></li><li class="category-li"></li><li class="category-li"></li><li class="category-li"></li></ul>
    console.log('enter', e.currentTarget);
  }
  

  handleOnDragLeave = (e) => {
    e.preventDefault();
    
    // e.currentTarget == <ul id="category2" class="container"><li class="category-li"></li><li class="category-li"></li><li class="category-li"></li><li class="category-li"></li></ul>
    console.log('leave', e.currentTarget);

    // reset background to default color
    e.currentTarget.style.backgroundColor = "lightgrey";
  }


  handleOnDrop = (e, type) => {
    // old index position in array of logo path
    let oldIdx = e.dataTransfer.getData("categoryPlusIdx").split(" ")[1]

    // old category (where logo came from)
    let oldCategory = e.dataTransfer.getData("categoryPlusIdx").split(" ")[0]

    // logo path index
    let logoIdx = this.state[oldCategory][oldIdx]

    let newCategory = "category" + type;
    // e.currentTarget == <ul id="category2" class="container"><li class="category-li"></li><li class="category-li"></li><li class="category-li"></li><li class="category-li"></li></ul>

    let newState = {
      category1: this.state.category1.slice(),
      category2: this.state.category2.slice(),
    }

    // if container we're trying to drop image into is not full
    if (newState[newCategory].includes(null)) {

      // replace old value in with null
      newState[oldCategory][oldIdx] = null;

      // reassign new value in new category
      for (let i = 0; i < newState[newCategory].length; i++) {
        if (newState[newCategory][i] === null) {
          newState[newCategory][i] = logoIdx;
          break;
        }
      }
    }


    // reset background to default color
    e.currentTarget.style.backgroundColor = "lightgrey";

    this.setState({...newState});
  }


  renderCategories = (type) => {
    let oldCategory = 'category' + type;
    let listItems = this.state[oldCategory].map((logoIdx, idx) => {

      // add onDragStart event listeners to all images
      if (logoIdx != null) {
        return (
          <li key={idx} className="category-li">
            <img
              src={LOGO_PATHS[logoIdx]}
              className="logos"
              onDragStart={e => this.handleOnDragStart(e, oldCategory, idx)}
              alt="logo"
            />
          </li>
        );
      } else {
        return (
          <li key={idx} className="category-li"></li>
        );
      }
    })

    return (
      <ul 
        id={`category` + type} 
        className="container"
        onDragOver={e => this.handleOnDragOver(e)}
        onDragEnter={e => this.handleOnDragEnter(e)}
        onDragLeave={e => this.handleOnDragLeave(e)}
        onDrop={e => this.handleOnDrop(e, type)}
      >
        {listItems}
      </ul>
    );
  }


  render() {
    return (
      <div className="App">
        {this.renderCategories(1)}
        {this.renderCategories(2)}
      </div>
    );
  }
}

export default App2;
