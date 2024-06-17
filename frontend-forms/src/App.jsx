import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {


  return (
    <>
     <Routes>
      
     <Route index element={<HomePage/>}/>
     <Route path="/form/:formType" element={<FormPage />} />
    
      </Routes> 
      </>
  )
}

export default App
