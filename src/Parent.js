import React, { Component } from 'react';
import Child from "./Child"

export class Parent extends Component {
    constructor(props) {
      super(props)
    
     this.childRef = React.createRef();
    // this.child = React.createRef();
    }

    clickHandler =() =>{
        console.log(this.childRef.current);
        this.childRef.current.getAlert();
    }
  render() {
    return (
      <div>
       
        <Child ref={this.childRef}></Child>
        <button onClick={this.clickHandler}>Click child</button>
      </div>
    )
  }
}

export default Parent