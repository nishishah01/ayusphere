
import Dashboard from "@/components/Dashboard";
import MedicalHistory from "@/components/MedicalHistory";
import Appointments from "@/components/Appointments";
import Medications from "@/components/Medications";

interface IndexProps {
  section?: "history" | "appointments" | "medications";
}

const Index = ({ section }: IndexProps) => {
  // Render different sections based on the prop
  const renderSection = () => {
    switch (section) {
      case "history":
        return <MedicalHistory />;
      case "appointments":
        return <Appointments />;
      case "medications":
        return <Medications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-full">
      {renderSection()}
    </div>
  );
};

export default Index;
