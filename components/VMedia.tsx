import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
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
}

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  title,
  vote_average,
}) => {
  const navigation = useNavigation();
  const goDetail = () => {
    navigation.navigate("Stacks", { screen: "Detail" });
  };

  return (
    <Pressable onPress={goDetail}>
      <Movie>
        <Poster path={poster_path || ""} />
        <Title>{title.length > 12 ? `${title.slice(0, 12)}...` : title}</Title>
        <Votes votes={vote_average} />
      </Movie>
    </Pressable>
  );
};

export default VMedia;
