import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import ImageWithFallback from "../../../components/general/ImageWithFallback";
import ThruLogo from "../../../assets/logo_blue.svg";
import { closeConversation } from "../../redux/actions/chatActions";
import colores from "../../utils/colores";
import { S3_BUCKET_URL } from "../../utils/constants";
import { useTranslation } from "next-i18next";

interface ConversationHeaderProps {
  showMenu: boolean;
  setShowMenu: any;
  setConversation: any;
  conversation: any;
  loadingCloseConversation: boolean;
  setLoadingCloseConversation: any;
}

const ConversationHeader = ({
  showMenu,
  setShowMenu,
  conversation,
  setConversation,
  loadingCloseConversation,
  setLoadingCloseConversation,
}: ConversationHeaderProps) => {
  const { t } = useTranslation();
  const personName =
    conversation?.to?.profile?.first_name &&
    conversation?.to?.profile?.last_name
      ? `${conversation?.to?.profile?.first_name ?? ""} ${
          conversation?.to?.profile?.last_name ?? ""
        }`
      : t("chat:nameless");

  const handleCloseConversation = async () => {
    setLoadingCloseConversation(true);
    await closeConversation(conversation.id);
    setConversation(null);
    toast.success(t("chat:conversation-closed-successfully"));
    setLoadingCloseConversation(false);
  };

  return (
    <div className="w-full sm:h-20 flex flex-col sm:flex-row justify-between items-center sm:px-12 sm:py-3 sm:border-b-2 sm:border-backgroundPage sm:shadow-[2px_3px_17px_1px_#B2ACAC38]">
      <div
        className="flex items-center justify-start cursor-pointer w-full sm:w-[60%] py-4 px-5 sm:mr-4 shadow-[2px_3px_17px_1px_#B2ACAC38] sm:shadow-none"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer mr-4 sm:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setConversation(null);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        <div className="w-12 min-w-[48px] h-12 min-h-[48px] rounded-full mr-5 flex justify-center items-center">
          <ImageWithFallback
            alt={`image convo card`}
            src={
              conversation?.to?.profile?.photo
                ? S3_BUCKET_URL + conversation?.to?.profile?.photo
                : ThruLogo
            }
            width={48}
            height={48}
          />
        </div>
        <div className="overflow-hidden w-full">
          <div className="text-Principal font-bold text-[16px] overflow-hidden w-full max-h-7">
            {personName}
          </div>
          <div className="text-TextOpacity text-[14px] whitespace-nowrap">
            {t("chat:request-for-help")} {conversation?.id}
          </div>
        </div>
      </div>
      {!showMenu && conversation?.status === 1 && (
        <div className="whitespace-nowrap bg-chat-bg sm:bg-white w-full flex justify-center sm:justify-end px-2 py-3">
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
        </div>
      )}
      {!showMenu && conversation?.status === 2 && (
        <div className="whitespace-nowrap bg-chat-bg sm:bg-white w-full flex justify-center sm:justify-end px-2 py-3 text-[14px] text-Principal ">
          {t("chat:closed-conversation")}
        </div>
      )}
    </div>
  );
};

export default ConversationHeader;
