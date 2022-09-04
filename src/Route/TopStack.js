import * as React from 'react';


import Active from '../Pages/Main/Active';
import Completed from '../Pages/Main/Completed';
import Home from '../Pages/Main/Home';
import Pending from '../Pages/Main/Pending';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TopStack() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 8, color:'black', fontWeight:'bold' },
                // tabBarItemStyle: { width: 130 },
                tabBarStyle: { backgroundColor: '#fff' },
                tabBarIndicatorStyle: { backgroundColor: '#4dd3ff' }
                
            }}
        >
            <Tab.Screen name="pending" component={Pending} />
            <Tab.Screen name="active" component={Active} />
            <Tab.Screen name="completed" component={Completed} />
            <Tab.Screen name="all" component={Home} />

          
        </Tab.Navigator>
    );
}

export default TopStack