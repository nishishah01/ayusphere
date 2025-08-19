import { Bell, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const dummyNotifications = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Appointment",
    message: "You have an appointment with Dr. Sarah Lee tomorrow at 10:00 AM.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "report",
    title: "New Medical Report",
    message: "Your medical report from Dr. Michael Chen is now available.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    type: "reminder",
    title: "Follow-up Reminder",
    message: "Don’t forget to schedule your follow-up appointment with Dr. Wilson.",
    time: "3 days ago",
    read: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="space-y-8">
      <div className="ayu-card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button className="ayu-button-primary">Mark All as Read</Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`ayu-card border ${notif.read ? "border-gray-100" : "border-ayu-purple-light"} relative`}
          >
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 mt-1">
                {notif.type === "appointment" && (
                  <Bell size={20} className="text-ayu-purple" />
                )}
                {notif.type === "report" && (
                  <CheckCircle size={20} className="text-ayu-blue" />
                )}
                {notif.type === "reminder" && (
                  <AlertCircle size={20} className="text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">{notif.title}</h3>
                <p className="text-sm text-gray-600">{notif.message}</p>
                <span className="text-xs text-gray-400">{notif.time}</span>
              </div>
              {!notif.read && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markAsRead(notif.id)}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
