import React from 'react';
import {StyleSheet, FlatList, Image } from 'react-native';

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

export default class Alerts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:'',
            allAlerts:[],
            alerts:[]
        };

        this.getAlerts = this.getAlerts.bind(this);
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
    navigateToChatAlert = (alert) => {
        const { jwt, user } = this.props;

        console.log(alert.properties);
        this.props.navigation.navigate('Alert Chat', {
            token:jwt,
            alert:alert.properties,
            user:user
        });

    }

    renderItem = ({item}) => {
        let iconName = getIconNameByAlertType(item.type);
        let time = new Date(item.properties.time);
    
        return (
            <Card style={styles.card}>
                <Block style={styles.cardHeader}>
                    <Icon name={iconName} size={30} color={theme.colors.accent}/>
                    <Typography title style={styles.cardTitle}>{item.properties.emergency_type}</Typography>
                    
                    <Button shadow 
                        style={styles.actionButton} 
                        color={"black"} 
                        onPress={(e) => this.navigateToChatAlert(item)}
                    >
                        <Icon name="whatsapp" size={18} color={ theme.colors.white}/>
                    </Button>
                </Block>
                <Block style={styles.cardBody}>
                    <Block>
                        {item.properties.alert_image.map((image, index) => (
                            <Image 
                                key={index}
                                style={styles.image}
                                source={{
                                    uri:image.image
                                }}
                            />
                        ))}
                    </Block>
                    <Block style={{paddingHorizontal:4}}>
                        <Typography>{item.properties.description}</Typography>
                        <Block style={{ flexDirection:'row'}} margin={[2,0]}>
                            <Icon name="map-marker" size={18} color={ theme.colors.black} />
                            <Typography black style={styles.marginLeft}>
                                {item.properties.location_name} 
                            </Typography>
                        </Block>

                        <Block style={{ flexDirection:'row'}} space={"between"} margin={[2,0]}>
                            <Typography small gray>
                                {item.properties.username}
                            </Typography>
                            <Typography small gray>
                                {time.getHours()}:{time.getMinutes()}
                            </Typography>
                        </Block>
                    </Block>
                </Block>
            </Card>
        )
    }

    async getAlerts() {
        let api = new Authentication();

        const { jwt } = this.props
        let alerts = await api.getAlerts(jwt);
        console.log(alerts);

        // flatten the alert
        this.setState({
            alerts:alerts,
            allAlerts:alerts
        });
    }

    componentDidMount() {
        // load alerts
        console.log("Loading Alerts");
       this.getAlerts();
    }

    render() {
        const { alerts, value } = this.state;
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
                        keyExtractor={(item) => item.properties.pk.toString()}
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
    card:{
        padding:0
    },
    cardHeader:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical:4,
        paddingHorizontal:4
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
    },
    actionButton:{
        position:'absolute',
        top:-5,
        right:0,
        height:30,
        width:30,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:4,
        elevation:1
    },
    image:{
        height:150
    }
});