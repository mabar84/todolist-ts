import React, {useEffect, useState} from "react";
import {todolitstsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null)

    const getTodolistsHandler = () => {

        if (!state) {
            todolitstsAPI.getTodolitsts()
                .then((response) => {
                    if (response) {
                        setState(response.data)
                    }
                })
        }
    }

    let obj: Array<string> = []

    if (state) {
        state.map((s: any) => {
            obj.push(JSON.stringify(s))
        })
    }

    return <div>
        Количество тудулистов {obj.length}

        {obj.map((o, index) => <p>{`${index + 1}) ${o}`}</p>)}
        <div>
            <button onClick={getTodolistsHandler}>get todolists</button>
        </div>
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolistsHandler = () => {
        // const title = 't-10-22 pm'
        todolitstsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {state ? JSON.stringify(state) : ''}
        <p></p>
        <input placeholder={'newTodolistTitle'} value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={createTodolistsHandler}>Create todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolistHandler = () => {
        todolitstsAPI.deleteTodolist(todolistId)
            .then((res) => {
                    setState(res.data)
                }
            )
    }

    return <div>
        {state ? JSON.stringify(state) : ''}
        <p></p>
        <input placeholder={'todolistId should delete'} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={deleteTodolistHandler}>Delete todolist</button>
        </div>
    </div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const updateTodolistHandler = () => {
        todolitstsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        {state ? JSON.stringify(state) : ''}
        <p></p>
        <input placeholder={'todolistId should update'} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={'newTitle'} value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={updateTodolistHandler}>Update todolist</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasksHandler = () => {
        //const todolistId = '53dce3b8-ef34-4be1-a8a2-bb4de28f4836'

        if (!state) {
            todolitstsAPI.getTasks(todolistId)
                .then((response) => {
                    setState(response.data.items)
                })
        }
        console.log(state)
        console.log(todolistId)

    }

    let obj: Array<string> = []

    if (state) {
        state.map((s: any) => {
            obj.push(JSON.stringify(s))
        })
    }

    return <div>
        <p>Введите id тудулиста, таски которого интересуют</p>
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <p> Количество тасок в тудулисте {obj.length}</p>

        {obj.map((o, index) => <p>{`${index + 1}) ${o}`}</p>)}
        <div>
            <button onClick={getTasksHandler}>get tasks</button>
        </div>
    </div>
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
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "53dce3b8-ef34-4be1-a8a2-bb4de28f4836"
        const taskId = "ceba8242-9aa7-4b23-b1d1-06df77eaf76c"
        const title = '88888888888'
        const description = ''
        const completed = false
        const status = 0
        const priority = 0
        const startDate = ''
        const deadline = ''
        todolitstsAPI.updateTask(todolistId, taskId, title, description,
            completed, status, priority, startDate, deadline)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}