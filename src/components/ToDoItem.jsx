import React from 'react';
import { Button, Checkbox, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove } = props;
  const onRemoveItem = (e) => {
    e.preventDefault();

    if (onRemove) {
      onRemove(item.id);
    }
  }

  const onCheckItem = () => {
    if (onCheck) {
      onCheck(item.id);
    }
  }

  return (
    <li className="todo-item" key={item.id}>
            <div className="todo-item-body">
              <Tooltip title="Created on + {item.date}">
            <Checkbox style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {}} className="title" checked={item.checked} onChange={onCheckItem}>
                {item.name} 
            </Checkbox>
            </Tooltip>
            <p style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {}} className="description">{item.description}</p>
            </div>
            <Button type="text" className="remove-button" onClick={onRemoveItem}><DeleteOutlined style={{color: "red"}} /></Button>
        </li>
  )
}