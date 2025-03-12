import {
  ArrowRightSVG,
  PlaySVG,
  StartedPlanSVG,
  ProPlanSVG,
  EnterprisePlanSVG,
} from "@/assets/images";
import { Footer, Header, Line, Text } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Highlight } from "@/components/ui/hero-highlight";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { PricingPoint } from "@/type";

const HomepagePage = () => {
  const pricingPoint: PricingPoint[] = [
    {
      id: 1,
      point: "Unlimited Access",
    },
    {
      id: 2,
      point: "Priority Customer Support",
    },
    {
      id: 3,
      point: "Exclusive Discounts",
    },
    {
      id: 4,
      point: "Early Feature Access",
    },
    {
      id: 5,
      point: "Ad-Free Experience",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header className="flex w-full items-center justify-center bg-purple-P100 px-[72px] py-[20px] dark:bg-black md:px-5" />
      <div className="w-[1280px]">
        <section className="mt-[80px] flex w-full items-center justify-center">
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
              className="lg:text-5xl lg:leading-snug mx-auto max-w-5xl px-4 text-center text-[55px] font-black leading-[70.00px] text-black dark:text-white md:text-4xl"
            >
              Transform Your Social Posts Into Stunning Visual
              <Highlight className="ml-2 text-purple-P400 dark:text-white">
                Masterpieces.
              </Highlight>
            </motion.h1>
            <Text className="max-w-4xl text-center text-base text-gray-G50">
              Elevate your brand effortlessly by transforming everyday content
              into captivating, beautifully designed social posts that
              consistently, beautifully designed social posts that consistently.
            </Text>
            <div className="my-4 flex gap-6">
              <Button className="rounded-[50px] bg-purple-P500 p-6 text-lg">
                Get Started{" "}
                <ArrowRightSVG height="18px" width="18px" fillColor="#ffffff" />
              </Button>
              <Button
                className="rounded-[50px] border-2 border-purple-P500 bg-white px-[23px] py-[23px] text-lg text-purple-P400"
                variant="outline"
              >
                Get Demo{" "}
                <PlaySVG height="18px" width="18px" fillColor="#8643f9" />
              </Button>
            </div>
          </div>
        </section>
        <section className="mt-[100px] flex w-full flex-col items-center justify-center gap-[40px]">
          <div className="flex w-full flex-col items-center justify-center gap-[10px]">
            <Text className="text-center text-lg font-bold text-gray-G50">
              Pricing
            </Text>
            <Text
              className="max-w-4xl text-center text-[35px] font-black"
              as="h2"
            >
              Lorem ipsum dolor sit amet{" "}
              <Text
                className="inline text-center text-[35px] font-black text-purple-P400"
                as="h2"
              >
                adipisicing
              </Text>
            </Text>
            <Text className="max-w-3xl text-center text-base text-gray-G50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              veritatis quae quibusdam eius, unde eaque quaerat numquam
              reiciendis sunt officiis facere.
            </Text>
            <div className="my-4 flex gap-2">
              <Text className="text-base font-semibold">Monthly</Text>
              <Switch />
              <Text className="text-base font-semibold">Annually</Text>
              <div className="flex items-center rounded-[5px] bg-purple-P300 px-2">
                <Text className="text-xs text-white">20% Off</Text>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <Card className="w-[400px] rounded-lg border-0 bg-purple-P100">
              <CardHeader className="flex gap-[10px]">
                <div className="w-[42px] rounded-[5px] bg-purple-P300 p-[6px]">
                  <StartedPlanSVG fillColor="#ffffff" />
                </div>
                <CardTitle className="font-bold">Starter Plan</CardTitle>
                <CardDescription className="pt-0 text-base font-medium">
                  Kickstart Your Journey With Our Easy And Affordable Starter
                  plane
                </CardDescription>
                <Text className="text-3xl font-black">FREE</Text>
                <Line className="h-px w-full bg-purple-P200" />
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {pricingPoint.map((points) => (
                    <li
                      key={points.id}
                      className="text-base font-medium text-gray-G50 before:mr-2 before:text-xl before:font-bold before:text-purple-P300 before:content-['✓']"
                    >
                      {points.point}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-full bg-purple-P300 text-lg"
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[400px] rounded-lg border-0 bg-purple-P100">
              <CardHeader className="flex gap-[10px]">
                <div className="bg-yellow-Y200 w-[42px] rounded-[5px] p-[6px]">
                  <ProPlanSVG fillColor="#ffffff" />
                </div>
                <CardTitle className="font-bold">Starter Plan</CardTitle>
                <CardDescription className="pt-0 text-base font-medium">
                  Kickstart Your Journey With Our Easy And Affordable Starter
                  plane
                </CardDescription>
                <Text className="text-3xl font-black">
                  $19{" "}
                  <Text className="inline text-base font-normal text-gray-G50">
                    /month
                  </Text>
                </Text>
                <Line className="h-px w-full bg-purple-P200" />
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {pricingPoint.map((points) => (
                    <li
                      key={points.id}
                      className="text-base font-medium text-gray-G50 before:mr-2 before:text-xl before:font-bold before:text-purple-P300 before:content-['✓']"
                    >
                      {points.point}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-full bg-purple-P500 text-lg"
                  size="lg"
                >
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[400px] rounded-lg border-0 bg-purple-P100">
              <CardHeader className="flex gap-[10px]">
                <div className="w-[42px] rounded-[5px] bg-purple-P300 p-[6px]">
                  <EnterprisePlanSVG fillColor="#ffffff" />
                </div>
                <CardTitle className="font-bold">Enterprise Plan</CardTitle>
                <CardDescription className="pt-0 text-base font-medium">
                  Kickstart Your Journey With Our Easy And Affordable Starter
                  plane
                </CardDescription>
                <Text className="text-3xl font-black">
                  $49{" "}
                  <Text className="inline text-base font-normal text-gray-G50">
                    /month
                  </Text>
                </Text>
                <Line className="h-px w-full bg-purple-P200" />
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {pricingPoint.map((points) => (
                    <li
                      key={points.id}
                      className="text-base font-medium text-gray-G50 before:mr-2 before:text-xl before:font-bold before:text-purple-P300 before:content-['✓']"
                    >
                      {points.point}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-full bg-purple-P300 text-lg"
                  size="lg"
                >
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
      <Footer className="flex w-full items-center justify-center gap-2 bg-purple-P100 px-[72px] py-[50px] dark:bg-black md:px-5" />
    </div>
  );
};

export default HomepagePage;
