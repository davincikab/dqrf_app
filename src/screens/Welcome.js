import React from 'react';
import {StyleSheet, Image, Modal, ScrollView} from 'react-native';


import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme, terms } from '../constants';

export default class Welcome extends React.Component {
    state = {
        showTerms:false,
        iAgree:false
    }

    handleTerms = () => {
        this.setState({
            showTerms:true
        });
    }

    handleLogin = () => {
        this.props.navigation.navigate('Login');
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    renderTerms = () => {
        const { iAgree } = this.state;

        return (
            <Modal style={{flex:1}}>
                <Typography center middle h3>Terms of Service</Typography>
                <ScrollView>
                    {terms.map((term, index) => (
                        <Block padding={10} margin={[4,2]} key={index}>
                            <Typography header>
                                {term}
                            </Typography>
                        </Block>
                    ))}

                    <Block center space={'around'} style={{ flexDirection:'row'}} margin={[0, 10]}>
                        <Button onPress={() => this.setState({iAgree:!iAgree})}>
                            {iAgree && <Image source={require("../assets/icons/checked.png")}/>}
                            {!iAgree && <Block flex={0.5} style={styles.box}></Block>}
                        </Button>
                        <Typography primary title>
                            I agree to the term and conditions
                        </Typography>
                    </Block>
                    
                </ScrollView>
            </Modal>
        )
    }

    render() {

        const { showTerms } = this.state;
        return(
            <Block style={styles.container}>
                    <Block middle flex={0.3}>
                        <Typography h1 bold center>Emergency Response</Typography>
                    </Block >

                    <Block flex={0.3} center>
                        <Image source={require("../assets/images/main.png")}  style={styles.image}/>
                    </Block>

                    <Block flex={0.4} bottom>
                        <Button color={theme.colors.primary} onPress={this.handleLogin}>
                            <Typography white title center>Login</Typography>
                        </Button>

                        <Button shadow={true} style={{elevation:2}} color={theme.colors.white} onPress={this.handleSignUp}>
                            <Typography black title center>Sign Up</Typography>
                        </Button>

                        <Button shadow color={theme.colors.white} onPress={this.handleTerms}>
                            <Typography gray caption title center>Terms of Service</Typography>
                        </Button>
                    </Block>

                    { showTerms && this.renderTerms()}
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        resizeMode:'cover',
        paddingHorizontal:theme.sizes.base
    },
    image:{
        flex:1,
        borderRadius:30,
        resizeMode:'contain'
    },
    box:{
        height:24,
        width:48,
        borderRadius:4,
        // padding:2,
        borderWidth:2,
        borderColor:theme.colors.primary
    },  
    text:{
        color:'black',
        fontSize:18
    },
    textWhite:{
        color:'white'
    },
    bold:{
        fontWeight:"600",
        fontSize:25
    }
});