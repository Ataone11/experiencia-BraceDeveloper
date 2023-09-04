import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import colores from "../../utils/colores";
import ConversationCard from "./ConversationCard";
import FilterOptions from "./FilterOptions";

interface ConversationsProps {
  openConversation: any;
  openConversationId: any;
  conversations: any;
  setConversation: any;
  filters: any;
  setFilters: any;
  loading: boolean;
  handleLoadConversations: any;
}

const Conversations = ({
  conversations,
  setConversation,
  openConversation,
  openConversationId,
  filters,
  loading,
  setFilters,
  handleLoadConversations,
}: ConversationsProps) => {
  let ScrollDebounce = true;
  const [page, setPage] = useState(1);
  const [loadingConversations, setLoadingConversations] = useState(false);

  const loadConversations = async () => {
    const response: any = await handleLoadConversations(page + 1);
    if (response.length > 0) {
      setPage(page + 1);
    } else setPage(-1);
    setTimeout(function () {
      ScrollDebounce = true;
      setLoadingConversations(false);
    }, 100);
  };

  const handleScroll = (e: any) => {
    if (page > 0 && ScrollDebounce && !loadingConversations && !loading) {
      let element = e.target;
      if (element.scrollTop <= 50) {
        ScrollDebounce = false;
        setLoadingConversations(true);
        loadConversations();
      }
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);
  const { t } = useTranslation();
  return (
    <div
      className={`box-border sm:w-[476px] sm:max-w-[40%] bg-white max-h-[100vh] shadow-[0px_4px_4px_0px_#00000040] z-10 h-full flex-col ${
        openConversation ? "hidden sm:flex" : "w-full flex"
      }`}
    >
      <FilterOptions filters={filters} setFilters={setFilters} />
      <div className="overflow-y-auto flex-grow h-full" onScroll={handleScroll}>
        {loading ? (
          <div className="w-full flex justify-center py-5">
            <BeatLoader color={colores.secondary} size={10} />
          </div>
        ) : conversations?.length > 0 ? (
          conversations.map((conversation: any) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              setConversation={setConversation}
              openConversationId={openConversationId}
            />
          ))
        ) : (
          <div className="w-full flex justify-center text-secondary font-bold py-5">
            {t("chat:no-conversations")}
          </div>
        )}
        {loadingConversations && (
          <div className="w-full flex justify-center py-5">
            <BeatLoader color={colores.secondary} size={10} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
