import { SVGIcon } from "../interfaces";

export default function Compartir(props: SVGIcon) {
  const { color = "#005C90" } = props;
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5001 13.9996C5.3752 13.9946 6.21688 13.6629 6.8601 13.0696L13.1201 16.6496C13.0404 16.9259 13 17.212 13.0001 17.4996C12.9937 18.3111 13.2671 19.1001 13.7743 19.7337C14.2815 20.3672 14.9915 20.8067 15.7848 20.978C16.5781 21.1493 17.4061 21.0421 18.1296 20.6743C18.8531 20.3065 19.4277 19.7007 19.7568 18.9589C20.0859 18.217 20.1493 17.3844 19.9363 16.6013C19.7234 15.8182 19.2471 15.1323 18.5876 14.6593C17.9282 14.1862 17.1259 13.9548 16.3158 14.004C15.5058 14.0533 14.7374 14.3801 14.1401 14.9296L7.8801 11.3496C7.95565 11.1032 7.99605 10.8473 8.0001 10.5896L14.1501 7.06959C14.7442 7.60643 15.5047 7.92268 16.3043 7.96529C17.1039 8.00791 17.8938 7.7743 18.5415 7.30364C19.1893 6.83299 19.6555 6.15392 19.862 5.38031C20.0685 4.60671 20.0027 3.78563 19.6757 3.05477C19.3486 2.32391 18.7802 1.72773 18.0658 1.36622C17.3514 1.00471 16.5344 0.899842 15.7518 1.06922C14.9692 1.23859 14.2687 1.6719 13.7677 2.29648C13.2667 2.92106 12.9957 3.69892 13.0001 4.49959C13.0035 4.7869 13.0438 5.07258 13.1201 5.34959L7.4301 8.59959C7.10041 8.08955 6.64367 7.67407 6.10479 7.394C5.5659 7.11392 4.9634 6.97889 4.35653 7.00218C3.74965 7.02546 3.15928 7.20626 2.64343 7.52681C2.12759 7.84735 1.70403 8.29661 1.41439 8.83041C1.12475 9.36422 0.979001 9.96421 0.991459 10.5714C1.00392 11.1786 1.17416 11.7721 1.48545 12.2936C1.79675 12.8151 2.23837 13.2466 2.76693 13.5457C3.29549 13.8448 3.89278 14.0012 4.5001 13.9996ZM16.5001 15.9996C16.7968 15.9996 17.0868 16.0876 17.3335 16.2524C17.5801 16.4172 17.7724 16.6515 17.8859 16.9256C17.9995 17.1997 18.0292 17.5013 17.9713 17.7922C17.9134 18.0832 17.7705 18.3505 17.5608 18.5603C17.351 18.77 17.0837 18.9129 16.7927 18.9708C16.5018 19.0286 16.2002 18.9989 15.9261 18.8854C15.652 18.7719 15.4177 18.5796 15.2529 18.3329C15.0881 18.0863 15.0001 17.7963 15.0001 17.4996C15.0001 17.1018 15.1581 16.7202 15.4394 16.4389C15.7207 16.1576 16.1023 15.9996 16.5001 15.9996ZM16.5001 2.99959C16.7968 2.99959 17.0868 3.08757 17.3335 3.25239C17.5801 3.41721 17.7724 3.65148 17.8859 3.92557C17.9995 4.19966 18.0292 4.50126 17.9713 4.79223C17.9134 5.0832 17.7705 5.35047 17.5608 5.56025C17.351 5.77003 17.0837 5.91289 16.7927 5.97077C16.5018 6.02865 16.2002 5.99894 15.9261 5.88541C15.652 5.77188 15.4177 5.57962 15.2529 5.33295C15.0881 5.08627 15.0001 4.79626 15.0001 4.49959C15.0001 4.10177 15.1581 3.72024 15.4394 3.43893C15.7207 3.15763 16.1023 2.99959 16.5001 2.99959ZM4.5001 8.99959C4.79677 8.99959 5.08678 9.08756 5.33346 9.25239C5.58013 9.41721 5.77239 9.65148 5.88592 9.92557C5.99945 10.1997 6.02916 10.5013 5.97128 10.7922C5.9134 11.0832 5.77054 11.3505 5.56076 11.5603C5.35098 11.77 5.08371 11.9129 4.79274 11.9708C4.50177 12.0286 4.20017 11.9989 3.92608 11.8854C3.65199 11.7719 3.41772 11.5796 3.2529 11.3329C3.08808 11.0863 3.0001 10.7963 3.0001 10.4996C3.0001 10.1018 3.15814 9.72024 3.43944 9.43893C3.72075 9.15763 4.10228 8.99959 4.5001 8.99959Z"
        fill={color}
      />
    </svg>
  );
}