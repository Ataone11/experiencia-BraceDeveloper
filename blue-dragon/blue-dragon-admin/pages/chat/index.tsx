import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getConversation,
  getConversations,
  sendMessage,
} from "../../src/redux/actions/chatActions";
import { selectAdmin } from "../../src/redux/reducers/authReducer";
import ConversationDetail from "../../src/screens/chat/ConversationDetail";
import ConversationMenu from "../../src/screens/chat/ConversationMenu";
import Conversations from "../../src/screens/chat/Conversations";
import BaseHead from "../../src/screens/general/base/BaseHead";
import Header from "../../components/Header";
import io from "socket.io-client";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "./../../next-i18next.config";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["chat"], nextI18nextConfig)),
    },
  };
}

const socket = io("ws://localhost:4000/chat");

const Chat: NextPage = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [openConversationId, setOpenConversationId] = useState<string | null>(
    null
  );
  const [openConversation, setOpenConversation] = useState<any | null>(null);
  const [conversations, setConversations] = useState([]);

  const [filters, setFilters] = useState({
    status: null,
    role: null,
    name: "",
  });

  const user: any = useSelector(selectAdmin);

  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [loadingCloseConversation, setLoadingCloseConversation] =
    useState(false);

  const {
    t,
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    const loadInit = async () => {
      setLoadingConversations(true);
      if (user?.id) {
        const response = await getConversations(
          user.id,
          filters.role == 0 ? null : filters.role,
          filters.status,
          filters.name,
          1
        );
        setConversations(response);
      }
      setLoadingConversations(false);
    };
    if (user?.id) loadInit();
  }, [filters.status, filters.role, filters.name, user]);

  useEffect(() => {
    setShowMenu(false);
    if (user?.id) {
      if (!openConversationId) setOpenConversation(null);
      else if (openConversationId) {
        setLoadingConversation(true);
        const loadConversation = async () => {
          const response = await getConversation(
            openConversationId,
            user.id,
            1
          );
          setOpenConversation(response);
          const indexConversation: number = conversations.findIndex(
            (item: any) => item.id === openConversationId
          );
          const prevConversations: any = [...conversations];
          if (prevConversations[indexConversation]) {
            prevConversations[indexConversation].unseenMessages = 0;
          }
          setConversations(prevConversations);
          setLoadingConversation(false);
        };
        loadConversation();
      }
    }
  }, [openConversationId]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on(user?.id, (args: any) => {
      if (openConversation?.id === args.chat.id) {
        setOpenConversation((prev: any) => ({
          ...prev,
          messages: [args, ...prev.messages],
        }));
      }
      const indexConversation: number = conversations.findIndex(
        (item: any) => item.id === args.chat.id
      );
      const prevConversations: any = [...conversations];
      console.log(prevConversations[indexConversation]);
      if (prevConversations[indexConversation]) {
        prevConversations[indexConversation].lastMessage = {
          message: args.message,
          createdDate: args.createdDate,
          from: args.from.id,
          to: null,
          file: args.file,
        };
        if (openConversation?.id !== args.chat.id) {
          prevConversations[indexConversation].unseenMessages =
            prevConversations[indexConversation].unseenMessages + 1;
        }
        prevConversations.sort((a: any, b: any) => {
          if (
            moment(a.lastMessage.createdDate).isBefore(
              b.lastMessage.createdDate
            )
          )
            return 1;
          else if (
            moment(a.lastMessage.createdDate).isAfter(b.lastMessage.createdDate)
          )
            return -1;
          else return 0;
        });
        setConversations(prevConversations);
      } else {
        const newConversation: any = {
          id: args.chat.id,
          to: args.from,
          createdDate: args.createdDate,
          status: 1,
          unseenMessages: 1,
          updatedDate: args.createdDate,
          lastMessage: {
            createdDate: args.createdDate,
            file: args.file,
            from: args.from.id,
            message: args.message,
          },
        };
        const newConversations: any = [newConversation, ...prevConversations];
        setConversations(newConversations);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(user?.id);
    };
  }, [user, conversations]);

  const createMessage = async (message: string, to: string, file: any) => {
    if (user?.id && openConversationId) {
      const newMessage = await sendMessage(
        user.id,
        to,
        message,
        file,
        language
      );
      if (newMessage) {
        setOpenConversation((prev: any) => ({
          ...prev,
          messages: [newMessage, ...prev.messages],
        }));
        const indexConversation: number = conversations.findIndex(
          (item: any) => item.id === openConversationId
        );
        const prevConversations: any = [...conversations];
        if (prevConversations[indexConversation]) {
          prevConversations[indexConversation].lastMessage = {
            message: newMessage.message,
            createdDate: newMessage.createdDate,
            from: user.id,
            to: to,
            file: newMessage.file,
          };
          if (openConversation?.id !== openConversationId) {
            prevConversations[indexConversation].unseenMessages =
              prevConversations[indexConversation].unseenMessages + 1;
          }
          prevConversations.sort((a: any, b: any) => {
            if (
              moment(a.lastMessage.createdDate).isBefore(
                b.lastMessage.createdDate
              )
            )
              return 1;
            else if (
              moment(a.lastMessage.createdDate).isAfter(
                b.lastMessage.createdDate
              )
            )
              return -1;
            else return 0;
          });
          setConversations(prevConversations);
        }
      }
    }
  };

  const handleNewConversations = async (page: number) => {
    if (user?.id) {
      const response = await getConversations(
        user.id,
        filters.role == 0 ? null : filters.role,
        filters.status,
        filters.name,
        page
      );
      const newConversations: any = [...conversations, ...response];
      setConversations(newConversations);
      return response;
    }
  };

  return (
    <>
      <BaseHead title={"Chat"} description={""}></BaseHead>
      <main className={`w-full h-screen max-h-screen flex flex-col`}>
        <div className="w-full flex h-full overflow-y-hidden relative">
          <Conversations
            openConversation={openConversation}
            openConversationId={openConversationId}
            conversations={conversations}
            setConversation={setOpenConversationId}
            filters={filters}
            setFilters={setFilters}
            loading={loadingConversations}
            handleLoadConversations={handleNewConversations}
          />
          <ConversationDetail
            conversation={openConversation}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setConversationId={setOpenConversationId}
            setConversation={setOpenConversation}
            sendMessage={createMessage}
            loading={loadingConversation}
            loadingCloseConversation={loadingCloseConversation}
            setLoadingCloseConversation={setLoadingCloseConversation}
          />
          {showMenu && openConversation && (
            <ConversationMenu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              conversation={openConversation}
              loadingCloseConversation={loadingCloseConversation}
              setConversation={setOpenConversationId}
              setLoadingCloseConversation={setLoadingCloseConversation}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Chat;
