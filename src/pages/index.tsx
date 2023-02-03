import { type NextPage } from "next";
import { clsx } from "clsx";

const Home: NextPage = () => {
  return (
    <main className="grid h-full min-h-screen place-items-center bg-zinc-900 p-12 text-zinc-300">
      <div className="mx-auto max-w-3xl rounded-lg bg-zinc-800 p-8 ">
        <AnimatedText />
      </div>
    </main>
  );
};

const lorem20 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, repellendus delectus est ipsum ipsam blanditiis officia labore quod totam molestias!";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const AnimatedText = () => {
  const [current, setCurrent] = useState(-1);
  const [msPerChar, setMsPerChar] = useState(75);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: Math.min(msPerChar / 1000, 0.2),
        delay: Math.random() * 0.07,
      },
    },
    hidden: {
      x: -2,
      opacity: 0,
      transition: {
        duration: msPerChar / 1000,
      },
    },
    exit: {
      opacity: 0,
      x: -4,
      transition: {
        duration: msPerChar / 1000,
      },
    },
  };

  useEffect(() => {
    if (current >= lorem20.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (Math.random() > 0.05 ? prev + 1 : prev - 1));
    }, msPerChar);
    return () => clearInterval(interval);
  }, [current, msPerChar]);

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setCurrent(-1);
          }}
        >
          Hej
        </button>
        <div
          className={clsx(
            "h-2 w-2 animate-pulse rounded-full transition-colors",
            current != lorem20.split("").length ? "bg-green-800" : " bg-red-700"
          )}
        ></div>

        <div>
          <motion.input
            className="w-12 origin-right border-b border-zinc-500 bg-transparent px-2 text-zinc-300 transition-all focus:border-zinc-400 focus:outline-none"
            style={{
              width: `calc(${msPerChar.toString().length}ch + 1rem)`,
            }}
            inputMode="numeric"
            value={msPerChar}
            onChange={(e) => {
              const newValue = !isNaN(parseInt(e.target.value))
                ? parseInt(e.target.value)
                : 0;
              setMsPerChar(newValue);
            }}
          />
        </div>
      </div>
      <p>
        {lorem20.split("").map((char, charIndex) => {
          console.log(char);
          return (
            <motion.span
              custom={charIndex}
              key={`${char}-${charIndex}`}
              animate={current >= charIndex ? "visible" : "hidden"}
              variants={variants}
              className={clsx("inline-block", char === " " && "w-1")}
            >
              {char}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};

export default Home;
