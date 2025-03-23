
import React, { useState } from 'react';
import { evacuationFlights, EvacuationFlight, crises } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import SafeRouteRecommendation from './SafeRouteRecommendation';

interface EvacuationOptionsProps {
  countryId: string;
  timeframeId: string;
  onSelect: (flight: EvacuationFlight) => void;
  onBack: () => void;
}

const EvacuationOptions: React.FC<EvacuationOptionsProps> = ({
  countryId,
  timeframeId,
  onSelect,
  onBack
}) => {
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'risk'>('date');
  
  const flights = evacuationFlights.filter(flight => flight.countryId === countryId);
  const countryCrises = crises.filter(crisis => crisis.countryId === countryId);
  const hasCrisis = countryCrises.length > 0;
  const hasSevereRisk = countryCrises.some(crisis => crisis.severity === 'high');
  
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
    } else if (sortBy === 'price') {
      return a.price - b.price;
    } else {
      const riskLevel = { low: 1, medium: 2, high: 3 };
      return riskLevel[a.riskLevel] - riskLevel[b.riskLevel];
    }
  });

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
            Back to Timeframe
          </button>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
          Available Evacuation Options
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select a flight to view details and emergency information.
        </p>
      </div>
      
      {hasSevereRisk && (
        <div className="mb-8 max-w-4xl mx-auto">
          <SafeRouteRecommendation countryId={countryId} />
        </div>
      )}
      
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="px-4 py-1 bg-secondary rounded-full text-sm text-secondary-foreground">
            <span className="font-medium">{flights.length}</span> evacuation {flights.length === 1 ? 'option' : 'options'} available
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex bg-secondary rounded-full overflow-hidden">
              <button
                onClick={() => setSortBy('date')}
                className={cn(
                  "px-3 py-1 text-xs font-medium transition-colors",
                  sortBy === 'date' 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary-foreground/10"
                )}
              >
                Date
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={cn(
                  "px-3 py-1 text-xs font-medium transition-colors",
                  sortBy === 'price' 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary-foreground/10"
                )}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy('risk')}
                className={cn(
                  "px-3 py-1 text-xs font-medium transition-colors",
                  sortBy === 'risk' 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary-foreground/10"
                )}
              >
                Risk
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedFlights.length > 0 ? (
            sortedFlights.map((flight, index) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onSelect={() => onSelect(flight)} 
                index={index}
                isRecommended={timeframeId === 'asap' && hasSevereRisk && index === 0}
              />
            ))
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
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">No Evacuation Options Available</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                There are currently no evacuation flights available for the selected location and timeframe. Please try a different country or timeframe.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FlightCardProps {
  flight: EvacuationFlight;
  onSelect: () => void;
  index: number;
  isRecommended?: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect, index, isRecommended = false }) => {
  return (
    <div 
      className={cn(
        "rounded-xl border overflow-hidden bg-card transition-all",
        "hover:shadow-md hover:border-primary/30 group",
        isRecommended ? "border-primary/50 bg-primary/5" : "border-border"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <span className="font-medium text-lg">{flight.airline}</span>
                {isRecommended && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Flight {flight.flightNumber} • {formatDate(flight.departureDate)}
              </div>
            </div>
            
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              getRiskLevelClass(flight.riskLevel)
            )}>
              {getRiskLevelText(flight.riskLevel)}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-4">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{flight.departureAirport.code}</div>
                  <div className="text-xs text-muted-foreground">{flight.departureAirport.city}</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-1">{flight.duration}</div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-16 sm:w-24 h-px bg-primary"></div>
                {flight.stops > 0 ? (
                  <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                ) : null}
                {flight.stops > 0 ? (
                  <div className="w-16 sm:w-24 h-px bg-muted"></div>
                ) : null}
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {flight.stops > 0 ? `${flight.stops} stop` : 'Direct'}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{flight.arrivalAirport.code}</div>
                  <div className="text-xs text-muted-foreground">
                    {flight.arrivalAirport.city}, {flight.arrivalAirport.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3 h-3 mr-1"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Medical Aid
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3 h-3 mr-1"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              Visa Assistance
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3 h-3 mr-1"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                <circle cx="12" cy="12" r="3" />
                <path d="m14 10-4 4" />
                <path d="m10 10 4 4" />
              </svg>
              {flight.seatsAvailable <= 10 ? 'Limited Seats' : 'Seats Available'}
            </span>
          </div>
        </div>
        
        <div className="p-5 border-t md:border-t-0 md:border-l border-border md:min-w-[200px] flex flex-col justify-between">
          <div>
            <div className="text-2xl font-medium mb-1">${flight.price}</div>
            <div className="text-xs text-muted-foreground">per person</div>
            <div className="mt-2 text-xs font-medium text-primary">
              {flight.seatsAvailable} seats remaining
            </div>
          </div>
          
          <button 
            onClick={onSelect}
            className={cn(
              "mt-4 w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            )}
          >
            Select Flight
          </button>
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
      return 'High Risk';
    case 'medium':
      return 'Medium Risk';
    case 'low':
      return 'Low Risk';
    default:
      return 'Unknown Risk';
  }
};

export default EvacuationOptions;
