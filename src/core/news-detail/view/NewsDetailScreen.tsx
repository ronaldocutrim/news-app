import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@utils/routes';
import { NewsDetailView } from './NewsDetailView';
import { useNewsDetailViewModel } from '../viewmodel/NewsDetailViewModel';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const { article } = route.params;

  const { isLoading, handleShare, handleOpenOriginal, getArticleMetadata } =
    useNewsDetailViewModel(article);

  const metadata = getArticleMetadata();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F0F0" />
      <NewsDetailView
        article={article}
        isLoading={isLoading}
        formattedDate={metadata.publishedAt}
        onShare={handleShare}
        onOpenOriginal={handleOpenOriginal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0F0',
  },
});
