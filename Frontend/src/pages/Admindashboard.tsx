import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Users,
  BookOpen,
  Calendar,
  LogOut,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

// ---------------- INTERFACES ----------------
interface Period {
  subject: string;
  time: string;
}

interface TeachersInfo {
  name: string;
  subject: string;
  classes: string;
}

interface DaySchedule {
  day: string;
  periods: Period[];
}

const periodTimes = [
  "09:30 AM - 10:20 AM",
  "10:20 AM - 11:10 AM",
  "11:10 AM - 12:00 AM",
  "02:00 PM - 02:50 PM",
  "02:50 PM - 03:40 PM",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ---------------- MAIN COMPONENT ----------------
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("teachers");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
  });

  const tabs = [
    { id: "teachers", label: "Teachers", icon: <Users size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "timetable", label: "Generate Timetable", icon: <Calendar size={20} /> },
  ];

  const Logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-blue-800 text-white flex flex-col transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <h1 className={`text-xl font-bold ${sidebarOpen ? "block" : "hidden"}`}>Admin Panel</h1>
          <button className="p-2 rounded-md hover:bg-blue-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-2 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id ? "bg-blue-600" : "hover:bg-blue-700 text-blue-100"
              }`}
            >
              {tab.icon}
              <span className={`text-sm font-medium ${sidebarOpen ? "block" : "hidden"}`}>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button className="hover:text-gray-200 flex gap-4 items-center cursor-pointer" onClick={Logout}>
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between bg-white p-4 shadow-sm sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">{activeTab.replace("_", " ")}</h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full border-2 border-blue-400" />
          </div>
        </header>

        <section className="p-6 space-y-6">
          {activeTab === "teachers" && <Teachers />}
          {activeTab === "courses" && <Courses />}
          {activeTab === "timetable" && <Timetable />}
        </section>
      </main>
    </div>
  );
}

// ---------------- TEACHERS COMPONENT ----------------
function Teachers() {
  const [Teachers, setTeachers] = useState<TeachersInfo[]>([]);
  const [name, setname] = useState("");
  const [subject, setsubject] = useState("");
  const [classes, setclasses] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = { name, subject, classes };

    try {
      await fetch("http://localhost:5000/api/teacherInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });

      alert("Teacher added successfully");
      setname("");
      setsubject("");
      setclasses("");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to add Teacher");
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/teacherInfo");
        const data = await res.json();
        setTeachers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">All Teachers</h3>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Classes</th>
            </tr>
          </thead>
          <tbody>
            {Teachers.map((t) => (
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{t.name}</td>
                <td className="px-4 py-2">{t.subject}</td>
                <td className="px-4 py-2">{t.classes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Teachers +</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Teachers Information</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setname(e.target.value)} required />
              </div>

              <div>
                <Label>Subject</Label>
                <Input value={subject} onChange={(e) => setsubject(e.target.value)} required />
              </div>

              <div>
                <Label>Classes</Label>
                <Input value={classes} onChange={(e) => setclasses(e.target.value)} required />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------- COURSES COMPONENT ----------------
function Courses() {
  const courseList = [
    "Disaster Management",
    "Innovation and Problem Solving",
    "Mobile Computing",
    "Project Management And Entrepreneurship",
    "Project Management",
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Courses Offered</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseList.map((course, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h4 className="text-lg font-medium text-gray-800">{course}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- TIMETABLE COMPONENT (Placeholder) ----------------
function Timetable() {
  return (
    <div className="text-gray-600 text-lg">Timetable generation will appear here.</div>
  );
}
