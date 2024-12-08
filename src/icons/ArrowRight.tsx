import type { SVGProps } from "react";
const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right-dashed"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12h.5m3 0h1.5m3 0h6" />
    <path d="M13 18l6 -6" />
    <path d="M13 6l6 6" />
  </svg>
);
export default ArrowRightIcon;
