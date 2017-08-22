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
    organizations: [],
    followers:[],
    followings:[],
    repos:[],

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
  onClickUser = user => async() => {
    const organizations = await Api.organizations(user.login)
    const followers = await Api.followers(user.login)
    const followings = await Api.followings(user.login)
    const repos = await Api.repos(user.login)
    this.setState({ selected_user: user, show_profile: true, user:{} })
    this.setState({ organizations, followers, followings, repos})
  }
  onClickBtnDelete = (event) =>{
    this.setState({show_profile: false, user:{}, selected_user:{}, followings:[], followers:[], organizations:[], repos:[]})
  }

  render() {
    const { users, user, selected_user, show_profile, followings, followers, repos, organizations } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="searchs-wrapper">
          <div className="inputs-wrapper">
            { show_profile &&
              <div>
                Reset Search
                <button
                  className="btn-delete"
                  onClick={this.onClickBtnDelete}
                > x
                </button>
              </div>
            }
            { !show_profile &&
              <input
                type="text"
                placeholder="Search Github Profile"
                onChange={this.onSearchUser}
              />
            }
          </div>
          { user.avatar_url  &&
              <div className="result-wrapper"
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
        { show_profile &&
          <div className="user-profile">
            <div className="user-info">
              <img src={selected_user.avatar_url} className="profile-avatar" />
              <span className="user-name"> {selected_user.login}</span>
            </div>
            <div className="user-data">
              { repos.length > 0 &&
                <div className="List-wrapper">
                    <h4 className="section-name">Repos </h4>
                  { repos.map(repo => (
                    <span className="line-block">
                      <a href={repo.clone_url}>{repo.clone_url}</a>. Description: {repo.description}
                    </span>
                    ))}
                </div>
              }
              { followers.length > 0 &&
                <div className="List-wrapper">
                  <h4 className="section-name">Followers: {selected_user.followers}</h4>
                  { followers.map(user => (
                    <UserCard key={user.avatar_url} user={user} onClickUser={this.onClickUser(user)} />
                  ))}
                </div>
              }
              { followings.length > 0 &&
                <div className="List-wrapper">
                  <h4 className="section-name">Followings: {selected_user.followings}</h4>
                  { followings.map(user => (
                    <UserCard key={user.avatar_url} user={user} onClickUser={this.onClickUser(user)} />
                  ))}
                </div>
              }
            </div>
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