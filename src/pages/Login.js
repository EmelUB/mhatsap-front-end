import React, { useState } from "react";
import loginBg from "./../asset/login-bg.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../service/api";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getUserInfo = async () => {
    try {
      const userData = await getUser();
      return userData.data?.is_admin;
    } catch (error) {
      console.error("Kullanıcı bilgileri alınırken bir hata oluştu:", error);
    }
  };

  const onSubmit = async (data) => {
    const credentials = {
      username: data.username,
      password: data.password,
    };
    try {
      setLoading(true);
      const response = await login(credentials);
      console.log("response", response);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);

        const isAdmin = await getUserInfo();
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (error) {
      console.error("Giriş işlemi başarısız oldu:", error);
    } finally {
      setLoading(false); // Yükleniyor durumu kapat
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="sm:w-1/3 sm:h-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-lg shadow-white/30 flex flex-col justify-center">
        <h1 className="text-center text-two font-semibold text-2xl mb-6">
          LOGIN
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7 justify-center"
        >
          <div>
            <input
              type="text"
              {...register("username", { required: "Enter user name" })}
              placeholder="User Name"
              className="rounded-12 justify-items-start w-full px-2.5 text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two focus:border-one focus:bg-transparent"
            />
            {errors.username && (
              <p className="text-five text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: "Enter password" })}
              placeholder="Password"
              className="rounded-12 justify-items-start w-full px-2.5 text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two text-two focus:border-one"
            />
            {errors.password && (
              <p className="text-five text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-one to-two text-white text-l font-semibold h-14 rounded-xl hover:from-two hover:to-three shadow-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
