import React, { useState, useReducer } from "react";
import "./style.css";

export default function App() {
  const [input, setInput] = useState();
  const [exists, setexists] = useState(false);
  const [todos, dispatch] = useReducer(
    (todos, { type, value }) => {
      switch (type) {
        case "add":
          const isExists = todos.filter(todo => todo.text === value.text);
          if (isExists.length) {
            setexists(true);
            return todos;
          }
          setexists(false);
          setInput("");
          return [...todos, value];
        case "remove":
          return todos.filter((_, index) => index !== value);
        case "done":
          return [
            ...todos.slice(0, value),
            Object.assign({}, todos[value], { status: true }),
            ...todos.slice(value + 1)
          ];
        default:
          return todos;
      }
    },
    [{ text: "learn hooks", status: false }]
  );
  console.log(todos);
  return (
    <div>
      <h1>My Todo List</h1>
      {exists ? (
        <p className="alert">
          Already added
          <br />
          <br />
        </p>
      ) : (
        ""
      )}
      <input value={input} onInput={e => setInput(e.target.value)} />
      <button
        onClick={() =>
          dispatch({ type: "add", value: { text: input, status: false } })
        }
      >
        Add Todo
      </button>
      <ul class="todo-list">
        {todos.map((data, index) => {
          return (
            <li>
              <p class={data.status ? "done" : "pending"}>{data.text}</p>
              <button
                disabled={data.status}
                onClick={() => dispatch({ type: "done", value: index })}
              >
                {data.status ? "Complated" : "Mark as complete"}
              </button>
              <button
                disabled={data.status}
                onClick={() => dispatch({ type: "remove", value: index })}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
