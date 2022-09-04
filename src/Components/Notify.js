
import React from 'react';
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Notify = (props) => {
    const navigation = useNavigation();
const data = useSelector((data)=> data.auth?.notify)

    return (
        <View>
            <Icon
                name="notifications"
                size={35}
                color='red'

                onPress={() => navigation.navigate('notify')}
            />
 <Text style={{
    fontSize:15,
    color:'red',
    position: "absolute",
    left:20,
    top:-7,
    fontWeight:'bold'
 }}> {data?.length} </Text>
        </View>
    );
};

export default Notify;