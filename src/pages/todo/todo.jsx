import React, { useContext, useState, useEffect } from "react";
import styles from "./todo.module.scss";
import axios from "axios";
import {
  TextField,
  Stack,
  PrimaryButton,
  Checkbox,
  IconButton
} from "office-ui-fabric-react";
import {
  TodoProvider,
  TodoContext,
  TODO_UPDATE,
  TODO_ADD,
  TODO_LOAD,
  TODO_DELETE
} from "./todo-context";

export default function Todo() {
  return (
    <TodoProvider>
      <Content />
    </TodoProvider>
  );
}

const service = axios.create({
  baseURL: "https://base-1300487490.cos.ap-chengdu.myqcloud.com/todo.json",
  timeout: 2000
});

function Content() {
  const { context, dispatch } = useContext(TodoContext);
  const todos = context.todos;
  const stackTokens = { childrenGap: 10 };
  const [editValue, setEditValue] = useState();

  useEffect(() => {
    service
      .get()
      .then(response => dispatch({ type: TODO_LOAD, data: response.data }));
  }, [dispatch]);

  return (
    <div className={styles.Todo}>
      <h1 className="page-Title">待办事项</h1>
      <Stack className={styles.editStack} horizontal tokens={stackTokens}>
        <Stack.Item grow={3}>
          <TextField
            value={editValue}
            onChange={(ev, val) => setEditValue(val)}
            underlined
          ></TextField>
        </Stack.Item>
        <Stack.Item grow={1}>
          <PrimaryButton
            onClick={ev =>
              dispatch({ type: TODO_ADD, data: { value: editValue } })
            }
          >
            添加
          </PrimaryButton>
        </Stack.Item>
        <Stack.Item grow={1}>
          <PrimaryButton onClick={ev => service.put("", todos)}>
            同步
          </PrimaryButton>
        </Stack.Item>
      </Stack>
      <Stack className={styles.todoStack} tokens={stackTokens}>
        {todos.map(item => (
          <div className={styles.todoItem} key={item.id}>
            <div>
              <Checkbox
                key={item.id}
                label={item.value}
                checked={item.isdone}
                onChange={(ev, isChecked) =>
                  dispatch({
                    type: TODO_UPDATE,
                    data: { ...item, isdone: isChecked }
                  })
                }
              ></Checkbox>
            </div>
            <div>
              <IconButton
                iconProps={{ iconName: "StatusCircleErrorX" }}
                className={styles.deleteButton}
                onClick={() =>
                  dispatch({ type: TODO_DELETE, data: { ...item } })
                }
              ></IconButton>
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
}
