import { View, Text ,ScrollView} from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const languages = [
    {
        id: '1',
        name: 'English',
    },
    {
        id: '2',
        name: 'French',
    },
    {
        id: '3',
        name: 'Spanish',
    },
    {
        id: '4',
        name: 'German',
    },
    {
        id: '5',
        name: 'Chinese',
    },
    {
        id: '6',
        name: 'Japanese',
    },
    {
        id: '7',
        name: 'Korean',
    },
    {
        id: '8',
        name: 'Arabic',
    },
    {
        id: '9',
        name: 'Hindi',
    },
    {
        id: '10',
        name: 'Russian',
    },
    ];
const Language = () => {
  return (
    <ThemedView className='flex-1 p-3'>

       <ScrollView>
            {languages.map((language) => (
                
                <ThemedView key={language.id}>
                    <ThemedText className='text-4xl p-6'>{language.name}
                    </ThemedText>
                
                </ThemedView>

            ))}
                </ScrollView>


    </ThemedView>
  )
}

export default Language