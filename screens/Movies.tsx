import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  View,
  FlatList,
} from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const API_KEY = "";

const Container = styled.ScrollView``;

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

const UpcomingScroll = styled.FlatList``;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();

    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`
      )
    ).json();

    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`
      )
    ).json();

    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
            {nowPlaying.map((movie) => (
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
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              data={trending}
              keyExtractor={(item) => item.id + ""}
              renderItem={({ item }) => (
                <VMedia
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      data={upcoming}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path}
          title={item.title}
          overview={item.overview}
          release_date={item.release_date}
          vote_average={item.vote_average}
        />
      )}
    />
  );
};

export default Movies;
