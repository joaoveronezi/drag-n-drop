import React from "react";
import "./App.css";
import DragNDrop from "./components/DragNDrop";

const data = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button type="button" className="new-group">
            Novo Grupo
          </button>
        </div>
        <DragNDrop data={data} />
      </header>
    </div>
  );
}

export default App;
