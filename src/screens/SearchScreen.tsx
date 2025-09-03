import React, { useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearchNews } from '../viewmodels/useSearchNews';
import NewsCard from '../components/NewsCard';
import { SearchFilters, NewsArticle } from '../types';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<'publishedAt' | 'relevancy' | 'popularity'>('publishedAt');
  
  // Debounce search query by 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const sortOptions = [
    { key: 'publishedAt', label: 'Mais Recentes' },
    { key: 'relevancy', label: 'Relevância' },
    { key: 'popularity', label: 'Popularidade' },
  ];

  const filters: SearchFilters = {
    q: debouncedSearchQuery || 'news',
    sortBy: selectedSort,
    pageSize: 20,
    page: 1,
  };

  const { data, isLoading, error, refetch } = useSearchNews(
    filters,
    true
  );

  const handleSortChange = useCallback((sortBy: 'publishedAt' | 'relevancy' | 'popularity') => {
    setSelectedSort(sortBy);
  }, []);

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} />
  );

  const renderSortOption = ({ item }: { item: typeof sortOptions[0] }) => (
    <TouchableOpacity
      style={[
        styles.sortChip,
        selectedSort === item.key && styles.selectedChip
      ]}
      onPress={() => handleSortChange(item.key as 'publishedAt' | 'relevancy' | 'popularity')}
    >
      <Text style={[
        styles.chipText,
        selectedSort === item.key && styles.selectedChipText
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (isLoading && !data) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EB455B" />
          <Text style={styles.loadingText}>
            Carregando notícias...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Erro ao buscar notícias.{'\n'}
            Verifique sua conexão com a internet.
          </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.retryText}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!data?.articles?.length) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {debouncedSearchQuery 
              ? `Nenhuma notícia encontrada para "${debouncedSearchQuery}".{'\n'}Tente usar outros termos de busca.`
              : 'Nenhuma notícia disponível no momento.'
            }
          </Text>
        </View>
      );
    }

    const headerText = debouncedSearchQuery 
      ? `${data.totalResults} resultados encontrados para "${debouncedSearchQuery}"`
      : `${data.totalResults} notícias encontradas`;

    return (
      <FlatList
        data={data.articles}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text style={styles.resultCount}>
            {headerText}
          </Text>
        )}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F0F0',
    },
    searchContainer: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    searchInput: {
      backgroundColor: '#F3F0F0',
      marginBottom: 16,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: '#2C2C2C',
      borderWidth: 1,
      borderColor: '#8C8E90',
    },
    filtersContainer: {
      marginBottom: 8,
    },
    filtersLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: '#2C2C2C',
      marginBottom: 8,
    },
    sortContainer: {
      paddingVertical: 8,
    },
    sortChip: {
      marginRight: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#EB455B',
      backgroundColor: '#FFFFFF',
    },
    selectedChip: {
      backgroundColor: '#EB455B',
    },
    chipText: {
      color: '#2C2C2C',
      fontSize: 14,
    },
    selectedChipText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    contentContainer: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    loadingText: {
      color: '#2C2C2C',
      marginTop: 16,
      fontSize: 16,
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
      lineHeight: 24,
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
      lineHeight: 24,
    },
    resultCount: {
      padding: 16,
      color: '#2C2C2C',
      fontSize: 14,
      backgroundColor: '#FFFFFF',
      textAlign: 'center',
    },
    listContent: {
      paddingBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Digite para buscar notícias em tempo real..."
          returnKeyType="search"
          placeholderTextColor="#8C8E90"
        />

        {/* Sort Filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersLabel}>Ordenar por:</Text>
          <FlatList
            data={sortOptions}
            renderItem={renderSortOption}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortContainer}
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

export default SearchScreen;