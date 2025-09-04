import React from 'react';
import { NewsCard } from '@/components';
import { NewsArticle } from '../../feed/model/NewsArticle';
import { useNewsCard } from '@/hooks';

interface NewsDetailCardItemProps {
  article: NewsArticle;
}

export const DetailNewsCardItem: React.FC<NewsDetailCardItemProps> = ({ article }) => {
  const newsCardProps = useNewsCard(article);
  return <NewsCard article={article} {...newsCardProps} />;
};
