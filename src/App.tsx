import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

import bgHero from "@/assets/bg-hero.jpg";
import envelopeClosed from "@/assets/envelope-closed.png";
import envelopeOpen from "@/assets/envelope-open.png";
import story1 from "@/assets/story-1.jpeg";
import story2 from "@/assets/story-2.jpeg";
import story3 from "@/assets/story-3.jpeg";
import story4 from "@/assets/story-4.jpeg";
import story5 from "@/assets/story-5.jpeg";
import story6 from "@/assets/story-6.jpeg";
import story7 from "@/assets/story-6.jpeg";
import story8 from "@/assets/story-8.jpeg";
import floralCorner from "@/assets/floral-corner.png";
import floralWreath from "@/assets/floral-wreath.png";
import ornBouquet from "@/assets/orn-bouquet.png";
import ornTassel from "@/assets/orn-tassel.png";
import ornPearl from "@/assets/orn-pearl.png";
import ornFeather from "@/assets/orn-feather.png";
import ornPressed from "@/assets/orn-pressed.png";
import ornCrest from "@/assets/orn-crest.png";

/* ---------- Animated decoration wrappers ---------- */
type DecoProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
};

function Sway({ src, className = "", style, rotate = 0, delay = 0, amount = 4 }: DecoProps & { delay?: number; amount?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: "top center", ...style }}
      initial={{ opacity: 0, y: -10, rotate: rotate - amount }}
      whileInView={{ opacity: 1, y: 0, rotate: [rotate - amount, rotate + amount, rotate - amount] }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 1, delay },
        y: { duration: 1, delay },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function Float({ src, className = "", style, rotate = 0, delay = 0 }: DecoProps & { delay?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.9, rotate }}
      whileInView={{ opacity: 1, scale: 1, y: [0, -6, 0], rotate }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1.1, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function Drift({ src, className = "", style, delay = 0, range = 10 }: DecoProps & { delay?: number; range?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={style}
      initial={{ opacity: 0, y: -8, rotate: -range }}
      whileInView={{ opacity: 1, y: [0, 8, 0], rotate: [-range, range, -range] }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 1.2, delay },
        y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

/* ---------- Envelope (Section 1) ---------- */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const handle = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1800);
  };
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.button
        onClick={handle}
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{
          y: opening ? -10 : [0, -6, 0],
          opacity: 1,
          scale: opening ? 1.04 : 1,
        }}
        transition={{
          y: opening
            ? { duration: 0.6 }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.2, delay: 0.4 },
          scale: { duration: 1.2, delay: 0.4 },
        }}
        className="relative"
        style={{ width: "min(82vw, 340px)" }}
        aria-label="Open invitation"
      >
        <AnimatePresence mode="wait">
          {!opening ? (
            <motion.img
              key="closed"
              src={envelopeClosed}
              alt=""
              className="w-full h-auto block drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, rotateX: -8 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.img
              key="open"
              src={envelopeOpen}
              alt=""
              className="w-full h-auto block drop-shadow-[0_24px_44px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-[12%] left-0 right-0 text-center font-script text-[#f5d98a] text-3xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      >
        Click to Open Invitation
      </motion.p>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function FadeSection({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative h-[100dvh] w-full snap-start flex items-center justify-center ${className}`}
      data-section={index}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.02, y: -30 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ---------- Plain main image (no overlays/borders) ---------- */
function MainImg({
  image,
  width = "92%",
  maxWidth = 380,
  ratio = "1 / 1.4",
  rounded = "rounded-sm",
  extraStyle,
}: {
  image: string;
  width?: string;
  maxWidth?: number;
  ratio?: string;
  rounded?: string;
  extraStyle?: React.CSSProperties;
}) {
  return (
    <motion.img
      src={image}
      alt=""
      loading="lazy"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`block object-cover ${rounded}`}
      style={{ width, maxWidth, aspectRatio: ratio, ...extraStyle }}
    />
  );
}

/* ---------- Image frame wrapper: decorations attach to image corners ---------- */
function ImageFrame({
  image,
  children,
  ratio = "1 / 1.4",
  rounded = "rounded-sm",
  circle = false,
}: {
  image: string;
  children?: React.ReactNode;
  ratio?: string;
  rounded?: string;
  circle?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      <div
        className="relative"
        style={{ width: "92%", maxWidth: 380, aspectRatio: circle ? "1" : ratio }}
      >
        <motion.img
          src={image}
          alt=""
          loading="lazy"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`block w-full h-full object-cover ${circle ? "rounded-full" : rounded}`}
        />
        {children}
      </div>
    </div>
  );
}

/* ---------- Story layouts — image + 1-2 small corner decorations ON the image frame ---------- */
function StoryLayout({
  image,
  variant,
}: {
  image: string;
  variant: number;
}) {
  const layouts: Record<number, React.ReactNode> = {
    1: (
      <ImageFrame image={image}>
        <Float src={floralCorner} className="absolute -top-6 -left-6 w-24 opacity-85" rotate={-12} />
        <Sway src={ornPearl} className="absolute -top-4 right-2 w-14 opacity-75" rotate={8} amount={3} />
      </ImageFrame>
    ),
    2: (
      <ImageFrame image={image}>
        <Sway src={ornPearl} className="absolute -top-6 -right-4 w-20 opacity-85" rotate={10} amount={3} />
        <Float src={ornBouquet} className="absolute -bottom-6 -left-6 w-24 opacity-80" rotate={-10} />
      </ImageFrame>
    ),
    /* CIRCLE VARIANT — commented out from rotation (kept in code) */
    3: (
      <ImageFrame image={image} circle>
        <Float src={floralWreath} className="absolute -inset-6 w-[calc(100%+3rem)] opacity-55 pointer-events-none" />
      </ImageFrame>
    ),
    4: (
      <ImageFrame image={image}>
        <Sway src={ornTassel} className="absolute -bottom-8 right-4 w-12 opacity-90" rotate={6} amount={5} />
        <Float src={floralCorner} className="absolute -top-5 -right-5 w-20 opacity-80 rotate-90" rotate={6} />
      </ImageFrame>
    ),
    5: (
      <ImageFrame image={image}>
        <Float src={ornBouquet} className="absolute -bottom-8 -left-8 w-28 opacity-85" rotate={-12} />
        <Drift src={ornFeather} className="absolute -top-6 right-2 w-16 opacity-75" range={10} />
      </ImageFrame>
    ),
    6: (
      <ImageFrame image={image}>
        <Drift src={ornFeather} className="absolute -top-6 -right-6 w-20 opacity-80" range={10} />
        <Sway src={ornPearl} className="absolute -bottom-4 left-2 w-14 opacity-75" rotate={-6} amount={3} />
      </ImageFrame>
    ),
    7: (
      <ImageFrame image={image}>
        <Float src={ornPressed} className="absolute -top-6 -right-6 w-24 opacity-85" rotate={14} />
        <Sway src={ornTassel} className="absolute -bottom-8 left-6 w-12 opacity-90" rotate={-6} amount={5} />
      </ImageFrame>
    ),
    8: (
      <ImageFrame image={image}>
        <Float src={floralCorner} className="absolute -bottom-6 -right-6 w-24 opacity-85 rotate-180" />
        <Float src={ornCrest} className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 opacity-90" />
      </ImageFrame>
    ),
    9: (
      <ImageFrame image={image}>
        <Float src={ornCrest} className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 opacity-95" />
        <Drift src={ornFeather} className="absolute -bottom-4 -left-4 w-16 opacity-75" range={10} />
      </ImageFrame>
    ),
    10: (
      <ImageFrame image={image}>
        <Sway src={ornPearl} className="absolute -top-6 -left-4 w-20 opacity-85" rotate={-10} amount={3} />
        <Float src={ornBouquet} className="absolute -bottom-8 -right-8 w-28 opacity-85" rotate={12} />
      </ImageFrame>
    ),
  };
  return <>{layouts[variant] ?? layouts[1]}</>;
}


// no-op placeholder to satisfy import surface
function Shimmer() {
  return null;
}

/* ---------- Music button ---------- */
const MUSIC_SRC =
  "https://res.cloudinary.com/dzgqaidej/video/upload/v1779900301/Jashn-E-BahaaraaInstrumental-Flute-A.R.Rahman_obyuwn.mp3";

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
const ALL_STORY_IMAGES = [
  story1, story2, story3, story4, story5, story6, story7, story8,
];

// Hide 3rd-last slide (the circle image variant). Story plan (variants):
// originally 8 image sections + 1 CTA. We want to comment out the 3rd-last
// (i.e. the slide with the circle wreath variant). Remove index 5 (story6)
// which previously used the circle layout.
const STORY_PLAN: { image: string; variant: number }[] = [
  { image: story1, variant: 1 },
  { image: story2, variant: 5 },
  { image: story3, variant: 2 },
  { image: story4, variant: 7 },
  { image: story5, variant: 4 },
  // { image: story6, variant: 3 }, // ← circle wreath slide (hidden, kept in code)
  { image: story7, variant: 9 },
  { image: story8, variant: 10 },
];
void ALL_STORY_IMAGES;

function StoryStage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    scrollYProgress.set(max > 0 ? el.scrollTop / max : 0);
  };
  useEffect(() => { handleScroll(); }, []);

  return (
    <motion.div
      key="story"
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Soft ivory base background for all story sections */}
      <div className="absolute inset-0 bg-[#f8f1e4]" />
        
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 overflow-y-auto no-scrollbar snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {STORY_PLAN.map((s, i) => (
          <FadeSection key={i} index={i}>
            <StoryLayout image={s.image} variant={s.variant} />
          </FadeSection>
        ))}

        <FadeSection index={STORY_PLAN.length}>
          <div className="relative flex flex-col items-center justify-center px-8 text-center w-full">
            <img
              src={floralWreath}
              alt=""
              loading="lazy"
              className="absolute w-[110%] max-w-[520px] opacity-80 pointer-events-none"
            />
            <motion.a
              href="#"
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
  );
}

// preserve unused exports to avoid TS warnings
void useTransform;
void (null as unknown as MotionValue<number>);

function Experience() {
  const [stage, setStage] = useState<"envelope" | "story">("envelope");

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#1a0608]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 pointer-events-none" />
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
            <Envelope onOpen={() => setStage("story")} />
          </motion.div>
        )}

        {stage === "story" && <StoryStage key="story" />}
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

export default function App() {
  return (
    <MobileOnlyGate>
      <Experience />
    </MobileOnlyGate>
  );
}
