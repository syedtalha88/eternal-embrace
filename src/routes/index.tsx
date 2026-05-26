import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import bgHero from "@/assets/bg-hero.jpg";
import bgSec1 from "@/assets/bg-sec-1.jpg";
import bgSec2 from "@/assets/bg-sec-2.jpg";
import bgSec3 from "@/assets/bg-sec-3.jpg";
import bgSec4 from "@/assets/bg-sec-4.jpg";
import bgSec5 from "@/assets/bg-sec-5.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import story5 from "@/assets/story-5.jpg";
import story6 from "@/assets/story-6.jpg";
import story7 from "@/assets/story-7.jpg";
import floralCorner from "@/assets/floral-corner.png";
import floralHanging from "@/assets/floral-hanging.png";
import floralWreath from "@/assets/floral-wreath.png";
import waxSeal from "@/assets/wax-seal.png";
import ornBouquet from "@/assets/orn-bouquet.png";
import ornStrand from "@/assets/orn-strand.png";
import ornRibbon from "@/assets/orn-ribbon.png";
import ornTassel from "@/assets/orn-tassel.png";
import ornFrame from "@/assets/orn-frame.png";
import ornLace from "@/assets/orn-lace.png";
import ornMonogram from "@/assets/orn-monogram.png";

const SECTION_BGS = [bgHero, bgSec1, bgSec2, bgSec3, bgSec4, bgSec5];

/* ---------- Envelope (Section 1) ---------- */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const handle = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{
          y: opening ? -20 : [0, -6, 0],
          opacity: 1,
          scale: 1,
        }}
        transition={{
          y: opening
            ? { duration: 0.6 }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.2, delay: 0.6 },
          scale: { duration: 1.2, delay: 0.6 },
        }}
        className="relative"
        style={{ width: "min(80vw, 320px)", aspectRatio: "1.55 / 1" }}
        onClick={handle}
      >
        <div className="absolute inset-0 paper-burgundy rounded-sm gold-frame overflow-hidden">
          <div className="absolute inset-3 border border-[#c9a44c]/40 rounded-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-script text-[#c9a44c]/30 text-7xl select-none">
              P&amp;B
            </span>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ rotateX: opening ? -180 : 0 }}
          transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
          style={{
            transformOrigin: "top",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          className="absolute left-0 right-0 top-0"
        >
          <div
            className="paper-burgundy gold-frame"
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "60%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              filter: "brightness(0.92)",
            }}
          />
        </motion.div>

        <motion.button
          aria-label="Open invitation"
          initial={false}
          animate={{
            scale: opening ? 0 : 1,
            opacity: opening ? 0 : 1,
            rotate: opening ? 30 : 0,
          }}
          transition={{ duration: 0.5 }}
          onClick={handle}
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ top: "44%", width: "30%", aspectRatio: "1" }}
        >
          <img
            src={waxSeal}
            alt=""
            className="w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.55)]"
          />
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-[14%] left-0 right-0 text-center font-script text-[#f5d98a] text-2xl tracking-wide"
      >
        Click to Open Invitation
      </motion.p>
    </div>
  );
}

/* ---------- Petal burst (on scratch reveal) ---------- */
function PetalBurst({ color = "#d98ca0" }: { color?: string }) {
  const petals = Array.from({ length: 14 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {petals.map((_, i) => {
        const angle = (i / petals.length) * Math.PI * 2;
        const dist = 90 + Math.random() * 60;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 20;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{
              x: dx,
              y: dy,
              opacity: [0, 1, 0],
              scale: [0.3, 1, 0.9],
              rotate: 180 + Math.random() * 180,
            }}
            transition={{ duration: 1.6, ease: "easeOut", delay: i * 0.03 }}
            className="absolute left-1/2 top-1/2 block"
            style={{
              width: 14,
              height: 18,
              background: color,
              borderRadius: "60% 40% 60% 40% / 70% 30% 70% 30%",
              boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.15)",
              transformOrigin: "center",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Royal Scratch Card (Section 2) ---------- */
function ScratchCard({
  variant,
  prefix,
  name,
  onRevealed,
}: {
  variant: "burgundy" | "pink";
  prefix: string;
  name: string;
  onRevealed: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const scratchingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (variant === "burgundy") {
      grad.addColorStop(0, "#7a1f30");
      grad.addColorStop(0.5, "#a8324a");
      grad.addColorStop(1, "#4a0e1c");
    } else {
      grad.addColorStop(0, "#f4d6dd");
      grad.addColorStop(0.5, "#e8a4b4");
      grad.addColorStop(1, "#d98ca0");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(255,230,180,${Math.random() * 0.35})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = variant === "burgundy" ? "#f5d98a" : "#6b1a2a";
    ctx.font = '600 38px "Cormorant Garamond", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(prefix, width / 2, height / 2);

    ctx.font = '300 11px "Cormorant Garamond", serif';
    ctx.fillText("scratch to reveal", width / 2, height / 2 + 32);
  }, [prefix, variant]);

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const { width, height } = canvas;
    const step = 12;
    let cleared = 0;
    let total = 0;
    const data = ctx.getImageData(0, 0, width, height).data;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4 + 3;
        total++;
        if (data[i] < 32) cleared++;
      }
    }
    if (cleared / total > 0.45) {
      setRevealed(true);
      canvas.style.transition = "opacity 700ms ease";
      canvas.style.opacity = "0";
      setTimeout(onRevealed, 400);
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  const start = (e: React.PointerEvent) => {
    scratchingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    scratch(e.clientX, e.clientY);
  };
  const move = (e: React.PointerEvent) => {
    if (!scratchingRef.current) return;
    scratch(e.clientX, e.clientY);
  };
  const end = () => {
    if (!scratchingRef.current) return;
    scratchingRef.current = false;
    checkProgress();
  };

  const isBurg = variant === "burgundy";
  const accent = isBurg ? "#f5d98a" : "#6b1a2a";

  return (
    <div className="relative" style={{ width: "44vw", maxWidth: 180 }}>
      {/* Royal ornate card */}
      <div
        ref={wrapRef}
        className={`relative overflow-hidden ${isBurg ? "paper-burgundy" : "paper-pink"}`}
        style={{
          aspectRatio: "0.58 / 1",
          borderTopLeftRadius: "50% 14%",
          borderTopRightRadius: "50% 14%",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          boxShadow:
            "0 20px 40px -10px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(201,164,76,0.55), inset 0 0 22px rgba(201,164,76,0.18)",
        }}
      >
        {/* Decorative inner double border */}
        <div
          className="absolute inset-2 pointer-events-none"
          style={{
            border: `1px solid ${accent}99`,
            borderTopLeftRadius: "50% 14%",
            borderTopRightRadius: "50% 14%",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        />
        <div
          className="absolute inset-3.5 pointer-events-none"
          style={{
            border: `1px solid ${accent}55`,
            borderTopLeftRadius: "50% 12%",
            borderTopRightRadius: "50% 12%",
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
        />

        {/* Top crown flourish */}
        <svg
          viewBox="0 0 100 30"
          className="absolute left-1/2 -translate-x-1/2 top-4 w-[70%] pointer-events-none"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
        >
          <path d="M10 22 Q 30 4 50 14 Q 70 4 90 22" />
          <circle cx="50" cy="14" r="1.6" fill={accent} />
          <path d="M30 22 q 5 -4 10 0" />
          <path d="M60 22 q 5 -4 10 0" />
        </svg>

        {/* Bottom flourish */}
        <svg
          viewBox="0 0 100 20"
          className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[70%] pointer-events-none"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
        >
          <path d="M10 6 Q 50 22 90 6" />
          <circle cx="50" cy="14" r="1.4" fill={accent} />
        </svg>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center pt-6">
          <div
            className={`text-[9px] tracking-[0.45em] uppercase mb-1 ${
              isBurg ? "text-[#e8d5a8]" : "text-[#6b1a2a]"
            }`}
          >
            {isBurg ? "The Groom" : "The Bride"}
          </div>
          <div
            className={`font-script leading-none ${
              isBurg ? "gold-text" : "text-[#6b1a2a]"
            }`}
            style={{ fontSize: "2.4rem" }}
          >
            {name}
          </div>
          <div
            className={`mt-2 text-[8px] tracking-[0.5em] uppercase ${
              isBurg ? "text-[#e8d5a8]/70" : "text-[#6b1a2a]/70"
            }`}
          >
            ⚜
          </div>
          {revealed && (
            <>
              <div className="absolute inset-0 shimmer pointer-events-none" />
              <PetalBurst color={isBurg ? "#d98ca0" : "#6b1a2a"} />
            </>
          )}
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none cursor-pointer"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
      </div>

      {/* Hanging tassel under card */}
      <img
        src={ornTassel}
        alt=""
        className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-8 opacity-90 pointer-events-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.4)]"
      />
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function FadeSection({
  containerRef,
  index,
  children,
  className = "",
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.03]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative h-[100dvh] w-full snap-start flex items-center justify-center ${className}`}
      data-section={index}
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ---------- Story layouts (12 variants) ---------- */
function StoryLayout({
  image,
  variant,
}: {
  image: string;
  variant: number;
}) {
  const layouts: Record<number, React.ReactNode> = {
    /* 1. Hanging strand garland */
    1: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <img
          src={ornStrand}
          alt=""
          loading="lazy"
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-[60%] max-w-[260px] opacity-95 pointer-events-none"
        />
        <div className="relative w-[78%] max-w-[340px] mt-20 gold-frame rounded-sm overflow-hidden">
          <img src={image} alt="" loading="lazy" className="w-full h-auto block" />
          <div className="absolute inset-1 border border-[#c9a44c]/50 pointer-events-none" />
        </div>
      </div>
    ),
    /* 2. Ribbon drape */
    2: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div className="relative w-[80%] max-w-[340px] paper p-3 gold-frame rounded-sm">
          <img src={image} alt="" loading="lazy" className="w-full h-auto block rounded-sm" />
        </div>
        <img
          src={ornRibbon}
          alt=""
          loading="lazy"
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] pointer-events-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]"
        />
      </div>
    ),
    /* 3. Luxury wreath */
    3: (
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={floralWreath}
          alt=""
          loading="lazy"
          className="absolute w-[92%] max-w-[420px] opacity-95 pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        />
        <div
          className="relative gold-frame rounded-full overflow-hidden"
          style={{ width: "48%", maxWidth: 210, aspectRatio: "1" }}
        >
          <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
    /* 4. Floral corner composition */
    4: (
      <div className="relative w-full h-full flex items-end justify-center pb-16 px-6">
        <img
          src={floralCorner}
          alt=""
          loading="lazy"
          className="absolute top-0 left-0 w-56 opacity-95 pointer-events-none -rotate-90"
        />
        <div className="relative w-[78%] max-w-[340px] gold-frame rounded-sm overflow-hidden">
          <img src={image} alt="" loading="lazy" className="w-full h-auto block" />
        </div>
        <img
          src={floralCorner}
          alt=""
          loading="lazy"
          className="absolute bottom-0 right-0 w-60 opacity-95 pointer-events-none rotate-90"
        />
      </div>
    ),
    /* 5. Wax seal + bouquet */
    5: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div className="relative w-[78%] max-w-[340px]">
          <div className="paper-burgundy p-2 gold-frame rounded-sm">
            <img src={image} alt="" loading="lazy" className="w-full h-auto block rounded-sm" />
          </div>
          <img
            src={waxSeal}
            alt=""
            loading="lazy"
            className="absolute -bottom-10 -right-6 w-24 drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)] pointer-events-none"
          />
          <img
            src={ornBouquet}
            alt=""
            loading="lazy"
            className="absolute -top-10 -left-14 w-44 opacity-95 pointer-events-none rotate-[-12deg] drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>
    ),
    /* 6. Polaroid tilt with corner flowers */
    6: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="relative paper p-3 pb-12 gold-frame rounded-sm rotate-[-4deg]"
          style={{ width: "76%", maxWidth: 320 }}
        >
          <img src={image} alt="" loading="lazy" className="w-full h-auto block" />
          <div className="absolute bottom-2 left-0 right-0 text-center font-script text-[#6b1a2a] text-2xl">
            forever
          </div>
        </div>
        <img
          src={floralCorner}
          alt=""
          loading="lazy"
          className="absolute -top-6 right-2 w-40 opacity-90 pointer-events-none"
        />
      </div>
    ),
    /* 7. Arch frame */
    7: (
      <div className="relative w-full h-full flex items-center justify-center px-8">
        <div
          className="relative gold-frame overflow-hidden"
          style={{
            width: "78%",
            maxWidth: 320,
            aspectRatio: "0.7 / 1",
            borderTopLeftRadius: "50% 30%",
            borderTopRightRadius: "50% 30%",
          }}
        >
          <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div
            className="absolute inset-2 border border-[#c9a44c]/50 pointer-events-none"
            style={{
              borderTopLeftRadius: "50% 30%",
              borderTopRightRadius: "50% 30%",
            }}
          />
        </div>
        <img
          src={ornStrand}
          alt=""
          loading="lazy"
          className="absolute -top-2 -right-10 w-32 opacity-90 pointer-events-none scale-x-[-1]"
        />
      </div>
    ),
    /* 8. Ornate baroque frame */
    8: (
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <div className="relative" style={{ width: "85%", maxWidth: 340 }}>
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-[14%] w-[72%] h-[72%] object-cover"
          />
          <img
            src={ornFrame}
            alt=""
            loading="lazy"
            className="relative w-full pointer-events-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    ),
    /* 9. Lace border invitation */
    9: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div className="relative paper p-6 gold-frame rounded-sm" style={{ width: "82%", maxWidth: 340 }}>
          <img
            src={ornLace}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
          />
          <div className="relative">
            <img src={image} alt="" loading="lazy" className="w-full h-auto block" />
            <p className="mt-3 text-center font-script text-[#6b1a2a] text-2xl">
              save the date
            </p>
          </div>
        </div>
      </div>
    ),
    /* 10. Monogram crest */
    10: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div className="relative paper-burgundy p-4 gold-frame rounded-sm" style={{ width: "80%", maxWidth: 340 }}>
          <img src={image} alt="" loading="lazy" className="w-full h-auto block rounded-sm opacity-90" />
          <img
            src={ornMonogram}
            alt=""
            loading="lazy"
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 pointer-events-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    ),
    /* 11. Bouquet duo with tassels */
    11: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <img
          src={ornTassel}
          alt=""
          loading="lazy"
          className="absolute top-0 left-3 w-12 opacity-90 pointer-events-none"
        />
        <img
          src={ornTassel}
          alt=""
          loading="lazy"
          className="absolute top-0 right-3 w-12 opacity-90 pointer-events-none scale-x-[-1]"
        />
        <div className="relative w-[78%] max-w-[330px] gold-frame rounded-sm overflow-hidden">
          <img src={image} alt="" loading="lazy" className="w-full h-auto block" />
        </div>
        <img
          src={ornBouquet}
          alt=""
          loading="lazy"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-56 pointer-events-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]"
        />
      </div>
    ),
    /* 12. Vertical ribbon banner with arch */
    12: (
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <img
          src={ornStrand}
          alt=""
          loading="lazy"
          className="absolute -top-4 left-0 w-40 opacity-90 pointer-events-none"
        />
        <img
          src={ornStrand}
          alt=""
          loading="lazy"
          className="absolute -top-4 right-0 w-40 opacity-90 pointer-events-none scale-x-[-1]"
        />
        <div
          className="relative gold-frame overflow-hidden"
          style={{
            width: "72%",
            maxWidth: 300,
            aspectRatio: "0.62 / 1",
            borderTopLeftRadius: "50% 20%",
            borderTopRightRadius: "50% 20%",
          }}
        >
          <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <img
          src={ornRibbon}
          alt=""
          loading="lazy"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] pointer-events-none"
        />
      </div>
    ),
  };
  return <>{layouts[variant]}</>;
}

/* ---------- Music button ---------- */
const MUSIC_SRC =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1bffc8e4f2.mp3?filename=romantic-piano-100029.mp3";

function MusicButton() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = 0.5;
    if (on) a.play().catch(() => {});
    else a.pause();
  }, [on]);
  return (
    <>
      <audio ref={ref} src={MUSIC_SRC} loop preload="none" />
      <button
        aria-label={on ? "Pause music" : "Play music"}
        onClick={() => setOn((v) => !v)}
        className={`fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full paper-burgundy gold-frame flex items-center justify-center text-[#f5d98a] ${
          on ? "pulse-ring" : ""
        }`}
      >
        {on ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}

/* ---------- Per-section background layer ---------- */
function BgLayer({
  src,
  scrollYProgress,
  index,
  total,
}: {
  src: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const step = 1 / total;
  const center = (index + 0.5) * step;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, center - step), center, Math.min(1, center + step)],
    [0, 1, 0],
  );
  return (
    <motion.div
      style={{
        opacity,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="absolute inset-0"
    />
  );
}

/* ---------- Main experience ---------- */
function Experience() {
  const [stage, setStage] = useState<"envelope" | "scratch" | "story">(
    "envelope",
  );
  const [leftRevealed, setLeftRevealed] = useState(false);
  const [rightRevealed, setRightRevealed] = useState(false);
  const bothRevealed = leftRevealed && rightRevealed;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  useEffect(() => {
    if (bothRevealed && stage === "scratch") {
      const t = setTimeout(() => setStage("story"), 1800);
      return () => clearTimeout(t);
    }
  }, [bothRevealed, stage]);

  const storyImages = [
    story1, story2, story3, story4, story5, story6,
    story7, story1, story2, story3, story4, story5,
  ];
  // 12 story sections cycling through bg images
  const totalStorySections = storyImages.length + 1; // + CTA

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#1a0608]">
      {/* Hero background — only visible during envelope */}
      <AnimatePresence>
        {stage === "envelope" && (
          <motion.div
            key="hero-bg"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 14, ease: "easeOut" } }}
            style={{
              backgroundImage: `url(${bgHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </AnimatePresence>
      {stage === "envelope" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 pointer-events-none" />
      )}

      {/* Scratch stage: subtle solid backdrop */}
      {stage === "scratch" && (
        <div className="absolute inset-0 paper-burgundy" />
      )}

      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="envelope"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <Envelope onOpen={() => setStage("scratch")} />
          </motion.div>
        )}

        {stage === "scratch" && (
          <motion.div
            key="scratch"
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            {/* Lace border ornament top */}
            <img
              src={ornLace}
              alt=""
              className="absolute top-4 left-0 right-0 w-full opacity-70 pointer-events-none"
            />
            <img
              src={ornLace}
              alt=""
              className="absolute bottom-4 left-0 right-0 w-full opacity-70 pointer-events-none scale-y-[-1]"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-[10px] tracking-[0.5em] uppercase text-[#f5d98a]/80 mb-3"
            >
              Together with their families
            </motion.p>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.9 }}
              >
                <ScratchCard
                  variant="burgundy"
                  prefix="Mr"
                  name="Pranay"
                  onRevealed={() => setLeftRevealed(true)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="font-script gold-text text-6xl px-1 select-none"
              >
                &amp;
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.9 }}
              >
                <ScratchCard
                  variant="pink"
                  prefix="Mrs"
                  name="Binita"
                  onRevealed={() => setRightRevealed(true)}
                />
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: bothRevealed ? 0 : 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 font-script text-[#f5d98a] text-xl"
            >
              scratch to reveal
            </motion.p>
          </motion.div>
        )}

        {stage === "story" && (
          <motion.div
            key="story"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Per-section backgrounds, fading smoothly as we scroll */}
            <div className="absolute inset-0 bg-[#1a0608]">
              {storyImages.map((_, i) => (
                <BgLayer
                  key={i}
                  src={SECTION_BGS[i % SECTION_BGS.length]}
                  scrollYProgress={scrollYProgress}
                  index={i}
                  total={totalStorySections}
                />
              ))}
              {/* CTA section bg */}
              <BgLayer
                src={SECTION_BGS[0]}
                scrollYProgress={scrollYProgress}
                index={storyImages.length}
                total={totalStorySections}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />
            </div>

            <div
              ref={scrollRef}
              className="absolute inset-0 overflow-y-auto no-scrollbar snap-y snap-mandatory"
              style={{ scrollBehavior: "smooth" }}
            >
              {storyImages.map((img, i) => (
                <FadeSection key={i} containerRef={scrollRef} index={i}>
                  <StoryLayout image={img} variant={(i % 12) + 1} />
                </FadeSection>
              ))}

              {/* Final CTA */}
              <FadeSection containerRef={scrollRef} index={storyImages.length}>
                <div className="relative flex flex-col items-center justify-center px-8 text-center w-full">
                  <img
                    src={floralWreath}
                    alt=""
                    loading="lazy"
                    className="absolute w-[90%] max-w-[420px] opacity-55 pointer-events-none"
                  />
                  <motion.a
                    href="https://lovable.dev"
                    target="_blank"
                    rel="noreferrer"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.9 }}
                    className="relative paper-burgundy gold-frame rounded-sm px-8 py-7 inline-flex flex-col items-center"
                  >
                    <div className="absolute inset-2 border border-[#c9a44c]/50 pointer-events-none rounded-sm" />
                    <span className="text-[10px] tracking-[0.5em] uppercase text-[#e8d5a8] mb-3">
                      with love
                    </span>
                    <span className="font-script gold-text text-3xl leading-tight">
                      for more details
                    </span>
                    <span className="font-script gold-text text-3xl leading-tight">
                      please click here
                    </span>
                    <span className="mt-4 text-[10px] tracking-[0.4em] uppercase text-[#f5d98a]/80">
                      open wedding website
                    </span>
                  </motion.a>
                </div>
              </FadeSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MusicButton />
    </div>
  );
}

/* ---------- Mobile-only gate ---------- */
function MobileOnlyGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden md:flex fixed inset-0 z-[100] paper-burgundy items-center justify-center text-center px-10">
        <div className="max-w-sm">
          <div className="font-script gold-text text-5xl mb-4">Pranay &amp; Binita</div>
          <p className="text-[#f5d98a]/80 text-sm tracking-widest uppercase">
            This invitation is best experienced on a mobile device.
            <br />
            Please open on your phone.
          </p>
        </div>
      </div>
      <div className="md:hidden">{children}</div>
    </>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <MobileOnlyGate>
      <Experience />
    </MobileOnlyGate>
  );
}
