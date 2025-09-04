import React from 'react';
import { View, FlatList, RefreshControl, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { NewsArticle } from '@/core/feed/model/NewsArticle';
import { FeedNewsCardItem } from '@core/feed/components/FeedNewsCardItem';

interface NewsListViewProps {
  articles: NewsArticle[];
  isLoading: boolean;
  error: any;
  isRefetching: boolean;
  onRefresh: () => void;
}

export const FeedListView: React.FC<NewsListViewProps> = ({
  articles,
  isLoading,
  error,
  isRefetching,
  onRefresh,
}) => {
  if (isLoading && !articles.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EB455B" />
        <Text style={styles.loadingText}>Carregando notícias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Erro ao carregar as notícias.{'\n'}
          Verifique sua conexão com a internet.
        </Text>
        <Text style={styles.retryText} onPress={onRefresh}>
          Tentar novamente
        </Text>
      </View>
    );
  }

  if (!articles.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>
      </View>
    );
  }

  const renderNewsItem = ({ item }: { item: NewsArticle }) => <FeedNewsCardItem article={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            colors={['#EB455B']}
            tintColor="#EB455B"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#2C2C2C',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#EB455B',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  retryText: {
    color: '#EB455B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#2C2C2C',
    textAlign: 'center',
    fontSize: 16,
  },
});
