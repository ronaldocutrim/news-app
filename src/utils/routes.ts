import { NewsArticle } from '@core/feed/model/NewsArticle';

export type RootStackParamList = {
  Splash: undefined;
  TabNavigator: undefined;
  NewsDetail: {
    article: NewsArticle;
  };
};

export type TabParamList = {
  TopNews: undefined;
  Search: undefined;
};
