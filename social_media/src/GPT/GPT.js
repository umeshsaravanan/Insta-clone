import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./chat";

function GPT() {

  return( 
  <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/gpt" element={<Chat />} />
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default GPT;
 