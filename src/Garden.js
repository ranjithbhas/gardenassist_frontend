import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

// Home page that links between Flower Garden and Fruits Gardem
// Uses router links to redirect.

class Garden extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                     <Button color="link"><Link to="/flowerslist">My Flowering Buddies</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Garden;