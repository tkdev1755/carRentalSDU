// translations.ts
import { registerTranslation } from "react-native-paper-dates";

export const setupDateTranslations = () => {
    registerTranslation("en", {
        save: "Save",
        selectSingle: "Select date",
        selectMultiple: "Select dates",
        selectRange: "Select period",
        notAccordingToDateFormat: (inputFormat) =>
            `Date format must be ${inputFormat}`,
        mustBeHigherThan: (date) => `Must be later than ${date}`,
        mustBeLowerThan: (date) => `Must be earlier than ${date}`,
        mustBeBetween: (startDate, endDate) =>
            `Must be between ${startDate} - ${endDate}`,
        dateIsDisabled: "Day is not allowed",
        previous: "Previous",
        next: "Next",
        typeInDate: "Type in date",
        pickDateFromCalendar: "Pick date from calendar",
        close: "Close",
        hour: "Hour",
        minute: "Minute",
    });
};