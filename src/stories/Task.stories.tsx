import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import React from "react";

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
            task={{id: "1", title: "CSS", isDone: true}}
            changeStatus={changeStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistID={"todolistIs1"}
        />
        <Task
            task={{id: "2", title: "JS", isDone: false}}
            changeStatus={changeStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistID={"todolistIs2"}
        />
    </>
}