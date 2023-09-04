import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import colores from "../../utils/colores";
import Clip from "./../../../assets/chat/clip.svg";
import Send from "./../../../assets/chat/send.svg";

interface ConversationInputProps {
  sendMessage: any;
}

const ConversationInput = ({ sendMessage }: ConversationInputProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (message || file) {
      setLoading(true);
      await sendMessage(message, file);
      setMessage("");
      setFile(null);
      setLoading(false);
    }
  };

  const uploadFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  
  return (
    <form
      className="flex justify-between px-5 py-3 sm:px-12 sm:py-5 border-t-2 border-backgroundPage shadow-[2px_3px_17px_1px_#B2ACAC38]"
      onSubmit={handleSubmit}
    >
      {file ? (
        <div
          className={`min-w-[49px] min-h-[38px] rounded-[8px] text-white self-center text-[14px] bg-Principal flex items-center justify-center cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            setFile(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      ) : (
        <label
          className={`min-w-[49px] min-h-[38px] rounded-[8px] text-white self-center text-[14px] bg-Principal flex items-center justify-center cursor-pointer`}
          htmlFor="message-file"
        >
          <input
            type="file"
            id="message-file"
            className="w-0 h-0"
            onChange={uploadFile}
            disabled={file}
          />
          <Image src={Clip} alt={"Clip"} />
        </label>
      )}
      <input
        type="text"
        placeholder="Escribe un mensaje"
        className=" border-2 border-backgroundPage w-full mx-[14px] sm:mx-[30px] rounded-lg px-[14px] py-[10px] text-sm outline-none"
        onChange={(e) => setMessage(e.target.value)}
        value={file ? file.name : message}
        disabled={file || loading}
      />
      <button
        className={`min-w-[49px] min-h-[38px] rounded-[8px] text-white self-center text-[14px] bg-Principal flex items-center justify-center`}
        disabled={loading}
        type="submit"
      >
        {loading ? (
          <BeatLoader color={colores.secondary} size={10} />
        ) : (
          <Image src={Send} alt={"Send"} />
        )}
      </button>
    </form>
  );
};

export default ConversationInput;
