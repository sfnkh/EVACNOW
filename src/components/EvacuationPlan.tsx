
import React from 'react';
import { EvacuationFlight, emergencyShelters, visaRequirements } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface EvacuationPlanProps {
  flight: EvacuationFlight;
  onBack: () => void;
  onComplete: () => void;
}

const EvacuationPlan: React.FC<EvacuationPlanProps> = ({ flight, onBack, onComplete }) => {
  const toCountryId = flight.arrivalAirport.countryId;
  const shelters = emergencyShelters.filter(shelter => shelter.countryId === toCountryId);
  const visaInfo = visaRequirements.find(
    visa => visa.fromCountryId === flight.countryId && visa.toCountryId === toCountryId
  );

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8 animate-slide-down">
        <div className="inline-flex items-center mb-4 text-sm">
          <button 
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-1 h-4 w-4"
            >
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Emergency Information
          </button>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
          Your Evacuation Plan
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Review your evacuation details and save your plan.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-5 border-b border-border bg-secondary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Evacuation Plan Summary</h3>
              <div className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getRiskLevelClass(flight.riskLevel)
              )}>
                {getRiskLevelText(flight.riskLevel)}
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Travel Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 mr-3 text-muted-foreground"
                    >
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">Airline & Flight</div>
                      <div className="font-medium">{flight.airline} - {flight.flightNumber}</div>
                    </div>
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
                      className="h-5 w-5 mr-3 text-muted-foreground"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">Departure Date & Time</div>
                      <div className="font-medium">{formatDate(flight.departureDate)}</div>
                    </div>
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
                      className="h-5 w-5 mr-3 text-muted-foreground"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="font-medium">
                        {flight.departureAirport.name} ({flight.departureAirport.code})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {flight.departureAirport.city}
                      </div>
                    </div>
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
                      className="h-5 w-5 mr-3 text-muted-foreground"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">To</div>
                      <div className="font-medium">
                        {flight.arrivalAirport.name} ({flight.arrivalAirport.code})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {flight.arrivalAirport.city}, {flight.arrivalAirport.country}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Important Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 mr-3 text-muted-foreground mt-0.5"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">Visa Requirements</div>
                      {visaInfo ? (
                        <div>
                          <div className="font-medium">{visaInfo.visaType}</div>
                          <div className="text-sm text-muted-foreground">
                            Processing: {visaInfo.processingTime}
                            {visaInfo.emergencyProcess ? ` (Emergency: ${visaInfo.emergencyProcessingTime})` : ''}
                          </div>
                        </div>
                      ) : (
                        <div className="font-medium">Contact embassy for visa details</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 mr-3 text-muted-foreground mt-0.5"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">Emergency Shelter</div>
                      {shelters.length > 0 ? (
                        <div>
                          <div className="font-medium">{shelters[0].name}</div>
                          <div className="text-sm text-muted-foreground">
                            {shelters[0].address}
                          </div>
                        </div>
                      ) : (
                        <div className="font-medium">No registered shelters available</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 mr-3 text-muted-foreground mt-0.5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">Cost</div>
                      <div className="font-medium">${flight.price} per person</div>
                      <div className="text-sm text-muted-foreground">
                        {flight.seatsAvailable} seats available
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 mr-3 text-muted-foreground mt-0.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div>
                      <div className="text-xs text-muted-foreground">Emergency Contact</div>
                      <div className="font-medium">
                        {shelters.length > 0 ? shelters[0].contactPhone : 'Local Embassy'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-5">
              <h4 className="text-sm font-medium mb-3">Pre-Departure Checklist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="flex items-center bg-secondary/50 rounded-lg p-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 mr-3" />
                  <label className="text-sm">Prepare necessary travel documents</label>
                </div>
                <div className="flex items-center bg-secondary/50 rounded-lg p-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 mr-3" />
                  <label className="text-sm">Pack essential items and emergency supplies</label>
                </div>
                <div className="flex items-center bg-secondary/50 rounded-lg p-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 mr-3" />
                  <label className="text-sm">Notify family and emergency contacts</label>
                </div>
                <div className="flex items-center bg-secondary/50 rounded-lg p-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 mr-3" />
                  <label className="text-sm">Register with your embassy's citizen services</label>
                </div>
                <div className="flex items-center bg-secondary/50 rounded-lg p-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 mr-3" />
                  <label className="text-sm">Download offline maps and emergency info</label>
                </div>
                <div className="flex items-center bg-secondary/50 rounded-lg p-3">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 mr-3" />
                  <label className="text-sm">Exchange currency or prepare emergency funds</label>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button 
                  onClick={onComplete}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  Complete & Save Plan
                </button>
              </div>
            </div>
          </div>
        </div>
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
      return 'High Risk Route';
    case 'medium':
      return 'Medium Risk Route';
    case 'low':
      return 'Low Risk Route';
    default:
      return 'Unknown Risk';
  }
};

export default EvacuationPlan;
