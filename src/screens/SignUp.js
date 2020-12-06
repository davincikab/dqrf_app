import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';


export default class SignUp extends React.Component {
    state = {
        email:'',
        name:'',
        password:'',
        password2:'',
        errors:[],
        loading:false
    }

    handleSubmit = () => {
        console.log("Press");
        const { email, name, password, password2, errors } = this.state;

        if(email == "")  { errors.push('email') }
        if(name == "") { errors.push('name') }
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

            return;
        }

       
    }

    render() {
        const { email, name, password, password2, errors, loading } = this.state;
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
                        email
                        error={hasError('email')}
                        label={"Email"}
                        value={email}
                        style={styles.input}
                        onChangeText={text => this.setState({email:text, errors:[]})}
                    />

                    <Input 
                        error={hasError('name')}
                        label={"Name"}
                        value={name}
                        style={styles.input}
                        onChangeText={text => this.setState({name:text, errors:[]})}
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