import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <Navbar>
                <Container>
                    <Nav>Home</Nav>
                    <Nav href="/cart">Cart</Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
