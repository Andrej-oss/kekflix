import Image  from "next/image";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../models/Inputs";
import useAuth from "../store/hooks/useAuth";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { signIn, signUp } = useAuth();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Inputs> =  async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
      await axios.post("/api/stripe/customer", {email}).catch(e => setError(e.message))
    }
  };
  return (
      <div className="relative flex h-screen w-screen bg-black flex-col md:items-center md:justify-center md:bg-transparent">
        <Head>
          <title>kekflix</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Image
            src="https://rb.gy/p2hphi"
            layout="fill"
            className="-z-10 !hidden opacity-60 sm:!inline"
        />
        <img
            className="absolute cursor-pointer object-contain p-2 md:top-6 md:left-10"
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}/>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative mt-36 space-y-6 px-2 py-2 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <div className="flex flex-col space-y-2 text-white">
            <label className="inline-block w-full">
              <input type="email"
                     placeholder="Email"
                     className="input"
                     {...register('email', {required: true})}/>
              {errors.email && <p className="text-xs p-1 text-orange-400">This field is required</p>}
            </label>
            <label>
              <input type="password"
                     placeholder="Password"
                     className="input"
                     {...register('password', {required: true})}/>
              {errors.password && <p className="text-xs p-1 text-orange-400">This field is required</p>}
            </label>
          </div>
          <button type="submit"
                  onClick={() => setLogin(true)}
                  className="w-full font-semibold py-3 bg-[#e50914] rounded">
            Sign In
          </button>
          <div>
            New to Kekflix?
            <button onClick={() => setLogin(false)} className="text-gray-400 hover:underline">Sign Up</button>
          </div>
        </form>
      </div>
  );
}

export default Login;