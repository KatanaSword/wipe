// React Component Type

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

export type InitialState = {
  status: boolean;
  userData: null;
};

// ENV Config Type

export type Conf = {
  backendUserUrl: string;
  backendBackgroundColorUrl: string;
  backendAspectRatioUrl: string;
  backendBlogUrl: string;
  backendCodeUrl: string;
  backendScreenshotUrl: string;
  backendTestimonialUrl: string;
};

// Auth Type

export interface Register {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface Signin {
  username?: string;
  email?: string;
  password: string;
}

export interface AccountDetailUpdate {
  phoneNumber?: number;
  countryCode?: string;
  fullName?: string;
}

export interface AssignRole {
  userId: string;
  role: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPassword {
  token: string;
  resetPassword: string;
}

// Aspect Ratio Type

export interface CreateAspectRatio {
  aspectRatioName: string;
  height: number;
  width: number;
}

export interface UpdateAspectRatio {
  aspectRatioName?: string;
  height?: number;
  width?: number;
}

// Background Color Type

export interface CreateBackgroundColor {
  backgroundColorName: string;
  colorOneHexCode: string;
  colorTwoHexCode: string;
}

export interface UpdateBackgroundColor {
  backgroundColorName?: string;
  colorOneHexCode?: string;
  colorTwoHexCode?: string;
}

// Blog Type

export interface CreateBlogPost {
  fileName: string;
  title: string;
  summary: string;
  aspectRatioName: string;
  backgroundColorName: string;
}

export interface UpdateBlogPost {
  title?: string;
  summary?: string;
}

export interface BlogPostFileName {
  fileName?: string;
  blogId: string;
}

export interface BlogPostAspectRatio {
  aspectRatioName?: string;
  blogId: string;
}

export interface BlogPostBackgroundColor {
  backgroundColorName?: string;
  blogId: string;
}
