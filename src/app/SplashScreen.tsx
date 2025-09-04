import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@utils/routes';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavigator');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EB455B',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 8,
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.9,
      letterSpacing: 0.5,
    },
    loadingContainer: {
      marginTop: 50,
    },
    loadingText: {
      color: '#FFFFFF',
      fontSize: 14,
      marginTop: 16,
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>NewsApp</Text>
        <Text style={styles.subtitle}>Suas notícias em tempo real</Text>
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
