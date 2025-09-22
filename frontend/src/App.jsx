import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UserProvider, { UserContext } from "./context/UserContext";
import Dashboard from "./pages/Dashboard.jsx";
import EditResume from "./components/EditResume.jsx";
import { Toaster } from "react-hot-toast";



const AppRoutes = () => {
  const { loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  return (
    <>

    <Routes>
      <Route path="/" element={< LandingPage />} />
      {/* Add more routes here */}
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/resume/:resumeId' element={<EditResume/>} />
    </Routes>

        {/* Global toaster notifications */}
      <Toaster 
        toastOptions={{
          className: "",
          style: { fontSize: "13px" }
        }}
      />
    </>
  );
};

const App = () => (
  <UserProvider>
      <AppRoutes />
  </UserProvider>
);

export default App;
