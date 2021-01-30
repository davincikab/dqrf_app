import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../components/Input';
import Block from '../components/Block';
import Card from '../components/Card';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme, profile } from '../constants';


export default class Profile extends React.Component {
    state = {
        profile:{},
        loading:false
    }

    componentDidMount() {
        this.setState({
            profile:profile
        })
    }

    render() {
        const { profile } = this.state;
        return (
            <Block style={styles.container} color={theme.colors.white}>
                <Block flex={0.8} center middle color={theme.colors.primary}>
                    {/* <Image source={} /> */}
                    <Icon name="user-circle" size={80} color={theme.colors.white}/>
                    <Typography title white>
                        {profile.first_name} {profile.last_name}
                    </Typography>
                </Block>
                <Block flex={0.4}>
                    <Block shadow center padding={[0, 10]} style={{flexDirection:'row',elevation:2}} flex={0.2}>
                        <Icon name="phone" size={20} color={theme.colors.accent} />
                        <Typography title style={styles.marginLeft}>{profile.phone_number}</Typography>
                    </Block>  
                    <Block shadow center padding={[0, 10]} style={{flexDirection:'row',elevation:2}} flex={0.2}>
                        <Icon name="envelope" size={20} color={theme.colors.accent} />
                        <Typography title style={styles.marginLeft}>{profile.email}</Typography>
                    </Block>

                    <Block shadow center padding={[0, 10]} style={{flexDirection:'row',elevation:2}} flex={0.2}>
                        <Icon name="calendar" size={20} color={theme.colors.accent} />
                        <Typography title style={styles.marginLeft}>{profile.age}</Typography>
                    </Block>

                    <Block shadow center padding={[0, 10]} style={{flexDirection:'row',elevation:2}} flex={0.2}>
                        <Icon name="info-circle" size={20} color={theme.colors.accent} />
                        <Typography title style={styles.marginLeft}>{profile.reg_no}</Typography>
                    </Block>                   
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:0
    },
    input:{
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0
    },
    marginLeft:{
        marginLeft:10
    }
})