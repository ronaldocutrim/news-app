import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { theme } = useTheme();

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginVertical: 8,
      marginHorizontal: 16,
      elevation: 3,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
      lineHeight: 24,
    },
    description: {
      fontSize: 14,
      color: theme.colors.onSurface,
      marginBottom: 12,
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    source: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    date: {
      fontSize: 12,
      color: theme.colors.disabled,
    },
    placeholderImage: {
      width: '100%',
      height: 200,
      backgroundColor: theme.colors.disabled,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      color: theme.colors.background,
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {article.urlToImage ? (
        <Image 
          source={{ uri: article.urlToImage }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
        
        {article.description && (
          <Text style={styles.description} numberOfLines={3}>
            {article.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.source}>
            {article.source.name}
          </Text>
          <Text style={styles.date}>
            {formatDate(article.publishedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;