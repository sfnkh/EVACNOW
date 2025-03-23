import React from 'react';
import { timeframes, crises } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface TimeframeSelectorProps {
  countryId: string;
  onSelect: (timeframeId: string) => void;
  onBack: () => void;
}

type Crisis = {
  id: string;
  countryId: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
};

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ countryId, onSelect, onBack }) => {
  const countryCrises = crises.filter(crisis => crisis.countryId === countryId);
  const hasCrisis = countryCrises.length > 0;
  
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
            Back to Countries
          </button>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
          Select Evacuation Timeframe
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Choose when you need to evacuate to see available routes and options.
        </p>
      </div>
      
      {hasCrisis && (
        <div className="mb-8 max-w-3xl mx-auto">
          <div className={cn(
            "rounded-xl p-5 border bg-card animate-pulse-alert",
            getCrisisAlertBorderClass(getHighestSeverity(countryCrises))
          )}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "h-7 w-7",
                    getCrisisAlertIconClass(getHighestSeverity(countryCrises))
                  )}
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Crisis Alert</h3>
                <p className="text-sm mb-3">
                  This country has {countryCrises.length > 1 ? `${countryCrises.length} active crises` : 'an active crisis'}.
                  {getHighestSeverity(countryCrises) === 'high' && ' Immediate evacuation is recommended.'}
                  {getHighestSeverity(countryCrises) === 'medium' && ' Consider evacuation options carefully.'}
                </p>
                <div className="space-y-2">
                  {countryCrises.map(crisis => (
                    <div key={crisis.id} className="flex items-center text-sm">
                      <div className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        crisis.severity === 'high' ? "bg-crisis-high" : 
                        crisis.severity === 'medium' ? "bg-crisis-medium" : 
                        "bg-crisis-low"
                      )} />
                      <span className="font-medium mr-2">{crisis.name}:</span>
                      <span className="text-muted-foreground">{crisis.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {timeframes.map((timeframe, index) => (
          <button
            key={timeframe.id}
            onClick={() => onSelect(timeframe.id)}
            className={cn(
              "relative overflow-hidden p-6 rounded-xl text-left transition-all",
              "border border-border hover:border-primary/30",
              "bg-card hover:bg-card/80 shadow-sm hover:shadow",
              "group step-transition",
              timeframe.id === 'asap' && hasCrisis && getHighestSeverity(countryCrises) === 'high'
                ? "border-crisis-high/50 bg-crisis-high/5 animate-pulse"
                : ""
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TimeframeIcon timeframeId={timeframe.id} />
              </div>
              
              <h3 className="text-lg font-medium mb-1">{timeframe.name}</h3>
              <p className="text-sm text-muted-foreground">
                {getTimeframeDescription(timeframe.id, hasCrisis, getHighestSeverity(countryCrises))}
              </p>
            </div>
            
            <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const TimeframeIcon = ({ timeframeId }: { timeframeId: string }) => {
  switch (timeframeId) {
    case 'asap':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M12 2v10l4 4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'current-month':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      );
    case 'next-month':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="M17 14h-6" />
          <path d="M13 18h-2" />
          <path d="M7 14h.01" />
          <path d="M7 18h.01" />
        </svg>
      );
    case 'two-months':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="M17 18h.01" />
          <path d="M13 18h.01" />
          <path d="M9 18h.01" />
          <path d="M9 14h.01" />
          <path d="M13 14h.01" />
          <path d="M17 14h.01" />
        </svg>
      );
    case 'three-months':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M4 22h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v14c0 1.1.89 2 2 2Z" />
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <path d="M2 10h20" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
  }
};

const getTimeframeDescription = (timeframeId: string, hasCrisis: boolean, highestSeverity: 'low' | 'medium' | 'high') => {
  switch (timeframeId) {
    case 'asap':
      return hasCrisis 
        ? highestSeverity === 'high'
          ? 'Immediate evacuation recommended due to high crisis level'
          : 'Expedited evacuation options within 24-72 hours'
        : 'Emergency evacuation options within 24-72 hours';
    case 'current-month':
      return 'Evacuation options available within the current month';
    case 'next-month':
      return 'Plan your evacuation for next month';
    case 'two-months':
      return 'Schedule evacuation approximately 60 days from now';
    case 'three-months':
      return 'Schedule evacuation approximately 90 days from now';
    default:
      return 'Select this timeframe to view evacuation options';
  }
};

const getHighestSeverity = (crises: Crisis[]): 'low' | 'medium' | 'high' => {
  if (crises.some(crisis => crisis.severity === 'high')) return 'high';
  if (crises.some(crisis => crisis.severity === 'medium')) return 'medium';
  return 'low';
};

const getCrisisAlertBorderClass = (severity: 'low' | 'medium' | 'high') => {
  switch (severity) {
    case 'high':
      return 'border-crisis-high';
    case 'medium':
      return 'border-crisis-medium';
    case 'low':
      return 'border-crisis-low';
    default:
      return 'border-crisis-low';
  }
};

const getCrisisAlertIconClass = (severity: 'low' | 'medium' | 'high') => {
  switch (severity) {
    case 'high':
      return 'text-crisis-high';
    case 'medium':
      return 'text-crisis-medium';
    case 'low':
      return 'text-crisis-low';
    default:
      return 'text-crisis-low';
  }
};

export default TimeframeSelector;
