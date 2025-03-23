
import React from 'react';
import { EvacuationFlight, emergencyShelters, visaRequirements } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface EmergencyInfoProps {
  flight: EvacuationFlight;
}

const EmergencyInfo: React.FC<EmergencyInfoProps> = ({ flight }) => {
  const toCountryId = flight.arrivalAirport.countryId;
  const fromCountryId = flight.countryId;
  
  const shelters = emergencyShelters.filter(shelter => shelter.countryId === toCountryId);
  const visaInfo = visaRequirements.find(
    visa => visa.fromCountryId === fromCountryId && visa.toCountryId === toCountryId
  );
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-medium mb-4">Emergency Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Flight Details</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Information about your selected evacuation flight.
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Airline:</span>
                    <span className="font-medium">{flight.airline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flight Number:</span>
                    <span className="font-medium">{flight.flightNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Departure:</span>
                    <span className="font-medium">
                      {formatDate(flight.departureDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium">
                      {flight.departureAirport.city} ({flight.departureAirport.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium">
                      {flight.arrivalAirport.city} ({flight.arrivalAirport.code})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{flight.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      getRiskLevelClass(flight.riskLevel)
                    )}>
                      {getRiskLevelText(flight.riskLevel)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Visa Requirements</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {visaInfo 
                    ? `Entry requirements for ${flight.arrivalAirport.country}.` 
                    : 'No specific visa information available for this route.'}
                </p>
                
                {visaInfo ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground block mb-1">Visa Type:</span>
                      <span className="font-medium">{visaInfo.visaType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-1">Processing Time:</span>
                      <span className="font-medium">{visaInfo.processingTime}</span>
                    </div>
                    {visaInfo.emergencyProcess && (
                      <div>
                        <span className="text-muted-foreground block mb-1">Emergency Processing:</span>
                        <span className="font-medium">{visaInfo.emergencyProcessingTime}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground block mb-1">Requirements:</span>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {visaInfo.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-1">Contact:</span>
                      <span className="font-medium">{visaInfo.contactInformation}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm">
                    <p>Please contact the embassy or consulate of {flight.arrivalAirport.country} for current visa requirements.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-medium mb-4">Emergency Shelters</h3>
        {shelters.length > 0 ? (
          <div className="space-y-4">
            {shelters.map(shelter => (
              <div key={shelter.id} className="rounded-xl border bg-card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-5 md:col-span-2">
                    <h4 className="font-medium text-lg mb-1">{shelter.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {shelter.city}, {flight.arrivalAirport.country}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Amenities</h5>
                        <div className="flex flex-wrap gap-2">
                          {shelter.amenities.map((amenity, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Contact Information</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-2 text-muted-foreground"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>{shelter.contactPhone}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-2 text-muted-foreground"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{shelter.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm mb-2">
                      <span className="font-medium">Capacity:</span> {shelter.capacity} people
                    </div>
                    
                    <button className="text-sm text-primary font-medium flex items-center">
                      More information
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 ml-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="bg-muted/30 relative h-48 md:h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-16 w-16 text-muted-foreground/30"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/30 to-transparent p-4 text-white">
                      <div className="font-medium text-sm">{shelter.name}</div>
                      <div className="text-xs opacity-80">{shelter.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-xl bg-card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No Emergency Shelters Available</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              There are currently no registered emergency shelters in {flight.arrivalAirport.country} for this evacuation route. Please contact local authorities or your embassy for assistance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const getRiskLevelClass = (riskLevel: 'low' | 'medium' | 'high') => {
  switch (riskLevel) {
    case 'high':
      return 'crisis-badge-high';
    case 'medium':
      return 'crisis-badge-medium';
    case 'low':
      return 'crisis-badge-low';
    default:
      return 'crisis-badge-low';
  }
};

const getRiskLevelText = (riskLevel: 'low' | 'medium' | 'high') => {
  switch (riskLevel) {
    case 'high':
      return 'High Risk';
    case 'medium':
      return 'Medium Risk';
    case 'low':
      return 'Low Risk';
    default:
      return 'Unknown Risk';
  }
};

export default EmergencyInfo;
