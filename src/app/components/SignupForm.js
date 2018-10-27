import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup } from '../actions/signupAction';
import swal from "sweetalert";



/**
 *
 *
 * @class Signin
 */

class Signup extends Component{
    constructor(props){
        super(props)

        this.state={
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this)
    }

    componentDidMount(){
       
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value,
        });
      }


      handleSignup(event){
          event.preventDefault();
            this.props.signup(this.state, this.props.history);
      }
    

    render(){
        return(
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                <form className="white vertical-align">
                <h5 className="center">Create Account</h5>
                    <br/>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="username" />
                    </div>
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

                     <div className="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                         className="form-control" 
                        placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.handleSignup}>Submit</button>
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
      error: state.auth.error,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ signup }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Signup);
// export default Signup;