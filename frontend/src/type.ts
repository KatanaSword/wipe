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
  children: React.ReactNode;
  className?: string;
  size?: string | number;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3";
};

export type LineProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type PricingPoint = {
  id: number;
  point: string;
};

export type Services = {
  svg: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

export type FAQS = {
  id: number;
  question: string;
  answer: string;
};

export type Testimonials = {
  review: string;
  name: string;
  occupation: string;
  profile: string;
};

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
