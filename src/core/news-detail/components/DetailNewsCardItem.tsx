import React from 'react';
import { NewsCard } from '@/components';
import { NewsArticle } from '../../feed/model/NewsArticle';
import { useFeedNewsCard } from '@/hooks/useFeedNewsCard';

interface NewsDetailCardItemProps {
  article: NewsArticle;
}

export const DetailNewsCardItem: React.FC<NewsDetailCardItemProps> = ({ article }) => {
  const newsCardProps = useFeedNewsCard(article);
  return <NewsCard {...newsCardProps} />;
};
