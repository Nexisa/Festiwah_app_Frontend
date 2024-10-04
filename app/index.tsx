import { router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const slides = [
  {
    id: 1,
    img: require('../assets/images/first.png'),
    title: 'Welcome To FestiWah',
    description: 'Dummy text is also used to demonstrate the appearance of different typefaces and layouts.',
  },
  {
    id: 2,
    img: require('../assets/images/second.png'),
    title: 'Best social app to virtually visit all Festivals',
    description: 'Dummy text is also used to demonstrate the appearance of different typefaces and layouts.',
  },
  {
    id: 3,
    img: require('../assets/images/third.png'),
    title: 'Enjoy your life Every time',
    description: 'Dummy text is also used to demonstrate the appearance of different typefaces and layouts.',
  },
];

const { width, height } = Dimensions.get('window');

const Slider = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  const p = () => {
    router.push('auth/login' as never)
  }

  return (
    <View className="flex-1 bg-[#131621]">
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width, height }} className="justify-start items-center">
            <View style={{ width, height: height * 0.6 }} className="mb-4">
              <Image 
                source={slide.img} 
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain" 
              />
            </View>
            <View className="px-4 flex-1 justify-between">
              <View>
                <Text className="text-2xl font-bold text-white text-center mb-2 mt-4">{slide.title}</Text>
                <Text className="text-base text-white text-center mb-4">{slide.description}</Text>
              </View>
              {index === slides.length - 1 && (
                <TouchableOpacity
                  className="bg-[#1DA1F2] py-3 px-8 rounded-full mb-8 self-center"
                  onPress={p}
                >
                  <Text className="text-white text-lg font-bold text-center">Get Started</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-center absolute bottom-4 left-0 right-0">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1.5 ${
              activeIndex === index ? 'bg-[#1DA1F2]' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default Slider;