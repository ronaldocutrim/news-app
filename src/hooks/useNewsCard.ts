import { useState } from 'react';
import { Share, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsArticle } from '@core/feed/model/NewsArticle';

export const useNewsCard = (article: NewsArticle) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    (navigation as any).navigate('NewsDetail', { article });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
    setMenuVisible(false);
  };

  const handleOpenOriginal = () => {
    Linking.openURL(article.url);
    setMenuVisible(false);
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return {
    menuVisible,
    handlePress,
    handleShare,
    handleOpenOriginal,
    showMenu,
    hideMenu,
    formatDate,
  };
};
