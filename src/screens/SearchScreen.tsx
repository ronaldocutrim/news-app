import React, { useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { 
  Text, 
  TextInput, 
  Button,
  Chip 
} from 'react-native-paper';
import { useDebounce } from '@uidotdev/usehooks';
import { useTheme } from '../contexts/ThemeContext';
import { useSearchNews } from '../viewmodels/useSearchNews';
import NewsCard from '../components/NewsCard';
import { SearchFilters, NewsArticle } from '../types';

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
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
    q: debouncedSearchQuery || 'news', // Use debounced query or 'news' as default
    sortBy: selectedSort,
    pageSize: 20,
    page: 1,
  };

  const { data, isLoading, error, refetch } = useSearchNews(
    filters,
    true // Always enabled to show initial data
  );

  const handleSortChange = useCallback((sortBy: 'publishedAt' | 'relevancy' | 'popularity') => {
    setSelectedSort(sortBy);
  }, []);

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} />
  );

  const renderSortOption = ({ item }: { item: typeof sortOptions[0] }) => (
    <Chip
      selected={selectedSort === item.key}
      onPress={() => handleSortChange(item.key as 'publishedAt' | 'relevancy' | 'popularity')}
      style={[
        styles.sortChip,
        selectedSort === item.key && styles.selectedChip
      ]}
      textStyle={[
        styles.chipText,
        selectedSort === item.key && styles.selectedChipText
      ]}
      mode={selectedSort === item.key ? 'flat' : 'outlined'}
    >
      {item.label}
    </Chip>
  );

  const renderContent = () => {
    if (isLoading && !data) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
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
      backgroundColor: theme.colors.background,
    },
    searchContainer: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      elevation: 2,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    searchInput: {
      backgroundColor: theme.colors.background,
      marginBottom: 16,
    },
    filtersContainer: {
      marginBottom: 8,
    },
    filtersLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    sortContainer: {
      paddingVertical: 8,
    },
    sortChip: {
      marginRight: 8,
      borderColor: theme.colors.primary,
    },
    selectedChip: {
      backgroundColor: theme.colors.primary,
    },
    chipText: {
      color: theme.colors.text,
      fontSize: 14,
    },
    selectedChipText: {
      color: theme.colors.background,
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
      color: theme.colors.text,
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
      color: theme.colors.error,
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 16,
      lineHeight: 24,
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
      lineHeight: 24,
    },
    resultCount: {
      padding: 16,
      color: theme.colors.onSurface,
      fontSize: 14,
      backgroundColor: theme.colors.surface,
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
          mode="outlined"
          returnKeyType="search"
          right={
            searchQuery !== debouncedSearchQuery ? (
              <TextInput.Icon 
                icon={() => (
                  <ActivityIndicator 
                    size={20} 
                    color={theme.colors.primary} 
                  />
                )}
              />
            ) : null
          }
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