import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { DateTime } from 'luxon';

interface TaskProps {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: string;
  updated_at: string;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get<TaskProps[]>('/tasks');
    setTasks(response.data);
    console.log(response);
  }

  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`);
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  function newTask() {
    history.push('/tarefas_cadastro');
  }

  function editTask(id: number) {
    history.push(`/tarefas_cadastro/${id}`);
  }

  function viewTask(id: number) {
    history.push(`tarefas/${id}`);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tarefas</h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Nova Tarefa
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data de Atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{DateTime.fromISO(task.updated_at).toFormat('D')}</td>
              <td>{task.finished ? 'Finalizado' : 'Pendente'}</td>
              <td>
                {' '}
                <Button
                  size="sm"
                  variant="primary"
                  disabled={task.finished}
                  onClick={() => editTask(task.id)}
                >
                  Editar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="success"
                  disabled={task.finished}
                  onClick={() => finishedTask(task.id)}
                >
                  Finalizar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => viewTask(task.id)}
                >
                  Visualizar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Remover
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
