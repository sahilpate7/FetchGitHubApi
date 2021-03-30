import React, { useContext,useState } from 'react';
import {Container,Form,Button,FormGroup,Label,Col,Input,Row,Card,CardBody,CardFooter,CardHeader} from 'reactstrap';

import firebase from 'firebase/app';
import {UserContext} from '../context/userContext';
import {Redirect} from 'react-router-dom';
import{toast} from 'react-toastify';
import {FaGoogle} from 'react-icons/fa'

const Signin = ()=>{

    const context = useContext(UserContext);

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSignup = () =>{
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then( res =>{
            console.log(res)
            context.setUser({email: res.user.email,uid: res.user.uid})
        })
        .catch(error => {
            console.log(error)
            toast(error.message,{
                type:"error"
            });
        });
    }

    const handleSubmit = e =>{
        e.preventDefault()
        handleSignup()
       
    }
    
   

    const googleSignin = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then(res1 =>{
            console.log(res1);
            context.setUser({email: res1.user.email,uid: res1.user.uid})
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode)
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
          // ...
        });
      
    }

    const handlegSubmit = e =>{
        e.preventDefault()
        googleSignin()
    }
    

   if (context.user?.uid) {
       return <Redirect to="/" />
   }
   return (
    <Container className='text-center'>
        <Row>
            <Col lg={6} className='offset-lg-3 mt-5'>
                <Card>
                    <Form onSubmit={handleSubmit}>
                        <CardHeader className=''>SignIn here</CardHeader>
                        <CardBody>
                            <FormGroup row>
                                <Label for='email' sm={3}>
                                    Email
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder='provide your email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='password' sm={3}>
                                    Password
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        type='password'
                                        name='password'
                                        id='password'
                                        placeholder='your password here'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button type='submit' block color='info'>
                                Sign In
                            </Button>
                           
                        </CardFooter>
                    </Form>
                </Card>
                <Card>
                    <Form onSubmit={handlegSubmit} >
                        <CardFooter>
                            <Button  type="submit" block color='info'>
                                  <FaGoogle className="mr-2" />  Sign In With Google
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </Col>
        </Row>
    </Container>
);
};

export default Signin;