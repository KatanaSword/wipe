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

// Store Slice Type

export type AuthInitialState = {
  status: boolean;
  userData: [] | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
};

export type AspectRatioInitialState = {
  status: boolean;
  aspectRatioData: [] | null;
  error: string | null;
  success: boolean;
};

// ENV Config Type

export type Config = {
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

// Blog post Type

export interface CreateBlogPost {
  fileName: string;
  title: string;
  summary: string;
  image: string;
  aspectRatioName: string;
  backgroundColorName: string;
}

export interface UpdateBlogPost {
  title?: string;
  summary?: string;
}

export interface UpdateBlogPostImage {
  image?: string;
  blogId: string;
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

// Code post Type

export interface CreateCodePost {
  fileName: string;
  code: string;
  language: string;
  codeFileName?: string;
  aspectRatioName: string;
  backgroundColorName: string;
}

export interface UpdateCodePost {
  code?: string;
  language?: string;
  codeFileName?: string;
}

export interface CodePostFileName {
  fileName?: string;
  codeId: string;
}

export interface CodePostAspectRatio {
  aspectRatioName?: string;
  codeId: string;
}

export interface CodePostBackgroundColor {
  backgroundColorName?: string;
  codeId: string;
}

// Screenshot post Type

export interface CreateScreenshotPost {
  image: string;
  fileName: string;
  aspectRatioName: string;
  backgroundColorName: string;
}

export interface UpdateScreenshotPostImage {
  image?: string;
  screenshotId: string;
}

export interface ScreenshotPostFileName {
  fileName?: string;
  screenshotId: string;
}

export interface ScreenshotPostAspectRatio {
  aspectRatioName?: string;
  screenshotId: string;
}

export interface ScreenshotPostBackgroundColor {
  backgroundColorName?: string;
  screenshotId: string;
}

// Testimonial post Type

export interface CreateTestimonialPost {
  fileName: string;
  fullName: string;
  occupation: string;
  review: string;
  aspectRatioName: string;
  backgroundColorName: string;
}

export interface UpdateTestimonialPost {
  fullName?: string;
  occupation?: string;
  review?: string;
}

export interface UpdateTestimonialPostAvatar {
  avatar?: string;
  testimonialId: string;
}

export interface TestimonialPostFileName {
  fileName?: string;
  testimonialId: string;
}

export interface TestimonialPostAspectRatio {
  aspectRatioName?: string;
  testimonialId: string;
}

export interface TestimonialPostBackgroundColor {
  backgroundColorName?: string;
  testimonialId: string;
}

// Register Form Type

export interface RegisterFormInput {
  username: string;
  email: string;
  password: string;
  correctPassword: string;
}
