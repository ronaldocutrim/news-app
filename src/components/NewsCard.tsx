import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { NewsArticle, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    navigation.navigate('NewsDetail', { article });
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
      Alert.alert('Link Copiado', 'O link da notícia foi copiado para a área de transferência', [
        { text: 'OK' },
      ]);
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
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      marginVertical: 8,
      marginHorizontal: 16,
      elevation: 3,
      shadowColor: '#000000',
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
      color: '#2C2C2C',
      marginBottom: 8,
      lineHeight: 24,
    },
    description: {
      fontSize: 14,
      color: '#2C2C2C',
      marginBottom: 12,
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    sourceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    date: {
      fontSize: 12,
      color: '#8C8E90',
    },
    separator: {
      fontSize: 12,
      color: '#8C8E90',
      marginHorizontal: 8,
    },
    source: {
      fontSize: 12,
      color: '#EB455B',
      fontWeight: '600',
    },
    menuButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuIcon: {
      fontSize: 16,
      color: '#2C2C2C',
      fontWeight: 'bold',
      lineHeight: 16,
    },
    placeholderImage: {
      width: '100%',
      height: 200,
      backgroundColor: '#8C8E90',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuModal: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      minWidth: 200,
      elevation: 5,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    menuItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    menuItemText: {
      fontSize: 16,
      color: '#2C2C2C',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
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
          <View style={styles.sourceInfo}>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.source}>{article.source.name}</Text>
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>

          <Modal
            visible={menuVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setMenuVisible(false)}
            >
              <View style={styles.menuModal}>
                <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
                  <Text style={styles.menuItemText}>📤 Compartilhar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleCopyLink}>
                  <Text style={styles.menuItemText}>📋 Copiar link</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleOpenExternal}>
                  <Text style={styles.menuItemText}>🔗 Abrir no navegador</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
