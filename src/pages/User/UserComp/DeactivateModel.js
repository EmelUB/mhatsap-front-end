import React from "react";
import { getDeactivatePhone } from "../../../service/api";
import Modal from "../../Component/Model";

const DeactivateModel = ({
  deactivateModel,
  setDeactivateModel,
  dataToken,
  phonesList,
}) => {
  const deactivatePhone = async () => {
    try {
      await getDeactivatePhone(dataToken);
      phonesList();
      setDeactivateModel(false);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <Modal
      show={deactivateModel}
      title={"ACTIVATE"}
      height={"sm:h-1/2 xl:h-1/2"}
      width={"sm:w-1/2 xl:w-1/4"}
      content={
        <div className="flex justify-center items-center h-full">
          Are you sure to deactivate it?
        </div>
      }
      onClose={() => setDeactivateModel(false)}
      actions={[
        {
          label: "Close",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-one text-white text-l font-semibold h-8 rounded hover:bg-two shadow-md",
          onClick: () => {
            setDeactivateModel(false);
          },
        },
        {
          label: "Deactivate",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-five text-white text-l font-semibold h-8 rounded hover:bg-four shadow-md",
          onClick: () => {
            deactivatePhone();
          },
        },
      ]}
    />
  );
};

export default DeactivateModel;
