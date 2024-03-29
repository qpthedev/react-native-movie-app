import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  margin: 10px 0px;
  /* margin-vertical: 10px; */
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  poster_path: string;
  title: string;
  overview: string;
  release_date?: string;
  vote_average?: number;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  title,
  overview,
  release_date,
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
      <HMovie>
        <Poster path={poster_path} />
        <HColumn>
          <Title>
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </Title>

          {release_date ? (
            <Release>{new Date(release_date).toLocaleDateString()}</Release>
          ) : null}
          {vote_average ? <Votes votes={vote_average} /> : null}
          <Overview>
            {overview !== "" && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </Pressable>
  );
};

export default HMedia;
