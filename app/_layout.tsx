import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '@/i18n';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { store } from '@/utils/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [initialRoute, setInitialRoute] = useState('index');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

      if (token) {
        if (role === 'admin') {
          setInitialRoute('admin/dashboard');
        } else if (role === 'user') {
          setInitialRoute('user/dashboard');
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName={initialRoute}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="tabs/index" options={{ headerShown: false }} />
          <Stack.Screen name="admin/dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="user/dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
