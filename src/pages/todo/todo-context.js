import React, { createContext, useReducer } from "react";
import UUID from "pure-uuid";

const initContext = () => ({
  todos: [],
  isDirty: false
});

const initItem = () => {
  return {
    id: new UUID(4).toString(),
    value: "",
    isdone: false,
    create_date: new Date().toISOString(),
    done_date: new Date(9999),
  };
};

export const TodoContext = createContext();

export const TODO_ADD = "TODO_ADD";
export const TODO_UPDATE = "TODO_UPDATE";
export const TODO_LOAD = "TODO_LOAD";
export const TODO_DELETE = "TODO_DELETE";
export const TODO_SYNC = "TODO_SYNC";

const reducer = (state, action) => {
  var newState = JSON.stringify(state);
  newState = JSON.parse(newState);
  newState.isDirty = true;
  const { data } = action;
  switch (action.type) {
    case TODO_ADD:
      let newItem = initItem();
      newItem.value = data.value;
      newState.todos.push(newItem);
      break;
    case TODO_UPDATE:
      const item = newState.todos.find(item => item.id === data.id)
      item.isdone = data.isdone;
      if(item.isdone === true){
        item.done_date = new Date();
      } else {
        item.done_date = new Date(9999);
      }
      break;
    case TODO_LOAD:
      newState.todos = data;
      newState.isDirty = false;
      break;
    case TODO_DELETE:
      newState.todos.removeById(data.id);
      break;
    case TODO_SYNC:
      newState.isDirty = false;
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
