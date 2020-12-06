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

const Navigator = () => {
    return  (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerBackImage:{

                    },
                    headerStyle:{
                        elevation:0,
                        backgroundColor:theme.colors.white
                    },
                    headerBackImage:() =>(
                        <Image source={require('../assets/icons/back.png')} style={{ marginLeft:10}} />
                    )
                }}
            >
                <Stack.Screen 
                    name="Map" 
                    component={TabNavigator}
                    options={{
                        title:"Map",
                        headerShown:false,
                    }}
        
                />
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
                    component={SignUp}
                    options={{
                        title:"",
                        headerShown:true,
                    }}
        
                />
                <Stack.Screen 
                    name="Login" 
                    component={Login}
                    options={{
                        title:"",
                        headerShown:true,
                    }}
        
                />
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
        </NavigationContainer>
    );
}


export default Navigator;

// TAB NAVIGATION
const Tab = createBottomTabNavigator();
function TabNavigator() {
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
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Alerts" component={Alerts} />   
            <Tab.Screen name="Cells" component={Cells} />   
        </Tab.Navigator>
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