const MsIcon = ({ color }: { color: string }) => {
    return (
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.333 0.666504H1.66634C0.933008 0.666504 0.339674 1.2665 0.339674 1.99984L0.333008 9.99984C0.333008 10.7332 0.933008 11.3332 1.66634 11.3332H12.333C13.0663 11.3332 13.6663 10.7332 13.6663 9.99984V1.99984C13.6663 1.2665 13.0663 0.666504 12.333 0.666504ZM12.333 9.99984H1.66634V3.33317L6.99967 6.6665L12.333 3.33317V9.99984ZM6.99967 5.33317L1.66634 1.99984H12.333L6.99967 5.33317Z"  fill={color ?? "black"}/>
        </svg>
        
    );
  };
  
  export default MsIcon;
  