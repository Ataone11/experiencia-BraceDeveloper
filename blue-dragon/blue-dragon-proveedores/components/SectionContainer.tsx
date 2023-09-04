import React from 'react'

const SectionContainer = ({ children, className }: any) => {
    return (
        <div className={`shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[26px] px-[17px] mt-[28px] flex flex-col ${className}`}>{children}</div>
    )
}

export default SectionContainer