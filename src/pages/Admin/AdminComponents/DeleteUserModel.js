import React from "react";
import { deleteUser } from "../../../service/api";
import Modal from "../../Component/Model";

const DeleteUserModel = ({
  showDeleteModel,
  setDeleteModel,
  dataId,
  userList,
}) => {
  const DeleteUser = async (dataId) => {
    try {
      await deleteUser(dataId);
      console.log("Delete user is success");
      setDeleteModel(false);
      userList();
    } catch (error) {
      console.log("An error occurred");
    }
  };
  return (
    <Modal
      show={showDeleteModel}
      title={"WARNING"}
      height={"sm:h-1/5 xl:h-1/3"}
      width={"sm:w-1/4 xl:w-1/3"}
      content={
        <div className="flex flex-col items-center ">
          <p className="text-one">Are you sure you want to delete it?</p>
        </div>
      }
      onClose={() => setDeleteModel(false)}
      actions={[
        {
          label: "Close",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-one text-white text-l font-semibold h-8 rounded hover:bg-two shadow-md",
          onClick: () => {
            setDeleteModel(false);
          },
        },
        {
          label: "Delete",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-five text-white text-l font-semibold h-8 rounded hover:bg-four shadow-md",
          onClick: () => {
            DeleteUser(dataId);
          },
        },
      ]}
    />
  );
};

export default DeleteUserModel;
