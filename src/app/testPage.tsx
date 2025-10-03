import { useFilterParams } from "@/src/hooks/useFilterParams";
import { CarFilters } from "@/src/types/CarFilters";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { cancelBooking, createBooking, getCar } from "../api/services";
import { seedDatabase } from "../database/seed";

const handleAdamsPress = async () => {

  await seedDatabase();

  const bookingData = {
      start_date: "2025-09-24T10:00:00Z",
      end_time: "2025-09-25T10:00:00Z",
      car_id: 1,          // assuming car with id=1 exists
      user_id: "user123", // assuming user exists
      agency_id: 0,       // fake agency id
    };

  console.log("➡️ Creating booking...");
  const newBooking = await createBooking(bookingData);
  console.log("✅ Booking created:", newBooking);

  // Show car availability after booking
  const bookedCar = await getCar(bookingData.car_id);
  console.log("🚗 Car after booking (should be unavailable):", bookedCar);

  // Cancel booking
  console.log("➡️ Canceling booking...");
  const cancelResult = await cancelBooking(newBooking.lastInsertRowId as number); 
  console.log("❌ Booking canceled:", cancelResult);

  // Show car availability after cancellation
  const carAfterCancel = await getCar(bookingData.car_id);
  console.log("🚗 Car after cancelation (should be available again):", carAfterCancel);

  
};

export const AdamTestingComponent = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={handleAdamsPress}>
                ADAM testing LAND
            </Button>
        </View>
    );
  };



const AmauryTestingComponent = () => {
  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        AMAURY testing LAND
      </Button>
    </View>
  );
};

const HannesTestingComponent = () => {
  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        HANNES testing LAND
      </Button>
    </View>
  );
};

export const MathiasTestingComponent = () => {
  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        MATHIAS testing LAND
      </Button>
    </View>
  );
};
export const TahaTestingComponent = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filtersOptions = [
    {
      name: "Engine",
      associatedFunction: () => {
        filterByEngine();
        setActiveFilter("Engine");
      },
    },
    {
      name: "Price",
      associatedFunction: () => {
        filterByEngine();
        setActiveFilter("Price");
      },
    },
    {
      name: "Seats",
      associatedFunction: () => {
        setActiveFilter("Seats");
      },
    },
    {
      name: "Trunk space",
      associatedFunction: () => {
        setActiveFilter("TrunkSpace");
      },
    },
    {
      name: "Transmission",
      associatedFunction: () => {
        setActiveFilter("Transmission");
      },
    },
    {
      name: "Type",
      associatedFunction: () => {
        setActiveFilter("Type");
      },
    },
  ];
  const { filters, setFilters } = useFilterParams();

  const handleApply = (updated: CarFilters) => {
    setFilters({ ...filters, ...updated });
    setActiveFilter(null);
  };

  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        mode="contained"
        onPress={async () => {
          setFilters({ seats: 2 } as CarFilters);
          console.log("_filters: ", filters);
        }}
      >
        Set Seats to 2
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={async () => {
          setFilters({} as CarFilters);
          console.log("_filters: ", filters);
        }}
      >
        reset seats
      </Button>

      <Text>Engine type : {filters.engineType}</Text>
      <Text>
        Price Range : {filters.minPrice} - {filters.maxPrice}
      </Text>
      <Text>Seats Range : {filters.seats}</Text>
      <Text>TrunkSpace : {filters.seats}</Text>
    </View>
  );
};

const testPage = () => {
  return (
    <View>
      <AdamTestingComponent></AdamTestingComponent>
      <AmauryTestingComponent></AmauryTestingComponent>
      <HannesTestingComponent></HannesTestingComponent>

      <MathiasTestingComponent></MathiasTestingComponent>
      <TahaTestingComponent></TahaTestingComponent>
    </View>
  );
};

function filterByEngine() {
  console.log("Filtering by engine...");
}

function filterByPrice() {
  console.log("Filtering by price...");
}

function filterByYear() {
  console.log("Filtering by year...");
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});
export default testPage;
