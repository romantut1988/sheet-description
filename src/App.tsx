import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const truck = "What to learn"
    const truck1 = "What to learn2222"

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "React", isDone: false},
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I ams Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist truck={truck} tasks={tasks1}/>
            <Todolist truck={truck1} tasks={tasks2}/>
        </div>
    );
}

export default App;
