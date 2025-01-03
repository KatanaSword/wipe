import { FooterProps } from "@/type";
import { Text } from "./text";

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={`flex flex-col bg-black px-12 py-12 md:px-8 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="flex max-w-7xl justify-between sm:flex-col sm:gap-4">
            <div className="flex w-[40%] flex-col gap-4 sm:w-[100%]">
              <Text className="text-white">Wipe</Text>
              <Text className="text-white">
                Enhance your social media game with Wipe – the ultimate post
                beautifier! ✨🎨 From polished captions to stunning visuals,
                Wipe helps you create posts that stand out and captivate your
                audience. Whether you're building your brand or just want to
                level up your online presence, Wipe makes every post
                unforgettable. 🌟 Try it now and turn your feed into a
                masterpiece! 💫
              </Text>
            </div>
            <div className="flex flex-shrink justify-between gap-[140px] sm:gap-10">
              <div>
                <Text className="text-white">Link</Text>
                <ul className="text-white">Tools</ul>
                <ul className="text-white">Pricing</ul>
                <ul className="text-white">Contact</ul>
                <ul className="text-white">About</ul>
              </div>
              <div>
                <Text className="text-nowrap text-white">Follow us</Text>
                <ul className="text-white">X</ul>
                <ul className="text-white">Linkedin</ul>
                <ul className="text-white">Github</ul>
              </div>
              <div>
                <Text className="text-white">Legal</Text>
                <ul className="text-nowrap text-white">Privacy Policy</ul>
                <ul className="text-nowrap text-white">Terms of Service</ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Text className="text-white">
            © 2024 Wipe™. All Rights Reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
