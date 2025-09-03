import React from 'react';
import { View, FlatList, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { useTopNews } from '../viewmodels/useTopNews';
import NewsCard from '../components/NewsCard';
import { NewsArticle } from '../types';

const TopNewsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { data, isLoading, error, refetch, isRefetching } = useTopNews();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: theme.colors.error,
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 16,
    },
    retryText: {
      color: theme.colors.primary,
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
      color: theme.colors.onSurface,
      textAlign: 'center',
      fontSize: 16,
    },
  });

  if (isLoading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginTop: 16 }}>
          Carregando notícias...
        </Text>
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
        <Text 
          style={styles.retryText} 
          onPress={() => refetch()}
        >
          Tentar novamente
        </Text>
      </View>
    );
  }

  if (!data?.articles?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma notícia encontrada.
        </Text>
      </View>
    );
  }

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.articles}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default TopNewsScreen;