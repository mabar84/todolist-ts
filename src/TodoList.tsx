import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task: TaskType, index: number) => (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone} readOnly={true}/>
                            <span>{task.title}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                                onClick={() => {
                                    props.removeTask(task.id)
                                }}>
                                X
                            </button>
                        </li>
                    ))}
            </ul>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    )
}