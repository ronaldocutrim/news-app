import { useState } from 'react';
import { Share, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NewsArticle } from '@/core/feed/model/NewsArticle';
import { NewsCardProps } from '../components/NewsCardProps';
import { RootStackParamList } from '@utils/routes';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useFeedNewsCard = (article: NewsArticle): NewsCardProps => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    navigation.navigate('NewsDetail', { article });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📰 Veja esta notícia do feed principal:\n\n${article.title}\n\n${article.url}`,
        title: `Feed: ${article.title}`,
      });
    } catch (error) {
      console.error('Error sharing article from feed:', error);
    }
    setMenuVisible(false);
  };

  const handleOpenOriginal = () => {
    Linking.openURL(article.url);
    setMenuVisible(false);
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

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
