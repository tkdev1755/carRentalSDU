import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CarList from "@/src/components/CarList";
import { Filters } from "@/src/components/Filters";

import { EngineType, TransmissionType } from "@/src/types/CarAttributes";
import { CarFilters } from "@/src/types/CarFilters";

type FilterComponentsProps = {
  filters: CarFilters;
  onFiltersChange: (filters: CarFilters) => void;
};

const FilterComponents = React.memo(({ filters, onFiltersChange }: FilterComponentsProps) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 4}}
      // TODO(mathias): height fix hack
      style={{maxHeight: 42}}>
      <Filters.Reset onPress={() => onFiltersChange({})} />
      <Filters.SingleSelect
        selected={filters.transmission ?? null}
        label="Transmission"
        options={["manual", "automatic"]}
        onSelect={(selected: TransmissionType | null) =>
          onFiltersChange({...filters, transmission: selected ?? undefined})
        }
      />
      <Filters.SingleSelect
        selected={filters.engine ?? null}
        label="Engine"
        options={["hybrid", "electric", "petrol"]}
        onSelect={(selected: EngineType | null) => 
          onFiltersChange({...filters, engine: selected ?? undefined})
        }
      />
      <Filters.Toggle
        toggled={(filters.availability ?? null) === "available"}
        label="Available"
        onToggle={(value: boolean) => {
          const availability = value ? "available" : undefined;
          onFiltersChange({...filters, availability: availability});
        }}
      />
    </ScrollView>
  );
});

export default function Index() {
  const [ filters, setFilters ] = useState<CarFilters>({});

  return (
    <View style={styles.container}>
      <FilterComponents filters={filters} onFiltersChange={setFilters} />
      <CarList filters={filters}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: 8,
  }
});