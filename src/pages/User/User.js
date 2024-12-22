import React, { useEffect, useState } from "react";
import {
  getDeactivatePhone,
  getLogout,
  getPhonesList,
  getUser,
} from "../../service/api";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faEnvelopeCircleCheck,
  faGlobe,
  faLinkSlash,
  faQrcode,
  faRightToBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import loginBg from "./../../asset/login-bg.jpg";
import Table from "../Component/Table";
import { useForm } from "react-hook-form";
import AddPhoneModel from "./UserComp/AddPhoneModel";
import DeletePhoneModel from "./UserComp/DeletePhoneModel";
import SendMessage from "./UserComp/SendMessage";
import AktivatePhone from "./UserComp/AktivatePhone";
import RefreshToken from "./UserComp/RefreshToken";
import CallbackUrl from "./UserComp/CallbackUrl";
import DeactivateModel from "./UserComp/DeactivateModel";

const User = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [data, setData] = useState([]);
  const [dataToken, setDataToken] = useState([]);
  const [showDeleteModel, setDeleteModel] = useState(false);
  const [showActivateModel, setActivateModel] = useState(false);
  const [showSendMessageModel, setSendMessageModel] = useState(false); //sendMessage işlemini daha sonra test et
  const [showAddModel, setAddModel] = useState(false);
  const [deactivateModel, setDeactivateModel] = useState(false);
  const [showCallBackUrlModel, setShowCallBackUrl] = useState(false);
  const [refreshTokenModel, setRefreshTokenModel] = useState(false); //daha sonra kontrol et
  const [phoneNumber, setPhoneNumber] = useState("");

  const phonesList = async () => {
    const { data } = await getPhonesList();
    if (data) {
      setData(data);
    }
  };

  const GetCurrentUser = async () => {
    try {
      const response = await getUser();
      setUserInfo(response.data);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const logout = async () => {
    try {
      await getLogout();
      console.error("Logout is success");
      Navigate("/login");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const tableHeadersOne = [
    {
      label: "Title",
      value: "title",
      width: "220px",
    },
    {
      label: "Phone",
      value: "phone",
    },
    {
      label: "Api Token",
      value: "api_token",
      width: "500px",
    },
    {
      label: "Status",
      value: "status",
      width: "220px",
    },
    {
      label: "Operations",
      value: "",
      format: (item) => {
        return (
          <div className="w-full flex justify-around">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                setDeleteModel(true);
                setDataToken(item.api_token);
              }}
            />
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              onClick={() => {
                setSendMessageModel(true);
                setDataToken(item.api_token);
              }}
            />
            {item.status === "deactive" ? (
              <FontAwesomeIcon
                icon={faQrcode}
                onClick={() => {
                  setDataToken(item.api_token);
                  setActivateModel(true);
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faLinkSlash}
                onClick={() => {
                  setDataToken(item.api_token);
                  setDeactivateModel(true);
                }}
              />
            )}

            <FontAwesomeIcon
              icon={faArrowsRotate}
              onClick={() => {
                setDataToken(item.api_token);
                setPhoneNumber(item.phone);
                setRefreshTokenModel(true);
              }}
            />
            <FontAwesomeIcon
              icon={faGlobe}
              onClick={() => {
                setDataToken(item.api_token);
                setShowCallBackUrl(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    phonesList();
    GetCurrentUser();
  }, []);

  return (
    <div
      className="w-full bg-cover bg-center overflow-x-hidden h-screen flex flex-col justify-start items-start p-4 relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <header className="w-full h-1/6 flex justify-between bg-transparent">
        <h1 className="flex justify-center items-start text-one text-xl font-semibold h-fit">
          Welcome{" "}
          {userInfo?.username?.charAt(0).toUpperCase() +
            userInfo?.username?.slice(1)}
        </h1>
        <Link to={"/login"}>
          <button
            className="flex justify-center items-start text-one text-xl font-semibold cursor-pointer h-fit"
            onClick={() => logout()}
          >
            <span>
              Logout <FontAwesomeIcon icon={faRightToBracket} />
            </span>
          </button>
        </Link>
      </header>
      <div className="w-full">
        <h1 className="text-center text-one text-xl font-bold">USER LIST</h1>
      </div>
      <div className="w-full h-[600px] mt-4 ">
        <Table
          className={"tableOne overflow-scroll h-full"}
          columns={tableHeadersOne}
          data={data ? data : []}
        />
      </div>
      <footer className="text-white p-4 w-full h-1/6 flex items-center justify-end absolute bottom-0">
        <button
          type="submit"
          className="w-1/4 bg-gradient-to-r mr-3 bg-one text-white text-l font-semibold h-14 rounded-xl  hover:from-two hover:to-three shadow-md"
          onClick={() => {
            setAddModel(true);
          }}
        >
          Add
        </button>
      </footer>

      {/* send message */}

      <SendMessage
        showSendMessageModel={showSendMessageModel}
        setSendMessageModel={setSendMessageModel}
        dataToken={dataToken}
      />

      {/* addPhone  */}

      <AddPhoneModel
        showAddModel={showAddModel}
        setAddModel={setAddModel}
        phonesList={phonesList}
      />

      {/* activate Phone */}

      <AktivatePhone
        showActivateModel={showActivateModel}
        setActivateModel={setActivateModel}
        dataToken={dataToken}
        phonesList={phonesList}
      />

      {/* deactivate Phone */}

      <DeactivateModel
        deactivateModel={deactivateModel}
        setDeactivateModel={setDeactivateModel}
        dataToken={dataToken}
        phonesList={phonesList}
      />

      {/* Delete Phone */}

      <DeletePhoneModel
        showDeleteModel={showDeleteModel}
        setDeleteModel={setDeleteModel}
        dataToken={dataToken}
        phonesList={phonesList}
      />

      {/* Refresh Token */}

      <RefreshToken
        refreshTokenModel={refreshTokenModel}
        setRefreshTokenModel={setRefreshTokenModel}
        dataToken={dataToken}
        phoneNumber={phoneNumber}
        phonesList={phonesList}
      />

      {/* callbackUrl */}

      <CallbackUrl
        showCallBackUrlModel={showCallBackUrlModel}
        setShowCallBackUrl={setShowCallBackUrl}
        dataToken={dataToken}
        phonesList={phonesList}
      />
    </div>
  );
};

export default User;
