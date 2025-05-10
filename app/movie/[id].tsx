import icon from "@/constants/icon";
import { useGetMovieDetailsQuery } from "@/features/tmdb/api/tmbdbApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: movie, isLoading } = useGetMovieDetailsQuery({
    movieId: id as string,
  });

  if (isLoading)
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <SafeAreaView className="flex-row items-center px-4 py-3 absolute top-0 left-0 right-0 z-10">
        <TouchableOpacity
          onPress={router.back}
          style={{
            backgroundColor: "#030014",
            borderRadius: 9999,
            padding: 12,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            borderWidth: 2,
            borderColor: "#151312",
          }}
        >
          <Image
            source={icon.arrow}
            className="size-6 rotate-180"
            tintColor="#ffffff"
          />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[450px]"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary to-transparent" />

          <TouchableOpacity
            className="absolute bottom-5 right-5 rounded-full size-14 bg-accent flex items-center justify-center elevation-3"
            style={{
              elevation: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
            }}
          >
            <Image
              source={icon.play}
              className="w-6 h-7 ml-1"
              tintColor="#ffffff"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-col items-start justify-center mt-2 px-5">
          <Text className="text-white font-bold text-2xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-3 py-1.5 rounded-md gap-x-1 mt-2">
            <Image source={icon.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />

          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-full">
            <View className="flex-1 mr-4">
              <MovieInfo
                label="Budget"
                value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
              />
            </View>
            <View className="flex-1">
              <MovieInfo
                label="Revenue"
                value={`$${Math.round(
                  (movie?.revenue ?? 0) / 1_000_000
                )} million`}
              />
            </View>
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      {/*  <View className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-primary via-primary to-transparent">
        <TouchableOpacity
          className="bg-accent rounded-lg py-4 flex flex-row items-center justify-center"
          style={{
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <Text className="text-white font-semibold text-base">Watch Now</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Details;
