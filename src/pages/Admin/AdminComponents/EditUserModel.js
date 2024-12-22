import React, { useState } from "react";
import { putUser } from "../../../service/api";
import Modal from "../../Component/Model";

const EditUserModel = ({ showEditModel, setEditModel, dataId, userList }) => {
  const [value, setValue] = useState(0);

  const editUser = async (dataId) => {
    const credentials = {
      limit: value,
    };
    try {
      await putUser(credentials, dataId);
      console.log("Edit user success");
      setEditModel(false);
      userList();
    } catch (error) {
      console.log("An error occurred");
    }
  };

  const handleChange = (e) => setValue(Number(e.target.value));
  return (
    <Modal
      show={showEditModel}
      title={"EDIT USER"}
      height={"sm:h-1/5 xl:h-1/3"}
      width={"sm:w-1/4 xl:w-1/3"}
      content={
        <div className="flex items-center">
          <input
            type="number"
            value={value}
            onChange={handleChange}
            className="text-center border border-gray-300 rounded px-2 py-1 w-full xl:w-72"
            min={0}
          />
          {/* <button
          onClick={handleIncrement}
          className="px-3 py-1 bg-three text-white rounded"
        >
          ↑
        </button>
        <button
          onClick={handleDecrement}
          className="px-3 py-1 bg-five text-white rounded"
        >
          ↓
        </button> */}
        </div>
      }
      onClose={() => setEditModel(false)}
      actions={[
        {
          label: "Save",
          type: "button",
          outline: true,
          className:
            "w-1/2 bg-gradient-to-r bg-one text-white text-l font-semibold h-8 rounded hover:bg-two shadow-md",
          onClick: () => {
            editUser(dataId);
          },
        },
      ]}
    />
  );
};

export default EditUserModel;
