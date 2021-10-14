import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesAPI } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// LogBox.ignoreLogs(["Setting a timer"]);

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["movies", "upcoming"], moviesAPI.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }) => (
    <VMedia
      title={item.title}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      title={item.title}
      overview={item.overview}
      release_date={item.release_date}
      vote_average={item.vote_average}
    />
  );

  const movieKeyExtractor = (item) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="red" />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            loop={true}
            timeout={3}
            controlsEnabled={false}
            containerStyle={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.25,
              marginBottom: 30,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                overview={movie.overview}
                title={movie.title}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending</ListTitle>

            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              data={trendingData.results}
              keyExtractor={movieKeyExtractor}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
