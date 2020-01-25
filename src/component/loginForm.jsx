import React, {Component} from "react";
import axios from "axios";
class LoginForm extends Component {
    state = {
        account: {emailid: ""},
        errors : {
        }
    };

    validate = () => {
        const errors = {};

        const {account} = this.state;

        if(account.emailid.trim() === '')
            errors.emailid = 'Emailid is required';
        return errors;
    }
    handleSubmit = async() => {
        
        let errors = this.validate();
        this.setState({errors});
        if(Object.keys(errors).length) return;
        const emailid = this.state.account.emailid;
        const {data:users} = await axios.get('https://jsonplaceholder.typicode.com/users');
        for(let i = 0;i < users.length;i++){
            if(users[i].email === emailid){

                localStorage.setItem('currentUser',JSON.stringify(users[i]));
                this.props.history.push('/posts');
            }
            
        }
        errors = {};
        errors.emailid = 'Not a valid user';
        this.setState({errors});
    };
    handleChange = ({currentTarget: input}) => {
        const account = {...this.state.account};
        account.emailid = input.value;
        this.setState({account});
    };

    handleClick = e => {
        this.props.history.push('/posts');
    }
    render(){
        const { account,errors } = this.state;
         return(
       <div>
       <div className="container pt-3 margin-class">
         <div className="row justify-content-sm-center">
           <div className="col-sm-6 col-md-4">
             <div className="card border-info text-center">
                <div className="card-header">
                    Sign in to continue
                </div>
               <div className="card-body">
               <h4 className="text-center">Sign-In</h4>
                   <input className="form-control mb-2"
                          placeholder="Email" 
                          value={account.emailid}
                          onChange={this.handleChange}
                          errors={this.errors}
                    />
                    {errors.emailid && <div className="alert alert-danger">{errors.emailid}</div>}
                   <button className="btn btn-lg btn-dark btn-block mb-1" 
                           onClick={this.handleSubmit}>Sign in
                    </button>
               </div>
             </div>
           </div>
         </div>
       </div>
       </div>
       );
    }
}
export default LoginForm;