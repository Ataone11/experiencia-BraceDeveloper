import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: any) => void
}

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
) {
  const { type = 'button', children, onClick, ...restProps } = props
  return (
    <button
      onClick={(e: any) => onClick && onClick(e)}
      type={type}
      {...restProps}
      className={props.className ? props.className : "h-[50px] bg-azulPrimary900 text-white w-full rounded-[5px] text-textSize7 font-bold"}
    >
      {children}
    </button>
  )
}
