import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';

// screens
import Map from '../screens/Map';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import Cells from '../screens/Cells';
import Alerts from '../screens/Alerts';
import Profile from '../screens/Profile';
import EditCells from '../screens/EditCells'

import { theme } from '../constants';

const Stack = createStackNavigator();
const screenOptions = {
    headerBackImage:{

    },
    headerStyle:{
        elevation:0,
        backgroundColor:theme.colors.white
    },
    headerBackImage:() =>(
        <Image source={require('../assets/icons/back.png')} style={{ marginLeft:10}} />
    )
};

const Navigator = (props) => {
    const { jwt, newJWT } = props;
    return  (
        <NavigationContainer>
                { jwt ?  
                    <AuthenticatedNavigator jwt={jwt} newJWT={(token) => newJWT(token)}/> :
                    <NonAuthenticatedNavigator jwt={jwt} newJWT={(token) => newJWT(token)}/>
                }  
        </NavigationContainer>
    );
}


export default Navigator;

// TAB NAVIGATION
const Tab = createBottomTabNavigator();
function TabNavigator(props) {
    const { jwt } = props;
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon:({ focused, color, size }) => {
                    let iconName;

                    iconName = route.name == "Map" ? 'map' : route.name == 'Alerts' ? 'exclamation-circle' : 'mobile';
                    return <Icon name={iconName} size={size} color={color} />;
                }
            }) 
            }
        >
            <Tab.Screen name="Map" >
                { props => <Map {...props} jwt={jwt} />}
            </Tab.Screen>
            
            <Tab.Screen name="Alerts" >
                { props => <Alerts {...props} jwt={jwt} />}
            </Tab.Screen>  

            <Tab.Screen name="Cells">
                { props => <Cells {...props} jwt={jwt} />}
            </Tab.Screen>   
        </Tab.Navigator>
    )
}

function NonAuthenticatedNavigator(props) {
    const { jwt, newJWT } = props;
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen 
                    name="Welcome" 
                    component={Welcome}
                    options={{
                        title:null,
                        headerShown:false
                    }}

                />
    
                <Stack.Screen 
                    name="SignUp" 
                    // component={SignUp}
                    options={{
                        title:"",
                        headerShown:true,
                    }}
                >
                    { props => <SignUp {...props} newJWT={(token) => newJWT(token)} /> }
                </Stack.Screen>

                <Stack.Screen 
                    name="Login" 
                    // component={Login}
                    options={{
                        title:"",
                        headerShown:true,
                    }}
                >
                    { props => <Login {...props} jwt={jwt} newJWT={(token) => newJWT(token)} /> }
                </Stack.Screen>
        </Stack.Navigator>
    )
}

function AuthenticatedNavigator(props) {
    const { jwt, newJWT } = props;
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
                <Stack.Screen 
                    name="Tab" 
                    // component={TabNavigator}
                    options={{
                        title:"",
                        headerShown:false,
                    }}
                >
                    {props => <TabNavigator jwt={jwt} /> }
                </Stack.Screen> 

                <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{
                        title:"",
                        headerShown:true,
                    }}
                />

                <Stack.Screen 
                    name="EditCells" 
                    component={EditCells}
                    options={{
                        title:"",
                        headerShown:true,
                    }}
                />
        </Stack.Navigator>
    )
}


const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Alerts" component={Alerts} />
            <Drawer.Screen name="Cells" component={Cells} />
        </Drawer.Navigator>
    );
   
}