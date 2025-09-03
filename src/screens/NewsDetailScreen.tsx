import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

const NewsDetailScreen: React.FC = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const navigation = useNavigation();
  const { article } = route.params;

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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOpenOriginal = () => {
    Linking.openURL(article.url);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F0F0',
    },
    scrollContainer: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 250,
    },
    placeholderImage: {
      width: '100%',
      height: 250,
      backgroundColor: '#8C8E90',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 120,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2C2C2C',
      lineHeight: 32,
      marginBottom: 16,
    },
    metaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    date: {
      fontSize: 14,
      color: '#8C8E90',
    },
    separator: {
      fontSize: 14,
      color: '#8C8E90',
      marginHorizontal: 8,
    },
    source: {
      fontSize: 14,
      color: '#EB455B',
      fontWeight: '600',
    },
    author: {
      fontSize: 14,
      color: '#8C8E90',
      marginTop: 8,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#2C2C2C',
      marginBottom: 16,
    },
    content: {
      fontSize: 16,
      lineHeight: 24,
      color: '#2C2C2C',
      marginBottom: 20,
    },
    actionsContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      elevation: 5,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
      height: 80,
    },
    actionButton: {
      flex: 1,
      backgroundColor: '#EB455B',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginHorizontal: 8,
      alignItems: 'center',
    },
    actionButtonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#EB455B',
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    actionButtonTextSecondary: {
      color: '#EB455B',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
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
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {article.title}
          </Text>

          <View style={styles.metaContainer}>
            <Text style={styles.date}>
              {formatDate(article.publishedAt)}
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.source}>
              {article.source.name}
            </Text>
          </View>

          {article.author && (
            <Text style={styles.author}>
              Por {article.author}
            </Text>
          )}

          {article.description && (
            <Text style={styles.description}>
              {article.description}
            </Text>
          )}

          {article.content && (
            <Text style={styles.content}>
              {article.content.replace(/\[\+\d+ chars\]/, '...')}
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={handleShare}
        >
          <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
            Compartilhar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleOpenOriginal}
        >
          <Text style={styles.actionButtonText}>
            Ler Original
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsDetailScreen;