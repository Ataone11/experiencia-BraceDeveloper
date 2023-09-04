import Image from "next/image";
import { S3_BUCKET } from "../../src/utils/constants";

const Picture = ({
  picture,
  description,
}: {
  picture?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-y-2 mx-3 lg:mx-0">
      <div className="bg-backgroundPage w-full h-20 md:h-32 rounded-lg overflow-hidden relative">
        <Image
          src={`${S3_BUCKET}${picture}`}
          quality="100%"
          layout="fill"
          objectFit="cover"
          alt={description}
        />
      </div>
      <p className="font-normal text-[11px]">{description}</p>
    </div>
  );
};

export default Picture;
