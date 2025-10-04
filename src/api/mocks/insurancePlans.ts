export const INSURANCE_PLANS = [
    {
        id: 0,
        name: "Basic plan",
        price: 100,
        color: "#CD7F32",
        features: [
            {
                title: "Collision Damage Waiver (CDW)",
                description: "Covers damage to the rental vehicle in case of an accident."
            },
            {
                title: "Theft Protection (TP)",
                description: "Protects against the financial loss if the rental car is stolen."
            },
            {
                title: "Limited Liability Insurance",
                description: "Provides minimal coverage for damage or injury to third parties."
            }
        ],
        duration: 365
    },
    {
        id: 1,
        name: "Standard plan",
        price: 100,
        features: [
            {
                title: "Extended Liability Insurance",
                description: "Higher protection limits for third-party injury and property damage."
            },
            {
                title: "Partial Deductible Reduction",
                description: "Lower out-of-pocket costs in case of damage or theft."
            },
            {
                title: "Roadside Assistance (basic)",
                description: "Support for flat tires, jump-starts, or lockouts, but not towing."
            }
        ],
        duration: 365,
        color: "#9C9C9C" // Argent
    },
    {
        id: 2,
        name: "Premium Plus plan",
        price: 100,
        color: "#F5B21A",
        features: [
            {
                title: "Comprehensive Liability Protection",
                description: "Significantly higher coverage limits for third-party claims."
            },
            {
                title: "Personal Accident Insurance (PAI)",
                description: "Covers medical expenses for the driver and passengers."
            },
            {
                title: "Roadside Assistance Plus",
                description: "Includes towing, replacement vehicle, and emergency support."
            }
        ],
        duration: 365
    }
];
