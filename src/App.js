import React, { Component } from 'react';
import Api from './services/github-api'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user:{},
    selected_user: {},
    show_profile: false,
  }

  async componentDidMount(){
    const users = await Api.users()
    this.setState({ users })
  }

  onSearchUser = async (event ) => {
    const user_name = event.target.value
    if (user_name === ""){
      this.setState({ user: {} })
    }
    else{
      const user = await Api.searchs(user_name)
      this.setState({ user })
    }
  }
  onClickUser = user => () => {
    this.setState({ selected_user: user, show_profile: true })
  }

  render() {
    const { users, user, selected_user, show_profile } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="Search-wrapper">
          <input
            type="text"
            placeholder="Search Github Profile"
            onChange={this.onSearchUser}
          />
          { user.avatar_url  &&
              <div className="Result-wrapper"
                onClick={this.onClickUser(user)}
              >
                <img className="Avatar" src={user.avatar_url} />
                <span>{user.login}</span>
              </div>

          }
        </div>
        { !show_profile &&
          <div className="List-wrapper">
            { users.map(user => (
              <UserCard key={user.avatar_url} user={user} onClickUser={this.onClickUser(user)} />
            ))}
          </div>
        }
      </div>
    );
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  Plus(point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}
global.Point = Point

export default App;

const UserCard = ({ user, onClickUser }) => (
  <div className="User-container"
  onClick={onClickUser}
  >
    <span>{user.login}</span>
    <img className="Avatar" src={user.avatar_url} />
  </div>
)