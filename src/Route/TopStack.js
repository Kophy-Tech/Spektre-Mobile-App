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
            {/* <Tab.Screen name="pending" component={Pending} /> */}
            <Tab.Screen name="Aktive" component={Active} />
            <Tab.Screen name="Abgeschlossen" component={Completed} />
            {/* <Tab.Screen name="alle" component={Home} /> */}

          
        </Tab.Navigator>
    );
}

export default TopStack