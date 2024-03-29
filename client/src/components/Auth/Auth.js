import React, {useState} from 'react'
import {Avatar,Button,Grid,Paper,Typography,Container,} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import { signup,signin } from '../../actions/auth';

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const Auth = () => {
    const classes = useStyles();
    const history = useNavigate();
    const handleSubmit =(e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    };
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const switchMode = () =>{ setisSignup((previsSignUp)=>!previsSignUp);
     };
    const [showPassword, setshowPassword] = useState(false);
    const [isSignUp, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const handleShowPassword = ()=> setshowPassword((prevShowPassword) => !prevShowPassword)
    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type : 'AUTH', data: {result,token}});

            history('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error)=>{
        console.log(error);
        console.log("Sign in Failed");
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'SignUp' : 'Sign In'}</Typography>
                <form className = {classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>                          
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignUp ? 'SignUp' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                    clientId="739758362596-86dcjot6hd1memrdaijs8g6mkjo6p58r.apps.googleusercontent.com"
                    render={(renderProps)=>(
                    <Button 
                    className={classes.googleButton}
                    color='primary'
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon/>}
                    variant="contained">
                    Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button className={classes.newAcc} onClick={switchMode}>
                                {isSignUp ? "Already have an account ? Sign In" : "Dont have an account SignUp"}
                                </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        )
}

export default Auth
