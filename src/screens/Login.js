import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';


export default class Login extends React.Component {
    state = {
        email:'',
        password:'',
        errors:[''],
        loading:false
    }

    handleSubmit = () => {
        const { email, password, errors } = this.state;
        if(email == "") {
            errors.push('email');
        } 

        if(password == "" || password.length < 8) {
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
        const { email, password, errors, loading } = this.state;
        const hasError = (key) =>  errors.includes(key);

        return (
            <Block style={styles.container} color={theme.colors.white}>
                <Block flex={0.2} middle>
                    <Typography h1 black bold>
                       Login
                    </Typography>
                </Block>
                <Block middle>
                    <Input 
                        email
                        error={hasError('email')}
                        label={"Registration Number"}
                        value={email}
                        style={styles.input}
                        onChangeText={text => this.setState({email:text, errors:[]})}
                    />

                    <Input 
                        secure
                        label={"Password"}
                        error={hasError('password')}
                        value={password}
                        style={styles.input}
                        onChangeText={text => this.setState({password:text, errors:[]})}
                    />

                    <Button color={theme.colors.accent} onPress={this.handleSubmit}>
                        { loading && <ActivityIndicator size="small" color={theme.colors.white} />}
                        {!loading && 
                            <Typography center white>
                                Login
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