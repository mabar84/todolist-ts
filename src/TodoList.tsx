import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {log} from "util";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (newTaskTitle: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === "Enter") onClickHandler()
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveHandler = () => props.changeFilter("active")
    const onCompletedHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task: TaskType) => {

                        const onRemoveHandler = () => props.removeTask(task.id)

                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} readOnly={true}/>
                            <span>{task.title}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={onRemoveHandler}>X</button>
                        </li>

                    })
                }
            </ul>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveHandler}>Active</button>
            <button onClick={onCompletedHandler}>Completed</button>
        </div>
    )
}