import React from "react";
import Modal from "../../Component/Model";
import { postAddPhone } from "../../../service/api";
import { useForm } from "react-hook-form";

const AddPhoneModel = ({ showAddModel, setAddModel, phonesList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addPhone(data);
  };

  const addPhone = async (data) => {
    const credentials = {
      phone: data.phone,
      title: data.title,
    };
    try {
      await postAddPhone(credentials);
      console.log("Adding user is success");
      setAddModel(false);
      phonesList();
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <Modal
      show={showAddModel}
      title={"ADD PHONE"}
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
                {...register("title", { required: "Enter title" })}
                placeholder={"Title"}
                className={`rounded-12 justify-items-start w-full px-2.5 text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two focus:border-one xl:w-96`}
              />
              {errors.title && (
                <p className="text-five text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <input
                type={"phone"}
                {...register("phone", {
                  required: "Enter phone",
                })}
                placeholder={"09xxxxxxxxxx"}
                className={`rounded-12 justify-items-start w-full px-2.5 text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two text-two focus:border-one xl:w-96`}
                onChange={() => {}}
              />
              {errors.phone && (
                <p className="text-five text-sm mt-1">{errors.phone.message}</p>
              )}
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

export default AddPhoneModel;
