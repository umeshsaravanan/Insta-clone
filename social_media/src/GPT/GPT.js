import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./chat";


function GPT() {

  return( 
  <div className="app">
      <Chat />
  </div>
  );
}

export default GPT;
 