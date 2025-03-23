
// Mock data structures for the Emergency Evacuation Planner

// Regions of the world
export const regions = [
  { id: 'north-america', name: 'North America' },
  { id: 'south-america', name: 'South America' },
  { id: 'europe', name: 'Europe' },
  { id: 'africa', name: 'Africa' },
  { id: 'asia', name: 'Asia' },
  { id: 'oceania', name: 'Oceania' }
];

// Countries by region
export const countriesByRegion: Record<string, Array<{ id: string, name: string }>> = {
  'north-america': [
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'mx', name: 'Mexico' },
    { id: 'gt', name: 'Guatemala' },
    { id: 'hn', name: 'Honduras' },
  ],
  'south-america': [
    { id: 'br', name: 'Brazil' },
    { id: 'ar', name: 'Argentina' },
    { id: 'co', name: 'Colombia' },
    { id: 'pe', name: 'Peru' },
    { id: 've', name: 'Venezuela' },
  ],
  'europe': [
    { id: 'uk', name: 'United Kingdom' },
    { id: 'fr', name: 'France' },
    { id: 'de', name: 'Germany' },
    { id: 'it', name: 'Italy' },
    { id: 'ua', name: 'Ukraine' },
  ],
  'africa': [
    { id: 'ng', name: 'Nigeria' },
    { id: 'za', name: 'South Africa' },
    { id: 'eg', name: 'Egypt' },
    { id: 'et', name: 'Ethiopia' },
    { id: 'sd', name: 'Sudan' },
  ],
  'asia': [
    { id: 'cn', name: 'China' },
    { id: 'jp', name: 'Japan' },
    { id: 'in', name: 'India' },
    { id: 'pk', name: 'Pakistan' },
    { id: 'sy', name: 'Syria' },
  ],
  'oceania': [
    { id: 'au', name: 'Australia' },
    { id: 'nz', name: 'New Zealand' },
    { id: 'fj', name: 'Fiji' },
    { id: 'pg', name: 'Papua New Guinea' },
    { id: 'sb', name: 'Solomon Islands' },
  ]
};

// Timeframes (months)
export const timeframes = [
  { id: 'asap', name: 'As Soon As Possible' },
  { id: 'current-month', name: 'Current Month' },
  { id: 'next-month', name: 'Next Month' },
  { id: 'two-months', name: 'In Two Months' },
  { id: 'three-months', name: 'In Three Months' },
];

// Crisis information by country
export type Crisis = {
  id: string;
  countryId: string;
  type: 'natural-disaster' | 'armed-conflict' | 'political-unrest' | 'health';
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  startDate: string;
  affectedAreas: string[];
};

export const crises: Crisis[] = [
  {
    id: 'ua-war-2022',
    countryId: 'ua',
    type: 'armed-conflict',
    name: 'Armed Conflict',
    description: 'Ongoing military conflict affecting multiple regions of the country.',
    severity: 'high',
    startDate: '2022-02-24',
    affectedAreas: ['Kyiv', 'Kharkiv', 'Donetsk', 'Luhansk', 'Odesa']
  },
  {
    id: 'sy-conflict',
    countryId: 'sy',
    type: 'armed-conflict',
    name: 'Civil War',
    description: 'Prolonged civil war with international involvement.',
    severity: 'high',
    startDate: '2011-03-15',
    affectedAreas: ['Damascus', 'Aleppo', 'Homs', 'Idlib']
  },
  {
    id: 'sd-conflict',
    countryId: 'sd',
    type: 'armed-conflict',
    name: 'Internal Conflict',
    description: 'Violent conflict between military factions.',
    severity: 'high',
    startDate: '2023-04-15',
    affectedAreas: ['Khartoum', 'Darfur', 'Port Sudan']
  },
  {
    id: 'mx-unrest',
    countryId: 'mx',
    type: 'political-unrest',
    name: 'Cartel Violence',
    description: 'Increased cartel activity in border regions and certain states.',
    severity: 'medium',
    startDate: '2023-01-01',
    affectedAreas: ['Sinaloa', 'Jalisco', 'Tamaulipas', 'Chihuahua']
  },
  {
    id: 've-unrest',
    countryId: 've',
    type: 'political-unrest',
    name: 'Political Instability',
    description: 'Ongoing economic crisis and political instability.',
    severity: 'medium',
    startDate: '2019-01-23',
    affectedAreas: ['Caracas', 'Valencia', 'Maracaibo']
  },
  {
    id: 'fj-cyclone',
    countryId: 'fj',
    type: 'natural-disaster',
    name: 'Tropical Cyclone',
    description: 'Recent tropical cyclone causing flooding and infrastructure damage.',
    severity: 'medium',
    startDate: '2023-12-01',
    affectedAreas: ['Viti Levu', 'Vanua Levu']
  },
  {
    id: 'pg-volcano',
    countryId: 'pg',
    type: 'natural-disaster',
    name: 'Volcanic Eruption',
    description: 'Recent volcanic activity near populated areas.',
    severity: 'medium',
    startDate: '2024-01-10',
    affectedAreas: ['Mount Ulawun region', 'West New Britain Province']
  },
  {
    id: 'hn-hurricane',
    countryId: 'hn',
    type: 'natural-disaster',
    name: 'Hurricane Aftermath',
    description: 'Recovering from recent hurricane with infrastructure damage.',
    severity: 'low',
    startDate: '2023-11-15',
    affectedAreas: ['Tegucigalpa', 'San Pedro Sula']
  },
  {
    id: 'et-drought',
    countryId: 'et',
    type: 'natural-disaster',
    name: 'Drought',
    description: 'Ongoing drought affecting agricultural regions.',
    severity: 'low',
    startDate: '2023-06-01',
    affectedAreas: ['Tigray', 'Afar', 'Somali Region']
  }
];

// Evacuation flight data
export type EvacuationFlight = {
  id: string;
  countryId: string;
  airline: string;
  departureDate: string;
  departureAirport: {
    code: string;
    name: string;
    city: string;
  };
  arrivalAirport: {
    code: string;
    name: string;
    city: string;
    country: string;
    countryId: string;
  };
  duration: string;
  stops: number;
  riskLevel: 'low' | 'medium' | 'high';
  price: number;
  seatsAvailable: number;
  flightNumber: string;
};

export const evacuationFlights: EvacuationFlight[] = [
  // Ukraine flights
  {
    id: 'ua-flight-1',
    countryId: 'ua',
    airline: 'Emergency Air',
    departureDate: '2024-04-15T08:30:00',
    departureAirport: {
      code: 'IEV',
      name: 'Kyiv International Airport',
      city: 'Kyiv'
    },
    arrivalAirport: {
      code: 'WAW',
      name: 'Warsaw Chopin Airport',
      city: 'Warsaw',
      country: 'Poland',
      countryId: 'pl'
    },
    duration: '1h 35m',
    stops: 0,
    riskLevel: 'high',
    price: 450,
    seatsAvailable: 12,
    flightNumber: 'EM101'
  },
  {
    id: 'ua-flight-2',
    countryId: 'ua',
    airline: 'Humanitarian Airways',
    departureDate: '2024-04-16T10:15:00',
    departureAirport: {
      code: 'LWO',
      name: 'Lviv International Airport',
      city: 'Lviv'
    },
    arrivalAirport: {
      code: 'BUD',
      name: 'Budapest Ferenc Liszt International Airport',
      city: 'Budapest',
      country: 'Hungary',
      countryId: 'hu'
    },
    duration: '1h 10m',
    stops: 0,
    riskLevel: 'medium',
    price: 380,
    seatsAvailable: 28,
    flightNumber: 'HU202'
  },
  
  // Syria flights
  {
    id: 'sy-flight-1',
    countryId: 'sy',
    airline: 'Relief Airlines',
    departureDate: '2024-04-14T23:45:00',
    departureAirport: {
      code: 'DAM',
      name: 'Damascus International Airport',
      city: 'Damascus'
    },
    arrivalAirport: {
      code: 'BEY',
      name: 'Beirut–Rafic Hariri International Airport',
      city: 'Beirut',
      country: 'Lebanon',
      countryId: 'lb'
    },
    duration: '0h 45m',
    stops: 0,
    riskLevel: 'high',
    price: 520,
    seatsAvailable: 8,
    flightNumber: 'RL505'
  },
  
  // Sudan flights
  {
    id: 'sd-flight-1',
    countryId: 'sd',
    airline: 'Crisis Response',
    departureDate: '2024-04-15T06:20:00',
    departureAirport: {
      code: 'KRT',
      name: 'Khartoum International Airport',
      city: 'Khartoum'
    },
    arrivalAirport: {
      code: 'CAI',
      name: 'Cairo International Airport',
      city: 'Cairo',
      country: 'Egypt',
      countryId: 'eg'
    },
    duration: '2h 05m',
    stops: 0,
    riskLevel: 'high',
    price: 610,
    seatsAvailable: 5,
    flightNumber: 'CR330'
  },
  
  // Mexico flights
  {
    id: 'mx-flight-1',
    countryId: 'mx',
    airline: 'American Airlines',
    departureDate: '2024-04-17T14:30:00',
    departureAirport: {
      code: 'MEX',
      name: 'Mexico City International Airport',
      city: 'Mexico City'
    },
    arrivalAirport: {
      code: 'DFW',
      name: 'Dallas/Fort Worth International Airport',
      city: 'Dallas',
      country: 'United States',
      countryId: 'us'
    },
    duration: '3h 25m',
    stops: 0,
    riskLevel: 'low',
    price: 340,
    seatsAvailable: 42,
    flightNumber: 'AA2510'
  },
  
  // Venezuela flights
  {
    id: 've-flight-1',
    countryId: 've',
    airline: 'Copa Airlines',
    departureDate: '2024-04-20T10:40:00',
    departureAirport: {
      code: 'CCS',
      name: 'Simón Bolívar International Airport',
      city: 'Caracas'
    },
    arrivalAirport: {
      code: 'PTY',
      name: 'Tocumen International Airport',
      city: 'Panama City',
      country: 'Panama',
      countryId: 'pa'
    },
    duration: '2h 15m',
    stops: 0,
    riskLevel: 'medium',
    price: 420,
    seatsAvailable: 31,
    flightNumber: 'CM227'
  },
  
  // Fiji flights
  {
    id: 'fj-flight-1',
    countryId: 'fj',
    airline: 'Fiji Airways',
    departureDate: '2024-04-18T23:15:00',
    departureAirport: {
      code: 'NAN',
      name: 'Nadi International Airport',
      city: 'Nadi'
    },
    arrivalAirport: {
      code: 'AKL',
      name: 'Auckland Airport',
      city: 'Auckland',
      country: 'New Zealand',
      countryId: 'nz'
    },
    duration: '3h 05m',
    stops: 0,
    riskLevel: 'low',
    price: 490,
    seatsAvailable: 37,
    flightNumber: 'FJ411'
  },
  
  // Papua New Guinea flights
  {
    id: 'pg-flight-1',
    countryId: 'pg',
    airline: 'Air Niugini',
    departureDate: '2024-04-19T08:50:00',
    departureAirport: {
      code: 'POM',
      name: 'Jacksons International Airport',
      city: 'Port Moresby'
    },
    arrivalAirport: {
      code: 'BNE',
      name: 'Brisbane Airport',
      city: 'Brisbane',
      country: 'Australia',
      countryId: 'au'
    },
    duration: '3h 15m',
    stops: 0,
    riskLevel: 'medium',
    price: 520,
    seatsAvailable: 22,
    flightNumber: 'PX005'
  },
  
  // Honduras flights
  {
    id: 'hn-flight-1',
    countryId: 'hn',
    airline: 'United Airlines',
    departureDate: '2024-04-21T16:10:00',
    departureAirport: {
      code: 'SAP',
      name: 'Ramón Villeda Morales International Airport',
      city: 'San Pedro Sula'
    },
    arrivalAirport: {
      code: 'IAH',
      name: 'George Bush Intercontinental Airport',
      city: 'Houston',
      country: 'United States',
      countryId: 'us'
    },
    duration: '3h 45m',
    stops: 0,
    riskLevel: 'low',
    price: 380,
    seatsAvailable: 48,
    flightNumber: 'UA1421'
  },
  
  // Ethiopia flights
  {
    id: 'et-flight-1',
    countryId: 'et',
    airline: 'Ethiopian Airlines',
    departureDate: '2024-04-22T01:30:00',
    departureAirport: {
      code: 'ADD',
      name: 'Addis Ababa Bole International Airport',
      city: 'Addis Ababa'
    },
    arrivalAirport: {
      code: 'NBO',
      name: 'Jomo Kenyatta International Airport',
      city: 'Nairobi',
      country: 'Kenya',
      countryId: 'ke'
    },
    duration: '2h 00m',
    stops: 0,
    riskLevel: 'low',
    price: 310,
    seatsAvailable: 53,
    flightNumber: 'ET302'
  }
];

// Emergency shelter information
export type EmergencyShelter = {
  id: string;
  countryId: string;
  name: string;
  city: string;
  capacity: number;
  amenities: string[];
  contactPhone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export const emergencyShelters: EmergencyShelter[] = [
  // Poland (for Ukraine evacuees)
  {
    id: 'shelter-pl-1',
    countryId: 'pl',
    name: 'Warsaw Relief Center',
    city: 'Warsaw',
    capacity: 500,
    amenities: ['Food', 'Medical care', 'Internet', 'Child services', 'Translation services'],
    contactPhone: '+48 22 123 4567',
    address: 'Krakowskie Przedmieście 15, Warsaw, Poland',
    coordinates: {
      lat: 52.2403,
      lng: 21.0154
    }
  },
  
  // Hungary (for Ukraine evacuees)
  {
    id: 'shelter-hu-1',
    countryId: 'hu',
    name: 'Budapest Humanitarian Hub',
    city: 'Budapest',
    capacity: 350,
    amenities: ['Food', 'Medical care', 'Temporary housing', 'Child services', 'Legal aid'],
    contactPhone: '+36 1 123 4567',
    address: 'Andrássy út 25, Budapest, Hungary',
    coordinates: {
      lat: 47.5064,
      lng: 19.0658
    }
  },
  
  // Lebanon (for Syria evacuees)
  {
    id: 'shelter-lb-1',
    countryId: 'lb',
    name: 'Beirut Emergency Center',
    city: 'Beirut',
    capacity: 200,
    amenities: ['Food', 'Medical care', 'Temporary housing', 'Family reunification'],
    contactPhone: '+961 1 234 567',
    address: 'Hamra Street 42, Beirut, Lebanon',
    coordinates: {
      lat: 33.8938,
      lng: 35.5018
    }
  },
  
  // Egypt (for Sudan evacuees)
  {
    id: 'shelter-eg-1',
    countryId: 'eg',
    name: 'Cairo Refugee Support Center',
    city: 'Cairo',
    capacity: 400,
    amenities: ['Food', 'Medical care', 'Temporary housing', 'Education', 'Legal aid'],
    contactPhone: '+20 2 2345 6789',
    address: 'Tahrir Square Area, Cairo, Egypt',
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    }
  },
  
  // United States (for Mexico evacuees)
  {
    id: 'shelter-us-1',
    countryId: 'us',
    name: 'Dallas Assistance Center',
    city: 'Dallas',
    capacity: 250,
    amenities: ['Food', 'Medical care', 'Housing assistance', 'Legal aid', 'Job placement'],
    contactPhone: '+1 214 555 1234',
    address: '1500 Marilla St, Dallas, TX, United States',
    coordinates: {
      lat: 32.7767,
      lng: -96.7970
    }
  },
  
  // Panama (for Venezuela evacuees)
  {
    id: 'shelter-pa-1',
    countryId: 'pa',
    name: 'Panama City Relief Center',
    city: 'Panama City',
    capacity: 180,
    amenities: ['Food', 'Medical care', 'Temporary housing', 'Legal aid', 'Translation services'],
    contactPhone: '+507 123 4567',
    address: 'Calle 50, Panama City, Panama',
    coordinates: {
      lat: 8.9824,
      lng: -79.5199
    }
  },
  
  // New Zealand (for Fiji evacuees)
  {
    id: 'shelter-nz-1',
    countryId: 'nz',
    name: 'Auckland Pacific Center',
    city: 'Auckland',
    capacity: 150,
    amenities: ['Food', 'Medical care', 'Housing assistance', 'Cultural support', 'Education'],
    contactPhone: '+64 9 123 4567',
    address: '25 Queen Street, Auckland, New Zealand',
    coordinates: {
      lat: -36.8509,
      lng: 174.7645
    }
  },
  
  // Australia (for Papua New Guinea evacuees)
  {
    id: 'shelter-au-1',
    countryId: 'au',
    name: 'Brisbane Regional Assistance Center',
    city: 'Brisbane',
    capacity: 220,
    amenities: ['Food', 'Medical care', 'Temporary housing', 'Education', 'Work permits assistance'],
    contactPhone: '+61 7 3123 4567',
    address: '123 Adelaide Street, Brisbane, Australia',
    coordinates: {
      lat: -27.4698,
      lng: 153.0251
    }
  }
];

// Visa and entry requirement information
export type VisaRequirement = {
  fromCountryId: string;
  toCountryId: string;
  visaType: string;
  requirements: string[];
  processingTime: string;
  emergencyProcess: boolean;
  emergencyProcessingTime: string;
  contactInformation: string;
  notes: string;
};

export const visaRequirements: VisaRequirement[] = [
  // Ukraine to Poland
  {
    fromCountryId: 'ua',
    toCountryId: 'pl',
    visaType: 'Temporary Protection Status',
    requirements: [
      'Valid passport or national ID card',
      'Proof of Ukrainian citizenship or residency'
    ],
    processingTime: 'Immediate upon arrival',
    emergencyProcess: true,
    emergencyProcessingTime: 'Immediate',
    contactInformation: 'Polish Border Guard: +48 22 500 4068',
    notes: 'All Ukrainian citizens have the right to enter Poland without a visa and can apply for Temporary Protection Status upon arrival.'
  },
  
  // Syria to Lebanon
  {
    fromCountryId: 'sy',
    toCountryId: 'lb',
    visaType: 'Humanitarian Entry Permit',
    requirements: [
      'Valid passport or Syrian ID',
      'Registration with UNHCR (recommended)',
      'Proof of accommodation or sponsor in Lebanon (if available)'
    ],
    processingTime: '1-3 days',
    emergencyProcess: true,
    emergencyProcessingTime: 'Same day',
    contactInformation: 'Lebanese General Security: +961 1 425 610',
    notes: 'Entry regulations may change frequently. Prior coordination with humanitarian organizations is recommended.'
  },
  
  // Sudan to Egypt
  {
    fromCountryId: 'sd',
    toCountryId: 'eg',
    visaType: 'Emergency Entry Visa',
    requirements: [
      'Valid passport',
      'One photo',
      'Proof of emergency situation (if available)'
    ],
    processingTime: '1-2 days',
    emergencyProcess: true,
    emergencyProcessingTime: 'Same day at border crossings',
    contactInformation: 'Egyptian Embassy in Khartoum: +249 183 765 902',
    notes: 'Special procedures may be in place at land border crossings during crisis periods.'
  },
  
  // Mexico to United States
  {
    fromCountryId: 'mx',
    toCountryId: 'us',
    visaType: 'Humanitarian Parole or Asylum',
    requirements: [
      'Valid passport',
      'Form I-131 for Humanitarian Parole or Form I-589 for Asylum',
      'Evidence of humanitarian emergency',
      'Biometrics'
    ],
    processingTime: 'Humanitarian Parole: 3-6 months, Asylum: processed upon arrival',
    emergencyProcess: true,
    emergencyProcessingTime: 'Expedited processing available in extreme circumstances',
    contactInformation: 'USCIS: +1 800 375 5283',
    notes: 'Consult with immigration attorney. CBP One app may be required for scheduling an appointment at the border.'
  },
  
  // Venezuela to Panama
  {
    fromCountryId: 've',
    toCountryId: 'pa',
    visaType: 'Humanitarian Visa',
    requirements: [
      'Valid passport',
      'Two photos',
      'Proof of economic solvency or sponsorship'
    ],
    processingTime: '15-30 days',
    emergencyProcess: true,
    emergencyProcessingTime: '3-5 days',
    contactInformation: 'Panamanian National Immigration Service: +507 507 1800',
    notes: 'Special procedures may be in place for Venezuelan nationals during crisis periods.'
  },
  
  // Fiji to New Zealand
  {
    fromCountryId: 'fj',
    toCountryId: 'nz',
    visaType: 'Pacific Access Category Visa or Visitor Visa',
    requirements: [
      'Valid passport',
      'Proof of accommodations',
      'Return ticket or proof of onward travel',
      'Evidence of sufficient funds'
    ],
    processingTime: 'Visitor Visa: 15-20 days',
    emergencyProcess: true,
    emergencyProcessingTime: '48 hours',
    contactInformation: 'Immigration New Zealand: +64 9 914 4100',
    notes: 'Special arrangements may be made for Pacific Islanders during natural disasters.'
  },
  
  // Papua New Guinea to Australia
  {
    fromCountryId: 'pg',
    toCountryId: 'au',
    visaType: 'Visitor Visa (subclass 600) or Humanitarian Visa',
    requirements: [
      'Valid passport',
      'Completed application form',
      'Evidence of purpose of visit',
      'Health insurance'
    ],
    processingTime: '20-30 days',
    emergencyProcess: true,
    emergencyProcessingTime: '2-5 days',
    contactInformation: 'Australian Department of Home Affairs: +61 2 6196 0196',
    notes: 'Different visa options may be available depending on the nature of the emergency.'
  }
];

// Safe route recommendations based on country
export type SafeRouteRecommendation = {
  fromCountryId: string;
  recommendedRoutes: {
    toCountryId: string;
    reason: string;
    estimatedTravelTime: string;
    transportationMode: string;
    securityLevel: 'low' | 'medium' | 'high';
  }[];
};

export const safeRouteRecommendations: SafeRouteRecommendation[] = [
  // Ukraine
  {
    fromCountryId: 'ua',
    recommendedRoutes: [
      {
        toCountryId: 'pl',
        reason: 'Closest EU country with extensive humanitarian support infrastructure and simplified entry procedures for Ukrainians.',
        estimatedTravelTime: '6-10 hours by land',
        transportationMode: 'Road (bus/car), limited rail options available',
        securityLevel: 'medium'
      },
      {
        toCountryId: 'hu',
        reason: 'EU country with open border policy for Ukrainian refugees and established support systems.',
        estimatedTravelTime: '8-12 hours by land',
        transportationMode: 'Road (bus/car)',
        securityLevel: 'medium'
      }
    ]
  },
  
  // Syria
  {
    fromCountryId: 'sy',
    recommendedRoutes: [
      {
        toCountryId: 'lb',
        reason: 'Closest accessible neighboring country with established Syrian refugee population and support infrastructure.',
        estimatedTravelTime: '4-8 hours by land',
        transportationMode: 'Road (bus/car), limited flights',
        securityLevel: 'medium'
      },
      {
        toCountryId: 'tr',
        reason: 'Shares large border with northern Syria and hosts significant Syrian refugee population.',
        estimatedTravelTime: '5-10 hours by land',
        transportationMode: 'Road (bus/car)',
        securityLevel: 'medium'
      }
    ]
  },
  
  // Sudan
  {
    fromCountryId: 'sd',
    recommendedRoutes: [
      {
        toCountryId: 'eg',
        reason: 'Northern neighbor with established evacuation routes and support for Sudanese nationals.',
        estimatedTravelTime: '15-20 hours by land',
        transportationMode: 'Road (bus/car), limited flights',
        securityLevel: 'medium'
      },
      {
        toCountryId: 'et',
        reason: 'Eastern neighbor with accessible border crossings from eastern Sudan.',
        estimatedTravelTime: '12-18 hours by land',
        transportationMode: 'Road (bus/car)',
        securityLevel: 'high'
      }
    ]
  },
  
  // Mexico
  {
    fromCountryId: 'mx',
    recommendedRoutes: [
      {
        toCountryId: 'us',
        reason: 'Northern neighbor with multiple border crossings and established asylum procedures.',
        estimatedTravelTime: 'Varies by location, 1-10 hours by land',
        transportationMode: 'Road (bus/car), multiple flights available',
        securityLevel: 'low'
      },
      {
        toCountryId: 'gt',
        reason: 'Southern neighbor accessible from southern Mexican states.',
        estimatedTravelTime: '6-12 hours by land from southern Mexico',
        transportationMode: 'Road (bus/car), limited flights',
        securityLevel: 'medium'
      }
    ]
  },
  
  // Venezuela
  {
    fromCountryId: 've',
    recommendedRoutes: [
      {
        toCountryId: 'co',
        reason: 'Western neighbor with established Venezuelan migrant support systems.',
        estimatedTravelTime: '8-15 hours by land',
        transportationMode: 'Road (bus/car), multiple flights available',
        securityLevel: 'medium'
      },
      {
        toCountryId: 'br',
        reason: 'Southern neighbor with border crossings from southern Venezuelan states.',
        estimatedTravelTime: '10-20 hours by land',
        transportationMode: 'Road (bus/car), limited flights',
        securityLevel: 'medium'
      }
    ]
  },
  
  // Fiji
  {
    fromCountryId: 'fj',
    recommendedRoutes: [
      {
        toCountryId: 'nz',
        reason: 'Close regional partner with special immigration arrangements for Pacific Islanders.',
        estimatedTravelTime: '3-4 hours by air',
        transportationMode: 'Commercial flights',
        securityLevel: 'low'
      },
      {
        toCountryId: 'au',
        reason: 'Regional power with humanitarian response capabilities and Pacific support programs.',
        estimatedTravelTime: '4-5 hours by air',
        transportationMode: 'Commercial flights',
        securityLevel: 'low'
      }
    ]
  },
  
  // Papua New Guinea
  {
    fromCountryId: 'pg',
    recommendedRoutes: [
      {
        toCountryId: 'au',
        reason: 'Close regional partner with established humanitarian response systems for PNG.',
        estimatedTravelTime: '3-4 hours by air',
        transportationMode: 'Commercial flights',
        securityLevel: 'low'
      },
      {
        toCountryId: 'sb',
        reason: 'Neighboring Pacific island nation accessible by air and limited sea routes.',
        estimatedTravelTime: '2-3 hours by air',
        transportationMode: 'Limited commercial flights, irregular maritime transport',
        securityLevel: 'medium'
      }
    ]
  }
];
