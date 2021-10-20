import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  poster_path: string;
  title: string;
  vote_average: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  title,
  vote_average,
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
    <Pressable onPress={goDetail}>
      <Container>
        <Poster path={poster_path || ""} />
        <Title>{title.length > 12 ? `${title.slice(0, 12)}...` : title}</Title>
        <Votes votes={vote_average} />
      </Container>
    </Pressable>
  );
};

export default VMedia;
