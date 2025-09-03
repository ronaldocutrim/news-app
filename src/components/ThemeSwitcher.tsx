import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={toggleTheme}>
      <Ionicons 
        name={isDark ? 'sunny' : 'moon'} 
        size={24} 
        color={theme.colors.text} 
      />
    </TouchableOpacity>
  );
};

export default ThemeSwitcher;