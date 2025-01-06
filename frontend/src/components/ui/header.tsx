import { DarkThemeSVG, SignupSVG } from "@/assets/images";
import { Text } from "./text";
import { HeaderProps } from "@/type";
import { GithubSVG } from "@/assets/images";

const Header: React.FC<HeaderProps> = ({ className = "bg-black" }) => {
  return (
    <header
      className={`flex w-full items-center justify-center px-[75px] py-[35px] md:px-5 ${className}`}
    >
      <div className="flex w-[1280px] flex-row items-center justify-between md:flex-col md:gap-10">
        <div className="flex items-center justify-between sm:w-[100%]">
          <Text className="text-white">Wipe</Text>
          <div className="mx-1 hidden h-[1.5px] w-[20px] cursor-pointer bg-black sm:block">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="flex w-[498px] flex-row items-center justify-between gap-9 sm:hidden sm:w-full sm:flex-1">
          <Text className="text-white" size="">
            Tools
          </Text>
          <Text className="text-white" size="">
            Pricing
          </Text>
          <Text className="text-white" size="">
            About
          </Text>
        </div>
        <div className="flex items-center justify-center gap-8 sm:hidden">
          <SignupSVG fill="white" height="22px" width="22px" />
          <div className="flex gap-1">
            <GithubSVG fill="white" height="22px" width="22px" />
            <Text className="text-white">100</Text>
          </div>
          <DarkThemeSVG fill="white" height="22px" width="22px" />
        </div>
      </div>
    </header>
  );
};

export { Header };
