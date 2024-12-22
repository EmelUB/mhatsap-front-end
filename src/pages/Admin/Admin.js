import React, { useEffect, useState } from "react";
import loginBg from "./../../asset/login-bg.jpg";
import Table from "../Component/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faRightToBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  deleteUser,
  getLogout,
  getUser,
  getUserList,
  postAddUser,
  putUser,
} from "../../service/api";
import AddUserModel from "./AdminComponents/AddUserModel";
import DeleteUserModel from "./AdminComponents/DeleteUserModel";
import EditUserModel from "./AdminComponents/EditUserModel";

const Admin = () => {
  const [showEditModel, setEditModel] = useState(false);
  const [showAddModel, setAddModel] = useState(false);
  const [showDeleteModel, setDeleteModel] = useState(false);
  const [dataId, setDataId] = useState();
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const userList = async () => {
    const { data } = await getUserList();
    if (data) {
      setUserData(data.data);
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
      const response = await getLogout();
      console.error("Logout is success");
      Navigate("/login");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const tableHeadersOne = [
    {
      label: "Id",
      value: "id",
      width: "220px",
      format: (item) => {
        return <div className="w-full flex justify-center">{item.id}</div>;
      },
    },
    {
      label: "UserName",
      value: "username",
      format: (item) => {
        return (
          <div className="w-full flex justify-center">{item.username}</div>
        );
      },
    },
    {
      label: "IsAdmin",
      value: "is_admin",
      width: "220px",
      format: (item) => {
        return (
          <div className="w-full flex justify-center">
            {item.is_admin === true ? "True" : "False"}
          </div>
        );
      },
    },
    {
      label: "Limit",
      value: "limit",
      width: "220px",
      format: (item) => {
        return <div className="w-full flex justify-center">{item.limit}</div>;
      },
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
                setDataId(item.id);
                setDeleteModel(true);
              }}
            />
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => {
                setEditModel(true);
                setDataId(item.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    userList();
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
          data={userData ? userData : []}
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

      {/* EditUser */}
      <EditUserModel
        showEditModel={showEditModel}
        setEditModel={setEditModel}
        dataId={dataId}
        userList={userList}
      />

      {/* addUser */}

      <AddUserModel
        showAddModel={showAddModel}
        setAddModel={setAddModel}
        userList={userList}
      />

      {/* DeleteUser */}

      <DeleteUserModel
        showDeleteModel={showDeleteModel}
        setDeleteModel={setDeleteModel}
        dataId={dataId}
        userList={userList}
      />
    </div>
  );
};

export default Admin;
