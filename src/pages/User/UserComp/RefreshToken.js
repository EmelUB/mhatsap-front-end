import React from "react";
import { getRefreshToken } from "../../../service/api";
import Modal from "../../Component/Model";

const RefreshToken = ({
  refreshTokenModel,
  setRefreshTokenModel,
  dataToken,
  phoneNumber,
  phonesList,
}) => {
  const RefreshToken = async () => {
    try {
      const response = await getRefreshToken(dataToken);
      if (response.status === 200) {
        phonesList();
        setRefreshTokenModel(false);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <Modal
      show={refreshTokenModel}
      title={"REFRESH TOKEN"}
      height={"sm:h-1/2 xl:h-1/2"}
      width={"sm:w-1/2 xl:w-1/4"}
      content={
        <div className="flex items-center">
          <h6>Are you sure to refresh the token of {phoneNumber}?</h6>
        </div>
      }
      onClose={() => setRefreshTokenModel(false)}
      actions={[
        {
          label: "No",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-five text-white text-l font-semibold h-8 rounded hover:bg-two shadow-md",
          onClick: () => {
            setRefreshTokenModel(false);
          },
        },
        {
          label: "Yes",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-one text-white text-l font-semibold h-8 rounded hover:bg-four shadow-md",
          onClick: () => {
            RefreshToken(dataToken);
          },
        },
      ]}
    />
  );
};

export default RefreshToken;
