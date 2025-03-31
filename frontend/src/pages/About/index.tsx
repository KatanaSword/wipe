import { Footer, Header } from "@/components/ui";
import { Text } from "@/components/ui";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { HoverEffect } from "@/components/ui/about-card-hover-effect";
import { Contact } from "@/type";

const AboutPage = () => {
  const contact: Contact[] = [
    {
      svg: <div></div>,
      title: "Email",
      description: "tajanesaurabh123@gmail.com",
      link: "",
    },
    {
      svg: <div></div>,
      title: "Discord",
      description: "loemc dbdhfgwdw djfnfh fks",
      link: "",
    },
    {
      svg: <div></div>,
      title: "Phone No.",
      description: "+917066463458",
      link: "",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white-W200 dark:bg-black-B800">
      <Header className="flex w-full items-center justify-center bg-purple-P100 px-[72px] py-[20px] dark:bg-black-B900 md:px-5" />
      <main className="w-[1280px]">
        <section className="my-[150px] flex flex-col items-center justify-center gap-[120px]">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <Text
              className="mx-auto max-w-5xl px-4 text-center text-[55px] font-black leading-[70.00px] text-black-B900 dark:text-white-W100 md:text-4xl"
              as="h1"
            >
              About Wipe
            </Text>
            <Text className="max-w-4xl text-center text-lg font-medium text-gray-G50">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
              hic, recusandae suscipit eaque labore fugiat quos voluptatum vel
              odio enim dolores, ducimus quis quae aliquam doloremque id
              doloribus ipsum iste?
            </Text>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[30px]">
            <div className="w-[1152px]">
              <AspectRatio
                ratio={21 / 9}
                className="rounded-lg bg-white-W100"
              ></AspectRatio>
            </div>
            <div className="flex flex-col gap-[10px]">
              <Text className="text-center text-3xl font-bold" as="h2">
                Reach out to us today
              </Text>
              <Text className="text-center text-lg font-medium text-gray-G50">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit
              </Text>
            </div>
            <div className="max-w-6xl">
              <HoverEffect items={contact} className="flex justify-between" />
            </div>
          </div>
        </section>
      </main>
      <Footer className="flex w-full items-center justify-center gap-2 bg-purple-P100 px-[72px] py-[50px] dark:bg-black-B900 md:px-5" />
    </div>
  );
};

export default AboutPage;
