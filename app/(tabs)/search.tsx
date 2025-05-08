import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import icon from "@/constants/icon";
import image from "@/constants/image";
import { useSearchMovie } from "@/features/tmdb/hooks/useSearchMovie";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const { handleSearch, searchQuery, isError, movies, isLoading } =
    useSearchMovie();

  const showResults = searchQuery.trim() && movies.length > 0;

  return (
    <View className="bg-primary flex-1">
      <Image
        source={image.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={showResults ? movies : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icon.logo} />
            </View>

            <View className="my-10">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {isLoading && (
              <ActivityIndicator size="large" color="#00f" className="my-3" />
            )}

            {isError && (
              <Text className="text-red-500 px-5 my-3">
                Error fetching data
              </Text>
            )}

            {showResults && !isLoading && (
              <Text className="text-xl text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading && searchQuery.trim() ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                No movies found.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
