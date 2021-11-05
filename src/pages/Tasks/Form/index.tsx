import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import api from '../../../services/api';
import './index.css';

interface TaskProps {
  title: string;
  description: string;
}

export function TaskForm() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<TaskProps>({
    title: '',
    description: '',
  });

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {
      findTask(id);
    }
  }, [id]);

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  function pageBack() {
    history.goBack();
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/tasks/${id}`, model);
    } else {
      const response = await api.post('/tasks/', model);
    }
    pageBack();
  }

  async function findTask(id: string) {
    const response = await api.get<TaskProps>(`/tasks/${id}`);
    setModel({
      title: response.data.title,
      description: response.data.description,
    });
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Nova Tarefa</h1>
        <Button variant="dark" size="sm" onClick={pageBack}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
}
