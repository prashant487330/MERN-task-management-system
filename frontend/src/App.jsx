import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashboard from "./admin/AdminDashboard";
import CreateUser from "./admin/CreateUser";
import AssignTask from "./admin/AssignTask";
import Reports from "./admin/Reports";
import EmployeeDashboard from "./employee/EmployeeDashboard";
import EmployeeTask from "./employee/EmployeeTask";
import CompletedTask from "./employee/CompletedTask";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="admindashboard" element={<AdminDashboard />}>
            <Route path="admindashboard" element={<AdminDashboard />} />
            <Route path="createuser" element={<CreateUser />} />
            <Route path="assigntask" element={<AssignTask />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="employeedashboard" element={<EmployeeDashboard />}>
            <Route path="employeetask" element={<EmployeeTask />} />
            <Route path="completedtask" element={<CompletedTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;