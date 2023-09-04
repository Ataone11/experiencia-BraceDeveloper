import Image from "next/image";
import React from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import ImageWithFallback from "../../../components/general/ImageWithFallback";
import ThruLogo from "../../../assets/logo_blue.svg";
import { closeConversation } from "../../redux/actions/chatActions";
import colores from "../../utils/colores";
import { S3_BUCKET_URL } from "../../utils/constants";
import { useTranslation } from "next-i18next";

interface ConversationMenuProps {
  showMenu: boolean;
  setShowMenu: any;
  conversation: any;
  setConversation: any;
  loadingCloseConversation: boolean;
  setLoadingCloseConversation: any;
}

const ConversationMenu = ({
  showMenu,
  setShowMenu,
  conversation,
  setConversation,
  loadingCloseConversation,
  setLoadingCloseConversation,
}: ConversationMenuProps) => {
  const { t } = useTranslation();
  const personName =
    conversation?.to?.profile?.first_name &&
    conversation?.to?.profile?.last_name
      ? `${conversation?.to?.profile?.first_name ?? ""} ${
          conversation?.to?.profile?.last_name ?? ""
        }`
      : t("chat:nameless");

  const role =
    conversation?.to?.role === 1
      ? t("chat:supplier")
      : conversation?.to?.role === 2
      ? t("chat:importer")
      : t("chat:administrador");

  const handleCloseConversation = async () => {
    setLoadingCloseConversation(true);
    await closeConversation(conversation.id);
    setConversation(null);
    toast.success(t("chat:conversation-closed-successfully"));
    setLoadingCloseConversation(false);
  };

  return (
    <div
      className={`flex flex-col items-center bg-white px-6 pt-8 sm:pt-[18px] pb-7 h-full sm:min-w-[362px] overflow-y-auto sm:border-l-2 border-backgroundPage ${
        showMenu ? "w-full" : "hidden"
      }`}
    >
      <div className="flex justify-between w-full items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setShowMenu(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        {conversation?.status === 1 ? (
          <>
            {loadingCloseConversation ? (
              <div
                className={`py-[10px] px-[25px] rounded-[8px] text-white self-center text-[14px] bg-Principal`}
              >
                <BeatLoader color={colores.secondary} size={10} />
              </div>
            ) : (
              <Button
                type="submit"
                text={"Cerrar conversación"}
                onClick={() => handleCloseConversation()}
              />
            )}
          </>
        ) : (
          <div className="whitespace-nowrap bg-chat-bg sm:bg-white w-full flex justify-center px-2 py-3 text-[14px] text-Principal ">
            {t("chat:closed-conversation")}
          </div>
        )}
        <div className="w-6 h-6" />
      </div>
      <div className="min-w-[116px] min-h-[116px] rounded-full mt-8 flex justify-center items-center">
        <ImageWithFallback
          alt={`image convo card`}
          src={
            conversation?.to?.profile?.photo
              ? S3_BUCKET_URL + conversation?.to?.profile?.photo
              : ThruLogo
          }
          width={116}
          height={116}
        />
      </div>
      <h4 className="mt-5 font-bold text-sm text-Oscuro text-center">
        {personName}
      </h4>
      <h5 className="mt-4 text-[13px] font-medium">{role}</h5>
      <div className="mt-12 text-base text-Principal font-bold self-start  mb-5">
      {t("chat:shared-images")}
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 justify-start self-start w-full">
        {conversation?.files?.map((file: string) => {
          if (file.match(/\.(jpg|jpeg|png)$/i))
            return (
              <a
                className="w-full aspect-square flex justify-center items-center border-2 border-black"
                key={file + "image"}
                href={S3_BUCKET_URL + file}
              >
                <ImageWithFallback
                  alt={`image convo card`}
                  src={S3_BUCKET_URL + file}
                  width="100%"
                  height="100%"
                  quality="100"
                  objectFit="cover"
                />
              </a>
            );
        })}
      </div>
    </div>
  );
};

export default ConversationMenu;
