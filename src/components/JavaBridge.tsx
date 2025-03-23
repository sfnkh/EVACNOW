
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * JavaBridge Component
 * 
 * This component simulates integration with a Java backend service.
 * In a real implementation, this would connect to a Java Spring Boot API
 * using fetch or axios to retrieve evacuation data.
 */
const JavaBridge: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [data, setData] = useState<any>(null);
  const [showJavaCode, setShowJavaCode] = useState(false);

  const connectToJavaBackend = async () => {
    setStatus('connecting');
    
    // Simulate API call to Java backend
    try {
      // In a real implementation, this would be a fetch call to your Java API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data from Java backend
      const mockResponseFromJava = {
        evacuationPlans: [
          {
            id: "EVP-001",
            country: "Ukraine",
            recommendedRoutes: [
              { 
                from: "Kyiv", 
                to: "Warsaw", 
                transportMode: "Train",
                duration: "14 hours",
                riskLevel: "Medium" 
              },
              { 
                from: "Lviv", 
                to: "Krakow", 
                transportMode: "Bus",
                duration: "8 hours",
                riskLevel: "Low" 
              }
            ],
            timestamp: new Date().toISOString()
          }
        ],
        serviceInfo: {
          javaVersion: "17.0.6",
          springBootVersion: "3.1.0",
          serverTime: new Date().toISOString()
        }
      };
      
      setData(mockResponseFromJava);
      setStatus('connected');
    } catch (error) {
      console.error("Error connecting to Java backend:", error);
      setStatus('error');
    }
  };

  // Animation variants
  const animationVariants = {
    idle: {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    highlight: {
      boxShadow: "0 0 15px 5px rgba(0, 149, 255, 0.3)"
    },
    connecting: {
      boxShadow: "0 0 10px 2px rgba(0, 149, 255, 0.2)",
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1
      }
    }
  };

  // Animation state based on connection status
  const getAnimationVariant = () => {
    switch (status) {
      case 'connecting':
        return 'connecting';
      case 'connected':
        return 'highlight';
      default:
        return 'idle';
    }
  };

  return (
    <motion.div
      variants={animationVariants}
      animate={getAnimationVariant()}
      className="mb-8 rounded-xl overflow-hidden"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.93-3.514 1.582-5.979 2.287 3.264 3.101 12.004.896 14.986-4.033 9.07-2.197M9.292 13.21s-2.807.669-3.556 1.268c-.78.062 1.203 3.045 4.084 3.112-1.162-1.214-2.012-2.593-.528-4.38M17.127 17.806c4.525-2.358 2.436-4.627 1.769-4.328-.243.194-.578.257-.578.257s.152-.237.437-.339c3.272-1.15 5.787 3.011-1.7 4.608-.012 0 .077-.07.072-.198M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.776-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" fill="#1182c3"/>
              </svg>
            </div>
            Java Bridge
          </CardTitle>
          <CardDescription>
            Connect to the Java backend evacuation service
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'connected' && data ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Service Info:</h3>
                <div className="bg-secondary/50 p-2 rounded text-xs">
                  <div>Java Version: {data.serviceInfo.javaVersion}</div>
                  <div>Spring Boot: {data.serviceInfo.springBootVersion}</div>
                  <div>Server Time: {new Date(data.serviceInfo.serverTime).toLocaleString()}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Evacuation Data:</h3>
                <div className="bg-secondary/50 p-2 rounded text-xs">
                  {data.evacuationPlans.map((plan: any) => (
                    <div key={plan.id} className="mb-2">
                      <div className="font-medium">Plan ID: {plan.id} - {plan.country}</div>
                      <div className="pl-2 mt-1">
                        {plan.recommendedRoutes.map((route: any, idx: number) => (
                          <div key={idx} className="text-muted-foreground mb-1">
                            {route.from} → {route.to} ({route.transportMode}, {route.duration})
                            <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                              route.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                              route.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {route.riskLevel}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowJavaCode(!showJavaCode)}
              >
                {showJavaCode ? "Hide Java Code" : "Show Java Code"}
              </Button>

              {showJavaCode && (
                <div className="text-xs font-mono mt-2 p-2 bg-zinc-950 text-zinc-200 rounded-md overflow-x-auto">
                  <pre>{`// EvacuationController.java
package com.evacplanner.api.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.evacplanner.api.models.EvacuationPlan;
import com.evacplanner.api.services.EvacuationService;
import java.util.List;

@RestController
@RequestMapping("/api/evacuation")
public class EvacuationController {

    private final EvacuationService evacuationService;

    public EvacuationController(EvacuationService evacuationService) {
        this.evacuationService = evacuationService;
    }

    @GetMapping("/plans")
    public ResponseEntity<List<EvacuationPlan>> getAllPlans() {
        return ResponseEntity.ok(evacuationService.getAllPlans());
    }

    @GetMapping("/plans/{country}")
    public ResponseEntity<List<EvacuationPlan>> getPlansByCountry(
            @PathVariable String country) {
        return ResponseEntity.ok(
            evacuationService.getPlansByCountry(country)
        );
    }

    @GetMapping("/service-info")
    public ResponseEntity<Map<String, String>> getServiceInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("javaVersion", System.getProperty("java.version"));
        info.put("springBootVersion", "3.1.0");
        info.put("serverTime", new Date().toString());
        return ResponseEntity.ok(info);
    }
}`}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              {status === 'connecting' ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                  <p className="text-sm text-muted-foreground">Connecting to Java backend...</p>
                </div>
              ) : status === 'error' ? (
                <div className="text-destructive text-sm">
                  Error connecting to Java backend. Please try again.
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click the button below to connect to the Java evacuation service
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={connectToJavaBackend} 
            disabled={status === 'connecting'}
            className="w-full"
          >
            {status === 'connecting' ? 'Connecting...' : 
             status === 'connected' ? 'Refresh Data' : 
             status === 'error' ? 'Try Again' : 
             'Connect to Java Backend'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JavaBridge;
