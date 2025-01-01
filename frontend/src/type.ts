export type SVGProps = React.SVGProps<SVGSVGElement> & {
  fillColor?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
};

export type ErrorMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  errors: string | string[];
};

export type FooterProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
};

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  children: string;
  className?: string;
  size?: string | number;
  as?: "span" | "p" | "div";
};
