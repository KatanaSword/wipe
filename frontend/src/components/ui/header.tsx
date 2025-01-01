import { DarkThemeSVG, SignupSVG } from "@/assets/images";
import { Text } from "./text";
import { HeaderProps } from "@/type";
import { GithubSVG } from "@/assets/images";

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`flex justify-center bg-black py-4 md:px-8 ${className}`}
    >
      <div className="flex w-[1024px] max-w-5xl items-center justify-between">
        <div className="flex w-auto items-center justify-center">
          <Text className="text-white">Wipe</Text>
          <div className="hidden">
            <Text className="text-white">Wipe</Text>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="flex w-[400px] items-center justify-between">
          <Text className="text-white">Tools</Text>
          <Text className="text-white">Pricing</Text>
          <Text className="text-white">About</Text>
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
