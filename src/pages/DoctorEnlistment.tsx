import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import doctorService from "@/services/doctorService";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, MapPin } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  specialization: z.string().min(1, { message: "Please select a specialization" }),
  qualifications: z.string().min(10, { message: "Please provide your qualifications" }),
  experience: z.number().min(0, { message: "Experience must be a positive number" }),
  license_number: z.string().min(5, { message: "Please provide your license number" }),
  clinic_address: z.string().min(10, { message: "Please provide your clinic address" }),
  consultation_fee: z.string().min(1, { message: "Please provide consultation fee" }),
  availability: z.array(z.string()).nonempty({ message: "Select at least one day" }),
});

type FormValues = z.infer<typeof formSchema>;

const specializations = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
  "Other"
];

const weekDays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const DoctorEnlistment = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialization: "",
      qualifications: "",
      experience: 0,
      license_number: "",
      clinic_address: "",
      consultation_fee: "",
      availability: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await doctorService.createDoctor({
        specialization: data.specialization,
        qualifications: data.qualifications,
        experience: data.experience,
        license_number: data.license_number,
        clinic_address: data.clinic_address,
        consultation_fee: data.consultation_fee,
        availability: data.availability,
      });
      
      toast({
        title: "Registration Successful",
        description: "Your doctor application has been submitted for review.",
      });
      
      form.reset();
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.detail || "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-ayu-purple mb-2">Join Our Medical Network</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Register as a healthcare provider on AyuSphere and connect with patients who need your expertise.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {user?.phone || 'Not provided'}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="clinic_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clinic Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea placeholder="123 Medical Plaza, Suite 456, New York, NY 10001" className="pl-10 min-h-[80px]" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Professional Information</h2>
                
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specializations.map((specialization) => (
                            <SelectItem key={specialization} value={specialization}>
                              {specialization}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="MD, University of Medicine, Board Certified in..." 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="license_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your medical license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consultation_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Fee ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="100.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Availability (Days)</FormLabel>
                        <FormDescription>
                          Select the days you're available for appointments
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {weekDays.map((day) => (
                          <FormField
                            key={day.id}
                            control={form.control}
                            name="availability"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={day.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, day.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== day.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {day.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full md:w-auto bg-ayu-purple hover:bg-ayu-purple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DoctorEnlistment;