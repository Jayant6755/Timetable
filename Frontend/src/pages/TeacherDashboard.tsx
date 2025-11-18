import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Calendar,
  BookOpen,
  Users,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem("token");

     if(!token) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }
  });

  const Logout = ()=>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  }

  const tabs = [
    { id: "schedule", label: "My Schedule", icon: <Calendar size={20} /> },
    { id: "courses", label: "Assigned Courses", icon: <BookOpen size={20} /> },
    { id: "students", label: "Students", icon: <Users size={20} /> },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-blue-700 text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <h1
            className={`text-xl font-bold tracking-wide ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Teacher Panel
          </h1>
          <button
            className="p-2 rounded-md hover:bg-blue-600"
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
                  : "hover:bg-blue-600 text-blue-100"
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

        <div className="p-4 border-t border-blue-600 flex items-center justify-between">
          <button className="flex items-center gap-2 hover:text-gray-200">
            <Settings size={20} />
            {sidebarOpen && <span className="text-sm">Settings</span>}
          </button>
          <button className="hover:text-gray-200">
            <LogOut size={20} onClick={Logout} className="cursor-pointer"/>
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
              src="https://i.pravatar.cc/40?img=8"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="p-6 space-y-6">
          {activeTab === "schedule" && <MySchedule />}
          {activeTab === "courses" && <AssignedCourses />}
          {activeTab === "students" && <MyStudents />}
          {activeTab === "profile" && <TeacherProfile />}
        </section>
      </main>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function MySchedule() {
  const schedule = [
    { day: "Monday", subject: "Physics", time: "10:00 - 11:30", room: "A101" },
    { day: "Wednesday", subject: "Mathematics", time: "11:30 - 1:00", room: "B204" },
    { day: "Friday", subject: "Computer Science", time: "9:00 - 10:30", room: "C310" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">My Schedule</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Room</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 font-medium">{s.day}</td>
                <td className="px-4 py-2">{s.subject}</td>
                <td className="px-4 py-2">{s.time}</td>
                <td className="px-4 py-2">{s.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssignedCourses() {
  const courses = [
    { code: "PHY101", name: "Physics Fundamentals", students: 45 },
    { code: "MAT201", name: "Calculus II", students: 38 },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Assigned Courses</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div
            key={c.code}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-2">{c.name}</h4>
            <p className="text-gray-600">Course Code: {c.code}</p>
            <p className="text-gray-600">Enrolled Students: {c.students}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyStudents() {
  const students = [
    { id: 1, name: "Rohit Kumar", course: "Physics" },
    { id: 2, name: "Neha Singh", course: "Calculus II" },
    { id: 3, name: "Aman Gupta", course: "Data Structures" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">My Students</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{s.id}</td>
                <td className="px-4 py-2 font-medium">{s.name}</td>
                <td className="px-4 py-2">{s.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeacherProfile() {
  const profile = {
    name: "Dr. Radha Sharma",
    subject: "Physics",
    experience: "8 years",
    email: "radha.sharma@college.edu",
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">My Profile</h3>
      <div className="bg-white rounded-lg shadow p-6 space-y-3">
        <p><span className="font-semibold">Name:</span> {profile.name}</p>
        <p><span className="font-semibold">Subject:</span> {profile.subject}</p>
        <p><span className="font-semibold">Experience:</span> {profile.experience}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
      </div>
    </div>
  );
}
 