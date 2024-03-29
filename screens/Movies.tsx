import React, { useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesAPI.nowPlaying
  );

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesAPI.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesAPI.trending
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      title={item.title}
      overview={item.overview}
      release_date={item.release_date}
      vote_average={item.vote_average}
      fullData={item}
    />
  );

  const movieKeyExtractor = (item) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={loadMore}
      ListHeaderComponent={
        <>
          <Swiper
            loop={true}
            timeout={3}
            controlsEnabled={false}
            containerStyle={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.25,
              marginBottom: 10,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path || ""}
                poster_path={movie.poster_path || ""}
                vote_average={movie.vote_average}
                overview={movie.overview}
                title={movie.title}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
