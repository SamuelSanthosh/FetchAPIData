import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Posts extends Component {
  state = {
    currentUser : {
      company: {}
    },
    posts: [],
  };
  async componentWillMount() {
    if(localStorage.getItem('currentUser') == undefined ) {this.props.history.push('/login'); return 'Enter a Valid Emailid'} 
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const {data: posts} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const currentUserPosts= posts.filter(post => post.userId == currentUser.id);
    this.setState({posts:currentUserPosts,currentUser});
  }
  handleLogout= () => {
      localStorage.removeItem('currentUser');
      this.props.history.push('/login');
  }
  render() {
      const {currentUser} = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid bg-color">
          <div className="row nav">
            <div className="col-11">
              <h5>Swift</h5>
            </div>
            <div className="col-1">
              <button onClick={this.handleLogout} type="button" className="btn btn-dark btn-sm btn-sm-2">Logout</button>
            </div>
          </div>
          <hr/>
          <div className="title card-padding">
            <div className="row card-padding">
              <div className="col">
                <div className="card text-left">
                  <div className="card-body">
                    <h2 className="card-title">{currentUser.name}</h2>
                    <p className="card-text">{currentUser.email}</p>
                    <p className="card-text">{currentUser.phone}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-right">
                    <div className="card-body">
                    <div>
                      <h2 className="card-title">{currentUser.company.name}</h2>
                      <p className="card-text">{currentUser.company.bs}</p>
                      <p className="card-text">{currentUser.company.catchPhrase}</p>
                    </div>
                    </div>
                </div>
              </div>
            </div>
            <table className="table table-striped table-bordered  table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Posts;
