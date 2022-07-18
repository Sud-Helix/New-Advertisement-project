import React from "react";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Headers from "./components/headers/Headers";
import MainPages from "./components/mainpages/MainPages";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Headers />
        <MainPages />
      </div>
    </DataProvider>
  );
}

export default App;
