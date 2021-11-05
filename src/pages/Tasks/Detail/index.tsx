import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { DateTime } from 'luxon';
import api from '../../../services/api';
import './index.css';

interface TaskProps {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: string;
  updated_at: string;
}

export function Detail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskProps>();

  function pageBack() {
    history.goBack();
  }

  async function findTask() {
    const response = await api.get<TaskProps>(`/tasks/${id}`);
    setTask(response.data);
    console.log(response);
  }

  useEffect(() => {
    findTask();
  }, [id]);

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Detalhes da Tarefa</h1>
        <Button variant="dark" size="sm" onClick={pageBack}>
          Voltar{' '}
        </Button>
      </div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
            <br />
            {task?.finished ? 'Finalizado' : 'Pendente'}
            <br />
            <strong>Data de Cadastro:</strong>
            {DateTime.fromISO(task?.updated_at!).toFormat('D')}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
