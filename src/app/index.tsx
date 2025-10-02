import * as React from "react";
import { View, ScrollView } from "react-native";
import WelcomeMessage from '../components/WelcomeMessage';
import { useUser } from '../hooks/useUser';
import { useAppInit} from '../hooks/useAppInit'

export default function HomePage() {
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);
  useAppInit();

  const userId = "1";
  const {profileData, loading} = useUser(userId);

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
        </ScrollView>

    </View>
  );
}
