import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Modal,
    Linking,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

interface Story {
    title: string;
    imageUrl: string;
}

interface Post {
    imageUrl: string;
}

interface ProfileProps {
    name: string;
    occupation: string;
    email: string;
    location: string;
    postsCount: number;
    followers: number;
    following: number;
    profileImage: string;
    coverImage: string;
    stories: Story[];
    posts: Post[];
}

const dummyData: ProfileProps = {
    name: "Reny Lewis",
    occupation: "Photographer",
    email: "For Collaboration - abc@gmail.com",
    location: "Kolkata",
    postsCount: 3,
    followers: 100,
    following: 100,
    profileImage: "https://randomuser.me/api/portraits/women/17.jpg",
    coverImage: "https://picsum.photos/800/300",
    stories: [
        { title: "Lifestyle", imageUrl: "https://picsum.photos/200/300?random=1" },
        { title: "Puja", imageUrl: "https://picsum.photos/200/300?random=2" },
    ],
    posts: [
        { imageUrl: "https://picsum.photos/400/400?random=4" },
        { imageUrl: "https://picsum.photos/400/400?random=5" },
        { imageUrl: "https://picsum.photos/400/400?random=6" },
    ],
};

const Profile: React.FC = () => {
    const {
        name,
        occupation,
        email,
        location,
        postsCount,
        followers,
        following,
        coverImage,
        stories,
        posts,
    } = dummyData;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(followers);
    const [globalLoading, setGlobalLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [profileImage, setProfileImage] = useState(dummyData.profileImage);
     const router = useRouter();
    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        console.log('Scroll Offset:', offsetY);
        if (offsetY > 0 && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const openSocialMedia = async (platform: string) => {
        const url = platform === 'facebook' ? 'https://www.facebook.com' : 'https://www.instagram.com';
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('Failed to open URL:', error);
        }
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
    };

    const handleCoverImageClick = () => {
        setGlobalLoading(true);
        setTimeout(() => {
            setGlobalLoading(false);
            setFullScreenImage(coverImage);
        }, 500);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const handleProfilePictureChange = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to change your profile picture.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.assets && !result.canceled) {
                setProfileImage(result.assets[0].uri);
                console.log('New profile picture selected:', result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error changing profile picture:', error);
            Alert.alert('Error', 'An error occurred while trying to change the profile picture.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {globalLoading && (
                <View className="absolute inset-0 bg-black opacity-50 z-50 flex justify-center items-center">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}

            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <TouchableOpacity onPress={handleCoverImageClick}>
                    <ImageBackground source={{ uri: coverImage }} className="h-40">
                        <View className="flex-row justify-end p-6">
                            <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
                                <Entypo name="menu" size={24} color="white" />
                            </TouchableOpacity>

                            <Modal visible={isMenuOpen} transparent={true} animationType="slide">
                                <View className="flex-1 pt-12 pr-4 items-end border-black ">
                                    
                                    <View className="bg-white p-2 rounded-lg w-1/2">
                                    <TouchableOpacity onPress={() => setIsMenuOpen(false)} className=" items-end ">
                                        <Ionicons name="close" size={30} color="black" />
                                    </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setIsMenuOpen(false);
                                             router.push('/Settings') }} className="mb-3 pl-2">
                                            <Text className="text-base">Settings</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setIsMenuOpen(false);
                                              router.push('/Settings') }} className="mb-3 pl-2">
                                            <Text className="text-base">Go to Screen 2</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setIsMenuOpen(false);
                                            router.push('/Settings') }} className="mb-3 pl-2">
                                            <Text className=" text-base">Go to Screen 3</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            
                            
                        </View>
                        <View className="items-center  border-2">
                            <TouchableOpacity onPress={() => setFullScreenImage(profileImage)}>
                                <Image
                                    source={{ uri: profileImage }}
                                    className="w-32 h-32 rounded-full  border-4 border-white"
                                    accessibilityLabel={`${name}'s Profile Image`}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="absolute bottom-0 right-0 bg-white rounded-full p-2"
                                onPress={handleProfilePictureChange}
                            >
                                <Ionicons name="camera" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <View className="mt-20 px-4">
                    <Text className="text-xl font-bold">{name}</Text>
                    <Text className="text-sm text-gray-600">{occupation}</Text>
                    <Text className="text-sm text-gray-600">{email}</Text>
                    <View className="flex-row items-center">
                        <Entypo name="location-pin" size={16} color="gray" />
                        <Text className="text-sm text-gray-600 ml-1">{location}</Text>
                    </View>

                    <View className="flex-row mt-2">
                        <TouchableOpacity onPress={() => openSocialMedia('facebook')}>
                            <FontAwesome name="facebook-square" size={24} color="#3b5998" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openSocialMedia('instagram')}>
                            <FontAwesome name="instagram" size={24} color="#C13584" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between mt-4">
                        <View className="items-center">
                            <Text className="font-bold">{postsCount}</Text>
                            <Text className="text-gray-600">posts</Text>
                        </View>
                        <TouchableOpacity
                className="items-center"
                onPress={() => router.push('/screens/follower')}
            >
                <Text className="font-bold">{followerCount}</Text>
                <Text className="text-gray-600">followers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                className="items-center"
                onPress={() => router.push('/screens/follower')}
            >
                <Text className="font-bold">{following}</Text>
                <Text className="text-gray-600">following</Text>
            </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className={`rounded-full py-2 mt-4 ${isFollowing ? 'bg-gray-300' : 'bg-blue-500'}`}
                        onPress={handleFollow}
                    >
                        <Text className={`text-center font-bold ${isFollowing ? 'text-black' : 'text-white'}`}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                        {stories.map((story: Story, index: number) => (
                            <View key={index} className="items-center mr-4">
                                <Image
                                    source={{ uri: story.imageUrl }}
                                    className="w-16 h-16 rounded-full mb-1"
                                />
                                <Text className="text-xs">{story.title}</Text>
                            </View>
                        ))}
                        <TouchableOpacity className="items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 mr-4">
                            <Entypo name="plus" size={24} color="gray" />
                        </TouchableOpacity>
                    </ScrollView>

                    <View className="flex-row flex-wrap mt-4">
                        {posts.length > 0 ? (
                            posts.map((post: Post, index: number) => (
                                <TouchableOpacity key={index} onPress={() => setFullScreenImage(post.imageUrl)}>
                                    <Image
                                        source={{ uri: post.imageUrl }}
                                        className="w-[118px] h-40 mx-2"
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text className="text-center w-full py-4">No posts yet</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            <Modal visible={!!fullScreenImage} transparent={true}>
                <View className="flex-1 justify-center items-center bg-black bg-opacity-75">
                    <TouchableOpacity onPress={() => setFullScreenImage(null)} className="absolute top-10 right-10">
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    <Image source={{ uri: fullScreenImage || '' }} className="w-96 h-96" resizeMode="contain" />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Profile;
