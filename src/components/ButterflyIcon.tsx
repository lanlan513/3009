import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  strokeWidth?: number;
}

export default function ButterflyIcon({
  strokeWidth = 1.5,
  className = "",
  ...rest
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M12 12c-1-3.5-4-7-7.5-7-2.5 0-3.5 2-3.5 4.5 0 2.5 2 5.5 6 6.5 1.5.4 3 .3 5-1" />
      <path d="M12 12c1-3.5 4-7 7.5-7 2.5 0 3.5 2 3.5 4.5 0 2.5-2 5.5-6 6.5-1.5.4-3 .3-5-1" />
      <path d="M12 7v13" />
      <path d="M10 8.5c-1-1-2.5-1.5-4-1" />
      <path d="M14 8.5c1-1 2.5-1.5 4-1" />
      <circle cx="6.5" cy="9.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="9.5" r="0.5" fill="currentColor" />
      <circle cx="7" cy="12" r="0.5" fill="currentColor" />
      <circle cx="17" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}
