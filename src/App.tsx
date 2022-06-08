import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function addTask(newTaskTitle: string) {
        const newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }

        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
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
                addTask={addTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title="Second" tasks={task2}/>*/}
            {/*<TodoList title="Third" tasks={task3}/>*/}
        </div>
    );
}

export default App;
