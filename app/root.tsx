import { router } from 'expo-router';
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

const { width } = Dimensions.get('window');

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#131621]">
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width: width }} className="justify-center items-center p-4">
            <Image source={slide.img} className="w-full h-32 mb-4" resizeMode="contain" />
            <Text className="text-2xl font-bold text-white text-center mb-2 mt-8">{slide.title}</Text>
            <Text className="text-base text-white text-center mb-4 mt-8">{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center mb-8">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1.5 ${
              activeIndex === index ? 'bg-[#1DA1F2]' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>

      {activeIndex === slides.length - 1 && (
        <TouchableOpacity
          className="bg-[#1DA1F2] py-3 px-8 rounded-full absolute bottom-64" // Adjusted bottom from 8 to 20
          onPress={() => router.push('/(tabs)')}
        >
          <Text className="text-white text-lg font-bold text-center">Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Slider;