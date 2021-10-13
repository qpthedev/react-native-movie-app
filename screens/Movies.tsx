import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../components/Slide";

const API_KEY = "";

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
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

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="red" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop={true}
        timeout={3}
        controlsEnabled={false}
        containerStyle={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
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
    </Container>
  );
};

export default Movies;
