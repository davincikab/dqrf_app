import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';

import Authentication from '../utils/authentication/authenticate';


export default class SignUp extends React.Component {
    state = {
        username:'katherine',
        email:'katherine@gmail.com',
        password:'477jesusc',
        password2:'477jesusc',
        errors:[],
        loading:false,
        residence:'Mweiga',
        mobile_no:'254123456',
        first_name:'Katherine',
        last_name:'Mwangi'
    }

    handleSubmit = () => {
        console.log("Press");
        const { email, username, password, password2, errors } = this.state;

        if(email == "")  { errors.push('email') }
        if(username == "") { errors.push('name') }
        if(password !== password2) { errors.push("password") }

        if(password == "" || password2 == "" || password.length < 8) {
            errors.push('password');
        }

        this.setState({
            errors
        });

        // Authentication backed API
        if(errors.length == 0) {
            this.setState({
                loading:true
            });

            const { residence, mobile_no, first_name, last_name } = this.state;
            let auth = new Authentication();

            let response = auth.register({
                username:username,
                email:email,
                password:password,
                password2:password2,
                residence:residence,
                mobile_no:mobile_no,
                first_name:first_name,
                last_name:last_name
            });

            console.log(response);

            this.setState({
                loading:false
            });

            return;
        }
       
    }

    render() {
        const { username, email, password, password2, residence, mobile_no, errors, loading } = this.state;
        const hasError = (key) =>  errors.includes(key);

        return (
            <Block style={styles.container} color={theme.colors.white}>
                <Block flex={0.1} middle>
                    <Typography h1 black bold>
                       Sign Up
                    </Typography>
                </Block>
                <Block middle>
                    <Input 
                        error={hasError('reg_no')}
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