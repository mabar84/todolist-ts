import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = "NewTitle"

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all"}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
    expect(endState[0].id).toBeDefined()
})

test("correct todolist should change its name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all"}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)

})

test("correct filter of todolist should should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all"}
    ]

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})