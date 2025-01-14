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
import {Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './SignIn.css';
import socket from '../../socket';
import Profile from '../Profile/Profile'
import Election from '../Election/Election'
import Poll from '../Poll/Poll'
import logo from "./CUNY_Logo.png"

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

class SignIn extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {
        email: "",
        password:"",
        loggedIn: false,
        profile: {}
    };
  }

  componentDidMount(){
    socket.emit('voteBlock', {user: 'Sami', pass: 123, vote: 'trump'});
  }

  handleChange = event => ({target}) => {
    this.setState({[event]: target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let credentials = {
      email: this.state.email,
      password: this.state.password
    }
    let res = await axios.put("https://cuny-hacks-backend.herokuapp.com/api/auth", credentials)
    if (res) {
      this.setState({
        loggedIn: true,
        profile: res.data
      })
    }
    else {
      console.log("Error")
    }
  }

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render(){

    const {classes} = this.props
    if(this.state.loggedIn)
    {
      return (
        <div>
          <Profile profile={this.state.profile} />
          <Election profile={this.state.profile} />
          <Poll />
        </div>
      );
    }
    return (
    <div>
      <div align="left">
        <img src={logo} width="20%" alt="cuny" />
      </div>
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
              <Typography component="h1" color='primary' variant="h4">
                  TrulyVote
          </Typography>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign in
              </Typography>
              <form className={classes.form} noValidate>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      placeholder='.cuny.edu'
                      autoComplete="email"
                      autoFocus
                      onChange={this.handleChange('email')}
                  />
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange('password')}
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.handleSubmit}
                  >
                      Sign In
                  </Button>
                  <Grid container>
                      <Grid item>
                          <Link href="/signup" variant="body2">
                              Don't have an account? Sign Up
                          </Link>
                      </Grid>
                  </Grid>
              </form>
              {/* {this.state.error.length > 0 ? (<h3 style={{ color: 'Red' }}>{this.state.error}</h3>) : (<div></div>)} */}
          </div>
          <div>
          </div>
      </Container>
    </div>
    )
  }
}

export default withStyles(styles)(SignIn);