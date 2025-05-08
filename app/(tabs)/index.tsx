import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import icon from "@/constants/icon";
import image from "@/constants/image";
import { useMovies } from "@/features/tmdb/hooks/useMovies";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Index = () => {
  const { data: movies, isLoading, isError } = useMovies();
  return (
    <View className="bg-primary flex-1">
      <Image
        source={image.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icon.logo} className="mt-20 mb-5 mx-auto" />
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : isError ? (
          <Text>Error: {isError}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar onPress={() => {}} placeholder="Search for a movie" />
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
