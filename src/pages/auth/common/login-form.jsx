import React, { useState,useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";


import { loginUser } from "@/store/reducers/authSlice";
import { clearMessage } from "@/store/reducers/messageSlice";


const schema = yup
  .object({
    username: yup.string().required("username is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();



const LoginForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const { username, password } = data;
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Invalid credentials", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
 
 
  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="username"
        label="username"
        type="text"
        register={register}
        error={errors.username}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
