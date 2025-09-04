import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { FeedListView, useNewsListViewModel } from '@core/feed';

export const FeedListScreen: React.FC = () => {
  const { articles, isLoading, error, isRefetching, onRefresh } = useNewsListViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FeedListView
        articles={articles}
        isLoading={isLoading}
        error={error}
        isRefetching={isRefetching}
        onRefresh={onRefresh}
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
