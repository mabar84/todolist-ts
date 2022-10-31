import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: "Task Component",
    component: Task
}

const changeStatusCallback = action("status changed")
const changeTaskTitleCallback = action("title changed")
const removeTaskCallback = action("task removed")

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{
                id: "1", title: "CSS", status: TaskStatuses.Completed
                , todoListId: 'todolistIs1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }}
            changeTaskStatus={changeStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistID={"todolistIs1"}
        />
        <Task
            task={{
                id: "2", title: "JS", status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }}
            changeTaskStatus={changeStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistID={"todolistIs2"}
        />
    </>
}