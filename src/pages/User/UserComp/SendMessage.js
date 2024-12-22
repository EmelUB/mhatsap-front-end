import React from "react";
import { postSendMessage } from "../../../service/api";
import { useForm } from "react-hook-form";
import Modal from "../../Component/Model";

const SendMessage = ({
  showSendMessageModel,
  setSendMessageModel,
  dataToken,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const sendMessage = async (data) => {
    const credentials = {
      action: {
        type: "text",
        message: data.messageText,
        numbers: data.receivePhone,
        token: dataToken,
      },
    };
    try {
      const response = await postSendMessage(credentials);
      console.log("Adding user is success");
      setSendMessageModel(false);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const onSubmit = (data) => {
    sendMessage(data);
  };
  return (
    <Modal
      show={showSendMessageModel}
      title={"SEND MESSAGE"}
      height={"sm:h-1/2 xl:h-1/2"}
      width={"sm:w-1/4 xl:w-1/3"}
      onClose={() => setSendMessageModel(false)}
      content={
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7 justify-center items-center"
          >
            <div>
              <textarea
                type={"text"}
                {...register("messageText", { required: "Enter title" })}
                placeholder={"Message Text"}
                className={`rounded-12 justify-items-start w-full h-12 px-2.5 text-sm font-medium placeholder-main bg-transparent  border border-two rounded-xl placeholder:text-two focus:border-one xl:w-96`}
                onChange={() => {}}
              />
              {errors.title && (
                <p className="text-five text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <input
                type={"phone"}
                {...register("receivePhone", {
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
    />
  );
};

export default SendMessage;
