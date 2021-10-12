import React from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet } from "react-native";

const Movies = () => (
  <Btn>
    <Title>Movies</Title>
  </Btn>
);

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default Movies;
