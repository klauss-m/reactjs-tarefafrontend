import React from 'react';
import { Navbar, Container, Nav, NavbarBrand } from 'react-bootstrap';

export function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavbarBrand href="#home">Tarefas</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/tarefas">Tarefas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
