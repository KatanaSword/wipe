import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { Text } from "./text";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    svg: React.ReactNode;
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "lg:grid-cols-3 grid grid-cols-1 py-10 md:grid-cols-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-lg bg-neutral-200 dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="flex w-[350px] bg-purple-P100 dark:bg-black-B900">
            <div className="h-[50px] w-[50px] rounded-lg bg-purple-P300">
              {item.svg}
            </div>
            <div className="flex flex-col gap-[10px]">
              <Text className="text-xl font-bold">{item.title}</Text>
              <Text className="text-nowrap text-base font-medium text-gray-G50">
                {item.description}
              </Text>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full rounded-lg p-4 dark:bg-black-B900",
        className
      )}
    >
      <div className="relative z-50">
        <div className="relative flex w-full items-center justify-center gap-[30px] p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
