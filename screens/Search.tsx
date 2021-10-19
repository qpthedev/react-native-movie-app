import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  padding: 10px 15px;
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesAPI.search, {
    enabled: false,
  });

  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTV,
  } = useQuery(["searchTV", query], tvAPI.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTV();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search Movies or TV"
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
};

export default Search;
