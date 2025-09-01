import React,{useEffect,useState} from 'react';
import axios from 'axios';
function DeveloperDashboard(){
const [jobs,setJobs]=useState([]);
const fetchJobs=async()=>{const res=await axios.get('https://talenthub-backend-bhrj.onrender.com/jobs',{headers:{Authorization:'Bearer '+localStorage.getItem('token')}}); setJobs(res.data);};
useEffect(()=>{fetchJobs();},[]);
const apply=async(jobId)=>{await axios.post('https://talenthub-backend-bhrj.onrender.com/applications',{jobId},{headers:{Authorization:'Bearer '+localStorage.getItem('token')}}); alert('Applied');};
return <div className="max-w-md mx-auto mt-10 space-y-2">
<h1 className="text-2xl font-bold">Developer Dashboard</h1>
<ul>{jobs.map(j=><li key={j.id} className="border p-2 flex justify-between">{j.title}<button className="bg-green-600 text-white px-2" onClick={()=>apply(j.id)}>Apply</button></li>)}</ul>
</div>;
}
export default DeveloperDashboard;