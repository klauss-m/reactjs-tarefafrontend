import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Tasks } from './pages/Tasks';
import { TaskForm } from './pages/Tasks/Form';
import { Detail } from './pages/Tasks/Detail';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tarefas" exact component={Tasks} />
      <Route path="/tarefas_cadastro" exact component={TaskForm} />
      <Route path="/tarefas_cadastro/:id" exact component={TaskForm} />
      <Route path="/tarefas/:id" exact component={Detail} />
    </Switch>
  );
}
