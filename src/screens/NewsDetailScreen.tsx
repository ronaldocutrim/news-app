import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, NewsArticle } from '../types';
import { useInfiniteTopNews } from '../hooks/useInfiniteNews';
import NewsCard from '../components/NewsCard';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;
type NewsDetailNavigationProp = NavigationProp<RootStackParamList>;

const NewsDetailScreen: React.FC = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const navigation = useNavigation<NewsDetailNavigationProp>();
  const { article } = route.params;
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteTopNews('us', 5);

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

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allArticles = data?.pages.flatMap(page => page.articles) || [];
  
  const filteredArticles = allArticles.filter(item => 
    item.url !== article.url && item.title !== article.title
  );

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <View style={styles.relatedNewsItem}>
      <NewsCard article={item} />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#EB455B" />
        <Text style={styles.footerLoaderText}>Carregando mais notícias...</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View>
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
        
        <Text style={styles.relatedTitle}>Outras notícias</Text>
      </View>
    </View>
  );

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
    relatedTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2C2C2C',
      marginTop: 30,
      marginBottom: 16,
    },
    relatedNewsItem: {
      marginBottom: 16,
    },
    footerLoader: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    footerLoaderText: {
      color: '#8C8E90',
      fontSize: 14,
      marginTop: 8,
    },
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#EB455B" />
        <Text style={{ color: '#2C2C2C', marginTop: 16 }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredArticles}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

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