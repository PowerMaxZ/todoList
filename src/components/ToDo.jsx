import React, { useState } from 'react';
import { Card, Divider, message } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';


export const ToDo = () => {
  const [todos, setTodos] = useState([
    {id: 1, name: 'some', description: 'description 1', date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false},
    {id: 2, name: 'another one', description: 'description 2', date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            onRemove={onRemove} 
            onCheck={onCheck} 
          />) }
      </ul>
    )
  }

  const countUncheked = () => {
    let index = 0;
    let number = 0;
    while (index !== todos.length) {
      if (!todos[index].checked)
        number++;
      index++;
    }
    return number;
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== 0 || index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      const todo = todos[index];

      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);

      setTodos([...todos]);
      if (todo.checked)
        message.info("Checked!", 2);
      else
        message.info("Unchecked!", 2);
    }
  }

  const onSubmit = (name, description) => {
    if (name != null && description != null && name.length > 2 && description.length > 2 && name[0] === name[0].toUpperCase()) {
      const todo = {
        id: idCount,
        name,
        description,
        checked: false,
        date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -')
      };
      setTodos([...todos, todo]);
      setIdCount(idCount + 1);
      message.success('Success!', 2);
    }
    else {
      message.error('Error adding todo! Name and description should contain at least 3 symbols and name must begin with upper case letter.', 5);
    }
  } 

  const onRemoveAll = () => {
    if (todos.length === 0)
      message.error("Todo list is empty!", 2);
    else {
      setTimeout(function () {
        while (todos.length !== 0)
          onRemove(0);
      }, 500);
      message
      .loading('Action in progress..', 1)
      .then(() => message.success('Cleared', 2))
    }
  }

  return (
    <Card title={'My todos: ' + countUncheked() + " out of " + todos.length + " are unchecked."} className="todo-card">
      <ToDoForm onSubmit={onSubmit} onRemoveAll={onRemoveAll} />
      <Divider />
      { renderTodoItems(todos) }
    </Card>
  );
}
