import React, { Component } from "react";
import  {Route,Switch,Redirect} from "react-router-dom";
import Posts from "./component/posts"; 
import LoginForm from "./component/loginForm";
class App extends Component {
  render() {
    return (
    <Switch>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/posts" component={Posts}></Route>
        <Redirect from ="*" to="/login"/>
    </Switch>
    );
 }
}
export default App;
