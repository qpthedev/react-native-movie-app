import React from "react";
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
}) => (
  <Movie>
    <Poster path={poster_path} />
    <Title>
      {title.slice(0, 12)}
      {title.length > 12 ? "..." : null}
    </Title>
    <Votes votes={vote_average} />
  </Movie>
);

export default VMedia;
