import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { CardFooter, CardHeader } from "./card";

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
          <Card className="min-h-[297px] w-full bg-purple-P100">
            <CardHeader className="h-[63px] w-[63px] rounded-lg bg-purple-P300">
              {item.svg}
            </CardHeader>
            <CardTitle className="mt-8 text-2xl font-bold text-black">
              {item.title}
            </CardTitle>
            <CardDescription className="mt-4 text-base font-medium text-gray-G50">
              {item.description}
            </CardDescription>
            <CardFooter className="absolute bottom-2 p-0 text-lg font-semibold text-black">
              Learn More
            </CardFooter>
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
        "relative z-20 h-full w-full overflow-hidden rounded-lg bg-black p-4",
        className
      )}
    >
      <div className="relative z-50">
        <div className="relative min-h-[265px] p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-sm leading-relaxed tracking-wide text-zinc-400",
        className
      )}
    >
      {children}
    </p>
  );
};
