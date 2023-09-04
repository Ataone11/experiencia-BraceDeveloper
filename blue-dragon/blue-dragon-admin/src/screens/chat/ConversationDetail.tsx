import moment from "moment";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { getConversation } from "../../redux/actions/chatActions";
import { selectAdmin } from "../../redux/reducers/authReducer";
import colores from "../../utils/colores";
import ConversationHeader from "./ConversationHeader";
import ConversationInput from "./ConversationInput";
import ConversationMessage from "./ConversationMessage";

interface ConversationDetailProps {
  showMenu: boolean;
  setShowMenu: any;
  conversation: any;
  setConversation: any;
  setConversationId: any;
  sendMessage: any;
  loading: boolean;
  loadingCloseConversation: boolean;
  setLoadingCloseConversation: any;
}

const ConversationDetail = ({
  showMenu,
  setShowMenu,
  conversation,
  setConversation,
  sendMessage,
  loading,
  loadingCloseConversation,
  setLoadingCloseConversation,
  setConversationId,
}: ConversationDetailProps) => {
  let ScrollDebounce = true;
  const [page, setPage] = useState(1);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const user: any = useSelector(selectAdmin);

  const loadMessages = async () => {
    const response: any = await getConversation(
      conversation.id,
      user.id,
      page + 1
    );
    if (response.messages.length > 0) {
      setConversation((prev: any) => ({
        ...prev,
        messages: [...prev.messages, ...response.messages],
      }));
      setPage(page + 1);
    } else setPage(-1);
    setTimeout(function () {
      ScrollDebounce = true;
      setLoadingMessages(false);
    }, 100);
  };

  const handleScroll = (e: any) => {
    if (page > 0 && ScrollDebounce && !loadingMessages) {
      let element = e.target;
      if (
        element.scrollTop * -1 >=
        (element.scrollHeight - element.offsetHeight) * 0.95
      ) {
        ScrollDebounce = false;
        setLoadingMessages(true);
        loadMessages();
      }
    }
  };

  useEffect(() => {
    setPage(1);
  }, [conversation?.id]);
  const { t } = useTranslation();
  return (
    <div
      className={`h-full flex-col justify-between flex sm:w-full max-h-[full] ${
        conversation && !showMenu ? "w-full" : "hidden sm:flex"
      }`}
    >
      {loading ? (
        <div className="w-full flex justify-center h-full items-center">
          <BeatLoader color={colores.secondary} size={10} />
        </div>
      ) : conversation ? (
        <>
          <ConversationHeader
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            conversation={conversation}
            setConversation={setConversationId}
            loadingCloseConversation={loadingCloseConversation}
            setLoadingCloseConversation={setLoadingCloseConversation}
          />
          <div
            className="bg-chat-bg h-full w-full px-5 sm:px-8 py-4 flex flex-col-reverse overflow-y-auto max-h-[full]"
            onScroll={handleScroll}
          >
            {conversation.messages.map((message: any, count: number) => {
              const newDay =
                conversation.messages[count + 1] &&
                moment(message.createdDate).format("DD/MM/YYYY") !==
                  moment(conversation.messages[count + 1]?.createdDate).format(
                    "DD/MM/YYYY"
                  );
              return (
                <>
                  <ConversationMessage
                    message={message}
                    user={conversation.to.id}
                    first={
                      !conversation.messages[count + 1] ||
                      message.from.id !==
                        conversation.messages[count + 1]?.from.id ||
                      newDay
                    }
                    last={
                      !conversation.messages[count - 1] ||
                      message.from.id !==
                        conversation.messages[count - 1]?.from.id
                    }
                    key={message.id}
                  />
                  {newDay && (
                    <div className="w-full text-center text-gray-400 text-xs mb-2">
                      {moment(
                        conversation.messages[count - 1]?.createdDate
                      ).format("DD/MM/YYYY")}
                    </div>
                  )}
                </>
              );
            })}
            <h5 className="text-[13px] text-Oscuro self-center mb-5">
              {t("chat:request-for-help")} {conversation?.id}
            </h5>
            <h4 className="text-[13px] text-Oscuro self-center">
              {moment(
                conversation?.messages[conversation?.messages.length - 1]
                  ?.createdDate
              ).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
                ? "Hoy"
                : moment(
                    conversation?.messages[conversation?.messages.length - 1]
                      ?.createdDate
                  ).format("DD/MM/YY")}
            </h4>
            {loadingMessages && (
              <div className="w-full flex justify-center h-full items-center pt-5 pb-7">
                <BeatLoader color={colores.secondary} size={10} />
              </div>
            )}
          </div>
          {conversation.status === 1 && (
            <ConversationInput
              sendMessage={(message: any, file: any) =>
                sendMessage(message, conversation.to.id, file)
              }
            />
          )}
        </>
      ) : (
        <div className="w-full flex justify-center h-full items-center text-Principal font-bold">
          {t("chat:select-a-conversation")}
        </div>
      )}
    </div>
  );
};

export default ConversationDetail;
