import React, { Component } from 'react';


import { Container, Table } from 'reactstrap';
import { Button, ButtonGroup} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


//Main page for flower garden
//Ajax connection with Java page to delete data from the postgres database.
//Bootstrap for styling the HTML components

class FlowerList extends Component {


     constructor(props) { 
        super(props); //Pass state
        this.state = {flowergarden: []}; //Initiate array to hold state
        this.remove = this.remove.bind(this); 
        
    }
//the componentDidMount function is calling our API to load our flowers list.
   componentDidMount() {
       //FlowerGarden is Spring-boot API rest controller 
        fetch('https://mygarden-assistant.herokuapp.com/FlowerGarden/')
            .then(response => response.json())
            .then(data => this.setState({flowergarden: data})); //set state with data from the Postgres DB

            
    }
//API call to delete selected flower from the postgres DB.
    async remove(plant_id) {
        await fetch(`https://mygarden-assistant.herokuapp.com/FlowerGarden/${plant_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE',
                'mode': 'no-cors'
            }
        }).then(() => {
            let updatedFlowers = [...this.state.flowergarden].filter(i => i.plant_id !== plant_id); //new array minus the flower deleted.
            this.setState({flowergarden: updatedFlowers}); //setstate with updated flowers list.
        });

    
    }
    render() {
        const {flowergarden} = this.state; //array set with flowers data.
      
        /*console.log(flowergarden)*/
        
    
        // map each flower data from Postgres table to HTML element.
         const flowerList = flowergarden.map (flowergarden => {
            return <tr key={flowergarden.plant_id}>
                <td style={{whiteSpace: 'nowrap'}}>{flowergarden.name}</td>
                <td>{flowergarden.plant_type}</td>
                <td>{flowergarden.seasonality}</td>
                <td>{flowergarden.water_duration}</td>
                <td>{flowergarden.planting_date}</td>
                <td>{flowergarden.end_date}</td>
                <td>{flowergarden.fertilization_need1}</td>
                <td>{flowergarden.fertilization_duration1}</td>
                <td>{flowergarden.fertilization_need2}</td>
                <td>{flowergarden.fertilization_duration2}</td>
           
                <td>
      {/* Add an EDIT and DELETE button to each flower HTML element */}           
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/flowerslist/" + flowergarden.plant_id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(flowergarden.plant_id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            
            </tr>
        });
        return (
            <div>
                <AppNavbar/> 
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/flowerslist/new">Add Flowers</Button>  {/* Link to add a new flower to the Postgres DB */}
                    </div>
                    <h2>Flowering Plants</h2>
                    <Table className="mt-4">
            {/* Header for the flowers list */}
                        <thead>
                        <tr>
                            <th width="5%">Name</th>
                            <th width="5%">Plant Type</th>
                            <th width="5%">Seasonality</th>
                            <th width="5%">Watering Duration</th>
                            <th width="5%">Planting Date</th>
                            <th width="5%">End Date</th>
                            <th width="5%">Fertilization Need 1</th>
                            <th width="5%">Fertilization Duration 1</th>
                            <th width="5%">Fertilization Need 2</th>

                            <th width="5%">Fertilization Duration2</th>
                            </tr>
                        </thead>
                        <tbody>
            {/* Call the variable holding data from the database*/}
                        {flowerList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default FlowerList;