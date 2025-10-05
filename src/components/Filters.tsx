import React, {useState} from "react";
import {useFilterParams} from "@/src/hooks/useFilterParams";
import {CarFilters} from "@/src/types/CarFilters";
import {FilterOptions} from "@/src/components/FilterOptions";
import {FilterModal} from "@/src/components/FilterModal";

type FiltersProps = {
    filters: CarFilters;
};

export const Filters : React.FC<FiltersProps> = (filter: FiltersProps) => {
    let f = {
        trunkSpace: 12,
        engineType: "petrol",
        isAvailable: false,
    };
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const {filters, setFilters} = useFilterParams();
  const hasSetPriceFilter = filters.minPrice || filters.maxPrice;
  const filtersOptions = [
        { name: "Engine", associatedFunction: () => {setActiveFilter("Engine")},
          selectedValue: filters.engineType,
        },
        {
          name: "Price", associatedFunction: () => {setActiveFilter("Price")},
          selectedValue: hasSetPriceFilter ? `${filters.minPrice} € - ${filters.maxPrice} €` : undefined,
        },
        {
          name: "Seats", associatedFunction: () => {setActiveFilter("Seats")},
          selectedValue: filters.seats ? `${filters.seats} seats` : undefined,
        },
        {
          name: "Trunk space", associatedFunction: () => {setActiveFilter("TrunkSpace")},
          selectedValue: filters.trunkSpace ? `${filters.trunkSpace} luggages` : undefined,
        },

        {
          name: "Transmission", associatedFunction: () => {setActiveFilter("Transmission")},
          selectedValue: filters.transmissionType,
        },
        {
          name: "Type", associatedFunction: () => {setActiveFilter("Type")},
          selectedValue: filters.type
        },
    ];

    const handleApply = (updated: CarFilters) => {
        setFilters({ ...filters, ...updated });
        setActiveFilter(null);
    };

    const resetFilters = () => {
        setFilters({})
    }
    return (
        <>
            <FilterOptions options={filtersOptions} resetFilters={resetFilters} />
            <FilterModal
                visible={activeFilter !== null}
                filter={activeFilter}
                filters={filters}
                onApply={handleApply}
                onDismiss={() => setActiveFilter(null)}
            />
        </>
    );
};
