import { ArrowRightSVG, PlaySVG } from "@/assets/images";
import { Footer, Header, Text } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

const HomepagePage = () => {
  return (
    <div className="flex w-full flex-col justify-center">
      <Header className="flex w-full items-center justify-center bg-purple-P100 px-[72px] py-[20px] dark:bg-black md:px-5" />
      <HeroHighlight className="flex w-full justify-center px-[72px]">
        <div className="w-[1280px]">
          <section className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="lg:text-5xl lg:leading-snug mx-auto max-w-4xl px-4 text-center text-[50px] font-black leading-[70.00px] text-black dark:text-white md:text-4xl"
              >
                Transform Your Social Posts Into Stunning Visual
                <Highlight className="ml-2 text-purple-P400 dark:text-white">
                  Masterpieces.
                </Highlight>
              </motion.h1>
              <Text className="w-[700px] text-center text-lg text-black">
                Elevate your brand effortlessly by transforming everyday content
                into captivating, beautifully designed social posts that
                consistently drive engagement and boost your online presence
                through creative visual storytelling.
              </Text>
              <div className="my-8 flex gap-6">
                <Button className="rounded-[50px] bg-purple-P400 px-6 py-6 text-lg">
                  Get Started{" "}
                  <ArrowRightSVG
                    height="18px"
                    width="18px"
                    fillColor="#ffffff"
                  />
                </Button>
                <Button
                  className="rounded-[50px] border-2 border-purple-P400 bg-white px-[23px] py-[23px] text-lg text-purple-P400"
                  variant="outline"
                >
                  Get Demo{" "}
                  <PlaySVG height="18px" width="18px" fillColor="#8643f9" />
                </Button>
              </div>
            </div>
          </section>
          <section></section>
        </div>
      </HeroHighlight>
      <Footer className="flex w-full items-center justify-center gap-2 bg-purple-P100 px-[72px] py-[50px] dark:bg-black md:px-5" />
    </div>
  );
};

export default HomepagePage;
