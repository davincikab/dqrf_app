import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';

import Authentication from '../utils/authentication/authenticate';
import deviceStorage from '../utils/deviceStorage';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            username:'B02-01-167_2020',
            password:'477jesusc',
            errors:{},
            loading:false
        }
    }    

    handleSubmit = () => {
        const { username, password, errors } = this.state;
        if(username == "") {
            errors.email.push('email');
        } 

        if(password == "" ) {
            errors.password.push('Password is require');
        }

        if( password.length < 8) {
            errors.password.push('Password too short. Min 8 characters');   
        }

        this.setState({
            errors
        });

        // Authentication backed API
        if(Object.keys(errors).length == 0) {
            this.setState({
                loading:true
            });

            this.handleLogin(username, password);
            return;
        }

       
    }

    async handleLogin(username, password) {
        console.log("Logging In");
        let api = new Authentication();
        let response = await api.login(username, password);

        if(response.status == 201 || response.status == 200) {
            // console.log(response.config.data);
            deviceStorage.saveItem('id_token', response.data.key);
            // deviceStorage.saveItem('id_user', username);

            const userInfo = await api.getUser(response.data.key, username);
            
            if(userInfo.username) {
                console.log(userInfo);
                deviceStorage.saveItem('id_user', JSON.stringify(userInfo));

                this.setState({
                    loading:false
                }, () => {
                    this.props.navigation.navigate("Tab", { screen:"Map" });
                    this.props.newJWT(response.data.key, JSON.stringify(userInfo));
                });

            }
            

            
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
        // console.log(this.props);
        if(this.props.jwt) {
            this.props.navigation.navigate("Map");
        }
    }

    render() {
        const { username, password, errors, loading } = this.state;
        const hasError = (key) => {
            if(errors[key]) {
                return  errors[key].length != 0;
            }
            
        }

        return (
            <Block style={styles.container} color={theme.colors.white}>
                <Block flex={0.2} middle>
                    <Typography h1 black bold>
                       Login
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
                        secure
                        label={"Password"}
                        error={hasError('password')}
                        value={password}
                        style={styles.input}
                        onChangeText={text => this.setState({password:text, errors:[]})}
                    />

                    <Button color={theme.colors.primary} onPress={this.handleSubmit}>
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