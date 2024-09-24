import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { MdAdd } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance.js";

import AddEditNotes from "./addEditNotes.jsx";
import Toast from "../components/Toast.jsx";

import NoteCard from "../components/NoteCard.jsx";
import EmptyCard from "../components/EmptyCard.jsx";

import AddNotesImg from "../assets/images/add-notes.svg";
import NoNote from "../assets/images/no-data.svg";
import Welcome from "../components/Welcome.jsx";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  // const [userInfo, setUserInfo] = useState(null)

  // ตัว popup
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // โชว์ข้อความแจ้งเตือน
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type,
    });
  };
  // ปิดข้อความแจ้งเตือน
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // API Calls using Axios instance
  // get note ทั้งหมด
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/features/get-all-notes");

      if (response.data && response.data.allNotes) {
        setAllNotes(response.data.allNotes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(
        "/features/delete-note/" + noteId
      );

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // เอาข้อมูล User Info
  //  const getUserInfo = async () => {
  //   try {
  //     const response = await axiosInstance.get("/users/get-user");
  //     if (response.data && response.data.user) {
  //       setUserInfo(response.data.user);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       localStorage.clear();
  //       navigate("/login");
  //     }
  //   }
  // };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/features/update-pinned/" + noteId,
        { isPinned: !noteData.isPinned }
      );
      if (response.data && response.data.data.isPinned === true) {
        showToastMessage(`${noteData.title} has pinned successfully`, "update");
      } else {
        showToastMessage(
          `${noteData.title} has unpinned successfully`,
          "update"
        );
      }
      getAllNotes();
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // ไว้ get ข้อมูล note กับ user หลัง refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true); // Set to true if token exists
      getAllNotes();
    } else {
      setHasToken(false); // ไม่เจอ token
    }

    // getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <div className="container mx-auto">
        {hasToken ? (
          allNotes.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {allNotes.map((item) => {
                return (
                  <NoteCard
                    key={item._id}
                    title={item.title}
                    content={item.content}
                    date={item.createdOn}
                    isPinned={item.isPinned}
                    tags={item.tags}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => deleteNote(item)}
                    onPinNote={() => updateIsPinned(item)}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyCard
              imgSrc={AddNotesImg}
              message={`Start creating your first note! Click the 'Add' button to jot down your
            thoughts, ideas, and reminders. Let's get started!`}
            />
          )
        ) : (
          <Welcome />
        )}
      </div>

      {hasToken && (
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>
      )}

      <ReactModal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Example Modal"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          showToastMessage={showToastMessage}
          getAllNotes={getAllNotes}
        />
      </ReactModal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
