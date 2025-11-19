import { BrowserRouter, Routes, Route } from "react-router-dom";


import CardDemo from "./Loginpage/login";

import Hero from "./frontpage/hero";
import TeacherDemo from "./Loginpage/teacherlogin";


import AdminDashboard from "./pages/Admindashboard";
import TeacherDashboard from "./pages/TeacherDashboard";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>}/>
        
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/teacher" element={<TeacherDashboard/>}/>
        {/* <Route path="/teacher/form" element={<TeacherForm/>}/> */}
        
        <Route path="/adminlogin" element={<CardDemo/>} />
        <Route path="/teacherlogin" element={<TeacherDemo/>}/>
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
