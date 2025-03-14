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
import { PricingPoint, Services, FAQS, Testimonials } from "@/type";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

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

  const services: Services[] = [
    {
      svg: <div></div>,
      title: "Product Launch",
      description:
        "A technology company that builds economic infrastructure for the.",
      link: "https://stripe.com",
    },
    {
      svg: <div></div>,
      title: "Revenue Generation",
      description:
        "A streaming service that offers a wide variety of award-winning.",
      link: "https://netflix.com",
    },
    {
      svg: <div></div>,
      title: "Quick Solutions",
      description:
        "A multinational technology company that specializes in Internet.",
      link: "https://google.com",
    },
  ];

  const faqs: FAQS[] = [
    {
      id: 1,
      question: "What is JavaScript?",
      answer:
        "JavaScript is a programming language used to create dynamic and interactive content on websites.",
    },
    {
      id: 2,
      question: "How do I declare a variable in JavaScript?",
      answer:
        "You can declare a variable using 'var', 'let', or 'const'. Example: let name = 'John';",
    },
    {
      id: 3,
      question: "What is the difference between '==' and '===' in JavaScript?",
      answer:
        "'==' checks for value equality, while '===' checks for both value and type equality.",
    },
    {
      id: 4,
      question: "How do I create a function in JavaScript?",
      answer:
        "You can create a function using the 'function' keyword or an arrow function. Example: function greet() { return 'Hello'; }",
    },
  ];

  const testimonials: Testimonials[] = [
    {
      review:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      occupation: "A Tale of Two Cities",
      profile: "",
    },
    {
      review:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      occupation: "Hamlet",
      profile: "",
    },
    {
      review: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      occupation: "A Dream Within a Dream",
      profile: "",
    },
    {
      review:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      occupation: "Pride and Prejudice",
      profile: "",
    },
    {
      review:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      occupation: "Moby-Dick",
      profile: "",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header className="flex w-full items-center justify-center bg-purple-P100 px-[72px] py-[20px] dark:bg-black md:px-5" />
      <main className="w-[1280px]">
        <section className="my-[150px] flex w-full items-center justify-center px-[72px]">
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
            <Text className="max-w-3xl text-center text-lg font-medium text-gray-G50">
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
        <section className="my-[150px] flex w-full flex-col items-center justify-center px-[72px]">
          <div className="flex w-full flex-col items-center justify-center gap-[10px]">
            <Text className="text-center text-xl font-bold text-gray-G50">
              Basic Pack
            </Text>
            <Text
              className="max-w-4xl text-center text-[40px] font-black"
              as="h2"
            >
              Lorem ipsum dolor{" "}
              <Text
                className="inline text-center text-[40px] font-black text-purple-P400"
                as="h2"
              >
                sit amet.
              </Text>
            </Text>
            <div className="w-full">
              <HoverEffect className="flex justify-between" items={services} />
            </div>
          </div>
          <div className="mt-[80px] w-full">
            <div className="flex flex-col gap-[60px]">
              <div className="flex w-full justify-between">
                <div className="flex flex-col items-start justify-center">
                  <Text className="inline rounded-full bg-purple-P300 px-[20px] py-[2px] font-semibold text-white">
                    Product Launch Tool
                  </Text>
                  <Text
                    className="mt-[10px] max-w-xl text-[40px] font-black"
                    as="h2"
                  >
                    Lorem ipsum, dolor sit amet{" "}
                    <Text className="inline text-purple-P400">consectetur</Text>{" "}
                    adipisicing elit. Rem ea quaerat dolores?
                  </Text>
                  <Text className="mt-[15px] max-w-xl text-lg font-medium text-gray-G50">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ex, in iste quisquam inventore modi quidem, sed quasi eum
                    labore sequi molestiae harum deleniti corrupti repellat.
                  </Text>
                </div>
                <div className="w-[500px]">
                  <AspectRatio
                    ratio={5 / 4}
                    className="rounded-xl bg-black"
                  ></AspectRatio>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="w-[500px]">
                  <AspectRatio
                    ratio={5 / 4}
                    className="rounded-xl bg-black"
                  ></AspectRatio>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <Text className="inline rounded-full bg-purple-P300 px-[20px] py-[2px] font-semibold text-white">
                    Revenue Generation
                  </Text>
                  <Text
                    className="mt-[10px] max-w-xl text-[40px] font-black"
                    as="h2"
                  >
                    Lorem ipsum, dolor sit amet{" "}
                    <Text className="inline text-purple-P400">consectetur</Text>{" "}
                    adipisicing elit. Rem ea quaerat dolores?
                  </Text>
                  <Text className="mt-[15px] max-w-xl text-lg font-medium text-gray-G50">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ex, in iste quisquam inventore modi quidem, sed quasi eum
                    labore sequi molestiae harum deleniti corrupti repellat.
                  </Text>
                </div>
              </div>
            </div>
            <div className="mt-[100px] flex w-full items-center justify-center">
              <Button className="bg-purple-P400 text-xl" size="xl">
                Get Started{" "}
                <ArrowRightSVG width="20px" height="20px" fillColor="#ffffff" />
              </Button>
            </div>
          </div>
        </section>
        <section className="my-[150px] flex w-full flex-col items-center justify-center gap-[40px] px-[72px]">
          <div className="flex w-full flex-col items-center justify-center gap-[10px]">
            <Text className="text-center text-xl font-bold text-gray-G50">
              Pricing
            </Text>
            <Text
              className="max-w-4xl text-center text-[40px] font-black"
              as="h2"
            >
              Lorem ipsum dolor sit amet{" "}
              <Text
                className="inline text-center text-[40px] font-black text-purple-P400"
                as="h2"
              >
                adipisicing
              </Text>
            </Text>
            <Text className="max-w-3xl text-center text-lg font-medium text-gray-G50">
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
            <Card className="w-[350px] rounded-lg border-0 bg-purple-P100">
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
                  className="h-11 w-full rounded-full bg-purple-P300 text-lg"
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] rounded-lg border-0 bg-purple-P100">
              <CardHeader className="flex gap-[10px]">
                <div className="w-[42px] rounded-[5px] bg-yellow-Y200 p-[6px]">
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
                  className="h-11 w-full rounded-full bg-purple-P500 text-lg"
                  size="lg"
                >
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] rounded-lg border-0 bg-purple-P100">
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
                  className="h-11 w-full rounded-full bg-purple-P300 text-lg"
                  size="lg"
                >
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="my-[150px] flex w-full items-center justify-center px-[72px]">
          <div className="flex w-full flex-col items-center justify-center gap-[10px]">
            <Text className="text-center text-xl font-bold text-gray-G50">
              Frequently Answer Quitions
            </Text>
            <Text
              className="max-w-2xl text-center text-[40px] font-black"
              as="h2"
            >
              Common Queries{" "}
              <Text
                className="inline text-center text-[40px] font-black text-purple-P400"
                as="h2"
              >
                Solved,{" "}
              </Text>
              Quick Answers For You
            </Text>
            <Accordion type="single" collapsible className="w-[750px]">
              {faqs.map((faq) => (
                <AccordionItem value={`item-${faq.id}`} key={faq.id}>
                  <AccordionTrigger className="text-2xl font-semibold text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-white">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section className="my-[150px] flex w-full items-center justify-center px-[72px]">
          <div className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center gap-[10px]">
              <Text className="text-center text-xl font-bold text-gray-G50">
                Testimonial
              </Text>
              <Text
                className="max-w-2xl text-center text-[40px] font-black"
                as="h2"
              >
                Customer{" "}
                <Text
                  className="inline text-center text-[40px] font-black text-purple-P400"
                  as="h2"
                >
                  Experiences{" "}
                </Text>
                With Our Platform
              </Text>
              <Text className="max-w-3xl text-center text-lg font-medium text-gray-G50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis illo ea obcaecati corrupti culpa vel, ipsum harum
                officiis necessitatibus consectetur eos esse.
              </Text>
            </div>
            <div className="dark:bg-grid-white/[0.05] relative flex h-[25rem] flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased dark:bg-black">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </div>
          </div>
        </section>
        <section className="my-[150px] flex w-full items-center justify-center px-[72px]"></section>
      </main>
      <Footer className="flex w-full items-center justify-center gap-2 bg-purple-P100 px-[72px] py-[50px] dark:bg-black md:px-5" />
    </div>
  );
};

export default HomepagePage;
