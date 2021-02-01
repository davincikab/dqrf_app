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
import deviceStorage from '../utils/deviceStorage';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class AlertChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:'',
            allChats:[],
            chats:[],
            username:"",
            text:"",
            isValid:false
        };

        this.api = new Authentication();
        this.messageRef = React.createRef(null);
    }

    handleProfile = () => {
        this.props.navigation.navigate('Profile');
    }

    handleBackButton = () => {
        // open drawe Navigation
        console.log("Press back");
        this.props.navigation.goBack();
    }

    onChangeMessage = (text) => {
        let isValid = text != "" ? true : false;

        this.setState({
            text,
            isValid
        });
    }

    handlSubmit() {
        // get the text from the 
    }

    isSameMonth = (previousItem, currentItem) => {
        return new Date(previousItem.time).getMonth() == new Date(currentItem.time).getMonth();
    }

    renderItem = ({index, item}) => {
        let time = new Date(item.time);
        console.log(time.toUTCString());
        let { username } = this.state;

        let cardStyle = username == item.username ? styles.cardRight : styles.cardLeft;
        let month = monthNames[time.getMonth()];
        let day = time.getDay();

        let isSameMonth = this.state.chats[index - 1] ? this.isSameMonth(item, this.state.chats[index - 1]) : false;

        return (
            <Block>
                 {!isSameMonth && <Typography center middle style={styles.monthStyle}>{month} {day}</Typography>}
                <Card style={cardStyle}>
                    <Typography style={styles.userName}>{item.username}</Typography>
                    <Typography>{item.text}</Typography>
                    <Typography style={styles.timeStamp}>{time.getHours()}:{time.getMinutes()}</Typography>
                </Card>
            </Block>
        )
    }

    async getAlertChats(token, alert_id) {
        let chats = await this.api.getAlertChats(token, alert_id);

        // flatten the alert
        this.setState({
            chats:chats,
            allChats:chats
        });
    }

    contentChanged = () =>{
        console.log(this.messageRef);
    }

    componentDidMount() {
        console.log(this.props);
        const { user, route : { params } } = this.props;
        let { alert, token } = params;
        console.log("User: " + user);

        this.setState({
            username:user
        });

        this.getAlertChats(token, alert.pk);
    }

    render() {
        const { chats, text, isValid } = this.state;
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
                    <Block flex={0.6}>
                        <Typography h2 white>Alerts Chat</Typography>
                    </Block>

                    <Button flex={0.1} onPress={this.handleProfile} color={theme.colors.transparent}>
                        <Icon name="camera" size={30} color={theme.colors.white} />
                    </Button>

                    <Button flex={0.1} onPress={this.handleProfile} color={theme.colors.transparent}>
                        <Icon name="user-circle" size={30} color={theme.colors.white} />
                    </Button>

                </Block>
                <Block flex={1} >
                    <FlatList 
                        ref={this.messageRef}
                        style={styles.messageList}
                        data={chats}
                        keyExtractor={(item) => item.pk.toString()}
                        renderItem={this.renderItem}
                        onContentSizeChange={this.contentChanged}
                    />

                    <Block style={styles.inputGroup} shadow>
                        <Block flex={0.8}>
                            <Input 
                                value={text}
                                style={styles.input}
                                placeholder={"Input Message ... "}
                                onChangeText={text => this.onChangeMessage(text)}
                            />
                        </Block>
                        <Button 
                            style={{
                                flex:0.2
                            }}
                            color={theme.colors.primary} 
                            onPress={this.handleSubmit} 
                            disabled={!isValid}
                        >
                            <Typography center white>
                                Send
                            </Typography>
                        </Button>
                    </Block>
                </Block>
            </Block>
        )
    }
}

// images modal

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    cardLeft:{
        justifyContent:"flex-end",
        width:"50%",
        marginRight:"50%",
        paddingTop:4,
        paddingHorizontal:4,
        paddingBottom:18,
        marginHorizontal:10
    },
    cardRight:{
        justifyContent:"flex-end",
        width:"50%",
        marginLeft:"50%",
        padding:4,
        marginHorizontal:10
    },
    messageList:{
        flex:0.8,
        paddingVertical:6,
        backgroundColor:theme.colors.gray2
    },
    inputGroup:{
        flex:0.2,
        flexDirection:"row",
        backgroundColor:'white',
        alignItems:'center',
    },
    input:{
        // width:200
    },  
    userName:{
        color:theme.colors.accent
    },
    timeStamp: {
        position:'absolute',
        bottom:3,
        right:4,
        fontSize:theme.sizes.small
    },
    monthStyle:{
        marginVertical:10,
        backgroundColor:theme.colors.gray,
        marginHorizontal:100,
        borderRadius:3,
        color:theme.colors.white
    }
});