import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Alldata from './Alldata';

const Login = ({navigation}) => {
  const [check, setCheck] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const validation = () => {
    if ((username !== '', password !== '')) {
      ApiCall();
    } else {
      Alert.alert('Please check', 'Username and Password are required.');
    }
  };
  const ApiCall = async () => {
    await axios({
      url: 'https://uat.elabpro.in/api/v1/Users/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    })
      .then(res => {
        if (res.status === 200) {
          navigation.navigate(Alldata);
        } else {
          console.log(res.status);
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          'Something went wrong',
          'please check username and password is correct.',
        );
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 16,
            color: '#000',
            paddingVertical: 20,
          }}>
          Sign in to start your session
        </Text>
        <View style={styles.txtinput}>
          <TextInput
            placeholder="UserName"
            placeholderTextColor={'grey'}
            maxLength={16}
            onChangeText={txt => setUserName(txt)}
            style={{color: '#000', fontSize: 12}}
            keyboardType="default"
          />
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
            }}
            style={styles.iconstyle}
          />
        </View>
        <View style={styles.txtinput}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={'grey'}
            maxLength={30}
            style={{color: '#000', fontSize: 12}}
            keyboardType="default"
            onChangeText={txt => setPassword(txt)}
          />
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/69/69891.png',
            }}
            style={styles.iconstyle}
          />
        </View>
        <View style={styles.inline}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setCheck(!check)}>
              <Image
                source={{
                  uri: check
                    ? 'https://cdn-icons-png.flaticon.com/128/25/25643.png'
                    : 'https://cdn-icons-png.flaticon.com/128/545/545666.png',
                }}
                style={[styles.iconstyle, {marginRight: 10}]}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 12, color: '#000'}}>Remember me</Text>
          </View>
          <TouchableOpacity
            onPress={() => validation()}
            style={{
              backgroundColor: 'cyan',
              padding: 8,
              borderRadius: 4,
            }}>
            <Text style={{color: '#000', fontSize: 14}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  txtinput: {
    height: 40,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 20,
    alignItems: 'center',
  },
  inline: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconstyle: {
    height: 20,
    width: 20,
  },
});
