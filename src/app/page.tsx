'use client';
import { useState, FormEvent } from 'react'
import Image from "next/image";
import styles from "@/app/page.module.css";
 import { useRouter, usePathname, useSearchParams } from 'next/navigation';


 export interface UserDetail{
  name : string;
  email: string;
  fname: string;
  sname: string;
  age: number;
  year: number;
 }

 const Login =() => {

  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // const params = new URLSearchParams(searchParams.toString())

    const formData = new FormData(event.currentTarget)
    const response = await fetch('http://localhost:8088/lgri/api/login', {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name,email}),
    });

    const user = await response.json()
    // router.push({
    //   pathname: '/home',
    //   query: { name: user.name, email: user.email }
    // });
    // window.history.pushState(null, '', `?${params.toString()}`)

    router.push('/home?' + 'name='+name + '&email='+email);
 
  }

  return (
    <div className={styles.loginform}>
    <h1>Login Form</h1>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="email"
        placeholder="eMail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" >Login</button>
    </form>
  </div>
  );
};

export default Login;

