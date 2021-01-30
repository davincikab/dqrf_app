import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Picker, ActivityIndicator} from 'react-native';

// 3rd party depenencies
import Icon from 'react-native-vector-icons/FontAwesome';

// components
import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';


// utils
import validate from '../utils/form_validators';
import Authentication from '../utils/authentication/authenticate';
import deviceStorage from '../utils/deviceStorage';

const ALERT_FIELDS = {
    loading:false,
    formIsValid:false,
    token:'',
    alert:{
        reported_by:{
            value:'',
            valid:true,
            validationRules:{
                isRequired:true,
            }
        },
        location:{
            value:'',
            valid:true,
            validationRules:{
                isRequired:true,
            }
        },
        location_name:{
            value:'',
            valid:false,
            validators:{
                isRequired:true,
            }
        },
        description:{
            value:'',
            valid:false,
            validationRules:{
                isRequired:true,
            }
        },
        emergency_type:{
            value:'Crime',
            valid:true,
            options:[
                'Crime',
                'Robbery',
                'Accident',
                'Fire',
            ],
            validationRules:{
                isRequired:true,
            }
        },
        status:{
            value:'NEW',
            valid:true,
        }
    }
}

export default AlertCreateModal = function(props) {
    const [state, setState] = useState(ALERT_FIELDS);
    useEffect(() => {
        // route params value
        let { route : { params } } = props;
        console.log(params);

        let { user, userLocation, token } = params;        
        // get the state object
        let currentState = {...state };
        currentState.token = token;
        currentState.alert.reported_by.value = user;
        currentState.alert.location.value = "SRID=4326;POINT ("+ userLocation.lng +" "+ userLocation.lat +")";

        // update the state
        setState(currentState);
    }, []);

    const hasError = (field) => {
        return false;
    };

    const handleTextChange = (field, text) => {
        // run update
        let currentState = {...state};
        currentState.alert[field].value = text;

        // validate data
        currentState.alert[field].valid = validate(text, currentState.alert[field].validationRules);

         // form is valid
        let formIsValid = true;
        for (const inputIdentifier in currentState.alert) {
            // console.log(currentState.alert[inputIdentifier].valid);
            formIsValid = currentState.alert[inputIdentifier].valid && formIsValid;
        }

        currentState.formIsValid = formIsValid;
        // console.log(currentState);

        setState(currentState);
    }

    const handleSubmit = () => {
        // get the form values
        let { alert } = state;

        let currentState = {...state};
        currentState.loading = true;

        setState(currentState);

        // create state objec
        let newAlert = {
            reported_by:alert.reported_by.value,
            location:alert.location.value,
            emergency_type:alert.emergency_type.value,
            location_name:alert.location_name.value,
            description:alert.description.value,
            status:alert.status.value
        };

        // create a new alert
        handleAlertCreate(newAlert);
        
    }

    const handleAlertCreate = async (alert) => {
        let auth = new Authentication();
        let response = await auth.createAlert(state.token, alert);

        // console.log(response);
        if(response.status == 201 || response.status == 200) {
            console.log("success");

            // redirect to map
            props.navigation.navigate("Map");
        }

        if(response.status == 400 || response.status == 403 || response.status == 404) {
            console.log("Error");
        }
    }

    const handleBackButton = () => {
        // open drawe Navigation
        console.log("Press back");
        props.navigation.goBack();
    }

    return (
        <Block style={styles.container} color={theme.colors.white}>
            <Block center 
                color={theme.colors.white} 
                flex={false} 
                style={styles.header}
                padding={[0, 10]}
                marginTop={20}
            >
                <Block flex={0.2}>
                    <Button 
                        color={theme.colors.transparent} 
                        onPress={handleBackButton}
                    >
                        <Icon name="long-arrow-left" size={18} color={theme.colors.black} />
                    </Button>
                </Block>
                <Block flex={0.7}>
                    <Typography h1 black bold>
                       Create Alert
                    </Typography>
                </Block>
            </Block>

                <Block middle style={styles.alertForm}>
                    < Typography>
                        Emergency Type
                    </ Typography>
                    <Picker
                        selectedValue={state.alert.emergency_type.value}
                        style={styles.input}
                        onValueChange={(itemValue, itemIndex) =>handleTextChange('emergency_type', itemValue)}
                    >
                        {state.alert.emergency_type.options.map((emType, index) => (
                            <Picker.Item 
                                key={index}
                                label={emType} 
                                value={emType} 
                            />
                        ))
                        }
                    </Picker>

                    <Input 
                        error={hasError('Description')}
                        label={"Description"}
                        value={state.alert.description.value}
                        style={styles.input}
                        onChangeText={text => handleTextChange('description', text)}
                    />

                    <Input 
                        error={hasError('location')}
                        label={"Location Name"}
                        value={state.alert.location_name.value}
                        style={styles.input}
                        onChangeText={text => handleTextChange('location_name', text)}
                    />

                    <Button 
                        color={!state.formIsValid ? theme.colors.gray : theme.colors.primary}
                        disabled={!state.formIsValid}
                        onPress={handleSubmit}
                    >
                        { alert.loading && <ActivityIndicator size="small" color={theme.colors.white} />}
                        {!alert.loading && 
                            <Typography center white>
                                Report Alert
                            </Typography>
                        }
                    </Button>
                </Block>
                
            </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    alertForm:{
        zIndex:2,
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:theme.colors.white,
        paddingHorizontal:10
    },
    actionButton:{
        height:40,
        width:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:4,
        elevation:1
    },
    input:{
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0
    },
    header:{
        flexDirection:'row',
        // justifyContent:'space-between',
    },
});