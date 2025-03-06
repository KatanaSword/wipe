import { SVGProps } from "@/type";

export const PlaySVG: React.FC<SVGProps> = ({
  fillColor = "#00000",
  height = "30px",
  width = "30px",
  className = "",
  ...restProps
}) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={height}
      width={width}
      className={className}
      {...restProps}
    >
      <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
    </svg>
  );
};
