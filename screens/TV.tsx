import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvAPI } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const TV = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvAPI.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvAPI.trending);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvAPI.airingToday);

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  const loading = topLoading || trendingLoading || todayLoading;
  const refreshing = topRefetching || trendingRefetching || todayRefetching;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated" data={topData.results} />
    </ScrollView>
  );
};

export default TV;
