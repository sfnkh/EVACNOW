
import React from 'react';
import { regions } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface RegionSelectorProps {
  onSelect: (regionId: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelect }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8 animate-slide-down">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
          Select a Region
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Choose your current region to find available evacuation routes and emergency information.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {regions.map((region, index) => (
          <button
            key={region.id}
            onClick={() => onSelect(region.id)}
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
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <RegionIcon regionId={region.id} />
              </div>
              
              <h3 className="text-lg font-medium mb-1">{region.name}</h3>
              <p className="text-sm text-muted-foreground">
                {getRegionDescription(region.id)}
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

const RegionIcon = ({ regionId }: { regionId: string }) => {
  switch (regionId) {
    case 'north-america':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M22 9a2 2 0 0 0-2-2H4" />
          <path d="M5 14.5V12" />
          <path d="M5 18.5V16" />
          <path d="M12 16.5V14" />
          <path d="M19 14.5V12" />
          <path d="M22 13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2Z" />
        </svg>
      );
    case 'south-america':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V10" />
          <path d="M8.5 2h7" />
          <path d="M14.5 16h-5" />
        </svg>
      );
    case 'europe':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <polygon points="12 2 20 20 12 22 4 20 12 2" />
        </svg>
      );
    case 'africa':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <path d="M14 2v6h6" />
          <path d="M8 12h8" />
          <path d="M8 16h4" />
        </svg>
      );
    case 'asia':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M15 3 7.5 7.5" />
          <path d="M14 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
          <path d="M11.5 17.5 15 21" />
          <path d="M13 19c-2.8-3-5-6.5-5-10a6 6 0 0 1 9.6-4.8" />
          <path d="M20 11.2c.6 1 1 2.1 1 2.8a6 6 0 0 1-11.5 2.3" />
        </svg>
      );
    case 'oceania':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
          <path d="M14 12a2 2 0 0 0 4 0 4 4 0 0 0-4-4" />
          <path d="M10 12a2 2 0 0 1-4 0 4 4 0 0 1 4-4" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 12a4 4 0 1 0 4 4" />
        </svg>
      );
  }
};

const getRegionDescription = (regionId: string) => {
  switch (regionId) {
    case 'north-america':
      return 'United States, Canada, Mexico, and Central America';
    case 'south-america':
      return 'Brazil, Argentina, Colombia, and surrounding countries';
    case 'europe':
      return 'EU countries, UK, Eastern Europe, and surrounding areas';
    case 'africa':
      return 'North, East, West, Central and Southern African countries';
    case 'asia':
      return 'Middle East, Central, South, East, and Southeast Asia';
    case 'oceania':
      return 'Australia, New Zealand, and Pacific Island countries';
    default:
      return 'Select this region to view countries';
  }
};

export default RegionSelector;
