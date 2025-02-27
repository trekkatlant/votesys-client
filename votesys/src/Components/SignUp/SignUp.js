import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import logo from "./CUNY_Logo.png"
// import "./Register.css";

const styles = theme => ({
  '@global': {
      body: {
          backgroundColor: theme.palette.common.white,
      },
  },
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      id: "",
      email: "",
      password:"",
      img: "",
      redirect: false
    };
  }

  handleChange = event => ({target}) => {
    this.setState({[event]: target.value});
  }
  
  generateKey = (keyLength) => {
    var randomstring = '';
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";
    
    for (var i=0; i < keyLength; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
  };

  handleSubmit = async (event) => {
    const apiLink = "link.com/api"
    event.preventDefault();
    try {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.state.firstname.length === 0 || this.state.lastname.length === 0 || this.state.password.length === 0 || this.state.email.length === 0 || !re.test(this.state.email)) {
          this.setState({
              error:'Missing proper credentials.'
          })
      } else {
          let pk_ = await this.generateKey(25)
          let res = await axios.post(apiLink, {
            idNumber: this.state.id,
            email: this.state.email,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            img: this.state.img,
            password: this.state.password,
            pk: pk_
          })
          if(res){
            console.log("RUNNING")
            this.setState({
              redirect: true
            })
          }
      }
  } catch (err) {
      console.log(err);
  }
}

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    //if (this.state.isAuthenticated === true) return <Redirect to="/" />;
    const {classes} = this.props
    if (this.state.redirect) {
      return(
        <Redirect to={"/"} />
      )
    }
    else {
      return (
      <div>
        <div align="left">
          <img src={logo} width="20%" alt="cuny" />
        </div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Typography component="h1" color = 'primary' variant="h4">
                    TrulyVote
            </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          fullWidth
                          id="firstName"
                          placeholder= "Bob"
                          label="First Name"
                          autoFocus
                          onChange={this.handleChange('firstname')}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          placeholder= "Dylan"
                          name="lastName"
                          autoComplete="lname"
                          onChange={this.handleChange('lastname')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                            fullWidth
                            id="id"
                            label="Student ID"
                            placeholder='12345678'
                            name="id"
                            autoComplete="id"
                            onChange={this.handleChange('id')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                            fullWidth
                            id="email"
                            label="Email Address"
                            placeholder='.cuny.edu'
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange('email')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={this.handleChange('password')}
                        />
                      </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Claim Your Free Public Key
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <h3 style={{color:'Red'}}>{this.state.error}</h3>
            </div>
        </Container>
      </div>
      )
    }
  }
}

export default withStyles(styles)(SignUp);