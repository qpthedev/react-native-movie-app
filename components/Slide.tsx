import { useNavigation } from "@react-navigation/core";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image`
  opacity: 0.6;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: rgba(30, 39, 46, 1);
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Column = styled.View`
  width: 60%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(30, 39, 46, 1);
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  title: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  vote_average,
  overview,
  title,
  fullData,
}) => {
  const navigation = useNavigation();
  const goDetail = () => {
    // @ts-ignore
    navigation.navigate("Stacks", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };

  return (
    <Pressable onPress={goDetail} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BgImg
          source={{ uri: makeImgPath(backdrop_path) }}
          style={StyleSheet.absoluteFill}
        />
        <BlurView style={StyleSheet.absoluteFill} intensity={80}>
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title>{title}</Title>
              {vote_average > 0 ? <Votes>⭐{vote_average} / 10</Votes> : null}
              <Overview>{overview.slice(0, 85)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </Pressable>
  );
};

export default Slide;
