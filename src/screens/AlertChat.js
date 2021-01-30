import React from 'react';
import {StyleSheet, FlatList } from 'react-native';

// 3rd party depenencies
import Icon from 'react-native-vector-icons/FontAwesome';

// active
import Input from '../components/Input';
import Block from '../components/Block';
import Card from '../components/Card';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme, alerts } from '../constants';

// utils
import getIconNameByAlertType from '../utils/getIconName';
import Authentication from '../utils/authentication/authenticate';

export default class AlertChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:'',
            allChats:[],
            chats:[]
        };

        this.api = new Authentication();
    }

    onSearchAlert = (text) => {
        const { allAlerts } = this.state;

        let alertsFilter = allAlerts.filter(alert => {
            if(alert.properties.description.toLowerCase().includes(text.toLowerCase()) ||
            alert.properties.emergency_type.toLowerCase().includes(text.toLowerCase()) ) {
                return alert
            }
        });

        this.setState({
            value:text,
            alerts:alertsFilter
        });
    }

    handleProfile = () => {
        this.props.navigation.navigate('Profile');
    }

    handleBackButton = () => {
        // open drawe Navigation
        console.log("Press back");
        this.props.navigation.goBack();
    }

    // navigate to alert chat


    renderItem = ({item}) => {
        let time = new Date(item.time);
    
        return (
            <Card>
                <Typography>{item.message}</Typography>
            </Card>
        )
    }

    async getAlertChats(token, alert_id) {
        let chats = await this.api.getAlertChats(token, alert_id)
        console.log(chats);

        // flatten the alert
        this.setState({
            alertChats:chats,
            allAlertChats:chats
        });
    }

    componentDidMount() {
        const { route:{ params } } = this.props;
        const { alert, token } = params;
        this.getAlertChats(token, alert.pk);
    }

    render() {
        return(
            <Block style={styles.container} >
                <Block center 
                    color={theme.colors.primary} shadow 
                    flex={false} 
                    style={styles.header}
                    padding={[0,10]}
                >
                    <Block flex={0.2}>
                        <Button 
                            color={theme.colors.transparent} 
                            onPress={this.handleBackButton}
                        >
                            <Icon name="long-arrow-left" size={18} color={theme.colors.white} />
                        </Button>
                    </Block>
                    <Block flex={0.7}>
                        <Typography h2 white>Alerts Chat</Typography>
                    </Block>

                    <Button flex={0.1} onPress={this.handleProfile} color={theme.colors.transparent}>
                        <Icon name="user-circle" size={30} color={theme.colors.white} />
                    </Button>

                </Block>
                <Block>

                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
});