import { useState } from 'react';
import { Share, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NewsArticle } from '@/core/feed/model/NewsArticle';
import { NewsCardProps } from '../components/NewsCardProps';
import { RootStackParamList } from '@utils/routes';

/**
 * Hook específico para NewsCard no contexto de Search
 * 
 * Contexto: Resultados de busca em tempo real
 * Características específicas:
 * - Formatação de data RELATIVA (horas atrás, dias atrás)
 * - Compartilhamento com contexto de busca
 * - Analytics específico de resultados de busca
 * - Navegação otimizada para descoberta
 * 
 * Retorna interface NewsCardProps específica
 */
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useSearchNewsCard = (article: NewsArticle): NewsCardProps => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    navigation.navigate('NewsDetail', { article });
  };

  const handleShare = async () => {
    try {
      // Compartilhamento específico do contexto de busca
      await Share.share({
        message: `🔍 Encontrei esta notícia nos resultados de busca:\n\n${article.title}\n\nFonte: ${article.source.name}\n\n${article.url}`,
        title: `Busca: ${article.title}`,
      });
      
    } catch (error) {
      console.error('Error sharing search result:', error);
    }
    setMenuVisible(false);
  };

  const handleOpenOriginal = () => {
    Linking.openURL(article.url);
    setMenuVisible(false);
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  // Formatação de data RELATIVA para Search (horas atrás, dias atrás)
  const formatDate = (dateString: string): string => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMs = now.getTime() - publishedDate.getTime();
    
    // Converter para diferentes unidades de tempo
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    // Retornar formato relativo apropriado
    if (diffInMinutes < 1) {
      return 'Agora';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d atrás`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks}sem atrás`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}m atrás`;
    } else {
      // Para notícias muito antigas, volta para formato tradicional
      return publishedDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
  };

  // Retorna interface NewsCardProps específica
  return {
    article,
    menuVisible,
    handlePress,
    handleShare,
    handleOpenOriginal,
    showMenu,
    hideMenu,
    formatDate,
  };
};