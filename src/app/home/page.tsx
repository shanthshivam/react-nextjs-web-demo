'use client'
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState, FormEvent} from "react";
import styles from '@/app/home/home.module.css';

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') as string;
  const email = searchParams.get('email') as string;
  const [fname,setFname] = useState(''); 
  const [sname,setSname] = useState(''); 
  const [age,setAge] = useState(''); 
  const [year,setYear] = useState(''); 
 
 
   async function onSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('http://localhost:8088/lgri/api/details', {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name,email,fname, sname, age, year}),
    });

    const user = await response.json()
    
    // router.push('/home?' + 'name='+name + '&email='+email);

  };

 
  return (
    <div className={styles.loginform}>
      <p>Hello, {name} Welcome ! </p>
       <p> Your email is {email} ! </p>
      <p>Please register with all the details below </p>
      
      <a href="insurancequote"> Click here to provide a quote for Car Insurance</a>
      
      <h1>Details Form</h1>
      <form onSubmit={onSubmit}>
        <input  type="hidden"  name="name"  value = {name} />
        <input  type="hidden"  name="email"  value = {email} />
        <input  type="text"  name="fname"  placeholder= "First Name" value = {fname} onChange={(e) => setFname(e.target.value)} />
        <input  type="text"  name="sname"  placeholder= "Sur Name" value = {sname} onChange={(e) => setSname(e.target.value)}/>
        <input  type="text"  name="age"  placeholder= "Age" value = {age} onChange={(e) => setAge(e.target.value)}/>
        <input  type="text"  name="year"  placeholder= "Year" value = {year} onChange={(e) => setYear(e.target.value)}/>
        <button type="submit" >Submit</button>
      </form>
	  </div>

  );
};

export default Home;