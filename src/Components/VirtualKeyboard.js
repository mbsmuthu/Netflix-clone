import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";


const VirtualKeyboard=forwardRef((props)=> {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const inputRef = useRef();

    useEffect(()=>{
        props.handleInputChange(input);
    },[input])
  

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
    
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    
    inputRef.current.focus();
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") {handleShift()}
    else{
        console.log("Other button:",button)
        setInput(inputRef.current.value)
    };
  };

  const onChangeInput = (event) => {
    
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
    props.handleInputChange(input);
    

  };

  return (
    <div className="virtual-keyboard">
        {console.log("V")}
      <input
        ref={inputRef}
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        className="app-header-searchbar"
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
})

export default VirtualKeyboard;



