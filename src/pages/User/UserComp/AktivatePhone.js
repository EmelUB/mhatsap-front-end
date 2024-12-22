import React, { useEffect, useState } from "react";
import { getActivateQr } from "../../../service/api";
import Modal from "../../Component/Model";
import { QRCodeCanvas } from "qrcode.react";

const AktivatePhone = ({
  showActivateModel,
  setActivateModel,
  dataToken,
  phonesList,
}) => {
  const [activateQrData, setActivateQrData] = useState();

  const ActivateQr = async () => {
    try {
      const response = await getActivateQr(dataToken);
      const parsedResponse =
        typeof response === "string" ? JSON.parse(response) : response;
      if (parsedResponse && parsedResponse.data.qr) {
        setActivateQrData(parsedResponse.data.qr);
      } else {
        console.error("QR is not found");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    setActivateQrData("");
    ActivateQr();
  }, [showActivateModel]);

  return (
    <Modal
      show={showActivateModel}
      title={"ACTIVATE"}
      height={"sm:h-1/2 xl:h-1/2"}
      width={"sm:w-1/2 xl:w-1/4"}
      content={
        <div className="flex justify-center items-center h-full">
          {activateQrData ? (
            <QRCodeCanvas value={activateQrData} size={180} />
          ) : (
            <p className="text-gray-500">QR kodu yükleniyor...</p>
          )}
        </div>
      }
      onClose={() => setActivateModel(false)}
      actions={[
        {
          label: "Close",
          type: "button",
          outline: true,
          className:
            "w-1/3 bg-gradient-to-r bg-one text-white text-l font-semibold h-8 rounded hover:bg-two shadow-md",
          onClick: () => {
            setActivateModel(false);
            phonesList();
          },
        },
      ]}
    />
  );
};

export default AktivatePhone;
