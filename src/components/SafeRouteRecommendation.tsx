
import React, { useState } from 'react';
import { safeRouteRecommendations } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface SafeRouteRecommendationProps {
  countryId: string;
}

const SafeRouteRecommendation: React.FC<SafeRouteRecommendationProps> = ({ countryId }) => {
  const [expanded, setExpanded] = useState(false);
  
  const recommendation = safeRouteRecommendations.find(rec => rec.fromCountryId === countryId);
  
  if (!recommendation || recommendation.recommendedRoutes.length === 0) {
    return null;
  }
  
  return (
    <div className="rounded-xl border border-primary bg-primary/5 p-5 animate-slide-in-left">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
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
              <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
              <circle cx="12" cy="8" r="2" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Safer Alternative Routes</h3>
          <p className="text-sm mb-4">
            Based on the current crisis, we recommend the following alternative evacuation routes which may offer safer passage.
          </p>
          
          <div className="space-y-4">
            {recommendation.recommendedRoutes.slice(0, expanded ? undefined : 1).map((route, index) => (
              <div 
                key={route.toCountryId}
                className="rounded-lg bg-white/50 dark:bg-black/20 p-4 border border-primary/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Route {index + 1}: Alternative Evacuation Path</div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    route.securityLevel === 'high' ? "crisis-badge-high" : 
                    route.securityLevel === 'medium' ? "crisis-badge-medium" : 
                    "crisis-badge-low"
                  )}>
                    {route.securityLevel.charAt(0).toUpperCase() + route.securityLevel.slice(1)} Security
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex-1 mb-2 sm:mb-0">
                    <div className="text-xs text-muted-foreground mb-1">Destination</div>
                    <div className="font-medium">{getCountryName(route.toCountryId)}</div>
                  </div>
                  
                  <div className="flex-1 mb-2 sm:mb-0">
                    <div className="text-xs text-muted-foreground mb-1">Travel Mode</div>
                    <div>{route.transportationMode}</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Est. Travel Time</div>
                    <div>{route.estimatedTravelTime}</div>
                  </div>
                </div>
                
                <div className="text-sm mt-2">
                  <div className="text-xs text-muted-foreground mb-1">Recommendation Reason</div>
                  <p>{route.reason}</p>
                </div>
              </div>
            ))}
          </div>
          
          {recommendation.recommendedRoutes.length > 1 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-sm text-primary font-medium flex items-center"
            >
              {expanded ? 'Show fewer options' : 'Show more options'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("h-4 w-4 ml-1 transition-transform", expanded ? "rotate-180" : "")}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get country name from ID
const getCountryName = (countryId: string) => {
  const countryNames: Record<string, string> = {
    'pl': 'Poland',
    'hu': 'Hungary',
    'ro': 'Romania',
    'sk': 'Slovakia',
    'lb': 'Lebanon',
    'tr': 'Turkey',
    'jo': 'Jordan',
    'eg': 'Egypt',
    'et': 'Ethiopia',
    'us': 'United States',
    'gt': 'Guatemala',
    'co': 'Colombia',
    'br': 'Brazil',
    'pa': 'Panama',
    'nz': 'New Zealand',
    'au': 'Australia',
    'sb': 'Solomon Islands',
    'ke': 'Kenya',
  };
  
  return countryNames[countryId] || 'Unknown Country';
};

export default SafeRouteRecommendation;
