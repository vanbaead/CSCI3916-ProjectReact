import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Register extends Component {

    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details:{
                name: '',
                username: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch, navigate} = this.props;
        dispatch(submitRegister(this.state.details, navigate));
    }

    render(){
        return (
            <Form className='form-horizontal'>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.name} type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.password}  type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={this.register}>Register</Button>
                <Form.Text style={{ display: 'block', marginTop: '10px' }}>
                    Already Have An Account? <Link to="/login">Log In</Link>
                </Form.Text>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Register);