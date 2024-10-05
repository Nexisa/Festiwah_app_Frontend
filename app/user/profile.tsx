import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, FontAwesome } from '@expo/vector-icons';

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

// Updated dummy data
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
        profileImage,
        coverImage,
        stories,
        posts,
    } = dummyData;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(followers);
    const [globalLoading, setGlobalLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        console.log('Scroll Offset:', offsetY); // Log to check the scroll value
        if (offsetY > 0 && !isLoading) {
            setIsLoading(true);
            // Simulate loading more content
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
        }, 500); // Simulate slight loading time
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate fetching new data
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Global Loading Indicator */}
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
                {/* Cover Photo and Profile Picture */}
                <TouchableOpacity onPress={handleCoverImageClick}>
                    <ImageBackground source={{ uri: coverImage }} className="h-40">
                        <View className="flex-row justify-between p-4">
                            <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
                                <Entypo name="menu" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="absolute -bottom-16 left-4" onPress={() => setFullScreenImage(profileImage)}>
                            <Image
                                source={{ uri: profileImage }}
                                className="w-32 h-32 rounded-full border-4 border-white"
                                accessibilityLabel={`${name}'s Profile Image`}
                                resizeMode="cover" // Ensures the image fills the circle properly
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                </TouchableOpacity>

                <View className="mt-20 px-4">
                    {/* Profile Info */}
                    <Text className="text-xl font-bold">{name}</Text>
                    <Text className="text-sm text-gray-600">{occupation}</Text>
                    <Text className="text-sm text-gray-600">{email}</Text>
                    <View className="flex-row items-center">
                        <Entypo name="location-pin" size={16} color="gray" />
                        <Text className="text-sm text-gray-600 ml-1">{location}</Text>
                    </View>

                    {/* Social Icons */}
                    <View className="flex-row mt-2">
                        <TouchableOpacity onPress={() => openSocialMedia('facebook')}>
                            <FontAwesome name="facebook-square" size={24} color="#3b5998" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openSocialMedia('instagram')}>
                            <FontAwesome name="instagram" size={24} color="#C13584" />
                        </TouchableOpacity>
                    </View>

                    {/* Stats */}
                    <View className="flex-row justify-between mt-4">
                        <View className="items-center">
                            <Text className="font-bold">{postsCount}</Text>
                            <Text className="text-gray-600">posts</Text>
                        </View>
                        <View className="items-center">
                            <Text className="font-bold">{followerCount}</Text>
                            <Text className="text-gray-600">followers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="font-bold">{following}</Text>
                            <Text className="text-gray-600">following</Text>
                        </View>
                    </View>

                    {/* Follow Button */}
                    <TouchableOpacity
                        className={`rounded-full py-2 mt-4 ${isFollowing ? 'bg-gray-300' : 'bg-blue-500'}`}
                        onPress={handleFollow}
                    >
                        <Text className={`text-center font-bold ${isFollowing ? 'text-black' : 'text-white'}`}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>

                    {/* Highlights */}
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

                    {/* Posts Grid */}
                    <View className="flex-row flex-wrap mt-4">
                        {posts.length > 0 ? (
                            posts.map((post: Post, index: number) => (
                                <TouchableOpacity key={index} onPress={() => setFullScreenImage(post.imageUrl)}>
                                    <Image
                                        source={{ uri: post.imageUrl }}
                                        className="w-[118px] h-40 mx-2"
                                        resizeMode="cover" // Use cover to ensure the image takes up the space properly
                                    />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text className="text-center w-full py-4">No posts yet</Text>
                        )}
                    </View>
                </View>

                {isLoading && (
                    <View className="py-4">
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text className="text-center">Loading more...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Full-Screen Image Modal */}
            <Modal
                visible={!!fullScreenImage}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setFullScreenImage(null)}
            >
                <TouchableOpacity
                    className="flex-1 justify-center items-center bg-black bg-opacity-80"
                    onPress={() => setFullScreenImage(null)}
                >
                    {fullScreenImage && (
                        <Image
                            source={{ uri: fullScreenImage }}
                            className="h-full w-full"
                            resizeMode="contain"
                        />
                    )}
                </TouchableOpacity>
            </Modal>

            {/* Menu Modal */}
            <Modal visible={isMenuOpen} transparent={true} animationType="slide" onRequestClose={() => setIsMenuOpen(false)}>
                <View className="flex-1 bg-white">
                    <SafeAreaView>
                        <TouchableOpacity className="p-4" onPress={() => setIsMenuOpen(false)}>
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                        <View className="p-4">
                            <Text className="text-xl font-bold mb-4">Menu</Text>
                            <TouchableOpacity className="py-2">
                                <Text>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-2">
                                <Text>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-2">
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Profile;
