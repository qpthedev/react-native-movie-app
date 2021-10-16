import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 15px;
`;

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-vertical: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={HListSeparator}
      data={data}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          poster_path={item.poster_path}
          title={item.title ?? item.name}
          vote_average={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
