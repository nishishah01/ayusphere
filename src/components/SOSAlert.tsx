
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, Shield } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface SOSAlertProps {
  className?: string;
}

const SOSAlert = ({ className }: SOSAlertProps) => {
  const { toast } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showTempFixOptions, setShowTempFixOptions] = useState(false);
  
  const handleSOSClick = () => {
    setShowAlert(true);
    toast({
      title: "SOS Alert Triggered",
      description: "Emergency contacts will be notified in 5 seconds. Click Cancel to abort.",
      variant: "destructive",
    });
    
    let seconds = 5;
    setCountdown(seconds);
    
    const timer = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      
      if (seconds <= 0) {
        clearInterval(timer);
        sendEmergencyAlert();
      }
    }, 1000);
    
    // Store the timer ID to clear it if canceled
    window.sosTimer = timer as unknown as number;
  };
  
  const cancelSOS = () => {
    if (window.sosTimer) {
      clearInterval(window.sosTimer);
      setShowAlert(false);
      toast({
        title: "SOS Alert Canceled",
        description: "The emergency alert has been canceled.",
      });
    }
  };
  
  const sendEmergencyAlert = () => {
    // In a real app, this would call an API to notify emergency contacts
    // For demo purposes, we'll just show a toast
    setShowAlert(false);
    toast({
      title: "Emergency Alert Sent",
      description: "Your emergency contacts have been notified of your situation.",
      variant: "destructive",
    });
  };

  const showTemporaryFixes = () => {
    setShowTempFixOptions(true);
  };
  
  const closeTemporaryFixes = () => {
    setShowTempFixOptions(false);
  };

  const applyTemporaryFix = (fixType: string) => {
    toast({
      title: "Temporary Fix Applied",
      description: `${fixType} instructions have been sent to your device.`,
    });
    closeTemporaryFixes();
  };
  
  return (
    <div className={className}>
      {showAlert ? (
        <Alert variant="destructive" className="mb-4 border-2 border-red-500">
          <Bell className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Emergency Alert</AlertTitle>
          <AlertDescription className="mt-2">
            <p>Alerting your emergency contacts in <span className="font-bold">{countdown}</span> seconds.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="bg-white text-red-500 hover:bg-red-50" onClick={cancelSOS}>
                Cancel Alert
              </Button>
              <Button variant="outline" className="bg-white text-blue-500 hover:bg-blue-50" onClick={showTemporaryFixes}>
                Temporary Fixes
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Button 
          variant="destructive" 
          className="w-full py-6 text-lg font-bold"
          onClick={handleSOSClick}
        >
          <Bell className="mr-2 h-6 w-6" />
          SOS EMERGENCY ALERT
        </Button>
      )}

      <Dialog open={showTempFixOptions} onOpenChange={setShowTempFixOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Temporary Emergency Fixes</DialogTitle>
            <DialogDescription>
              Select a temporary fix for your current situation
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => applyTemporaryFix("First Aid")} className="flex justify-between items-center">
              <span>First Aid Instructions</span>
              <Shield className="h-5 w-5" />
            </Button>
            <Button onClick={() => applyTemporaryFix("CPR")} variant="secondary" className="flex justify-between items-center">
              <span>CPR Guidelines</span>
              <Shield className="h-5 w-5" />
            </Button>
            <Button onClick={() => applyTemporaryFix("Medication")} variant="outline" className="flex justify-between items-center">
              <span>Emergency Medication</span>
              <Shield className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Add this to fix the TypeScript error with the timer
declare global {
  interface Window {
    sosTimer: number | null;
  }
}
window.sosTimer = null;

export default SOSAlert;
