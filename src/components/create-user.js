import React from 'react';
import axios from 'axios';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props) // always call this for subclasses
    
    this.state = {
      username: '',
    }
    
    // We want 'this' to refer to this class for every method
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }
  
  onSubmit = e => {
    e.preventDefault(); // .preventDefault() only for forms
    
    const user = {
      username: this.state.username,
    }
    
    console.log(user);
    
    // Send user data to backend
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));
    
    // Allow user to set multiple usernames after submitting the form (enter)
    this.setState({
      username: ''
    })
  }
  
  render() {
    return(
      <div>
        <h3>Create New User</h3>
        <form onSubmit={ this.onSubmit }>
          <div className='form-group'>
            <label>Username: </label>
            <input type='text'
              required
              className='form-control'
              value={ this.state.username }
              onChange={ this.onChangeUsername }
              />
          </div>
          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}