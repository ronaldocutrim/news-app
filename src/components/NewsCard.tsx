import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Share, Alert } from 'react-native';
import { Menu, IconButton } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../contexts/ThemeContext';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { theme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  const handleShare = async () => {
    setMenuVisible(false);
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    setMenuVisible(false);
    try {
      await Clipboard.setStringAsync(article.url);
      Alert.alert(
        'Link Copiado',
        'O link da notícia foi copiado para a área de transferência',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('Erro', 'Não foi possível copiar o link');
    }
  };

  const handleOpenExternal = () => {
    setMenuVisible(false);
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
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      lineHeight: 24,
      flex: 1,
      marginRight: 8,
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
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={3}>
            {article.title}
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => setMenuVisible(true)}
                iconColor={theme.colors.onSurface}
              />
            }
          >
            <Menu.Item
              onPress={handleShare}
              title="Compartilhar"
              leadingIcon="share"
            />
            <Menu.Item
              onPress={handleCopyLink}
              title="Copiar link"
              leadingIcon="content-copy"
            />
            <Menu.Item
              onPress={handleOpenExternal}
              title="Abrir no navegador"
              leadingIcon="open-in-new"
            />
          </Menu>
        </View>
        
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