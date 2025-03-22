import { Config } from "@/type";

const config: Config = {
  backendUserUrl: String(import.meta.env.BACKEND_USER_URL),
  backendBackgroundColorUrl: String(import.meta.env.BACKEND_BC_URL),
  backendAspectRatioUrl: String(import.meta.env.BACKEND_AR_URL),
  backendBlogUrl: String(import.meta.env.BACKEND_BLOG_URL),
  backendCodeUrl: String(import.meta.env.BACKEND_CODE_URL),
  backendScreenshotUrl: String(import.meta.env.BACKEND_SS_URL),
  backendTestimonialUrl: String(import.meta.env.BACKEND_TESTIMONIAL_URL),
};

export default config;
