import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import jsPDF from "jspdf";

const Appointments = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const handleViewDetails = (doctor: string) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDoctor, setReportDoctor] = useState("");
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Medical Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Doctor: ${reportDoctor}`, 20, 35);
    doc.text("Date: April 15, 2025", 20, 45);
    doc.text("Patient: John Doe", 20, 55);
    doc.text("Diagnosis: Mild hypertension", 20, 65);
    doc.text("Prescription: Amlodipine 5mg once daily", 20, 75);
    doc.text("Notes: Monitor blood pressure regularly", 20, 85);
    doc.save("medical-report.pdf");
  };
  const handleViewReport = (doctor: string) => {
    setReportDoctor(doctor);
    setShowReportModal(true);
  };
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpDoctor, setFollowUpDoctor] = useState("");
  const handleBookFollowUp = (doctor: string) => {
    setFollowUpDoctor(doctor);
    setShowFollowUpModal(true);
  };
  
  return (
    <div className="space-y-8">
      <div className="ayu-card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Book Appointments</h1>
          <Button className="ayu-button-primary">New Appointment</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="ayu-card">
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ayu-purple-light flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-ayu-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Dr. Sarah Lee - Dentist</h3>
                      <span className="text-sm text-ayu-purple font-medium bg-ayu-purple-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">Tomorrow 10:00 AM</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">City Medical Center, 123 Health St.</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button size="sm" className="ml-auto ayu-button-secondary" onClick={() => handleViewDetails("Dr. Sarah Lee")}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ayu-blue-light flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-ayu-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Dr. James Wilson - Cardiologist</h3>
                      <span className="text-sm text-ayu-blue font-medium bg-ayu-blue-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">May 8, 2:30 PM</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Heart Center, 456 Cardio Lane</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button size="sm" className="ml-auto ayu-button-secondary" onClick={() => handleViewDetails("Dr. Sarah Lee")}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ayu-card">
            <h2 className="text-xl font-bold mb-4">Past Appointments</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Dr. Michael Chen - Primary Care</h3>
                      <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">April 15, 2025</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">City Medical Center, 123 Health St.</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" onClick={() => handleViewReport("Dr. Michael Chen")}>View Report</Button>
                      <Button variant="outline" size="sm" onClick={() => handleBookFollowUp("Dr. Michael Chen")}>Book Follow-up</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Dr. Sarah Lee - Dentist</h3>
                      <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">February 10, 2025</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">City Medical Center, 123 Health St.</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" onClick={() => handleViewReport("Dr. Michael Chen")}>View Report</Button>
                      <Button variant="outline" size="sm" onClick={() => handleBookFollowUp("Dr. Michael Chen")}>Book Follow-up</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="ayu-button-outline">View All Past Appointments</Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="ayu-card sticky top-6">
            <h2 className="text-xl font-bold mb-4">Find a Doctor</h2>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by name or specialty..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent">
                  <option value="">All Specialties</option>
                  <option value="primary">Primary Care</option>
                  <option value="dentist">Dentist</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  placeholder="Enter zipcode..." 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <Button className="w-full ayu-button-primary mt-2">Find Doctors</Button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg space-y-4">
            <h2 className="text-lg font-bold">{selectedDoctor}</h2>
            <p className="text-sm text-gray-700">Here are some dummy details about the appointment:</p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Date: May 8, 2025</li>
              <li>Time: 2:30 PM</li>
              <li>Location: Heart Center, 456 Cardio Lane</li>
              <li>Purpose: Routine checkup and blood pressure monitoring</li>
            </ul>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg space-y-4">
            <h2 className="text-lg font-bold mb-2">Medical Report</h2>
            <p className="text-sm text-gray-700 mb-2">Doctor: {reportDoctor}</p>
            <p className="text-sm text-gray-600">Patient: John Doe</p>
            <p className="text-sm text-gray-600">Diagnosis: Mild hypertension</p>
            <p className="text-sm text-gray-600">Prescription: Amlodipine 5mg daily</p>
            <p className="text-sm text-gray-600">Notes: Monitor BP regularly, follow up in 30 days</p>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setShowReportModal(false)}>Close</Button>
              <Button className="ayu-button-secondary" onClick={downloadReport}>Download PDF</Button>
            </div>
          </div>
        </div>
      )}

{showFollowUpModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white w-96 rounded-lg p-6 shadow-lg space-y-4">
      <h2 className="text-lg font-bold mb-2">Book Follow-Up Appointment</h2>
      <p className="text-sm text-gray-700 mb-2">Doctor: {followUpDoctor}</p>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Symptoms or Concerns</label>
        <textarea className="w-full p-2 border border-gray-200 rounded-lg" rows={3} placeholder="Describe your symptoms..."></textarea>
        
        <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
        <input type="date" className="w-full p-2 border border-gray-200 rounded-lg" />

        <label className="block text-sm font-medium text-gray-700">Any Notes</label>
        <input type="text" placeholder="Eg. I prefer morning slots" className="w-full p-2 border border-gray-200 rounded-lg" />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setShowFollowUpModal(false)}>Cancel</Button>
        <Button className="ayu-button-primary" onClick={() => setShowFollowUpModal(false)}>Submit</Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Appointments;
