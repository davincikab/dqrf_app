import React from 'react';
import {StyleSheet, FlatList, Keyboard, PermissionsAndroid, Image } from 'react-native';

// 3rd party depenencies
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
            user:"",
            text:"",
            image:"",
            alert:{},
            isValid:false,
            token:""
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

    handleCamera = async() => {
        let { user, text, alert, chats} = this.state;

        // get permission
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, 
            );

            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera({
                    maxHeight:550,
                    maxWidth:720
                }, (res) => {
                    console.log(res);
        
                    // create a message instance
                    let message = {
                        text:text,
                        author:user.pk,
                        alert:alert.pk,
                        image:{
                            type:res.type,
                            name:res.fileName,
                            uri:res.uri
                        },
                    };

                    let data = new FormData();
                    data.append("image", message.image);
                    data.append("author", message.author);
                    data.append("alert", message.alert);
        
                    // upload the image
                    this.handleAlertMessage(data);
        
                });
            } else {
                console.log("permision denied");
            }
        } catch (error) {
            
        }
        
      
    }

    handleImageLibrary = async() => {
        let { user, text, alert} = this.state;

        // get permission
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 
            );

            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchImageLibrary({
                    maxHeight:550,
                    maxWidth:720
                }, (res) => {
                    console.log(res);
        
                    // create a message instance
                    let message = {
                        text:text,
                        author:user.pk,
                        alert:alert.pk,
                        image:{
                            type:res.type,
                            name:res.fileName,
                            uri:res.uri
                        },
                        // time:new Date().toISOString()
                    };

                    let data = new FormData();
                    data.append("image", message.image);
                    data.append("author", message.author);
                    data.append("alert", message.alert);
        
                    // upload the image
                    this.handleAlertMessage(data);
        
                });
            } else {
                console.log("permision denied");
            }
        } catch (error) {
            
        }
        
    }

    onChangeMessage = (text) => {
        let isValid = text != "" ? true : false;

        this.setState({
            text,
            isValid
        });
    }

    handleSubmit = ()  => {
        // get the text from the
        let { user, text, alert} = this.state;

        let message = {
            text:text,
            author:user.pk,
            alert:alert.pk,
            image:""
        };

        console.log(message);
        this.handleAlertMessage(message);
    }

    handleAlertMessage = async (message) => {
        const { token,  alert} = this.state;
        let response = await this.api.sendAlertMessage(token, alert.pk, message);

        // console.log(response);
        if(response.alert) {
            console.log("success");
            let { chats }  = this.state;
            chats.push(response);

            this.setState({
                text:"",
                isValid:false,
                chats
            });

            // redirect to map
            // props.navigation.navigate("Map");
        }

        if(response.status == 400 || response.status == 403 || response.status == 404) {
            console.log("Error");
        }
    }

    isSameDay = (previousItem, currentItem) => {
        return new Date(previousItem.time).getDay() == new Date(currentItem.time).getDay();
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
        // console.log(this.messageRef);
        this.messageRef.current.scrollToEnd();
    }

    componentDidMount() {
        console.log(this.props);
        const { user, route : { params } } = this.props;
        let { alert, token } = params;
        console.log("User: " + user);

        this.setState({
            user:JSON.parse(user),
            // user:user,
            alert:alert,
            token:token
        });

        this.getAlertChats(token, alert.pk);

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
    }

    _keyboardDidShow() {
        // alert('Keyboard Shown');
        // this.messageRef ? this.messageRef.current.scrollToEnd() : "";
    }

    renderItem = ({index, item}) => {
        let time = new Date(item.time);
        let { user } = this.state;

        let cardStyle = user.username == item.username ? styles.cardRight : styles.cardLeft;
        // let sender = user.username == item.username ? "you" : item.username;

        let month = monthNames[time.getMonth()];
        let day = time.getDay();

        let isSameDay = this.state.chats[index - 1] ? this.isSameDay(item, this.state.chats[index - 1]) : false;

        return (
            <Block>
                {!isSameDay && <Typography center middle style={styles.monthStyle}>{month} {day}</Typography>}

                {
                    item.text != "" && <Card style={cardStyle} shadow>
                        <Typography style={styles.userName}>{item.username}</Typography>
                        <Typography>{item.text}</Typography>
                        <Typography style={styles.timeStamp}>{time.getHours()}:{time.getMinutes()}</Typography>
                    </Card>
                }

                {
                    item.image && <Card style={cardStyle} shadow>
                        <Typography style={styles.userName}>{item.username}</Typography>
                        <Image
                            style={styles.image}
                            source={{uri: item.image }}
                        />
                         <Typography style={styles.timeStamp}>{time.getHours()}:{time.getMinutes()}</Typography>
                    </Card>
                }
            </Block>
        )
    }

    render() {
        const { chats, text, alert, isValid } = this.state;
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
                    <Block flex={0.6} style={{flexDirection:'column'}}>
                        <Typography h2 white>Alerts Chat</Typography>
                        <Typography small white>{alert.username}</Typography>
                    </Block>

                    <Button flex={0.1} onPress={this.handleImageLibrary} color={theme.colors.transparent}>
                        <Icon name="paperclip" size={20} color={theme.colors.white} />
                    </Button>

                    <Button flex={0.1} onPress={this.handleCamera} color={theme.colors.transparent}>
                        <Icon name="camera" size={20} color={theme.colors.white} />
                    </Button>

                    <Button flex={0.1} onPress={this.handleProfile} color={theme.colors.transparent}>
                        <Icon name="user-circle" size={20} color={theme.colors.white} />
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
        justifyContent:"flex-start",
        width:"50%",
        marginRight:"50%",
        paddingTop:4,
        paddingHorizontal:4,
        paddingBottom:18,
        // marginHorizontal:10
    },
    cardRight:{
        justifyContent:"flex-end",
        width:"50%",
        marginLeft:"50%",
        paddingHorizontal:4,
        paddingTop:4,
        // marginHorizontal:10
    },
    messageList:{
        flex:0.8,
        paddingVertical:6,
        paddingHorizontal:8,
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
    },
    image:{
        width:"100%",
        height:300
    }
});

// TODO:
// connect to websocket and update the text
// add react-native image picker