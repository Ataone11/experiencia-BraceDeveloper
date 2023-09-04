import { SVGIcon } from "../interfaces";

export default function Download(props: SVGIcon) {
  const { color = "#DAFFFF" } = props;
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.782421 14.4336H11.2999C11.502 14.4337 11.6962 14.5118 11.842 14.6518C11.9877 14.7917 12.0738 14.9826 12.0821 15.1845C12.0904 15.3864 12.0204 15.5837 11.8866 15.7352C11.7529 15.8867 11.5657 15.9806 11.3644 15.9973L11.2999 16H0.782421C0.580382 15.9998 0.386238 15.9215 0.240554 15.7815C0.0948703 15.6416 0.00891776 15.4507 0.000655754 15.2488C-0.00760625 15.0469 0.0624614 14.8497 0.196219 14.6983C0.329976 14.5468 0.517075 14.453 0.718422 14.4363L0.782421 14.4336H11.2999H0.782421ZM5.86527 0.00268533L5.92927 0C6.12583 7.34191e-06 6.31521 0.0739227 6.4598 0.207074C6.60439 0.340224 6.69363 0.522875 6.70981 0.718769L6.71249 0.783217V10.3309L8.85761 8.18618C9.0045 8.03929 9.20372 7.95677 9.41146 7.95677C9.61919 7.95677 9.81841 8.03929 9.9653 8.18618C10.1122 8.33307 10.1947 8.5323 10.1947 8.74003C10.1947 8.94776 10.1122 9.14699 9.9653 9.29387L6.48424 12.7749C6.41151 12.8477 6.32517 12.9054 6.23014 12.9447C6.13511 12.9841 6.03325 13.0044 5.93039 13.0044C5.82753 13.0044 5.72568 12.9841 5.63065 12.9447C5.53562 12.9054 5.44928 12.8477 5.37655 12.7749L1.89548 9.29387C1.7486 9.14699 1.66607 8.94776 1.66607 8.74003C1.66607 8.5323 1.7486 8.33307 1.89548 8.18618C2.04237 8.03929 2.2416 7.95677 2.44933 7.95677C2.65706 7.95677 2.85629 8.03929 3.00318 8.18618L5.14606 10.3291V0.783217C5.14607 0.586585 5.22005 0.397153 5.3533 0.25255C5.48654 0.107947 5.6693 0.0187529 5.86527 0.00268533L5.92927 0L5.86527 0.00268533Z"
        fill={color}
      />
    </svg>
  );
}