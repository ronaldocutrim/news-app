import React from 'react';
import { NewsCard } from '@/components';
import { NewsArticle } from '@/core/feed/model/NewsArticle';
import { useFeedNewsCard } from '@/hooks/useFeedNewsCard';

type FeedNewsCardItemProps = {
  article: NewsArticle;
};

export function FeedNewsCardItem(props: FeedNewsCardItemProps) {
  const { article } = props;
  const newsCardProps = useFeedNewsCard(article);
  return <NewsCard {...newsCardProps} />;
}
