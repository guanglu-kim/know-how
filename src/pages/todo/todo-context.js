import React, { createContext, useReducer } from "react";
import UUID from "pure-uuid";

const initContext = () => ({
  todos: []
});

const initItem = () => {
  return {
    id: new UUID(4).toString(),
    value: "",
    isdone: false
  };
};

export const TodoContext = createContext();

export const TODO_ADD = "TODO_ADD";
export const TODO_UPDATE = "TODO_UPDATE";
export const TODO_LOAD = "TODO_LOAD";
export const TODO_DELETE = "TODO_DELETE";

const reducer = (state, action) => {
  var newState = JSON.stringify(state);
  newState = JSON.parse(newState);
  const { data } = action;
  switch (action.type) {
    case TODO_ADD:
      let newItem = initItem();
      newItem.value = data.value;
      newState.todos.push(newItem);
      break;
    case TODO_UPDATE:
      newState.todos.find(item => item.id === data.id).isdone = data.isdone;
      break;
    case TODO_LOAD:
      newState.todos = data;
      break;
    case TODO_DELETE:
      newState.todos.removeById(data.id);
      break;
    default:
      return state;
  }
  return newState;
};

export const TodoProvider = props => {
  const [context, dispatch] = useReducer(reducer, initContext());

  return (
    <TodoContext.Provider value={{ context, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Array.prototype.removeById = function(id) {
  this.forEach(function(item, index, arr) {
    if (item.id === id) {
      arr.splice(index, 1);
    }
  });
  return this;
};
