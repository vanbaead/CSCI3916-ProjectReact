import React, { Component } from "react";
import { submitLogin } from "../actions/authActions";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class login extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            details:{
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

    login() {
        const {dispatch, navigate} = this.props;
        dispatch(submitLogin(this.state.details, navigate));
    }

    render() {
        return (
            <Form className='form-horizontal'>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.updateDetails} value={this.state.details.password}  type="password" placeholder="Password" />
            </Form.Group>
            <Button onClick={this.login}>Sign in</Button>
            <Form.Text style={{ display: 'block', marginTop: '10px' }}>
                Don't Have An Account? <Link to="/signup">Sign Up</Link>
            </Form.Text>
        </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(login);