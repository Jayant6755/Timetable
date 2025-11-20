import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Users,
  BookOpen,
  Building2,
  Calendar,
  LogOut,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axios from "axios";


interface Period {
  subject: string;
  time: string;
}

interface TeachersInfo{
  name: string;
  subject: string;
  classes: string;
}

interface subjectInfo{
  credit: number;
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



export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("teachers");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(!token) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }
  });

  const tabs = [
    { id: "teachers", label: "Madam", icon: <Users size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "classrooms", label: "Classrooms", icon: <Building2 size={20} /> },
    { id: "timetable", label: "Generate Timetable", icon: <Calendar size={20} /> },
  ];

  const Logout = ()=>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-blue-800 text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <h1
            className={`text-xl font-bold tracking-wide ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin Panel
          </h1>
          <button
            className="p-2 rounded-md hover:bg-blue-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-2 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600"
                  : "hover:bg-blue-700 text-blue-100"
              }`}
            >
              {tab.icon}
              <span
                className={`text-sm font-medium ${
                  sidebarOpen ? "block" : "hidden"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700 flex items-center justify-between ">
          <button className="hover:text-gray-200  flex gap-4 items-center cursor-pointer justify-center">
            <LogOut size={20} onClick={Logout} className="cursor-pointer"/> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white p-4 shadow-sm sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {activeTab.replace("_", " ")}
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="p-6 space-y-6">
          {activeTab === "teachers" && <Teachers />}
          {activeTab === "courses" && <Courses />}
          {activeTab === "classrooms" && <Classrooms />}
          {activeTab === "timetable" && <Timetable />}
        </section>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Teachers() {
  const teachers = [
    { id: 1, name: "Dr. Radha Sharma", subject: "Physics", experience: "8 yrs" },
    { id: 2, name: "Ms. Anjali Mehta", subject: "Mathematics", experience: "5 yrs" },
    { id: 3, name: "Mr. Rahul Verma", subject: "Computer Science", experience: "6 yrs" },
  ];

  const [Teachers , setTeachers] = useState<TeachersInfo[]>([]);
  const [name, setname] = useState("");
   const [subject, setsubject] = useState("");
    const [classes, setclasses] = useState("");

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    const teachers = {
      name, 
      subject,
      classes
    };

    try {
   
    
    await fetch('http://localhost:5000/api/teacherInfo', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teachers)
    });

    alert("Teacher added successfully");
    setname("");
    setsubject("");
    setclasses("");
  }
  catch(error){
    console.error("Error submitting form", error);
    alert("Failed to add Teacher");

  }

  };

  useEffect(()=>{
    const fetchTeachers = async ()=>{
      try {
        const tuto = await fetch("http://localhost:5000/api/teacherInfo");
        if(!tuto) throw new Error("Failed to fetch teachers data");
        const data = await tuto.json();
        setTeachers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeachers();
  }, [handleSubmit]);

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
              <tr  className="border-b  hover:bg-gray-50 transition-colors">
                
                <td className="px-4 py-2 font-medium">{t.name}</td>
                <td className="px-4 py-2">{t.subject}</td>
                <td className="px-4 py-2">{t.classes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Dialog>
      
        <DialogTrigger asChild>
          <Button variant="outline">Add Teachers +</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Teachers Information</DialogTitle>
           
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" onChange={(e) => setname(e.target.value)}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Subjects</Label>
              <Input id="username-1" name="username" onChange={(e) => setsubject(e.target.value)} placeholder="Eg. Mobile Computing" />
            </div>
             <div className="grid gap-3">
              <Label htmlFor="username-1">Classes</Label>
              <Input id="username-1" name="username" onChange={(e) => setclasses(e.target.value)} placeholder="Eg. 3rd-4th Year" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      
    </Dialog>
      </div>
    </div>
  );
}

function Courses() {
  const courses = [
    { code: "PHY101", name: "Physics Fundamentals", credits: 4 },
    { code: "MAT201", name: "Calculus II", credits: 3 },
    { code: "CSE305", name: "Data Structures", credits: 3 },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Available Courses</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.code}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-2">{c.name}</h4>
            <p className="text-gray-600">Code: {c.code}</p>
            <p className="text-gray-600">Credits: {c.credits}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Classrooms() {
  const rooms = [
    { id: 1, name: "Room A101", capacity: 40 },
    { id: 2, name: "Room B204", capacity: 35 },
    { id: 3, name: "Lab C310", capacity: 25 },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Classrooms</h3>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {rooms.map((r) => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <h4 className="font-bold text-lg text-gray-800">{r.name}</h4>
            <p className="text-gray-600">Capacity: {r.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timetable() {
  const [subjects, setSubjects] = useState<string[]>(Array(7).fill(""));
  const [credit, setCredit] = useState<number[]>(Array(7).fill(""));
  const [timetable1, setTimetable1] = useState<DaySchedule[] | null>(null);
  const [timetable2, setTimetable2] = useState<DaySchedule[] | null>(null);
  

  const API = "http://localhost:5000/api";

  const generateFirstTimetable = async () => {
    try {

      const subjectsInfo = subjects.map((subj, i)=> ({
        subject : subj,
        credit: credit[i]
      }));
      console.log(subjectsInfo);
      const res = await axios.post(`${API}/generate-first`, {subject : subjectsInfo});
      
      console.log(res.data.timetable)
     setTimetable1(res.data.timetable);
      setTimetable2(null);
    } catch (error) {
      console.error(error);
      alert("Error generating first timetable");
    }
  };

  

  const generateSecondTimetable = async () => {
    if (!timetable1) {
      alert("Generate first timetable first!");
      return;
    }

    try {
      const res = await axios.post(`${API}/generate-new`, {
        firstTimetable: timetable1,
        subjects,
      });

      setTimetable2(res.data.timetable);
    } catch (error) {
      console.error(error);
      alert("Error generating second timetable");
    }
  };

  // Render helper
  const renderTable = (timetable: DaySchedule[]) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-gray-400 text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Day</th>
            {periodTimes.map((t, i) => (
              <th key={i} className="border px-4 py-2">
                Period {i + 1}
                <br />
                <span className="text-sm">{t}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((day, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2 font-semibold">{day.day}</td>
              {day.periods.map((p, j) => (
                <td key={j} className="border px-4 py-2">
                  {p.subject}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
     <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Final Year(CSE) TimeTable</h1>

      {/* SUBJECT INPUT BOXES */}
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {subjects.map((subj, i) => (
          <div className="flex gap-5">
          <input
            key={i}
            type="text"
            placeholder={`Subject ${i + 1}`}
            className={`border p-2 rounded ${
              i < 3 ? "border-blue-700" : "border-gray-500"
            }`}
            value={subj}
            onChange={(e) => {
              const newSubjects = [...subjects];
              newSubjects[i] = e.target.value;
              setSubjects(newSubjects);
            }}
          />
          
          {/* Subject Credits */}
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Credits"
        className="border p-2 rounded border-green-600"
        value={credit[i]}
        onChange={(e) => {
          const newCredit = [...credit];
          newCredit[i] = parseInt(e.target.value) || 0;
          setCredit(newCredit);
        }}
      />
          
          </div>
          
          
        ))}
    
        
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={generateFirstTimetable}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Generate Timetable
        </button>

        {timetable1 && (
          <button
            onClick={generateSecondTimetable}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Generate Timetable for Batch-2
          </button>
        )}
      </div>
         
      {/* Render Timetable */}
      {timetable1 && (
        <>
          <h2 className="text-2xl font-semibold mb-2">📅 Batch-1 Timetable</h2>
          {renderTable(timetable1)}
        </>
      )}

      {timetable2 && (
        <>
          <h2 className="text-2xl font-semibold mb-2">📅 Batch-2 Timetable</h2>
          {renderTable(timetable2)}
        </>
      )}
    </div>
  );
}
