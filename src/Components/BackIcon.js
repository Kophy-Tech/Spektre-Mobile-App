
import React from 'react';
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            <Icon
                name="chevron-left"
                size={35}
                color='blue'

                onPress={() => navigation.goBack()}
            />

        </View>
    );
};

export default BackIcon;