import Image from "next/image";
import React, { useState } from "react";
import { S3_BUCKET } from "../../src/utils/constants";
import Logo from "../../src/assets/thru/logo_blue.svg";

interface ImageWithFallbackProps {
  fromBucket?: boolean;
  src?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  layout?: "fill";
  quality?: number | string;
  alt?: string;
}

export const ImageWithFallback = ({
  fromBucket = true,
  src,
  width,
  height,
  className,
  objectFit,
  objectPosition,
  layout,
  quality,
  alt,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(fromBucket ? `${S3_BUCKET}${src}` : src);

  return (
    <Image
      placeholder="blur"
      blurDataURL={Logo.src}
      src={imgSrc || Logo.src}
      width={width}
      height={height}
      quality={quality}
      className={className}
      objectFit={imgSrc !== Logo.src ? objectFit : "contain"}
      objectPosition={objectPosition}
      layout={layout}
      alt={alt}
      onError={() => {
        setImgSrc(Logo.src);
      }}
    />
  );
};

export default ImageWithFallback;
