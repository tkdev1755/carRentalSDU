import { useFutureBookings } from "@/src/hooks/useFutureBooking";
import { usePastBooking } from "@/src/hooks/usePastBooking";
import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CurrentBooking from "../components/CurrentBooking";
import WelcomeMessage from "../components/WelcomeMessage";
import { useAppInit } from "../hooks/useAppInit";
import { useCurrentBookings } from "../hooks/useCurrentBookings";
import { useUser } from "../hooks/useUser";

export default function HomePage() {
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);
  useAppInit();

  const userId = "2";
  const { profileData, loading } = useUser(userId);
  const { bookings, isLoading: loadingBooking } = useCurrentBookings(userId);
  const { bookings: pastBookings, isLoading: loadingPast } =
    usePastBooking(userId);
  const { bookings: futureBooking, isLoading: loadingFuture } =
    useFutureBookings(userId);

  const nameField = profileData.find((f) => f.key === "first_name");
  const userName = nameField?.value || "_";

  const sections = [
    {
      id: "current",
      type: "current",
      title: "Current Booking",
    },
    {
      id: "future",
      type: "future",
      title: "Future Booking",
    },
    {
      id: "past",
      type: "past",
      title: "Past Booking",
    },
  ];

  const renderSection = ({
    item,
  }: {
    item: { id: string; type: string; title: string };
  }) => {
    return (
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          {item.title}
        </Text>
        {item.type === "current" && (
          <CurrentBooking bookings={bookings} loading={loadingBooking} />
        )}
        {item.type === "future" && (
          <CurrentBooking bookings={futureBooking} loading={loadingFuture} />
        )}
        {item.type === "past" && (
          <CurrentBooking bookings={pastBookings} loading={loadingPast} />
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderSection}
      ListHeaderComponent={
        !loading ? <WelcomeMessage userName={userName} /> : null
      }
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 12,
    textAlign: "center",
  },
});
