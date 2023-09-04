import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { S3_BUCKET_URL } from "../../utils/constants";
import { useTranslation } from "next-i18next";

interface ConversationMessageProps {
  message: any;
  user: string;
  first: boolean;
  last: boolean;
}

const ConversationMessage = ({
  message,
  user,
  first,
  last,
}: ConversationMessageProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const personName =
    message?.from?.profile?.first_name && message?.from?.profile?.last_name
      ? `${message?.from?.profile?.first_name ?? ""} ${
          message?.from?.profile?.last_name ?? ""
        }`
      : t("chat:nameless");

  const [text, setText] = useState("");
  const [errorImage, setErrorImage] = useState(false);



  useEffect(() => {
    if (message?.message?.language?.code === language) {
      setText(message?.message?.text);
    } else {
      const translation = message?.message?.translations?.find(
        (translation: any) => translation.language.code === language
      );
      if (translation) {
        setText(translation.translation);
      }
    }
  }, [language, message]);

  return (
    <div
      className={`flex flex-col ${first && "mt-5"} max-w-[80%] w-[450px] ${
        message.from.id === user
          ? "items-start self-start"
          : "items-end self-end"
      }`}
    >
      {first && (
        <h3 className="text-[13px] font-bold text-Oscuro">{personName}</h3>
      )}
      <div className="flex flex-col items-start mt-[5px]">
        <p
          className={`bg-white px-[20px] py-[10px] text-[13px] w-full box-border rounded-lg ${
            message.from.id === user ? "rounded-bl-none" : "rounded-br-none"
          }`}
        >
          {errorImage ? (
            <div className="text-red-cancel">{t("chat:image-could-not-be-loaded")}</div>
          ) : message?.file &&
            message?.message?.text.match(/\.(jpg|jpeg|png)$/i) ? (
            <a href={S3_BUCKET_URL + message.file}>
              <Image
                alt={`image file message`}
                src={S3_BUCKET_URL + message.file}
                width={100}
                height={100}
                quality="100"
                objectFit="cover"
                onError={() => setErrorImage(true)}
              />
            </a>
          ) : message?.file ? (
            <a href={S3_BUCKET_URL + message.file} className="text-Principal">
              {text}
            </a>
          ) : (
            <div>{text}</div>
          )}
        </p>
        {last && (
          <div
            className={` border-b-chat-bg  border-b-8 ${
              message.from.id === user
                ? "self-start border-l-[20px] border-l-white"
                : "self-end border-r-[20px] border-r-white"
            }`}
          />
        )}
      </div>
      {last && (
        <span className="text-[10px] mt-[10px]">
          {moment(message.createdDate).format("hh:mm a")}
        </span>
      )}
    </div>
  );
};

export default ConversationMessage;
