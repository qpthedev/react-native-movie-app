import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
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

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
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
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  vote_average,
  overview,
  title,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        source={{ uri: makeImgPath(backdrop_path) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={80}
        tint={isDark ? "dark" : "light"}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{title}</Title>
            {vote_average > 0 ? (
              <Votes isDark={isDark}>⭐{vote_average} / 10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 85)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
