import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import bgHero from "@/assets/bg-hero.jpg";
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
        {/* envelope body */}
        <div className="absolute inset-0 paper-burgundy rounded-sm gold-frame overflow-hidden">
          <div className="absolute inset-3 border border-[#c9a44c]/40 rounded-sm" />
          {/* embossed monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-script text-[#c9a44c]/30 text-7xl select-none">
              P&amp;B
            </span>
          </div>
        </div>

        {/* flap */}
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

        {/* wax seal */}
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

/* ---------- Scratch Card (Section 2) ---------- */
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

    // foil gradient
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

    // foil sparkles
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = `rgba(255,230,180,${Math.random() * 0.35})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // text overlay
    ctx.fillStyle = variant === "burgundy" ? "#f5d98a" : "#6b1a2a";
    ctx.font = '600 42px "Cormorant Garamond", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(prefix, width / 2, height / 2);

    ctx.font = '300 12px "Cormorant Garamond", serif';
    ctx.fillText("scratch to reveal", width / 2, height / 2 + 36);
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
      // animate erase
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

  return (
    <div
      ref={wrapRef}
      className={`relative rounded-sm gold-frame overflow-hidden ${
        variant === "burgundy" ? "paper-burgundy" : "paper-pink"
      }`}
      style={{ width: "44vw", maxWidth: 170, aspectRatio: "0.72 / 1" }}
    >
      {/* card content underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
        <div className="absolute inset-2 border border-[#c9a44c]/50 rounded-sm pointer-events-none" />
        <div
          className={`text-[10px] tracking-[0.4em] uppercase mb-2 ${
            variant === "burgundy" ? "text-[#e8d5a8]" : "text-[#6b1a2a]"
          }`}
        >
          {variant === "burgundy" ? "The Groom" : "The Bride"}
        </div>
        <div
          className={`font-script text-4xl ${
            variant === "burgundy" ? "gold-text" : "text-[#6b1a2a]"
          }`}
        >
          {name}
        </div>
        {revealed && (
          <div className="absolute inset-0 shimmer pointer-events-none" />
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
  );
}

/* ---------- Section wrapper with fade-from-scroll ---------- */
function FadeSection({
  containerRef,
  index,
  total,
  children,
  className = "",
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  total: number;
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


/* ---------- Story section variants ---------- */
function StoryLayout({
  image,
  variant,
}: {
  image: string;
  variant: number;
}) {
  // 7 distinct layouts
  const layouts: Record<number, React.ReactNode> = {
    1: (
      // Floral cascade — hanging garland top
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <img
          src={floralHanging}
          alt=""
          loading="lazy"
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-[80%] max-w-[360px] opacity-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] pointer-events-none"
        />
        <div className="relative w-[78%] max-w-[340px] mt-20 gold-frame rounded-sm overflow-hidden">
          <img src={image} alt="" loading="lazy" className="w-full h-auto block" />
          <div className="absolute inset-1 border border-[#c9a44c]/50 pointer-events-none" />
        </div>
      </div>
    ),
    2: (
      // Ribbon drapes — frame with side flowers
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div className="relative w-[80%] max-w-[340px] paper p-3 gold-frame rounded-sm">
          <img src={image} alt="" loading="lazy" className="w-full h-auto block rounded-sm" />
        </div>
        <img
          src={floralCorner}
          alt=""
          loading="lazy"
          className="absolute -bottom-8 -left-10 w-56 opacity-90 pointer-events-none -rotate-12"
        />
        <img
          src={floralCorner}
          alt=""
          loading="lazy"
          className="absolute -top-10 -right-12 w-48 opacity-90 pointer-events-none rotate-180"
        />
      </div>
    ),
    3: (
      // Luxury wreath frame
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={floralWreath}
          alt=""
          loading="lazy"
          className="absolute w-[92%] max-w-[420px] opacity-95 pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        />
        <div
          className="relative gold-frame rounded-full overflow-hidden"
          style={{ width: "52%", maxWidth: 220, aspectRatio: "1" }}
        >
          <img
            src={image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
    4: (
      // Floral corner composition
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
    5: (
      // Ornament + flower arrangement (wax seal accent)
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div className="relative w-[78%] max-w-[340px]">
          <div className="paper-burgundy p-2 gold-frame rounded-sm">
            <img
              src={image}
              alt=""
              loading="lazy"
              className="w-full h-auto block rounded-sm"
            />
          </div>
          <img
            src={waxSeal}
            alt=""
            loading="lazy"
            className="absolute -bottom-10 -right-6 w-24 drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)] pointer-events-none"
          />
          <img
            src={floralHanging}
            alt=""
            loading="lazy"
            className="absolute -top-8 -left-12 w-44 opacity-95 pointer-events-none rotate-12"
          />
        </div>
      </div>
    ),
    6: (
      // Floating ornament composition — polaroid tilt
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
    7: (
      // Tall portrait with arch frame
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
          <img
            src={image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-2 border border-[#c9a44c]/50 pointer-events-none"
            style={{
              borderTopLeftRadius: "50% 30%",
              borderTopRightRadius: "50% 30%",
            }}
          />
        </div>
        <img
          src={floralHanging}
          alt=""
          loading="lazy"
          className="absolute -top-2 -right-6 w-40 opacity-90 pointer-events-none scale-x-[-1]"
        />
        <img
          src={floralCorner}
          alt=""
          loading="lazy"
          className="absolute -bottom-6 -left-8 w-44 opacity-90 pointer-events-none -rotate-45"
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

/* ---------- Main experience ---------- */
function Experience() {
  const [stage, setStage] = useState<"envelope" | "scratch" | "story">(
    "envelope",
  );
  const [leftRevealed, setLeftRevealed] = useState(false);
  const [rightRevealed, setRightRevealed] = useState(false);
  const bothRevealed = leftRevealed && rightRevealed;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });

  // auto-advance from scratch when both done
  useEffect(() => {
    if (bothRevealed && stage === "scratch") {
      const t = setTimeout(() => setStage("story"), 1600);
      return () => clearTimeout(t);
    }
  }, [bothRevealed, stage]);

  const storyImages = [story1, story2, story3, story4, story5, story6, story7];

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#1a0608]">
      {/* persistent background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1.02 }}
        transition={{ opacity: { duration: 1.4 }, scale: { duration: 14, ease: "easeOut" } }}
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 pointer-events-none" />

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
              className="mt-8 font-script text-[#f5d98a] text-xl"
            >
              scratch to reveal
            </motion.p>
            <AnimatePresence>
              {bothRevealed && (
                <motion.p
                  key="continue"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-6 text-[10px] tracking-[0.5em] uppercase text-[#f5d98a]/80"
                >
                  continuing
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage === "story" && (
          <motion.div
            key="story"
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto no-scrollbar snap-y snap-mandatory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ scrollBehavior: "smooth" }}
          >
            {storyImages.map((img, i) => (
              <FadeSection
                key={i}
                containerRef={scrollRef}
                index={i}
                total={storyImages.length + 1}
              >
                <ParallaxImage
                  src={floralCorner}
                  scrollY={scrollY}
                  range={[i * 800, (i + 1) * 800]}
                  yRange={[20, -20]}
                  style={{ display: "none" }}
                />
                <StoryLayout image={img} variant={(i % 7) + 1} />
              </FadeSection>
            ))}

            {/* Final CTA section */}
            <FadeSection
              containerRef={scrollRef}
              index={storyImages.length}
              total={storyImages.length + 1}
            >
              <div className="relative flex flex-col items-center justify-center px-8 text-center w-full">
                <img
                  src={floralWreath}
                  alt=""
                  loading="lazy"
                  className="absolute w-[90%] max-w-[420px] opacity-50 pointer-events-none"
                />
                <motion.a
                  href="https://lovable.dev"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.9 }}
                  className="relative paper-burgundy gold-frame rounded-sm px-10 py-8 inline-flex flex-col items-center"
                >
                  <div className="absolute inset-2 border border-[#c9a44c]/50 pointer-events-none rounded-sm" />
                  <span className="text-[10px] tracking-[0.5em] uppercase text-[#e8d5a8] mb-3">
                    with love
                  </span>
                  <span className="font-script gold-text text-4xl leading-none">
                    Continue Your
                  </span>
                  <span className="font-script gold-text text-4xl leading-none mt-1">
                    Journey
                  </span>
                  <span className="mt-4 text-[10px] tracking-[0.4em] uppercase text-[#f5d98a]/80">
                    tap to open
                  </span>
                </motion.a>
              </div>
            </FadeSection>
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

export const Route = (await import("@tanstack/react-router")).createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <MobileOnlyGate>
      <Experience />
    </MobileOnlyGate>
  );
}
