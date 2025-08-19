
import { Button } from "@/components/ui/button";
import { Clock, Clock1 } from "lucide-react";

const Medications = () => {
  return (
    <div className="space-y-8">
      <div className="ayu-card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medications & Reminders</h1>
          <Button className="ayu-button-primary">Add Medication</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="ayu-card">
            <h2 className="text-xl font-bold mb-4">Active Medications</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ayu-purple-light flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-ayu-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Vitamin D</h3>
                      <span className="text-sm text-ayu-purple font-medium bg-ayu-purple-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">Daily at 8:00 PM</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">1 tablet with dinner</p>
                    <div className="mt-2 text-sm">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded mr-2">9 days remaining</span>
                      <span className="inline-block px-2 py-1 bg-ayu-blue-light text-ayu-blue rounded">1 refill available</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" className="ml-auto ayu-button-primary">Mark as Taken</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ayu-blue-light flex items-center justify-center flex-shrink-0">
                    <Clock1 size={20} className="text-ayu-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Allergy Medication</h3>
                      <span className="text-sm text-ayu-blue font-medium bg-ayu-blue-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">Daily at 9:00 AM</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">1 tablet after breakfast</p>
                    <div className="mt-2 text-sm">
                      <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded mr-2">2 days remaining</span>
                      <span className="inline-block px-2 py-1 bg-ayu-blue-light text-ayu-blue rounded">3 refills available</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" className="ml-auto ayu-button-primary">Mark as Taken</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ayu-purple-light flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-ayu-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Multivitamin</h3>
                      <span className="text-sm text-ayu-purple font-medium bg-ayu-purple-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">Daily at 9:00 AM</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">1 tablet with breakfast</p>
                    <div className="mt-2 text-sm">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded mr-2">15 days remaining</span>
                      <span className="inline-block px-2 py-1 bg-ayu-blue-light text-ayu-blue rounded">2 refills available</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" className="ml-auto ayu-button-primary">Mark as Taken</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ayu-card">
            <h2 className="text-xl font-bold mb-4">Medication History</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className="font-semibold">Antibiotic</h3>
                      <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">Completed March 15, 2025</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">1 tablet three times daily for 10 days</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Renew Prescription</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="ayu-button-outline">View Full History</Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="ayu-card sticky top-6">
            <h2 className="text-xl font-bold mb-4">Set Reminders</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                <input 
                  type="text" 
                  placeholder="Enter medication name..." 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                <input 
                  type="text" 
                  placeholder="e.g., 1 tablet, 10ml..." 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent">
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="twice">Twice daily</option>
                  <option value="three">Three times daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input 
                  type="time" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea 
                  placeholder="Additional instructions..." 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
                  rows={3}
                ></textarea>
              </div>
              
              <Button className="w-full ayu-button-primary mt-2">Set Reminder</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medications;
