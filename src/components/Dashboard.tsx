import { useState } from "react";
import { Button } from "@/components/ui/button";
import SOSAlert from "./SOSAlert";
import { Link } from "react-router-dom";
import { FileText, Clock, Download, MessageSquare, X } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const answers: { [key: string]: string } = {
    "How to book an appointment?": "Go to the Appointments section and click on 'Book Appointment'.",
    "How to upload medical history?": "Visit the Medical History section and use the upload feature.",
    "How to add a new medication?": "Navigate to the Medications section and click 'Add Medication'.",
    "What is AyuSphere?": "AyuSphere is your personal health management platform.",
    "How can I track my blood pressure?": "You can manually log blood pressure under Health Overview or connect wearable devices.",
    "Can I set medication reminders?": "Yes, reminders are available in the Medications section after adding your prescriptions.",
    "How to contact my assigned doctor?": "Visit the Appointments or Doctor section and click on the profile to find contact options.",
    "Is my data secure?": "Absolutely. All your data is encrypted and stored securely.",
  };

  const healthData = [
    { name: 'Jan', bloodPressure: 120, heartRate: 72 },
    { name: 'Feb', bloodPressure: 118, heartRate: 70 },
    { name: 'Mar', bloodPressure: 122, heartRate: 75 },
    { name: 'Apr', bloodPressure: 119, heartRate: 68 },
    { name: 'May', bloodPressure: 121, heartRate: 73 },
    { name: 'Jun', bloodPressure: 117, heartRate: 71 },
  ];

  const chartConfig = {
    bloodPressure: {
      label: "Blood Pressure",
      color: "hsl(var(--ayu-purple))",
    },
    heartRate: {
      label: "Heart Rate",
      color: "hsl(var(--ayu-blue))",
    },
  };
  

  return (
    <div className="space-y-8 relative">
      {/* Floating Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-ayu-purple text-white p-3 rounded-full shadow-lg hover:bg-ayu-blue transition"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        {showChatbot ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {showChatbot && (
        <div className="fixed bottom-20 right-6 z-50 bg-white border border-gray-200 shadow-lg rounded-lg w-80 h-[400px] flex flex-col justify-between">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-green-400 mb-2">Need Help?</h2>
            <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              className="w-full p-2 border rounded mb-3 text-sm"
            >
              <option value="">Select a question...</option>
              {[
                "How to book an appointment?",
                "How to upload medical history?",
                "How to add a new medication?",
                "What is AyuSphere?",
                "How can I track my blood pressure?",
                "Can I set medication reminders?",
                "How to contact my assigned doctor?",
                "Is my data secure?",
              ].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            {selectedQuestion && (
              <div className="text-sm text-gray-700 bg-ayu-gray-light p-3 rounded">
                {answers[selectedQuestion] || "We're working on this answer!"}
              </div>
            )}
          </div>

          {/* Type here box */}
          <div className="border-t border-gray-200 p-3">
            <input
              type="text"
              placeholder="Type here..."
              className="w-full p-2 text-sm border rounded focus:outline-none focus:ring focus:border-green-600"
            />
          </div>
        </div>
      )}


      {/* Original Content Below */}
      <div className="ayu-card">
        <h1 className="text-2xl font-bold">Welcome to AyuSphere</h1>
        <p className="mt-2 text-gray-500">Your personal health management platform</p>
      </div>

      <SOSAlert className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="ayu-card">
          <h2 className="text-lg font-semibold">Medical History</h2>
          <p className="mt-2 text-gray-500">Access and manage your complete medical records</p>
          <Link to="/history">
            <Button className="mt-4 ayu-button-primary">
              <FileText size={18} />
              View Records
            </Button>
          </Link>
        </div>

        <div className="ayu-card">
          <h2 className="text-lg font-semibold">Appointments</h2>
          <p className="mt-2 text-gray-500">Schedule and keep track of your doctor visits</p>
          <Link to="/appointments">
            <Button className="mt-4 ayu-button-secondary">
              <Clock size={18} />
              Book Appointment
            </Button>
          </Link>
        </div>

        <div className="ayu-card">
          <h2 className="text-lg font-semibold">Medications</h2>
          <p className="mt-2 text-gray-500">Manage your prescriptions and medication schedule</p>
          <Link to="/medications">
            <Button className="mt-4 ayu-button-outline">View Medications</Button>
          </Link>
        </div>
      </div>

      <div className="ayu-card">
        <h2 className="text-lg font-semibold">Health Overview</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium">Upcoming Appointments</h3>
            <p className="text-2xl font-bold mt-2 text-ayu-purple">2</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium">Active Medications</h3>
            <p className="text-2xl font-bold mt-2 text-ayu-blue">3</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium">Recent Updates</h3>
            <p className="text-2xl font-bold mt-2 text-ayu-purple">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 ayu-card">
          <h2 className="text-lg font-semibold mb-4">Health Metrics</h2>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="bloodPressure" 
                stroke="hsl(var(--ayu-purple))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--ayu-purple))" }}
              />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="hsl(var(--ayu-blue))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--ayu-blue))" }}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="ayu-card">
          <h2 className="text-lg font-semibold mb-4">Personalized Tips</h2>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <h3 className="font-medium text-green-800">Blood Pressure</h3>
              <p className="text-sm text-green-700 mt-1">Your BP is stable! Keep up with regular exercise and reduce salt intake.</p>
            </div>
            
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <h3 className="font-medium text-blue-800">Heart Rate</h3>
              <p className="text-sm text-blue-700 mt-1">Great heart rate! Consider 30 minutes of cardio daily to maintain this.</p>
            </div>
            
            <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
              <h3 className="font-medium text-purple-800">Today's Reminder</h3>
              <p className="text-sm text-purple-700 mt-1">Take your morning medication and drink 8 glasses of water.</p>
            </div>
            
            <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
              <h3 className="font-medium text-orange-800">Weekly Goal</h3>
              <p className="text-sm text-orange-700 mt-1">Complete 3 yoga sessions and track your mood daily.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
