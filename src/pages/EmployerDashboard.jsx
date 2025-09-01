import React,{useEffect,useState} from 'react';
import axios from 'axios';
function EmployerDashboard(){
const [jobs,setJobs]=useState([]);
const [title,setTitle]=useState(''); const [desc,setDesc]=useState('');
const fetchJobs=async()=>{const res=await axios.get('https://talenthub-backend-bhrj.onrender.com/jobs',{headers:{Authorization:'Bearer '+localStorage.getItem('token')}}); setJobs(res.data);};
useEffect(()=>{fetchJobs();},[]);
const createJob=async()=>{await axios.post('https://talenthub-backend-bhrj.onrender.com/jobs',{title,description:desc},{headers:{Authorization:'Bearer '+localStorage.getItem('token')}}); fetchJobs();};
return <div className="max-w-md mx-auto mt-10 space-y-4">
<h1 className="text-2xl font-bold">Employer Dashboard</h1>
<input className="border p-2 w-full" placeholder="Job Title" value={title} onChange={e=>setTitle(e.target.value)}/>
<textarea className="border p-2 w-full" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)}></textarea>
<button className="bg-blue-600 text-white px-4 py-2" onClick={createJob}>Create Job</button>
<h2 className="text-xl font-bold mt-4">Your Jobs</h2>
<ul>{jobs.map(j=><li key={j.id} className="border p-2 my-2">{j.title}</li>)}</ul>
</div>;
}
export default EmployerDashboard;