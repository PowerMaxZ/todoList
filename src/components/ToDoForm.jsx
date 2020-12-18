import React from 'react';
import { Form, Input, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons'

export const ToDoForm = (props) => {
  const { onSubmit, onRemoveAll } = props;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (onSubmit) {
      onSubmit(values.title, values.description);
    }
    form.resetFields();
  }

  const removeAll = () => {
    onRemoveAll();
  }

  return (
    <Form className="todo-form" form={form} layout={'inline'} onFinish={onFinish}>
      <Form.Item name="title" className="todo-form-input">
        <Input placeholder={'Todo title'} />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="Todo description"/>
      </Form.Item>
      <Form.Item className="todo-form-actions">
        <Button htmlType="submit" type="primary">Add</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={removeAll}><DeleteTwoTone twoToneColor="black"/></Button>
      </Form.Item>
    </Form>
  )
}
