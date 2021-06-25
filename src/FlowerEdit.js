import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

// Route called from the Flowers list main page.
// Called either to add a new flower to the Database or to edit a property of the flower
// passes state back to main page

class FlowerEdit extends Component {

    emptyItem = {
        name: '',
        plant_id: '',
        plant_type:'',
        planting_date:'',
        seasonality:'',
        watering_duration:'',
        fertilization_duration1:'',
        fertilization_duration2:'',
        fertilization_need1:'',
        fertilization_need2:'',
        end_date:''


    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        //console.log(this.props.match.params.plant_id)
        // props with plant_id = "new" for adding item to DB, plant_id != "New" for editing item already in DB.
        if (this.props.match.params.plant_id !== 'new') {
            const flowergarden = await (await fetch(`https://mygarden-assistant.herokuapp.com/FlowerGarden/${this.props.match.params.plant_id}`)).json();
            this.setState({item: flowergarden});
        }
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //it accepts values through the form
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }
    async handleSubmit (event) {
        event.preventDefault();
        const {item} = this.state;
    
        // For updating in DB, plant_id is prepopulated (call PUT method). For creating new record, plant_id is empty (Call POST method)
        await fetch('https://mygarden-assistant.herokuapp.com/FlowerGarden' + (item.plant_id ? '/' + item.plant_id : ''), {
            method: (item.plant_id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/flowerslist');
    }
    /*async handleSubmitAdd (event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('https://mygarden-assistant.herokuapp.com/FlowerGarden' + (item.plant_id ? '/' + item.plant_id : ''), {
            method: (item.plant_id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('https://mygarden-assistant.herokuapp.com/FlowerGarden');
    }*/
    render() {
        const {item} = this.state;
        const title = <h2>{item.plant_id ? 'Edit Flower' : 'Add Flowering Plant'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" plant_id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="plant_id">Plant ID</Label>
                        <Input type="text" name="plant_id" plant_id="plant_id" value={item.plant_id || ''}
                               onChange={this.handleChange} autoComplete="plant_id"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="plant_type">Plant Type</Label>
                        <Input type="text" name="plant_type" plant_id="plant_type" value={item.plant_type || ''}
                               onChange={this.handleChange} autoComplete="plant_type"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="seasonality">Seasonality</Label>
                        <Input type="text" name="seasonality" plant_id="seasonality" value={item.seasonality || ''}
                               onChange={this.handleChange} autoComplete="seasonality"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="watering_duration">Watering Duration</Label>
                        <Input type="text" name="watering_duration" plant_id="watering_duration" value={item.watering_duration || ''}
                               onChange={this.handleChange} autoComplete="watering_duration"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="planting_date">Planting Date</Label>
                        <Input type="text" name="planting_date" plant_id="planting_date" value={item.planting_date || ''}
                               onChange={this.handleChange} autoComplete="planting_date"/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="end_date">End Date</Label>
                        <Input type="text" name="end_date" plant_id="end_date" value={item.end_date || ''}
                               onChange={this.handleChange} autoComplete="end_date"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="fertilization_need1">Fertilization Need1</Label>
                        <Input type="text" name="fertilization_need1" plant_id="fertilization_need1" value={item.fertilization_need1 || ''}
                               onChange={this.handleChange} autoComplete="fertilization_need1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="fertilization_duration1">Fertilization Duration 1</Label>
                        <Input type="text" name="fertilization_duration1" plant_id="fertilization_duration1" value={item.fertilization_duration1 || ''}
                               onChange={this.handleChange} autoComplete="fertilization_duration1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="fertilization_need2">Fertilization Need2</Label>
                        <Input type="text" name="fertilization_need2" plant_id="fertilization_need2" value={item.fertilization_need2 || ''}
                               onChange={this.handleChange} autoComplete="fertilization_need2"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="fertilization_duration2">Fertilization Duration 2</Label>
                        <Input type="text" name="fertilization_duration2" plant_id="fertilization_duration2" value={item.fertilization_duration2 || ''}
                               onChange={this.handleChange} autoComplete="fertilization_duration2"/>
                    </FormGroup>

                   


                    <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/flowerslist">Cancel</Button>
                </FormGroup>
                
            </Form>
        </Container>
    </div>
}

}
export default withRouter(FlowerEdit);