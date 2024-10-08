import { View, Text, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import SamplePressable from '@/components/SamplePressable'
import {  useRouter } from 'expo-router'
import ScreenNamewithBackButton from '@/components/ScreenNamewithBackButton'

const Settings = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setLogoutModalVisible(false);
    router.push('/');
  };
  return (
    <View>
      {/* <ScreenNamewithBackButton screenName='Srttings'></ScreenNamewithBackButton> */}
        <SamplePressable
        iconName='settings'
        text='Preferences'
        press={()=>{router.push('/Preferences')}}
        />
         <SamplePressable
        iconName='https'
        text='Account Privacy'
        press={()=>{router.push('/')}}
        />
        <SamplePressable
        iconName='help'
        text='Customer Support'
        press={()=>{router.push('/')}}
        />
         <SamplePressable
        iconName='block'
        text='Blocked Accounts'
         press={()=>{router.push('/')}}
        />
         <SamplePressable
        iconName='logout'
        text='Logout'
        press={ ()=>setLogoutModalVisible(true)}
      /> 
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Are you sure you want to logout?</Text>
            <Button title="Yes" onPress={handleLogout} />
            <Button title="No" onPress={() => setLogoutModalVisible(false)} />
          </View>
        </View>
      </Modal>
    
    </View>
  )
}

export default Settings