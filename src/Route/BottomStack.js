import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../Pages/Main/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { View, Text } from 'react-native';
import TopStack from './TopStack';
import SingleAssignment from '../Pages/Main/SingleAssignment';
import BackIcon from '../Components/BackIcon';
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
                                <Icon
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
                                    
                                <Icon
                                    name={ 'human'}
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
                headerShown: true
            }}
        >
            <Stack.Screen name="bottomTab" component={BottomTabs}
            
                options={{
                    headerShown: true,
                    title: 'Spetre',
                    // headerTitleAlign:'center'
                    headerTitleStyle: { color: 'blue', fontSize: 25 },
                    headerBackVisible: false
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

            
        </Stack.Navigator>

    );
}

export default BottomStack