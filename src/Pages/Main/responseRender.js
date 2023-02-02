import {
  StyleSheet,
  View,
  FlatList,
  Linking,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Center,
  HStack,
  Stack,
  Button,
  Input,
  FormControl,
  Image,
  Spinner,
  Avatar,
  Modal,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const ResponseRender = ({item}) => {
  const OpenUrl = React.useCallback(async url => {
    const supported = await Linking.canOpenURL(url);
    //  console.log(supported)
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  // console.log(item?.attachment , 'response render')
  return (
    <Box w="100%">
      {item?.writer?.type !== 'WORKER' && (
        <Stack px="2" alignItems="flex-end" my="1">
          <HStack alignItems="center">
            <Text
              color="black"
              fontSize="md"
              pr="3"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="700">
              {item?.writer?.first_name}
            </Text>
            <Avatar
              bg="#4dd3ff"
              source={{
                uri: item?.writer?.profile_picture,
              }}>
              AJ
            </Avatar>
          </HStack>
          <Stack py="2">
            <Text
              color="coolGray.700"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="700">
              {item?.text}
            </Text>
            <Text
              color="coolGray.600"
              fontSize="xs"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              {moment(item?.date_created).format('DD.MM.YYYY, h:mm:ss ')}
            </Text>
          </Stack>

          {item?.attachment_type == 'image' && (
            <Stack width="100%" style={{height: 100}} my="2">
              <Image
                resizeMode="contain"
                source={{
                  uri: item?.attachment,
                }}
                alt="Alternate Text"
                width="100%"
                height="100%"
              />
            </Stack>
          )}

          {item?.attachment_type == 'document' && (
            <Stack width="100%" style={{height: 100}} my="2">
              <TouchableWithoutFeedback
                onPress={() => OpenUrl(item?.attachment)}>
                <Image
                  resizeMode="contain"
                  source={require('../../images/file.jpg')}
                  alt="Alternate Text"
                  width="100%"
                  height="100%"
                />
              </TouchableWithoutFeedback>
            </Stack>
          )}
        </Stack>
      )}

      {item?.writer?.type === 'WORKER' && (
        <Stack px="2" my="1">
          <HStack alignItems="center">
            <Avatar
              bg="#4dd3ff"
              source={{
                uri: item?.writer?.profile_picture,
              }}>
              WK
            </Avatar>
            <Text
              color="black"
              fontSize="md"
              pl="3"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="700">
              {item?.writer?.first_name}
            </Text>
          </HStack>
          <Stack py="2">
            <Text
              color="coolGray.700"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="700">
              {item?.text}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              {moment(item?.date_created).format('DD.MM.YYYY, h:mm:ss ')}
            </Text>
          </Stack>
          {item?.attachment_type == 'image' && (
            <Stack width="100%" style={{height: 100}} my="2">
              <Image
                resizeMode="contain"
                source={{
                  uri: item?.attachment,
                }}
                alt="Alternate Text"
                width="100%"
                height="100%"
              />
            </Stack>
          )}

          {item?.attachment_type == 'document' && (
            <Stack width="100%" style={{height: 100}} my="2">
              <TouchableWithoutFeedback
                onPress={() => OpenUrl(item?.attachment)}>
                <Image
                  resizeMode="contain"
                  source={require('../../images/file.jpg')}
                  alt="Alternate Text"
                  width="100%"
                  height="100%"
                />
              </TouchableWithoutFeedback>
            </Stack>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default React.memo(ResponseRender);

const styles = StyleSheet.create({});
