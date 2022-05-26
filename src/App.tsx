import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {

    let task1: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]

    let task2: Array<TaskType> = [
        {id: 1, title: "Duna", isDone: false},
        {id: 2, title: "Terminator", isDone: true},
        {id: 3, title: "BrilliantHand", isDone: true}
    ]

    let task3: Array<TaskType> = [
        {id: 1, title: "XXX", isDone: false},
        {id: 2, title: "Romeo&Julia", isDone: false},
        {id: 3, title: "Viy", isDone: true}
    ]

    return (
        <div className="App">
            <TodoList title="First1" tasks={task1}/>
            <TodoList title="Second" tasks={task2}/>
            <TodoList title="Third" tasks={task3}/>
        </div>
    );
}

export default App;
