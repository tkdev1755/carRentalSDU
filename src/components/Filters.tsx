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
    const filtersOptions = [
        { name: "Engine", associatedFunction: () => {setActiveFilter("Engine")} },
        { name: "Price", associatedFunction: () => {setActiveFilter("Price")} },
        { name: "Seats", associatedFunction: () => {setActiveFilter("Seats")}  },
        { name: "Trunk space", associatedFunction: () => {setActiveFilter("TrunkSpace")}  },
        { name: "Transmission", associatedFunction: () => {setActiveFilter("Transmission")}  },
        { name: "Type", associatedFunction: () => {setActiveFilter("Type")}  },
    ];
    const {filters, setFilters} = useFilterParams();

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