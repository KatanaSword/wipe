import { FooterProps } from "@/type";
import { Text } from "./text";
import { Line } from "./line";

const Footer: React.FC<FooterProps> = ({ className = "bg-black" }) => {
  return (
    <>
      <footer
        className={`flex w-full items-center justify-center gap-2 px-[75px] py-[50px] md:px-5 ${className}`}
      >
        <div className="flex w-full flex-col items-center justify-center gap-[150px] self-center md:gap-10">
          <div className="flex w-full flex-row items-start justify-between md:flex-col md:gap-10">
            <div className="flex w-auto flex-col items-start justify-start gap-4">
              <Text
                className="w-auto text-[32px] tracking-[-0.50px] text-gray-50 md:text-3xl sm:text-[28px]"
                size=""
              >
                Wipe
              </Text>
              <Text
                className="max-w-[350px] text-base leading-[35.00px] tracking-[-0.50px] text-gray-50 md:max-w-full"
                size=""
              >
                Enhance your social media game with Wipe – the Texttimate post
                beautifier! ✨🎨 From polished captions to stunning visuals,
                Wipe helps you create posts that stand out and captivate your
                audience. Whether you're building your brand or just want to
                level up your online presence, Wipe makes every post
                unforgettable. 🌟 Try it now and turn your feed into a
                masterpiece! 💫
              </Text>
            </div>
            <div className="flex w-[209px] flex-col items-start justify-start gap-5">
              <Text
                className="w-auto text-xl tracking-[-0.50px] text-gray-50"
                size=""
              >
                Link
              </Text>
              <div className="flex w-auto flex-col items-start justify-start gap-6">
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Tools
                </Text>
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Pricing
                </Text>
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Contact
                </Text>
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  About
                </Text>
              </div>
            </div>
            <div className="flex w-[209px] flex-col items-start justify-start gap-5">
              <Text className="w-auto text-nowrap text-xl tracking-[-0.50px] text-gray-50">
                Follow us
              </Text>
              <div className="flex w-auto flex-col items-start justify-start gap-6">
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  X
                </Text>
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Linkedin
                </Text>
                <Text
                  className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Github
                </Text>
              </div>
            </div>
            <div className="flex w-[209px] flex-col items-start justify-start gap-5">
              <Text className="w-auto text-xl tracking-[-0.50px] text-gray-50">
                Legal
              </Text>
              <div className="flex w-auto flex-col items-start justify-start gap-6">
                <Text
                  className="w-auto text-nowrap text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Privacy Policy
                </Text>
                <Text
                  className="w-auto text-nowrap text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100"
                  size=""
                >
                  Terms of Service
                </Text>
              </div>
            </div>
          </div>
          <Line />
          <div className="flex w-full flex-row items-start justify-start md:gap-10 sm:flex-col">
            <Text
              className="w-auto text-nowrap text-base tracking-[-0.50px] text-gray-50"
              size=""
            >
              © 2024 Wipe™. All Rights Reserved.
            </Text>
          </div>
        </div>
      </footer>
    </>
  );
};

export { Footer };
