import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { StringMappingType } from "typescript";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  function removeTask(id: string, todolistID: string) {
    let tasks = tasksObj[todolistID];

    let filteredTasks = tasks.filter((t) => t.id != id);
    tasksObj[todolistID] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(newTaskTitle: string, todolistID: string) {
    let task = {
      id: v1(),
      title: newTaskTitle,
      isDone: false,
    };
    let tasks = tasksObj[todolistID];

    let newTasks = [task, ...tasks];

    tasksObj[todolistID] = newTasks;

    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
    let tasks = tasksObj[todolistID];

    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(value: FilterValuesType, todolistID: string) {
    let todolist = todolists.find((tl) => tl.id === todolistID);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {
      id: todolistID1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todolistID2,
      title: "What to buy",
      filter: "completed",
    },
  ]);

  let removeTodolist = (todolistID: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id != todolistID);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistID];
    setTasks({ ...tasksObj });
  };

  let [tasksObj, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "book", isDone: false },
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "kefir", isDone: false },
    ],
  });

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}

      {/*<TodoList title="Second" tasks={task2}/>*/}
      {/*<TodoList title="Third" tasks={task3}/>*/}
    </div>
  );
}

export default App;
