import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  padding: 10px 15px;
  border-radius: 10px;
  width: 90%;
  margin: 20px auto;
  background-color: rgba(232, 236, 241, 1);
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
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
