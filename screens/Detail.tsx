import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Dimensions,
  Linking,
  Platform,
  Pressable,
  Share,
  StyleSheet,
} from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesAPI, TV, tvAPI } from "../api";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT * 0.3}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: 500;
  align-self: flex-end;
  margin-left: 20px;
  width: 80%;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
  padding: 0px 20px;
`;

const VideoBtn = styled.Pressable`
  flex-direction: row;
  margin-left: 20px;
`;

const BtnText = styled.Text`
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 25px;
  margin-left: 5px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;

    if (isAndroid) {
      await Share.share({
        title: isMovie ? params.title : params.name,
        message: homepage,
      });
    } else {
      await Share.share({
        title: isMovie ? params.title : params.name,
        url: homepage,
      });
    }
  };

  const ShareButton = () => {
    return (
      <Pressable onPress={shareMedia}>
        <Ionicons name="share-outline" size={25} />
      </Pressable>
    );
  };

  const isMovie = "original_title" in params;

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );

  const openYTLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    await Linking.openURL(baseUrl);
  };

  useEffect(() => {
    setOptions({
      title: "title" in params ? "Movie" : "TV Show",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <Background
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(255,255,255,0.4)"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"title" in params ? params.title : params.name}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      {isLoading ? <Loader /> : null}
      {data?.videos?.results?.map((video) => (
        <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
          <Ionicons name="logo-youtube" size={25} />
          <BtnText>{video.name}</BtnText>
        </VideoBtn>
      ))}
      <Data></Data>
    </Container>
  );
};

export default Detail;
