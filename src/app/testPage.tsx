import { useFilterParams } from "@/src/hooks/useFilterParams";
import { CarFilters } from "@/src/types/CarFilters";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getFilteredCars } from "../api/services";
import { useSnackbar } from "../context/SnackbarContext";
import { seedDatabase } from "../database/seed";
import {Link} from "expo-router";

const handleAdamsPress = async () => {
  await seedDatabase();

  const filteredCars = await getFilteredCars({
    maxPrice: 50,
    isAvailable: true,
  });
  //console.log("Filtered cars:", filteredCars);

  filteredCars.forEach((car) => {
    console.log(`Car: ${car.name}, Price: ${car.price}`);
  });

  const filteredCars2 = await getFilteredCars({
    isAvailable: true,
  });

  //console.log("Available cars:", filteredCars2);
  console.log("Available cars:");

  filteredCars2.forEach((car) => {
    console.log(`Car: ${car.name}, Price: ${car.price}`);
  });
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
  const { showSnackbar } = useSnackbar();
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => showSnackbar("Error: Lorem")}>
        Show Snackbar with message: "Lorem"
      </Button>
      <Button mode="contained" onPress={() => showSnackbar("Error: Ipsum")}>
        Show Snackbar with message: "Ipsum"
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
        <Link href={"/cars/BookingPage?id=1"}>
            Go to cars
        </Link>


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
