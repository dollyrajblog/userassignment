import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Alldata = () => {
  const [data, setData] = useState();
  const [check, setCheck] = useState(true);
  const [department, setDepartment] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  useEffect(() => {
    ApiCall();
  }, []);
  const ApiCall = async () => {
    await axios({
      method: 'GET',
      url: 'https://uat.elabpro.in/api/v1/Department/getDepartmentData',
    })
      .then(res => {
        if (res?.status === 200) {
          setData(res?.data?.message);
          console.log(data);
        }
      })
      .catch(err => console.log(err));
  };
  // ==== Department ===
  const CreateDepartment = async () => {
    await axios({
      method: 'POST',
      url: 'https://uat.elabpro.in/api/v1/Department/InsertDepartmentData',
      data: {
        Department: department,
        DepartmentCode: departmentCode,
        isActive: check,
      },
    })
      .then(res => {
        if (res?.status === 200) {
          setDepartment('');
          setDepartmentCode('');
          Alert.alert('Department create sucessfully');
        }
      })
      .catch(err => Alert.alert('Something Went wrong'));
  };

  // ==== Check =====
  const validation = () => {
    if ((department !== '') & (departmentCode !== '')) {
      CreateDepartment();
    } else {
      Alert.alert('Something Missing', 'Please check the require feilds');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>
          Department
        </Text>
        <View style={{flex: 1, padding: 10, marginBottom: 200}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              console.log(item);
              return (
                <View
                  style={{
                    marginVertical: 5,
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#000', fontSize: 14}}>
                  { `${item.DepartmentID}.`}
                  </Text>
                  <Text style={{color: '#000', fontSize: 14}}>
                    {item.DepartmentCode}
                  </Text>
                  <Text style={{color: '#000', fontSize: 14}}>
                    {item.Department}
                  </Text>
                  <Text
                    style={{color: 'blue', fontSize: 12, fontWeight: 'bold'}}>
                    {item.Status}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            bottom: 0,
            left: 0,
            right: 0,
            padding: 8,
            height: 200,
            backgroundColor: '#fff',
          }}>
          <Text style={{color: 'green', fontSize: 14, fontWeight: '800'}}>
            Create New Department
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 8,
            }}>
            <View style={{flex: 1, padding: 5}}>
              <Text style={{color: '#000', fontSize: 12}}>Department Code</Text>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#000',
                }}
                maxLength={8}
                defaultValue={departmentCode}
                onChangeText={txt => setDepartmentCode(txt)}
              />
            </View>
            <View style={{flex: 1, padding: 5}}>
              <Text style={{color: '#000', fontSize: 12}}>Department</Text>
              <TextInput
                style={{
                  // backgroundColor: 'pink',
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#000',
                }}
                onChangeText={txt => setDepartment(txt)}
                maxLength={20}
                defaultValue={department}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setCheck(!check)}>
                <Image
                  source={{
                    uri: check
                      ? 'https://cdn-icons-png.flaticon.com/128/25/25643.png'
                      : 'https://cdn-icons-png.flaticon.com/128/545/545666.png',
                  }}
                  style={{height: 20, width: 20, marginRight: 5}}
                />
              </TouchableOpacity>
              <Text>Active</Text>
            </View>
            <TouchableOpacity
              onPress={() => validation()}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: 'green',
                borderRadius: 2,
                alignSelf: 'center',
              }}>
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Alldata;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
