import React from "react";
import cx from "classnames";

const Option = ({
  children,
  isSelected,
  innerProps
}: any) => (
  <div
    className={`${cx("react-select__option", {
      "react-select__option_selected": isSelected
    })} px-[8px] py-[8px] cursor-default hover:bg-primary hover:text-white react-select__option`}
    id={innerProps.id}
    tabIndex={innerProps.tabIndex}
    onClick={innerProps.onClick}
  >
    {children}
  </div>
);

export default Option;