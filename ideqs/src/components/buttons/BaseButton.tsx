import Link from "next/link";
import React from "react";

interface Params {
  link?: any;
  children: any[];
  className: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disable?:boolean
}

const BaseButton = ({
  link ,
  children,
  className,
  onClick = () => null,
  type = "button" ,
  disable=false
}: Params) => {
  if (link) {
    return (
    <Link href={link} shallow>
      <a className={className} onClick={onClick}>
        {children}
      </a>
      </Link>
    );
  }
  return (
    <button className={className} onClick={onClick} type={type} disabled={disable}>
      {children}
    </button>
  );
};

export default BaseButton;
