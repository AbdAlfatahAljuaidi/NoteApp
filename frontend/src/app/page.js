'use client'
import React,{useState} from 'react'
import image from '@/../public/Pictures/Sign.jpg'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  
  const router = useRouter();


  const [username , setUsername]= useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [isLoading, setIsLoading] = useState(false);


  const SignUp = async () => {
    try{
      setIsLoading(true);
      
const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/signup`,{
  username,
  email,
  password
})
if(data.error==false){
  console.log("sucess");
  toast.success("User signup succesffuly")
  setIsLoading(false);

  
router.push('/login');
}
    }catch(error){

      if(error.response.data.message){
        toast.error(error.response.data.message)
        setIsLoading(false);
      }else{
        toast.error("User signup faild")
        setIsLoading(false);
      }
    }
  }

  return (
    <section
      className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image.src})` }}
    >
      {/* ✅ خلفية شفافة زجاجية فعليًا */}
      <div className="rounded-3xl bg-white/90   p-8 ">
        <h1 className="text-blue-500 text-center text-4xl font-bold">Sign Up</h1>

        <input
          placeholder="UserName"
          type="text"
          className="border border-black block mt-9 w-[300px] rounded-xl p-2  focus:bg-white/70"
          onChange={(e)=>setUsername(e.target.value)} 
        />
        <input
          placeholder="Email"
          type="text"
          className="border border-black block mt-5 w-[300px] rounded-xl p-2  focus:bg-white/70"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="border border-black block mt-5 w-[300px] rounded-xl p-2  focus:bg-white/70"
          onChange={(e)=>setPassword(e.target.value)}
        />
        
<div className="text-center mt-4">
  <span className="text-gray-600">Already have an account? </span>
  <Link href="/login" className="text-blue-600 hover:underline">
    Login
  </Link>
</div>

        <div className="flex justify-center">
          <button disabled={isLoading} className={`bg-blue-500  text-white rounded-lg py-2 px-7 mt-6 hover:bg-blue-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' :'hover:cursor-pointer'}`} onClick={SignUp}>
          {isLoading ? 'Signing up' : "Sign up"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Page
