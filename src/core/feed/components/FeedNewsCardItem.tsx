import React from 'react';
import { NewsCard } from '@/components';
import { NewsArticle } from '@/core/feed/model/NewsArticle';
import { useNewsCard } from '@/hooks';

type FeedNewsCardItemProps = {
  article: NewsArticle;
};

export function FeedNewsCardItem(props: FeedNewsCardItemProps) {
  const { article } = props;
  const newsCardProps = useNewsCard(article);
  return <NewsCard article={article} {...newsCardProps} />;
}
