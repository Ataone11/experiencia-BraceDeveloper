import React, { useEffect, useState } from "react";
import ThruLogo from "../../../assets/logo_blue.svg";
import moment from "moment-timezone";
import { useTranslation } from "next-i18next";
import ImageWithFallback from "../../../components/general/ImageWithFallback";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ConversationCardProps {
  setConversation: any;
  conversation: any;
  openConversationId: string;
}

const ConversationCard = ({
  setConversation,
  conversation,
  openConversationId,
}: ConversationCardProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const personName =
    conversation?.to?.profile?.first_name &&
    conversation?.to?.profile?.last_name
      ? `${conversation?.to?.profile?.first_name ?? ""} ${
          conversation?.to?.profile?.last_name ?? ""
        }`
      : t("chat:nameless");

  const [text, setText] = useState("");



  useEffect(() => {
    if (conversation?.lastMessage?.message?.language?.code === language) {
      setText(conversation?.lastMessage?.message?.text);
    } else {
      const translation =
        conversation?.lastMessage?.message?.translations?.find(
          (translation: any) => translation.language.code === language
        );
      if (translation) {
        setText(translation.translation);
      }
    }
  }, [language, conversation.lastMessage]);

  return (
    <div
      className="w-full min-h-[90px] max-h-[150px] border-t-2 border-backgroundPage flex justify-between px-5 xl:px-[50px] pt-[17px] pb-[12px] box-border cursor-pointer relative"
      onClick={() => setConversation(conversation?.id)}
    >
      {openConversationId === conversation.id && (
        <div className="w-2 h-full bg-blue-texts-buttons rounded-tr-xl rounded-br-xl absolute left-0 top-0" />
      )}
      <div className="w-12 h-12 rounded-full mr-5 flex justify-center items-center">
        <ImageWithFallback
          alt={`image convo card`}
          src={conversation?.to?.profile?.photo}
          width={48}
          height={48}
          objectFit="cover"
          className="rounded-full"
          quality={100}
        />
      </div>
      <div className="mr-5 overflow-hidden w-[200px] sm:w-[250px]">
        <div className="text-Principal font-bold text-[13px] max-h-[42px] overflow-hidden">
          {personName}
        </div>
        {conversation?.lastMessage?.file ? (
          <div className="flex items-center justify-start">
            {conversation?.lastMessage?.file?.match(/\.(jpg|jpeg|png)$/i) && (
              <div className="min-w-[48px] flex justify-between items-center mr-2">
                <ImageWithFallback
                  alt={`image convo card`}
                  src={
                    conversation?.lastMessage?.file?.match(/\.(jpg|jpeg|png)$/i)
                      ? conversation?.lastMessage?.file
                      : ThruLogo
                  }
                  width={40}
                  height={40}
                  quality={100}
                  objectFit="cover"
                />
              </div>
            )}
            <div className="text-[13px] text-Principal">{text}</div>
          </div>
        ) : (
          <>
            <div className="text-TextOpacity text-[11px]">
             {t("chat:request-for-help")} {conversation?.id}
            </div>
            <div className="text-[13px] mt-3">{text}</div>
          </>
        )}
      </div>
      <div className="w-20 flex flex-col items-end">
        <div className="text-[11px] text-TextOpacity whitespace-nowrap">
          {moment(conversation?.lastMessage?.createdDate).format("hh:mm a")}
        </div>
        {conversation?.unseenMessages > 0 && (
          <div className="bg-success w-6 h-6 rounded-full text-xs flex items-center justify-center mt-2">
            {conversation?.unseenMessages}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationCard;
