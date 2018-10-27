import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signin } from '../actions/signinAction';
import swal from 'sweetalert';



/**
 *
 *
 * @class Signin
 */

class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignin = this.handleSignin.bind(this);

    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSignin(event) {
        event.preventDefault();
        this.props.signin(this.state, this.props.history);
    }


    render() {
        return (

            <div className="row">
                <div className="col-md-4">

                </div>
                <div className="col-md-4">
                
                <form className="white vertical-align">
                <h5 className="center">Login Account</h5>
                <br/>

                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="form-control"
                           aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                         className="form-control" 
                        placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.handleSignin}>Submit</button>
                </form>
                </div>
                <div className="col-md-4">

                </div>

               
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        error: state.auth.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ signin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

// export default Signin;