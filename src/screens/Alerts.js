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

export default class Alerts extends React.Component {
    state = {
        value:'',
        allAlerts:[],
        alerts:[]
    };

    onSearchAlert = (text) => {
        const { allAlerts } = this.state;

        let alertsFilter = allAlerts.filter(alert => {
            if(alert.title.toLowerCase().includes(text.toLowerCase())) {
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

    renderItem = ({item}) => {
        let iconName = getIconNameByAlertType(item.type);
        let time = new Date(item.time);
    
        return (
            <Card>
                <Block style={styles.cardHeader}>
                    <Icon name={iconName} size={30} color={theme.colors.accent}/>
                    <Typography title style={styles.cardTitle}>{item.title}</Typography>
                </Block>
                <Block>
                    <Typography>{item.description}</Typography>
                    <Block style={{ flexDirection:'row'}} margin={[2,0]}>
                        <Icon name="map-marker" size={18} color={ theme.colors.black} />
                        <Typography black style={styles.marginLeft}>
                            {item.location} 
                        </Typography>
                    </Block>

                    <Block style={{ flexDirection:'row'}} space={"between"} margin={[2,0]}>
                        <Typography small gray>
                            {item.reported_by}
                        </Typography>
                        <Typography small gray>
                            {time.getHours()}:{time.getMinutes()}
                        </Typography>
                    </Block>

                </Block>
            </Card>
        )
    }

    componentDidMount() {
        this.setState({
            alerts:alerts,
            allAlerts:alerts
        });
    }

    render() {
        const { alerts, value } = this.state;
        return(
            <Block style={styles.container} >
                <Block center 
                    color={theme.colors.accent} shadow 
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
                        <Typography h2 white>Alerts</Typography>
                    </Block>

                    <Button flex={0.1} onPress={this.handleProfile} color={theme.colors.transparent}>
                        <Icon name="user-circle" size={30} color={theme.colors.white} />
                    </Button>

                </Block>
                <Block padding={[0]} shadow={true} flex={0.1}>
                    <Input 
                        placeholder={'Search Alerts ...'}
                        value={value}
                        style={styles.searchInput}
                        onChangeText={this.onSearchAlert}
                    />
                </Block>
                <Block flex={1} >
                    <FlatList 
                        data={alerts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this.renderItem}
                    />
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
    cardHeader:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical:4
    },
    cardTitle:{
        marginLeft:10
    },
    marginLeft:{
        marginLeft:10
    },
    searchInput: {
        backgroundColor:theme.colors.white,
        borderWidth:0,
    }
});