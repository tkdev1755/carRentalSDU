import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {Text} from "react-native-paper";
import WelcomeMessage from '../components/WelcomeMessage';
import { useUser } from '../hooks/useUser';
import { useAppInit} from '../hooks/useAppInit'
import {useCurrentBookings} from "@/src/hooks/useCurrentBookings";
import CurrentBooking from "@/src/components/CurrentBooking";
import {Booking, usePastBooking} from "@/src/hooks/usePastBooking";
import PastBooking from "@/src/components/PastBooking";
import {useFutureBookings} from "@/src/hooks/useFutureBooking";
import FutureBooking from "@/src/components/FutureBooking";

export default function HomePage() {
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);
  useAppInit();

  const userId = "2";
  const {profileData, loading} = useUser(userId);
  const{bookings,loading:loadingBooking} = useCurrentBookings(userId);
  const { bookings: pastBookings, loading: loadingPast } = usePastBooking(userId);
  const { bookings: futureBooking, loading: loadingFuture } = useFutureBookings(userId);

  const nameField = profileData.find((f) => f.key === "first_name");
  const userName = nameField?.value ||"_";

  const sections=[
      {
          id:'current',
          type:'current',
          title:'Current Booking',
      },
      {
          id:'future',
          type:'future',
          title:'Future Booking',
      },
      {
          id:'past',
          type:'past',
          title:'Past Booking',
      },
  ];

  const renderSection = ({item}: {item:{id:string; type:string; title:string}}) => {
      return(
          <View style={styles.section}>
              <Text variant="titleLarge" style={styles.sectionTitle}>{item.title}</Text>
              {item.type==="current"&& <CurrentBooking bookings={bookings} loading={loadingBooking} />}
              {item.type==="future"&& <FutureBooking bookings={futureBooking} loading={loadingFuture}/>}
              {item.type==="past"&& <PastBooking bookings={pastBookings} loading={loadingPast}/>}
          </View>
      );
  };

  return (
      <FlatList
          data={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderSection}
          ListHeaderComponent={!loading ? <WelcomeMessage userName={userName} /> : null}
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
        marginTop:12,
        textAlign:"center",
    },
});
