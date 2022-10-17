import React, { Component } from 'react'

export class Child extends Component {
    constructor(props, ref) {
      super(props)
    console.log(ref)
    
    }

    getAlert=()=>{
        alert("Hi from child")
        console.log("Hello from child")
    }
  render() {
    return (
      <div>Child</div>
      
    )
  }
}

export default Child