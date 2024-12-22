import React from "react";
import { useForm } from "react-hook-form";
import { postAddUser } from "../../../service/api";
import Modal from "../../Component/Model";

const AddUserModel = ({ showAddModel, setAddModel, userList }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addUser = async (data) => {
    const credentials = {
      username: data.username,
      password: data.password,
    };
    try {
      await postAddUser(credentials);
      console.log("Adding user is success");
      setAddModel(false);
      userList();
      reset();
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const onSubmit = (data) => {
    addUser(data);
  };

  return (
    <Modal
      show={showAddModel}
      title={"ADD USER"}
      height={"sm:h-1/2 xl:h-1/2"}
      width={"sm:w-1/4 xl:w-1/3"}
      content={
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7 justify-center items-center"
          >
            <div>
              <input
                type={"text"}
                {...register("username", { required: "Enter user name" })}
                placeholder={"User Name"}
                className={`rounded-12 justify-items-start w-full px-2.5 text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two focus:border-one xl:w-96`}
              />
              {errors.username && (
                <p className="text-five text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                type={"password"}
                {...register("password", {
                  required: "Enter password",
                })}
                placeholder={"Password"}
                className={`rounded-12 justify-items-start w-full px-2.5 text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two text-two focus:border-one xl:w-96`}
              />
              {errors.password && (
                <p className="text-five text-sm mt-1">
                  {errors.password.message}
                </p>
              )}{" "}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r bg-one text-white text-l font-semibold h-14 rounded-xl hover:bg-two shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      }
      onClose={() => setAddModel(false)}
    />
  );
};

export default AddUserModel;
