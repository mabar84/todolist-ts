import React, {useEffect, useState} from "react";
import {todolitstsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolitstsAPI.getTodolitsts()
            .then((response) => {
                setState(response.data)
            })
    }, [])

    let answer = JSON.stringify(state)
    console.log(answer)
    let arr = JSON.parse(answer)
    console.log(arr)

    return <div> {JSON.stringify(state)} </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 't-10-22 pm'
        todolitstsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '787ac133-8eb6-4720-b0e3-d1b1afa0bc64'
        todolitstsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const UpdateTodoListsTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '10fcffd8-bad8-423d-b349-c1a11cb3d1a2'
        const title = 'upd-23:44'
        todolitstsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '53dce3b8-ef34-4be1-a8a2-bb4de28f4836'

    useEffect(() => {
        todolitstsAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data.items)
            })
    }, [])

    let answer = JSON.stringify(state)
    console.log(answer)
    let arr = JSON.parse(answer)
    console.log(arr)

    return <div> {JSON.stringify(state)} </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '53dce3b8-ef34-4be1-a8a2-bb4de28f4836'
    const taskTitle = '!!!!!!!@##$@@$$!!@!@!@!#!@#!#!$!$'

    useEffect(() => {
        todolitstsAPI.createTask(todolistId, taskTitle)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId = "53dce3b8-ef34-4be1-a8a2-bb4de28f4836"
        const taskId = "570f9b06-d75c-4f99-a83c-be62d2fcdf81"
        todolitstsAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                console.log(response)
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const todolistId = '93903bd0-9345-42ae-890f-4dea53b218d9'
//
//     useEffect(() => {
//         todolitstsAPI.getTasks(todolistId)
//             .then((response) => {
//                 setState(response.data.items)
//             })
//     }, [])
//     return <div> {JSON.stringify(state)} </div>
// }
