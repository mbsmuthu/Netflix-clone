import React from "react";
import Home from "./Components/Home";
import Search from "./Components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parent from "./Parent"


export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="/search" element={<Search/>}></Route>
    //   </Routes>
    // </BrowserRouter>
    <Parent></Parent>

  )
}
