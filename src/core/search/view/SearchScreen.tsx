import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { SearchView } from './SearchView';
import { useSearchScreenViewModel } from '../viewmodel/SearchViewModel';

export const SearchScreen: React.FC = () => {
  const viewModelProps = useSearchScreenViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SearchView {...viewModelProps} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0F0',
  },
});
