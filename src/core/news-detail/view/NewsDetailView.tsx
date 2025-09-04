import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { NewsArticle } from '@core/feed/model/NewsArticle';

export interface NewsDetailViewProps {
  article: NewsArticle;
  isLoading: boolean;
  formattedDate: string;
  onShare: () => void;
  onOpenOriginal: () => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({
  article,
  isLoading,
  formattedDate,
  onShare,
  onOpenOriginal,
}) => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      
      {article.urlToImage ? (
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: article.urlToImage }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.imageOverlay} />
        </View>
      ) : (
        <View style={styles.placeholderHeroImage}>
          <Text style={styles.placeholderText}>Sem imagem disponível</Text>
        </View>
      )}

      
      <View style={styles.contentContainer}>
        
        <View style={styles.sourceBadge}>
          <Text style={styles.sourceBadgeText}>{article.source.name}</Text>
        </View>

        
        <Text style={styles.title}>{article.title}</Text>

        
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>📅 {formattedDate}</Text>
          </View>
          {article.author && (
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>✍️ Por {article.author}</Text>
            </View>
          )}
        </View>

        
        {article.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{article.description}</Text>
          </View>
        )}

        
        {article.content && (
          <View style={styles.articleContentContainer}>
            <Text style={styles.articleContent}>
              {article.content.replace(/\[\+\d+ chars\]/, '...')}
            </Text>
          </View>
        )}

        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Text style={styles.actionButtonIcon}>📤</Text>
            <Text style={styles.actionButtonText}>Compartilhar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onOpenOriginal}>
            <Text style={styles.actionButtonIcon}>🔗</Text>
            <Text style={styles.actionButtonText}>Ler Original</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EB455B" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
      </ScrollView>
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
    padding: 20,
  },
  loadingText: {
    color: '#2C2C2C',
    marginTop: 16,
    fontSize: 16,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  heroImageContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  placeholderHeroImage: {
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
  },
  sourceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EB455B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  sourceBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C2C2C',
    lineHeight: 34,
    marginBottom: 16,
  },
  metaContainer: {
    marginBottom: 16,
  },
  metaRow: {
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#8C8E90',
    lineHeight: 20,
  },
  descriptionContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EB455B',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2C2C2C',
    fontStyle: 'italic',
  },
  articleContentContainer: {
    marginBottom: 24,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#2C2C2C',
    textAlign: 'justify',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 120,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionButtonText: {
    color: '#2C2C2C',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
