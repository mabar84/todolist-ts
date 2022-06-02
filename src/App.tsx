import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState< Array<TaskType> >([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone )
    }

    // let task2: Array<TaskType> = [
    //     {id: 1, title: "Tune", isDone: false},
    //     {id: 2, title: "Terminator", isDone: true},
    //     // {id: 3, title: "BrilliantHand", isDone: true}
    // ]
    //
    // let task3: Array<TaskType> = [
    //     {id: 1, title: "XXX", isDone: false},
    //     {id: 2, title: "Romeo&Julia", isDone: false},
    //     {id: 3, title: "Viy", isDone: true}
    // ]

    return (
        <div className="App">
            <TodoList
                title="First1"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title="Second" tasks={task2}/>*/}
            {/*<TodoList title="Third" tasks={task3}/>*/}
        </div>
    );
}

export default App;
