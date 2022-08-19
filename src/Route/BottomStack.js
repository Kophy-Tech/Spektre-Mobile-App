import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../Pages/Main/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { View, Text } from 'react-native';
import TopStack from './TopStack';
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
                    tabBarLabelStyle:{fontSize:15, color:'#4a72f5'},
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: 10,
                                }}>
                                <Ionicons
                                    name={'home'}
                                    size={20}
                                    color={focused ? '#4a72f5' : 'black'}
                                  
                                />
                                <Text style={{
                                   color: focused? '#4a72f5': 'black'
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
                    tabBarLabelStyle: { fontSize: 15, color: '#4a72f5' },
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: 10,
                                }}>
                                    
                                <Ionicons
                                    name={ 'ios-people-outline'}
                                    size={22}
                                    color={focused ? '#4a72f5' : 'black'}
                                // style={focused ? styles.reHeight : null}
                                />
                                <Text
                                    style={{
                                        color: focused ? '#4a72f5' : 'black'
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
                headerShown: false
            }}
        >
            <Stack.Screen name="bottomTab" component={BottomTabs} />
        </Stack.Navigator>

    );
}

export default BottomStack