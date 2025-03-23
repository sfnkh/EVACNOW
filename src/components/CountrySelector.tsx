
import React from 'react';
import { countriesByRegion, crises, Crisis } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface CountrySelectorProps {
  regionId: string;
  onSelect: (countryId: string) => void;
  onBack: () => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ regionId, onSelect, onBack }) => {
  const countries = countriesByRegion[regionId] || [];

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
            Back to Regions
          </button>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
          Select a Country
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Choose your current country or select a destination to view crisis information and evacuation options.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {countries.map((country, index) => {
          const countryCrises = crises.filter(crisis => crisis.countryId === country.id);
          const hasCrisis = countryCrises.length > 0;
          const highestSeverityCrisis = hasCrisis 
            ? countryCrises.reduce((prev, current) => {
                const severityValues = { high: 3, medium: 2, low: 1 };
                return severityValues[current.severity] > severityValues[prev.severity] ? current : prev;
              }, countryCrises[0])
            : null;
            
          return (
            <button
              key={country.id}
              onClick={() => onSelect(country.id)}
              className={cn(
                "relative overflow-hidden p-6 rounded-xl text-left transition-all",
                "border border-border hover:border-primary/30",
                "bg-card hover:bg-card/80 shadow-sm hover:shadow",
                "group step-transition"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">{country.name}</h3>
                  
                  {hasCrisis && (
                    <div className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      getCrisisBadgeClass(highestSeverityCrisis?.severity || 'low')
                    )}>
                      {getCrisisLabelText(highestSeverityCrisis?.severity || 'low')}
                    </div>
                  )}
                </div>
                
                {hasCrisis ? (
                  <div className="space-y-2">
                    {countryCrises.map(crisis => (
                      <CrisisIndicator key={crisis.id} crisis={crisis} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No active crises reported. Regular travel and evacuation options available.
                  </p>
                )}
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
          );
        })}
      </div>
    </div>
  );
};

const CrisisIndicator: React.FC<{ crisis: Crisis }> = ({ crisis }) => {
  return (
    <div className="flex items-start">
      <div className={cn(
        "flex-shrink-0 w-3 h-3 rounded-full mt-1 mr-2",
        crisis.severity === 'high' ? "bg-crisis-high" : 
        crisis.severity === 'medium' ? "bg-crisis-medium" : 
        "bg-crisis-low"
      )} />
      <div>
        <p className="text-sm font-medium">{crisis.name}</p>
        <p className="text-xs text-muted-foreground">{crisis.description}</p>
      </div>
    </div>
  );
};

const getCrisisBadgeClass = (severity: 'low' | 'medium' | 'high') => {
  switch (severity) {
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

const getCrisisLabelText = (severity: 'low' | 'medium' | 'high') => {
  switch (severity) {
    case 'high':
      return 'High Alert';
    case 'medium':
      return 'Medium Alert';
    case 'low':
      return 'Low Alert';
    default:
      return 'No Alert';
  }
};

export default CountrySelector;
