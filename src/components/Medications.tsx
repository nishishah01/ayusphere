import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Clock1, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import medicationService, { Medication, CreateMedicationData } from "@/services/medicationService";
import patientService from "@/services/patientService";

const Medications = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [activeMedications, setActiveMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [patientId, setPatientId] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "daily" as const,
    instructions: "",
    start_date: "",
    end_date: "",
    side_effects: "",
    notes: "",
  });

  // Fetch patient profile and medications on component mount
  useEffect(() => {
    if (isAuthenticated && user?.user_type === 'patient') {
      fetchPatientData();
    }
  }, [isAuthenticated, user]);

  const fetchPatientData = async () => {
    try {
      setIsLoading(true);
      
      // Get patient profile to get patient ID
      const patientProfile = await patientService.getMyProfile();
      setPatientId(patientProfile.id);
      
      // Fetch all medications
      const allMeds = await medicationService.getMedications();
      setMedications(allMeds);
      
      // Fetch active medications
      const activeMeds = await medicationService.getActiveMedications();
      setActiveMedications(activeMeds);
      
    } catch (error: any) {
      console.error('Error fetching medications:', error);
      toast({
        title: "Error",
        description: "Failed to load medications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId) {
      toast({
        title: "Error",
        description: "Patient profile not found",
        variant: "destructive",
      });
      return;
    }

    try {
      const medicationData: CreateMedicationData = {
        patient: patientId,
        name: formData.name,
        dosage: formData.dosage,
        frequency: formData.frequency,
        instructions: formData.instructions,
        start_date: formData.start_date,
        end_date: formData.end_date || undefined,
        side_effects: formData.side_effects || undefined,
        notes: formData.notes || undefined,
      };

      await medicationService.createMedication(medicationData);
      
      toast({
        title: "Success",
        description: "Medication added successfully",
      });

      // Reset form and refresh data
      setFormData({
        name: "",
        dosage: "",
        frequency: "daily",
        instructions: "",
        start_date: "",
        end_date: "",
        side_effects: "",
        notes: "",
      });
      setShowAddForm(false);
      fetchPatientData();
      
    } catch (error: any) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to add medication",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsTaken = async (medicationId: number) => {
    toast({
      title: "Marked as Taken",
      description: "Medication marked as taken for today",
    });
  };

  const formatFrequency = (frequency: string) => {
    const frequencyMap: { [key: string]: string } = {
      'daily': 'Daily',
      'twice_daily': 'Twice Daily',
      'three_times_daily': 'Three Times Daily',
      'weekly': 'Weekly',
      'monthly': 'Monthly',
      'as_needed': 'As Needed',
    };
    return frequencyMap[frequency] || frequency;
  };

  const getRemainingDays = (endDate?: string) => {
    if (!endDate) return null;
    
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to view your medications</p>
      </div>
    );
  }

  if (user?.user_type !== 'patient') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">This section is only available for patients</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading medications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="ayu-card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medications & Reminders</h1>
          <Button 
            className="ayu-button-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={18} />
            Add Medication
          </Button>
        </div>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <div className="ayu-card">
          <h2 className="text-xl font-bold mb-4">Add New Medication</h2>
          <form onSubmit={handleAddMedication} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Medication Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter medication name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={formData.dosage}
                  onChange={(e) => handleInputChange("dosage", e.target.value)}
                  placeholder="e.g., 1 tablet, 10ml"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={formData.frequency} onValueChange={(value) => handleInputChange("frequency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="twice_daily">Twice Daily</SelectItem>
                    <SelectItem value="three_times_daily">Three Times Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="as_needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange("start_date", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => handleInputChange("instructions", e.target.value)}
                placeholder="How to take this medication"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date (Optional)</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange("end_date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="side_effects">Side Effects (Optional)</Label>
                <Input
                  id="side_effects"
                  value={formData.side_effects}
                  onChange={(e) => handleInputChange("side_effects", e.target.value)}
                  placeholder="Known side effects"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="ayu-button-primary">
                Add Medication
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="ayu-card">
            <h2 className="text-xl font-bold mb-4">Active Medications</h2>
            {activeMedications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No active medications found</p>
            ) : (
              <div className="space-y-4">
                {activeMedications.map((medication) => {
                  const remainingDays = getRemainingDays(medication.end_date);
                  return (
                    <div key={medication.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-ayu-purple-light flex items-center justify-center flex-shrink-0">
                          <Clock size={20} className="text-ayu-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <h3 className="font-semibold">{medication.name}</h3>
                            <span className="text-sm text-ayu-purple font-medium bg-ayu-purple-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">
                              {formatFrequency(medication.frequency)}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">{medication.dosage}</p>
                          <p className="text-sm mt-1">{medication.instructions}</p>
                          <div className="mt-2 text-sm">
                            {remainingDays !== null && (
                              <span className={`inline-block px-2 py-1 rounded mr-2 ${
                                remainingDays > 7 ? 'bg-green-100 text-green-800' : 
                                remainingDays > 0 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {remainingDays > 0 ? `${remainingDays} days remaining` : 'Expired'}
                              </span>
                            )}
                            <span className="inline-block px-2 py-1 bg-ayu-blue-light text-ayu-blue rounded">
                              Prescribed by {medication.prescribed_by?.user?.first_name || 'Doctor'}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button 
                              size="sm" 
                              className="ml-auto ayu-button-primary"
                              onClick={() => handleMarkAsTaken(medication.id)}
                            >
                              Mark as Taken
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="ayu-card">
            <h2 className="text-xl font-bold mb-4">Medication History</h2>
            {medications.filter(med => med.status !== 'active').length === 0 ? (
              <p className="text-gray-500 text-center py-4">No medication history found</p>
            ) : (
              <div className="space-y-4">
                {medications.filter(med => med.status !== 'active').map((medication) => (
                  <div key={medication.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <h3 className="font-semibold">{medication.name}</h3>
                          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
                            {medication.status === 'completed' ? 'Completed' : 'Discontinued'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{medication.dosage} - {formatFrequency(medication.frequency)}</p>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Renew Prescription</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 text-center">
              <Button variant="outline" className="ayu-button-outline">View Full History</Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="ayu-card sticky top-6">
            <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="p-3 bg-ayu-purple-light/30 rounded-lg">
                <h3 className="font-medium text-ayu-purple">Active Medications</h3>
                <p className="text-2xl font-bold text-ayu-purple">{activeMedications.length}</p>
              </div>
              
              <div className="p-3 bg-ayu-blue-light/30 rounded-lg">
                <h3 className="font-medium text-ayu-blue">Total Medications</h3>
                <p className="text-2xl font-bold text-ayu-blue">{medications.length}</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800">Completed</h3>
                <p className="text-2xl font-bold text-green-800">
                  {medications.filter(med => med.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medications;