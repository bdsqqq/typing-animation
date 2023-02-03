import { type NextPage } from "next";

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

const lorem20Words = lorem20.split(" ");
const lorem20WordsLetteres = lorem20Words.map((word) => word.split(""));

import { motion } from "framer-motion";
const AnimatedText = () => {
  return (
    <div>
      {lorem20WordsLetteres.map((word, wordIndex) => {
        return (
          <span key={wordIndex}>
            {word.map((letter, letterIndex) => {
              return (
                <motion.span
                  key={letterIndex}
                  className="inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: wordIndex * 1 + letterIndex * 0.1 }}
                >
                  {letter}
                </motion.span>
              );
            })}
            <span> </span>
          </span>
        );
      })}
    </div>
  );
};

export default Home;
