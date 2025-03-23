
import React from 'react';
import { Crisis } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface CrisisAlertProps {
  crisis: Crisis;
  expanded?: boolean;
}

const CrisisAlert: React.FC<CrisisAlertProps> = ({ crisis, expanded = false }) => {
  return (
    <div 
      className={cn(
        "rounded-xl border p-4 mb-4 animate-fade-in",
        crisis.severity === 'high' ? "border-crisis-high bg-crisis-high/5" : 
        crisis.severity === 'medium' ? "border-crisis-medium bg-crisis-medium/5" : 
        "border-crisis-low bg-crisis-low/5"
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <AlertIcon severity={crisis.severity} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium">{crisis.name}</h3>
            <SeverityBadge severity={crisis.severity} />
          </div>
          
          <p className="text-sm text-foreground/90 mb-2">{crisis.description}</p>
          
          {expanded && (
            <div className="mt-3 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Affected Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {crisis.affectedAreas.map(area => (
                    <span 
                      key={area} 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Crisis Timeline</h4>
                <p className="text-xs text-muted-foreground">
                  Started on {formatDate(crisis.startDate)} - 
                  {Math.floor((Date.now() - new Date(crisis.startDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                </p>
              </div>
              
              {crisis.severity === 'high' && (
                <div className="bg-crisis-high/10 p-3 rounded-lg text-sm">
                  <span className="font-medium text-crisis-high">High Alert Recommendation:</span> Immediate evacuation advised. Contact emergency services or your embassy for assistance.
                </div>
              )}
              
              {crisis.severity === 'medium' && (
                <div className="bg-crisis-medium/10 p-3 rounded-lg text-sm">
                  <span className="font-medium text-crisis-medium">Medium Alert Recommendation:</span> Be prepared to evacuate on short notice. Follow updates from local authorities and your embassy.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AlertIcon = ({ severity }: { severity: 'low' | 'medium' | 'high' }) => {
  const iconClass = cn(
    "h-6 w-6",
    severity === 'high' ? "text-crisis-high" : 
    severity === 'medium' ? "text-crisis-medium" : 
    "text-crisis-low"
  );
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={iconClass}
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};

const SeverityBadge = ({ severity }: { severity: 'low' | 'medium' | 'high' }) => {
  return (
    <div className={cn(
      "px-2 py-0.5 rounded-full text-xs",
      severity === 'high' ? "crisis-badge-high" : 
      severity === 'medium' ? "crisis-badge-medium" : 
      "crisis-badge-low"
    )}>
      {severity === 'high' ? 'High Alert' : 
       severity === 'medium' ? 'Medium Alert' : 
       'Low Alert'}
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default CrisisAlert;
