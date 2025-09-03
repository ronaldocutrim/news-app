import React, { useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Chip, 
  Card 
} from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { useSearchNews } from '../viewmodels/useSearchNews';
import NewsCard from '../components/NewsCard';
import { SearchFilters, NewsArticle } from '../types';

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'publishedAt',
    pageSize: 20,
    page: 1,
  });
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useSearchNews(
    { ...filters, q: searchQuery },
    hasSearched && !!searchQuery.trim()
  );

  const sortOptions = [
    { label: 'Mais Recentes', value: 'publishedAt' as const },
    { label: 'Relevância', value: 'relevancy' as const },
    { label: 'Popularidade', value: 'popularity' as const },
  ];

  const languageOptions = [
    { label: 'Português', value: 'pt' },
    { label: 'Inglês', value: 'en' },
    { label: 'Espanhol', value: 'es' },
  ];

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      setHasSearched(true);
      refetch();
    }
  }, [searchQuery, refetch]);

  const handleFilterChange = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchContainer: {
      padding: 16,
    },
    searchInput: {
      backgroundColor: theme.colors.surface,
      marginBottom: 12,
    },
    searchButton: {
      marginBottom: 16,
    },
    filtersCard: {
      backgroundColor: theme.colors.surface,
      marginBottom: 16,
      padding: 16,
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },
    chip: {
      marginRight: 8,
      marginBottom: 8,
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
    resultsContainer: {
      flex: 1,
    },
    resultCount: {
      padding: 16,
      color: theme.colors.onSurface,
      fontSize: 14,
    },
  });

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} />
  );

  const renderResults = () => {
    if (!hasSearched) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Digite um termo para buscar notícias
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text, marginTop: 16 }}>
            Buscando notícias...
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
            Nenhuma notícia encontrada para "{searchQuery}".{'\n'}
            Tente usar outros termos de busca.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultCount}>
          {data.totalResults} resultados encontrados
        </Text>
        <FlatList
          data={data.articles}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.searchContainer} showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Digite sua busca..."
          mode="outlined"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

        <Button 
          mode="contained" 
          onPress={handleSearch}
          style={styles.searchButton}
          disabled={!searchQuery.trim()}
        >
          Buscar
        </Button>

        <Card style={styles.filtersCard}>
          <Text style={styles.filterTitle}>Ordenar por</Text>
          <View style={styles.chipContainer}>
            {sortOptions.map((option) => (
              <Chip
                key={option.value}
                selected={filters.sortBy === option.value}
                onPress={() => handleFilterChange('sortBy', option.value)}
                style={styles.chip}
              >
                {option.label}
              </Chip>
            ))}
          </View>

          <Text style={styles.filterTitle}>Idioma</Text>
          <View style={styles.chipContainer}>
            {languageOptions.map((option) => (
              <Chip
                key={option.value}
                selected={filters.language === option.value}
                onPress={() => 
                  handleFilterChange('language', 
                    filters.language === option.value ? undefined : option.value
                  )
                }
                style={styles.chip}
              >
                {option.label}
              </Chip>
            ))}
          </View>
        </Card>
      </ScrollView>

      {renderResults()}
    </View>
  );
};

export default SearchScreen;