import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFriend } from "../actions/addFriend";


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.add=this.add.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }


  add() {
    this.props.addFriend(this.state);
  }

  componentDidMount() {

  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
        [event.target.name]: event.target.value,
    });
}

  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Black Box</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>

            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" 
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
              placeholder="enter username" aria-label="Search" />
             
            </form>
            <button 
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={this.add}
              >Add friend</button>
              <button 
                className="btn btn-outline my-2 my-sm-0"
                onClick={event=>{
                  event.preventDefault();
                  window.localStorage.removeItem('userToken');
                  history.pushState('/')
                }}
              >signout</button>
          </div>
        </nav>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//     return {
//       loggedIn: state.auth.loggedIn,
//       error: state.auth.error,
//       user:state.auth.user,
//       userInfo:state.auth.userInfo,
//       userId : state.auth.user.userId
//     };
//   }

  const mapDispatchToProps = (dispatch) => {
     return bindActionCreators({ addFriend }, dispatch);
  }

  export default connect(null, mapDispatchToProps)(Header);



// export default Header;