import { LampContainer } from "@/components/ui/lamp";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AnimationTransition } from "@/shared/animation-transition";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const SplashScreen: React.FC = () => {
  return (
    <>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <TextGenerateEffect
            className="font-medium tracking-tight [&>div>div>div>span]:!text-slate-300 [&>div>div]:text-7xl w-[60%] mx-auto"
            words={"Encontre o melhor caminho entre cidades"}
          />
          <Link
            to="/flow"
            className="group text-base tracking-normal hover:border-white hover:text-white inline-flex h-12 animate-shimmer gap-1 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Começar agora
            <ChevronRight className="size-4 mt-1 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.h1>
      </LampContainer>
      <AnimationTransition />
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0"
        particleColor="#353535"
      />
    </>
  );
};
