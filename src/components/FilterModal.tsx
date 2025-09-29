

import React from "react";
import { Modal, Portal, Card, Button } from "react-native-paper";
import { EngineFilter } from "./filterModals/EngineFilter";
import { PriceFilter } from "./filterModals/PriceFilter";
import {CarFilters} from "@/src/types/CarFilters";
import {SeatsFilter} from "@/src/components/filterModals/SeatsFilter";
import {TrunkSpaceFilter} from "@/src/components/filterModals/TrunkSpaceFilter";
import {TransmissionFilter} from "@/src/components/filterModals/TransmissionFilter";
import {TypeFilter} from "@/src/components/filterModals/TypeFilter";
type FilterModalProps = {
    visible: boolean;
    filter: string | null;
    filters: CarFilters;
    onApply: (updated: CarFilters) => void;
    onDismiss: () => void;
};
/**
 * Component for displaying the Modal page for filtering
 * The content of the modal depends on the "filter" attribute in FilterModalProps
 * The Ok button calls the onApply function of the FilterModalProps passed to it
 * the visible boolean value tells if the Modal should be visible on screen or not
 *
 * @example
 * <FilterModal
 *   visible={activeFilter !== null}
 *   filter={activeFilter}
 *   filters={filters}
 *   onApply={handleApply}
 *   onDismiss={() => setActiveFilter(null)}
 * />
 **/
export const FilterModal: React.FC<FilterModalProps> = ({ visible, filter, filters, onApply, onDismiss }) => {
    let tempFilters: CarFilters = { ...filters }; // copie locale

    const renderContent = () => {
        switch (filter) {
            case "Engine":
                return <EngineFilter filters={tempFilters} onChange={f => (filters = f)} />;
            case "Price":
                return <PriceFilter filters={tempFilters} onChange={f => (filters = f)} />;
            case "Seats":
                return <SeatsFilter filters={tempFilters} onChange={f => (filters = f)} />;
            case "TrunkSpace":
                return <TrunkSpaceFilter filters={tempFilters} onChange={f => (filters = f)}/>
            case "Transmission":
                return <TransmissionFilter filters={tempFilters} onChange={f => (filters = f)}/>;
            case "Type":
                return <TypeFilter filters={tempFilters} onChange={f => (filters = f)}/>;
            default:
                return null;
        }
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ padding: 20 }}>
                <Card>
                    <Card.Content>
                        {renderContent()}
                        <Button onPress={() => {onApply(filters); onDismiss()}} style={{ marginTop: 20 }}>
                            Ok
                        </Button>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};