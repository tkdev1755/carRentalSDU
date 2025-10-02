import * as React from "react";
import { View, ScrollView } from "react-native";
import WelcomeMessage from '../components/WelcomeMessage';
import { useUser } from '../hooks/useUser';
import { useAppInit} from '../hooks/useAppInit'
import {useCurrentBookings} from "@/src/hooks/useCurrentBookings";
import CurrentBooking from "@/src/components/CurrentBooking";

export default function HomePage() {
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);
  useAppInit();

  const userId = "1";
  const {profileData, loading} = useUser(userId);
  const{bookings,loading:loadingBooking} = useCurrentBookings(userId);

  const nameField = profileData.find((f) => f.key === "name");
  const userName = nameField?.value ||"_";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        padding:16,
      }}
    >
        <ScrollView>
            {!loading && <WelcomeMessage userName={userName} />}
            <CurrentBooking bookings={bookings} loading={loadingBooking} />
        </ScrollView>
    </View>
  );
}
