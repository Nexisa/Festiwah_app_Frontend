import { View, Text } from 'react-native'
import React from 'react'
import SamplePressable from '@/components/SamplePressable'
import { useRouter } from 'expo-router'

const Preferences = () => {
  const router = useRouter();
  return (
    <View>
       <SamplePressable
        iconName='person'
        text='Preferences'
        press={()=>{router.push('/')}}
        />
         <SamplePressable
        iconName='remove-red-eye'
        text='Account Privacy'
        press={()=>{router.push('/')}}
        />
        <SamplePressable
        iconName='edit-square'
        text='Customer Support'
        press={()=>{router.push('/')}}
        />
         <SamplePressable
        iconName='language'
        text='Language'
         press={()=>{router.push('/')}}
        />
    </View>
  )
}

export default Preferences