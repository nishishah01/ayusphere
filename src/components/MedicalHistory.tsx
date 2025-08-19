import { Button } from "@/components/ui/button";
import { Clock, User, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MedicalHistory = () => {
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!contentRef.current) return;

    toast({
      title: "Preparing PDF...",
      description: "Your medical history is being exported",
    });

    try {
      const content = contentRef.current;
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("medical-history.pdf");

      toast({
        title: "PDF Export Complete",
        description: "Your medical history has been exported successfully",
      });
    } catch (error) {
      console.error("PDF export failed:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your medical history",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (record: string) => {
    console.log("Viewing details for:", record);
    // Example: navigate to record details page or open modal
  };

  const handleDownloadReport = (record: string) => {
    console.log("Downloading report for:", record);
    // Example: generate and download the report (could use jsPDF, etc.)
    const doc = new jsPDF();
    doc.text(`Medical Report for ${record}`, 10, 10);
    doc.save(`${record}-report.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="ayu-card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medical History</h1>
          <div className="flex gap-3">
            <Button onClick={exportToPDF} className="flex items-center gap-2">
              <Download size={18} />
              Export to PDF
            </Button>
            <Button className="ayu-button-primary">Add Record</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="ayu-card">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-ayu-purple-light/70 text-ayu-purple rounded-lg font-medium">
                All Records
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Consultations
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Lab Results
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Vaccinations
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Surgeries
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Allergies
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Medications
              </button>
            </div>
          </div>

          <div className="ayu-card">
            <h2 className="text-lg font-semibold mb-4">Filter By Date</h2>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-ayu-purple-light/70 text-ayu-purple rounded-lg font-medium">
                All Time
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                This Year
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Last Year
              </button>
              <button className="w-full p-3 text-left hover:bg-ayu-purple-light/50 rounded-lg font-medium transition-colors">
                Custom Range
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4" ref={contentRef}>
          <div className="flex justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search records..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayu-purple focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Example Record 1 */}
            <div className="ayu-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ayu-purple-light flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-ayu-purple" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-semibold">Annual Physical Examination</h3>
                    <span className="text-sm text-ayu-purple font-medium bg-ayu-purple-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">
                      April 15, 2025
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Dr. Michael Chen - Primary Care</p>
                  <p className="text-sm mt-2">
                    Regular check-up with normal results. Blood pressure: 120/80, Heart rate: 72 bpm.
                    Recommended to continue current exercise routine and diet.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails("Annual Physical Examination")}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport("Annual Physical Examination")}
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Record 2 */}
            <div className="ayu-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ayu-blue-light flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-ayu-blue" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-semibold">Blood Test</h3>
                    <span className="text-sm text-ayu-blue font-medium bg-ayu-blue-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">
                      March 28, 2025
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">City Medical Laboratory</p>
                  <p className="text-sm mt-2">
                    Complete blood count, lipid panel, and metabolic panel. All values within normal ranges.
                    Vitamin D slightly below recommended levels.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails("Blood Test")}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport("Blood Test")}
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Record 3 */}
            <div className="ayu-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ayu-purple-light flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-ayu-purple" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-semibold">Dental Check-up</h3>
                    <span className="text-sm text-ayu-purple font-medium bg-ayu-purple-light/50 px-3 py-1 rounded-full mt-2 sm:mt-0">
                      February 10, 2025
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Dr. Sarah Lee - Dentist</p>
                  <p className="text-sm mt-2">
                    Routine cleaning and examination. No cavities found. Recommended to continue
                    flossing daily and brushing twice a day.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails("Dental Check-up")}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport("Dental Check-up")}
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="ayu-button-outline">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
