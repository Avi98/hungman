"use client";

import { motion } from "framer-motion";
import { Head } from "./Head";
import { HangmanBody } from "./Body";
import { Arms } from "./Arms";
import { Legs } from "./Legs";
import { Frame } from "./Frame";

const Hangman = () => {
  // Add motion components for other SVG elements

  return (
    <motion.svg
      id="hangman-svg"
      viewBox="0 0 150 200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      height={"100%"}
      width={"100%"}
    >
      <Head />
      <HangmanBody />
      <Arms />
      <Legs />
      <Frame />
      {/* <HangFrame /> */}
    </motion.svg>
  );
};

export default Hangman;
