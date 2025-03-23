
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import RegionSelector from '@/components/RegionSelector';
import CountrySelector from '@/components/CountrySelector';
import TimeframeSelector from '@/components/TimeframeSelector';
import EvacuationOptions from '@/components/EvacuationOptions';
import EmergencyInfo from '@/components/EmergencyInfo';
import EvacuationPlan from '@/components/EvacuationPlan';
import { EvacuationFlight } from '@/utils/mockData';
import { cn } from '@/lib/utils';

type Step = 'region' | 'country' | 'timeframe' | 'evacuation' | 'emergency-info' | 'evacuation-plan' | 'complete';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<EvacuationFlight | null>(null);
  
  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setCurrentStep('country');
  };
  
  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    setCurrentStep('timeframe');
  };
  
  const handleTimeframeSelect = (timeframeId: string) => {
    setSelectedTimeframe(timeframeId);
    setCurrentStep('evacuation');
  };
  
  const handleFlightSelect = (flight: EvacuationFlight) => {
    setSelectedFlight(flight);
    setCurrentStep('emergency-info');
  };
  
  const handleBackToRegion = () => {
    setCurrentStep('region');
    setSelectedRegion(null);
    setSelectedCountry(null);
    setSelectedTimeframe(null);
    setSelectedFlight(null);
  };
  
  const handleBackToCountry = () => {
    setCurrentStep('country');
    setSelectedCountry(null);
    setSelectedTimeframe(null);
    setSelectedFlight(null);
  };
  
  const handleBackToTimeframe = () => {
    setCurrentStep('timeframe');
    setSelectedTimeframe(null);
    setSelectedFlight(null);
  };
  
  const handleBackToEvacuation = () => {
    setCurrentStep('evacuation');
    setSelectedFlight(null);
  };
  
  const handleCreatePlan = () => {
    setCurrentStep('evacuation-plan');
  };
  
  const handleBackToEmergencyInfo = () => {
    setCurrentStep('emergency-info');
  };
  
  const handleCompletePlan = () => {
    toast({
      title: "Evacuation Plan Created",
      description: "Your evacuation plan has been saved successfully.",
    });
    setCurrentStep('complete');
  };

  const handleCreateNewPlan = () => {
    setCurrentStep('region');
    setSelectedRegion(null);
    setSelectedCountry(null);
    setSelectedTimeframe(null);
    setSelectedFlight(null);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Progress indicator */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex justify-between">
              <div 
                className={cn(
                  "flex flex-col items-center",
                  currentStep === 'region' ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  currentStep === 'region' ? "border-primary bg-primary/10" : 
                    (currentStep === 'country' || currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                )}>
                  {(currentStep === 'country' || currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : "1"}
                </div>
                <span className="text-xs">Region</span>
              </div>
              
              <div className={cn(
                "flex-1 border-t-2 mt-4 mx-2",
                (currentStep === 'country' || currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary" : "border-muted"
              )} />
              
              <div 
                className={cn(
                  "flex flex-col items-center",
                  currentStep === 'country' ? "text-primary" : 
                    (currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "text-muted-foreground" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  currentStep === 'country' ? "border-primary bg-primary/10" : 
                    (currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                )}>
                  {(currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : "2"}
                </div>
                <span className="text-xs">Country</span>
              </div>
              
              <div className={cn(
                "flex-1 border-t-2 mt-4 mx-2",
                (currentStep === 'timeframe' || currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary" : "border-muted"
              )} />
              
              <div 
                className={cn(
                  "flex flex-col items-center",
                  currentStep === 'timeframe' ? "text-primary" : 
                    (currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "text-muted-foreground" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  currentStep === 'timeframe' ? "border-primary bg-primary/10" : 
                    (currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                )}>
                  {(currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : "3"}
                </div>
                <span className="text-xs">Timeframe</span>
              </div>
              
              <div className={cn(
                "flex-1 border-t-2 mt-4 mx-2",
                (currentStep === 'evacuation' || currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary" : "border-muted"
              )} />
              
              <div 
                className={cn(
                  "flex flex-col items-center",
                  currentStep === 'evacuation' ? "text-primary" : 
                    (currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "text-muted-foreground" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  currentStep === 'evacuation' ? "border-primary bg-primary/10" : 
                    (currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                )}>
                  {(currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : "4"}
                </div>
                <span className="text-xs">Options</span>
              </div>
              
              <div className={cn(
                "flex-1 border-t-2 mt-4 mx-2",
                (currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary" : "border-muted"
              )} />
              
              <div 
                className={cn(
                  "flex flex-col items-center",
                  currentStep === 'emergency-info' || currentStep === 'evacuation-plan' || currentStep === 'complete' ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2",
                  currentStep === 'emergency-info' ? "border-primary bg-primary/10" : 
                    (currentStep === 'evacuation-plan' || currentStep === 'complete') ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                )}>
                  {(currentStep === 'evacuation-plan' || currentStep === 'complete') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : "5"}
                </div>
                <span className="text-xs">Information</span>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          {currentStep === 'region' && (
            <RegionSelector onSelect={handleRegionSelect} />
          )}
          
          {currentStep === 'country' && selectedRegion && (
            <CountrySelector 
              regionId={selectedRegion} 
              onSelect={handleCountrySelect}
              onBack={handleBackToRegion}
            />
          )}
          
          {currentStep === 'timeframe' && selectedCountry && (
            <TimeframeSelector 
              countryId={selectedCountry}
              onSelect={handleTimeframeSelect}
              onBack={handleBackToCountry}
            />
          )}
          
          {currentStep === 'evacuation' && selectedCountry && selectedTimeframe && (
            <EvacuationOptions 
              countryId={selectedCountry}
              timeframeId={selectedTimeframe}
              onSelect={handleFlightSelect}
              onBack={handleBackToTimeframe}
            />
          )}
          
          {currentStep === 'emergency-info' && selectedFlight && (
            <div className="animate-fade-in">
              <div className="text-center mb-8 animate-slide-down">
                <div className="inline-flex items-center mb-4 text-sm">
                  <button 
                    onClick={handleBackToEvacuation}
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
                    Back to Evacuation Options
                  </button>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
                  Emergency Information
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                  Review essential information for your selected evacuation route.
                </p>
                
                <button 
                  onClick={handleCreatePlan}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" x2="12" y1="18" y2="12" />
                    <line x1="9" x2="15" y1="15" y2="15" />
                  </svg>
                  Create Evacuation Plan
                </button>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <EmergencyInfo flight={selectedFlight} />
              </div>
            </div>
          )}
          
          {currentStep === 'evacuation-plan' && selectedFlight && (
            <EvacuationPlan 
              flight={selectedFlight}
              onBack={handleBackToEmergencyInfo}
              onComplete={handleCompletePlan}
            />
          )}
          
          {currentStep === 'complete' && (
            <div className="animate-fade-in text-center max-w-xl mx-auto">
              <div className="mb-8">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-primary"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                  Evacuation Plan Complete
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your evacuation plan has been created and saved successfully. You can access this plan at any time through your account.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button className="px-5 py-2.5 rounded-lg border border-border bg-secondary text-secondary-foreground text-sm font-medium transition-colors hover:bg-secondary/80">
                    Download Plan (PDF)
                  </button>
                  <button className="px-5 py-2.5 rounded-lg border border-border bg-secondary text-secondary-foreground text-sm font-medium transition-colors hover:bg-secondary/80">
                    Email Plan
                  </button>
                  <button 
                    onClick={handleCreateNewPlan}
                    className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    Create New Plan
                  </button>
                </div>
                
                <div className="p-5 rounded-xl border border-dashed bg-secondary/30">
                  <h3 className="font-medium mb-2">Next Steps</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please take these important actions before your evacuation date:
                  </p>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-primary mt-0.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Register with your country's embassy or consulate in your destination
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-primary mt-0.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Complete all visa requirements as soon as possible
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-primary mt-0.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Download offline maps and emergency information for your destination
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-primary mt-0.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Set up emergency contacts and communication plans
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;
