export const MOCK_CARS = [
    {
      "id": 0, // ID Of the car, will be used in the bookings to know which car has been booked
      "name": "Volvo XC90", // Name of the model
      "price": 50.90, // Price per day
      "seats": 5, // Number of seats
      "transmission_type" : "Automatic", // Transmission type, wether the car is manual or automatic
      "type" : "SUV", // Format of the car, SUV, Compact, Minivan etc...
      "trunk_space" : 5 , // Corresponds to the numbers of luggage that can be fitted in the car
      "engine_type" : "Hybrid", // Type of the engine, can be "Hybrid", "Electric" or "Petrol"
      "is_available" : true, // bool to assert if the car is available, has to be changed each time a reservation is made
      "agency_id" : 1, // The id of the agency it is tied to, makes it able to know from which agency the car is available
      "image" : "https://www.evspecifications.info/wp-content/uploads/2020/01/volvo-xc90-t8-evchargeplus-00-1-1024x680.png",
    },
    {
        "id": 1,
        "name": "Tesla Model X",
        "price": 60.90,
        "seats": 7,
        "transmission_type" : "Automatic",
        "type" : "SUV",
        "trunk_space" : 5 ,// Corresponds to the numbers of luggage that can be fitted in the car
        "engine_type" : "Electric",
        "is_available" : true,
        "agency_id" : 1,
        "image" : "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=FRONT34&size=600&model=mx&options=$MDLX,$MTX18,$PPSW,$WX00,$APBS,$CC02,$SC05,$CPF2,$IBE00,$ST06,$TW01&crop=1250,703,340,160&",

    },
    {
        "id": 2,
        "name": "Ford Explorer",
        "price": 40.00,
        "seats": 5,
        "transmission_type" : "Automatic",
        "type" : "SUV",
        "trunk_space" : 3 ,// Corresponds to the numbers of luggage that can be fitted in the car
        "engine_type" : "Electric",
        "is_available" : true,
        "agency_id" : 1,
        "image" : "https://assets.ford.dk/media/2rnnlteo/explorer_ev_modeloversigt.png?height=335&mode=crop&width=596",
    },
    {
        "id": 3,
        "name": "Renault 5",
        "price": 29.90,
        "seats": 4,
        "transmission_type" : "Automatic",
        "type" : "City car",
        "trunk_space" : 3 ,// Corresponds to the numbers of luggage that can be fitted in the car
        "engine_type" : "Electric",
        "is_available" : true,
        "agency_id" : 1,
        "image" : "https://billeder.bilbasen.dk/bilinfo/155f7588-554b-445c-a478-7846bf3eecbb.png?class=S1600X1600",

    },
    {
        "id": 4,
        "name": "Volkswagen Golf",
        "price": 35.90,
        "seats": 5,
        "transmission_type" : "Manual",
        "type" : "Compact Car",
        "trunk_space" : 3 ,// Corresponds to the numbers of luggage that can be fitted in the car
        "engine_type" : "Petrol",
        "is_available" : false,
        "agency_id" : 1,
        "image" : "https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TbWhbdRTG__11be1sEnLT5mob0zQ1d5K33ty-ixHWyvCDxaqz4mSEm-Sfl5m33twkFkQmEyeMoUMrOtRPKmsdkykDFRljWuobCoJafIGC-EkEx2AoCHor_OCcB85zOB-ec_4P0dOyBI8tnL-u_tV70-FdhHiiIUT3u6LHblnZepcQYpn95apZlBPHGrKoBtudhNluTBTrlcKEoRszib0uMV3SE7lc2_CIPsciuoXoO-6UK3tCuN0tq9IwLbOazMtsq-i9ozA1NzkpJ-Xs1IyZmp8x8tkpQ09JfTo7PZedM3KF6XxO5uWs4rgvi26zUhGe_Ey1XjAnpwpWvWY3ciKWN1OTsqo3ilN7VEwHK5t16HRSDmv1pkOz0ZqdL4l9e6cKz-22VS4WpZWpWplSI4V2lXGdEcHINwR0AvcRvMHoIqM7hO4ldJXQLqE_CXuJ1NBOop1Fu0RUI7pAdJnoJtGPiT1K4jLJ_SSDiMO4DuBZxruFcgJfAd9TDD5EsETwLcK9RHaJHyVxDXEbosRAB_-rqKDewkgPoVOEDxA2iNWIHyN-nUSLgTEG3sS9g3IE_4Oop1C3GXmB0acJjTAWJvYr8TjxI8S3cG3gXsOzjqqjHiVwJ94v8f6G92f8vfin8c_hP4P_HdRJ1CXUGupLDP9DeJXwRZLniJhEXidygciHRLbRHiB6N9E6MYj5if1IfJX4OeK_IDbxnMB7EWUQ3xV8Nxg6TmiD8EnC2_ieIdgguEX3R-yzuXWd4S8Y_pr-SwQCBB4mOE6whTaONks0QfxvEv0kXka8yM3_MvAGA5_gErjux_Utrmu4X8HzHJ7TeG28r-F9G6UL5S6UDsoZlE2U91E-w7eD73MGf2f0A8ZOE_6e8X4iS0R-QksSPYR_CP9XqC5GNwi9R-gHwkESSdzP475A15P0HUL5Dl-MwWcZ-hT_KoGmE8R1WWuXnfBVZc1OrzySWVxcMTIL9Upe65Tzdimdmjd0rSTLxZKdnp_RNbPSKJlp22pJLWdWpWWmD64sG_dkDmaMjK6nNLPm_JVdrteaaa1az8uKJdvlpqPTS8sprVipZ82KZXYel2tNudqStZxMG1pV2mbetM22tP4fNXzdztb_AP5tPTrKAwAA.webp?width=864",

    },
    {
        "id": 5,
        "name": "Hyundai Elantra",
        "price": 50.90,
        "seats": 5,
        "transmission_type" : "Automatic",
        "type" : "Sedan",
        "trunk_space" : 4 ,// Corresponds to the numbers of luggage that can be fitted in the car
        "engine_type" : "Petrol",
        "is_available" : true,
        "agency_id" : 1,
        "image" : "https://carimages.d2cmedia.ca/newcars/cb68d11ee53a419/Hyundai/Elantra/2025/MjkxNDg1Xk1lZGlhIEdhbGxlcnk/I5W-MSIMJsHaCtsdCmvamcU1Lxvl51y7JZu3-pd6VaXmeV4qwlqu9AP79Qrwqyr2RXsoaqO8jPBI2cbErWmH4nxifrPzLqNiLPZ59cpz3gLkNjjmcvhAdwJQFDJjPizdSyUEHz0OqNTztCpBAi1Ro8Icg3c0qAZRZJeVIHwdoHWwqMCxRPgqn4C8nJkKYbBi/cc_2025HYC021979743_01_1280_SAW.png",

    },
];
