import React, { Component } from 'react';
import './Header.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import logo from '../../assets/logo.svg';
import FormControl from '@material-ui/core/FormControl';


const mainContainer = function (props) {
    return (
        <Typography component="div" style={{ textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameReq: "diplayNothing",
            username: "",
            loginPasswordReq: "diplayNothing",
            loginPassword: "",
            firstnameReq: "diplayNothing",
            firstname: "",
            lastnameReq: "diplayNothing",
            lastname: "",
            emailReq: "diplayNothing",
            email: "",
            registerPassReq: "diplayNothing",
            registerPass: "",
            contactReq: "diplayNothing",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameReq: "diplayNothing",
            username: "",
            loginPasswordReq: "diplayNothing",
            loginPassword: "",
            firstnameReq: "diplayNothing",
            firstname: "",
            lastnameReq: "diplayNothing",
            lastname: "",
            emailReq: "diplayNothing",
            email: "",
            registerPassReq: "diplayNothing",
            registerPass: "",
            contactReq: "diplayNothing",
            contact: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    loginClickHandler = () => {
       
        let userLogin = null;
        let httpLogin = new XMLHttpRequest();
        let that = this;
        httpLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", httpLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

    }

    inUnameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    LoginPwdChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    regClickHandler = () => {
        this.state.firstname = this.setState({ firstnameRequired: "diplayNothing" });
        this.state.lastname =this.setState({ lastnameRequired: "diplayNothing" });
        this.state.email = this.setState({ emailRequired: "diplayNothing" });
        this.state.registerPass= this.setState({ registerPassRequired: "diplayNothing" });
        this.state.contact =this.setState({ contactRequired: "diplayNothing" });

        let dataSignup = {
            "emailaddress": this.state.email,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "mobilenumber": this.state.contact,
            "password": this.state.registerPass
        };

    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputregisterPassChangeHandler = (e) => {
        this.setState({ registerPass: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div>
                <header className="header">
                    <img src={logo} className="logo" alt="Movies App Logo" />
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button onClick={this.openModalHandler}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button  onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
                    {this.props.showBookShowButton === "true" && !this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Button color="primary" onClick={this.openModalHandler}>
                                Book Show
                            </Button>
                        </div>
                        : ""
                    }

                </header>
    
    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                
                        <mainContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} />
 
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword}/>
           
                            </FormControl>
              
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                        
                            <Button color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </mainContainer>
                    

                   
            </div>
        )
    }
}

export default Header;