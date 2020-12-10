import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';

import Authentication from '../utils/authentication/authenticate';
import deviceStorage from '../utils/deviceStorage';


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:'gakuokama',
            email:'gakuokama@gmail.com',
            password:'477jesusc',
            password2:'477jesusc',
            errors:{},
            loading:false,
            residence:'Mweiga',
            mobile_no:'25423128756',
            first_name:'Gakuo',
            last_name:'Gakii'
        };
    
        this.handleRegister = this.handleRegister.bind(this);
    }
    
    handleSubmit = () => {
        console.log("Press");
        const { email, username, password, password2, errors } = this.state;

        if(email == "")  { 
            errors.email.push('Email is required') 
        }

        if(username == "") { 
            errors.username.push('Name is required');
        }

        if(password !== password2) { 
            errors.password.push("Passwords do not match") 
        }

        if(password == "" || password2 == "") {
            errors.password.push('Password is require');
        }

        if( password.length < 8) {
            errors.password.push('Password too short. Min 8 characters');   
        }

        this.setState({
            errors
        });

        console.log(errors);

        // Authentication backed API
        if(Object.keys(errors).length == 0) {
            this.setState({
                loading:true
            });

            const { residence, mobile_no, first_name, last_name } = this.state;
            this.handleRegister({
                username:username,
                email:email,
                password:password,
                password2:password2,
                residence:residence,
                mobile_no:mobile_no,
                first_name:first_name,
                last_name:last_name
            });
        
        }
       
    }

    async handleRegister(user) {
        let auth = new Authentication();

            let response = await auth.register(user);

            // console.log(response);

            if(response.status == 201 || response.status == 200) {
                deviceStorage.saveItem(response.data.key);
                this.props.newJWT(response.data.key);

                this.setState({
                    loading:false
                });

                this.props.navigation.navigate('Login');
            }

            if(response.status == 400 || response.status == 403 || response.status == 404) {
                console.log("Error response");
                console.log(response);
                // append the errors to our state
                this.setState({
                    errors:response.data,
                    loading:false
                });
            }

    }
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { username, email, password, password2, residence, mobile_no, errors, loading } = this.state;
        console.log(errors['username']);

        const hasError = (key) => {
            if(errors[key]) {
                return  errors[key].length != 0;
            }
            
        }

        return (
            <Block style={styles.container} color={theme.colors.white}>
                <Block flex={0.1} middle>
                    <Typography h1 black bold>
                       Sign Up
                    </Typography>

                    <Typography accent>
                        {errors.detail}
                    </Typography>
                </Block>
                <Block middle>
                    <Input 
                        error={hasError('username')}
                        label={"Registration Number"}
                        value={username}
                        style={styles.input}
                        onChangeText={text => this.setState({username:text, errors:[]})}
                    />

                    <Input 
                        email
                        error={hasError('email')}
                        label={"Email"}
                        value={email}
                        style={styles.input}
                        onChangeText={text => this.setState({email:text, errors:[]})}
                    />

                    <Input 
                        error={hasError('mobile number')}
                        label={"Mobile No."}
                        value={mobile_no}
                        style={styles.input}
                        onChangeText={text => this.setState({mobile_no:text, errors:[]})}
                    />

                    <Input 
                        error={hasError('residence')}
                        label={"Residence"}
                        value={residence}
                        style={styles.input}
                        onChangeText={text => this.setState({residence:text, errors:[]})}
                    />

                    <Input 
                        secure
                        label={"Password"}
                        error={hasError('password')}
                        value={password}
                        style={styles.input}
                        onChangeText={text => this.setState({password:text, errors:[]})}
                    />
                    <Input 
                        secure
                        label={"Confirm Password"}
                        error={hasError('password')}
                        value={password2}
                        style={styles.input}
                        onChangeText={text => this.setState({password2:text, errors:[]})}
                    />


                    <Button color={theme.colors.primary} onPress={this.handleSubmit}>
                        { loading && <ActivityIndicator size="small" color={theme.colors.white} />}
                        {!loading && 
                            <Typography center white>
                                Sign Up
                            </Typography>
                        }
                    </Button>
                </Block>
                
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:8
    },
    input:{
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0
    }
})