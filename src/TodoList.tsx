import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistID: string) => void;
  addTask: (newTaskTitle: string, todolistID: string) => void;
  changeFilter: (value: FilterValuesType, todolistID: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistID: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistID: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onClickHandler = () => {
    if (newTaskTitle.trim() === "") {
      setError("Field is required");
      return;
    }
    props.addTask(newTaskTitle.trim(), props.id);
    setNewTaskTitle("");
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === "Enter") onClickHandler();
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveHandler = () => props.changeFilter("active", props.id);
  const onCompletedHandler = () => props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolist}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button onClick={onClickHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task: TaskType) => {
          const onRemoveHandler = () => props.removeTask(task.id, props.id);

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={task.isDone}
                readOnly={true}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <button
        className={props.filter === "all" ? "active-filter" : ""}
        onClick={onAllClickHandler}
      >
        All
      </button>
      <button
        className={props.filter === "active" ? "active-filter" : ""}
        onClick={onActiveHandler}
      >
        Active
      </button>
      <button
        className={props.filter === "completed" ? "active-filter" : ""}
        onClick={onCompletedHandler}
      >
        Completed
      </button>
    </div>
  );
}
