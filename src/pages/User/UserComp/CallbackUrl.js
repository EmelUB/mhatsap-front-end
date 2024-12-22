import React, { useState } from "react";
import Modal from "../../Component/Model";
import { putCallBackUrl } from "../../../service/api";

const CallbackUrl = ({
  showCallBackUrlModel,
  setShowCallBackUrl,
  dataToken,
  phonesList,
}) => {
  const [urlData, setUrlData] = useState("");

  const callbackUrl = async () => {
    const credentials = {
      action: { type: "text", callback_url: urlData, token: [dataToken] },
    };
    try {
      await putCallBackUrl(credentials);
      setShowCallBackUrl(false);
      phonesList();
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <Modal
      show={showCallBackUrlModel}
      title={"Callback URL"}
      height={"sm:h-1/2 xl:h-1/2"}
      width={"sm:w-1/2 xl:w-1/4"}
      content={
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Callback URL"
            value={urlData}
            onChange={(e) => setUrlData(e.target.value)}
            className={`rounded-12 justify-items-start w-full px-2.5  text-sm font-medium placeholder-main bg-transparent h-14 border border-two rounded-xl placeholder:text-two focus:border-one xl:w-72`}
          />
        </div>
      }
      onClose={() => setShowCallBackUrl(false)}
      actions={[
        {
          label: "Clear",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-five text-white text-l font-semibold h-8 rounded hover:bg-two shadow-md",
          onClick: () => {
            setUrlData("");
          },
        },
        {
          label: "Submit",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-one text-white text-l font-semibold h-8 rounded hover:bg-four shadow-md",
          onClick: () => {
            callbackUrl();
          },
        },
      ]}
    />
  );
};

export default CallbackUrl;
