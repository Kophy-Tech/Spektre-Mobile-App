import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../Pages/Main/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, Text } from 'react-native';
import TopStack from './TopStack';
import SingleAssignment from '../Pages/Main/SingleAssignment';
import BackIcon from '../Components/BackIcon';
import ResponseTicket from '../Pages/Main/ResponseTicket';
import Notify from '../Components/Notify';
import Notifications from '../Pages/Main/Notification/Notifications';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function BottomTabs() {
    return (
        <Tab.Navigator
        
           
        >
            <Tab.Screen name="top" component={TopStack} 
            
                options={{

                    // tabBarStyle: { display: "none" },
                    tabBarLabel: '',
                    tabBarLabelStyle:{fontSize:15, color:'blue'},
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: 10,
                                }}>
                                <Icon
                                    name={'home'}
                                    size={20}
                                    color={focused ? 'blue' : 'black'}
                                  
                                />
                                <Text style={{
                                   color: focused? 'blue': 'black'
                                }}>Home</Text>
                            </View>
                        );
                    },
                }}
            
            />
            <Tab.Screen name="profile" component={Profile} 
            
                options={{

                    // tabBarStyle: { display: "none" },
                    tabBarLabel: '',
                    tabBarLabelStyle: { fontSize: 15, color: 'blue' },
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: 10,
                                }}>
                                    
                                <Icon
                                    name={ 'account-circle'}
                                    size={22}
                                    color={focused ? 'blue' : 'black'}
                                // style={focused ? styles.reHeight : null}
                                />
                                <Text
                                    style={{
                                        color: focused ? 'blue' : 'black'
                                    }}
                                >Profile</Text>
                            </View>
                        );
                    },
                }}
            />

        </Tab.Navigator>
    );
}





function BottomStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name="bottomTab" component={BottomTabs}
            
                options={{
                    headerShown: true,
                    title: 'Spektre',
                    // headerTitleAlign:'center'
                    headerTitleStyle: { color: 'blue', fontSize: 25 },
                    headerBackVisible: false,
                     headerRight:()=> <Notify/>
                }}
            />
            <Stack.Screen name="SingleAssignment" component={SingleAssignment} 
                options={{
                    title: 'Asignment Details',
                    // headerTitleAlign:'center'
                    headerTitleStyle: { color: 'blue', fontSize: 15 },
                    headerLeft: () => <BackIcon />,
                    headerTitleAlign: 'center',
                }}
            
            />
            <Stack.Screen name="responseTicket" component={ResponseTicket}
                options={{
                    title: 'Chat',
                    // headerTitleAlign:'center'
                    headerTitleStyle: { color: 'blue', fontSize: 15 },
                    headerLeft: () => <BackIcon />,
                    headerTitleAlign: 'center',
                }}

            />
            <Stack.Screen name="notify" component={Notifications}
                options={{
                    title: 'Notifications',
                    // headerTitleAlign:'center'
                    headerTitleStyle: { color: 'blue', fontSize: 15 },
                    headerLeft: () => <BackIcon />,
                    headerTitleAlign: 'center',
                }}

            />
            
        </Stack.Navigator>

    );
}

export default BottomStack