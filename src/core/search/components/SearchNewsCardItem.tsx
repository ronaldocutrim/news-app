import React from 'react';
import { NewsArticle } from '@core/feed';
import { useNewsCard } from '@/hooks';
import { NewsCard } from '@/components';

type SearchNewsCardItemProps = { article: NewsArticle };

export function SearchNewsCardItem({ article }: SearchNewsCardItemProps) {
  const newsCardProps = useNewsCard(article);
  return <NewsCard article={article} {...newsCardProps} />;
}
