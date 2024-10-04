import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import Brasil from "../../components/flags/Brasil";
import USA from "../../components/flags/USA";
import China from "../../components/flags/China";
import India from "../../components/flags/India";

const flags = [
  { component: Brasil, lang: "pt-BR", name: "Brasil" },
  { component: USA, lang: "en-US", name: "USA" },
  { component: China, lang: "zh-CN", name: "China" },
  { component: India, lang: "hi-IN", name: "India" },
];

export default function HomeScreen() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{t('language')}</ThemedText>
      
        {flags.map(({ component: Flag, lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang && styles.activeFlag,
              currentLanguage !== lang && styles.inactiveFlag,
            ]}
          >
            <Flag width={50} height={50} />
          </TouchableOpacity>
        ))}
      <ThemedText style={styles.helloText}>{t('home.title')}</ThemedText>
      <ThemedText>{t('home.description')}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Reduced padding to minimize spacing
    justifyContent: "center",
    alignItems: "center",
  },
  flagsContainer: {
    flexDirection: "row",
    marginVertical: 10, // Adjusted margin to reduce the gap
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    marginBottom: 10, // Adjusted to create space between text and flags
  },
  helloText: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: 0, // Reduced the top margin to bring "hello" closer to flags
  },
});
