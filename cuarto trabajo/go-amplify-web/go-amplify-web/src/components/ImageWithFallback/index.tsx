import Image from 'next/image'
import React, { useState } from 'react'
import { S3_BUCKET_URL } from '../../utils/constants'
import Logo from "../../assets/logotipo/Logotipo.png"

interface ImageWithFallbackProps {
    fromBucket?: boolean,
    src: string,
    width?: number,
    height?: number
    className?: string,
    objectFit?: "cover" | "contain",
    objectPosition?: string
    layout?: "fill"
}

export const ImageWithFallback = ({
    fromBucket = true,
    src,
    width,
    height,
    className,
    objectFit,
    objectPosition,
    layout
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(fromBucket ? `${S3_BUCKET_URL}${src}` : src);

    return (
        <Image
            placeholder='blur'
            blurDataURL={Logo.src}
            src={imgSrc}
            width={width}
            height={height}
            className={className}
            objectFit={objectFit}
            objectPosition={objectPosition}
            layout={layout}
            onError={() => {
                setImgSrc(Logo.src);
            }}
        />
    )
}

export default ImageWithFallback