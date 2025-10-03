import {Text,Button, IconButton} from "react-native-paper";
import {StyleSheet,View} from "react-native";
import React,{useState, useCallback} from "react";
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import { format } from "date-fns";
import title from "react-native-paper/src/components/Typography/v2/Title";
type DatePickerProps = {
    date?: Date;
    onDateChange?: (date: Date, type:string) => void;
    type: string;
    title: string;
}
export const DatePicker : React.FC<DatePickerProps> = ({ date, title, onDateChange, type }) => {
    const [selectedDate, setSelectedDate] = useState(date ?? new Date());

    const [open, setOpen] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState<{ hours: number; minutes: number } | null>(
        null
    );
    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmDate = (params: { date: Date }) => {
        setOpen(false);
        setSelectedDate(params.date);
        setOpenTime(true); // enchaîne directement sur le time picker
    };
    const onConfirmTime = (params: { hours: number; minutes: number }) => {
        setOpenTime(false);
        setTime(params);
        if (selectedDate) {
            // Combiner la date + heure choisie
            const finalDate = new Date(selectedDate);
            console.log(params.hours, params.minutes);
            finalDate.setHours(params.hours);
            finalDate.setMinutes(params.minutes);
            setSelectedDate(finalDate);
            console.log(`Now date is ${finalDate} - type ${type}`);
          onDateChange?.(finalDate, type);

        }
    };
    const onDismissTime = () => {
        setOpenTime(false);
    };

    const onConfirmSingle = useCallback(
        (params: { date: Date }) => {
            setOpen(false);
            setSelectedDate(params.date);
            setOpenTime(true);
        },
        []
    );
    return (
        <View>
            <Text variant={"titleMedium"} style={styles.text}>{title}</Text>
            <View style={styles.container}>
                <Text variant={"titleLarge"}>{format(selectedDate, "dd/MM/yyyy - HH:mm")}</Text>
                <View style={{ flex: 1 }} />
                <IconButton
                    icon="calendar-month" // Material icon
                    onPress={() => {
                        setOpen(true);
                        console.log("Ouvrir un date picker");
                    }}
                />
                <DatePickerModal
                    locale= "en"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={selectedDate}
                    onConfirm={onConfirmSingle}
                />
                <TimePickerModal
                    locale="en"
                    visible={openTime}
                    onDismiss={onDismissTime}
                    onConfirm={onConfirmTime}
                    hours={time?.hours}
                    minutes={time?.minutes}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderStyle: "solid",
        borderColor : "black",
        borderWidth: 2,
        borderRadius: 6,

    },
    loading : {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    accordion: {
        borderRadius: 6,
        overflow: "hidden",
        borderStyle: "solid",
        borderColor : "black",
        borderWidth: 2,

    },
    multilineText: {
        flexWrap: "wrap",
    },
    text : {
        paddingBottom :10,
    },
})

