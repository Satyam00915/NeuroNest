import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { useTheme } from "./theme-provider";
import BlurText from "./ui/BlurText";
import { RiNotionFill } from "react-icons/ri";
import { SiEvernote, SiObsidian } from "react-icons/si";
import { FaDropbox, FaGoogleDrive, FaSlack, FaTrello } from "react-icons/fa";
import { SvgComp } from "./ui/SvgComp";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-32">
            <div className="relative mx-auto flex items-center max-w-6xl px-2 flex-col lg:flex-row">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left pt-10">
                <BlurText
                  text="Because Your Brain Deserves a Backup."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={() => {
                    return;
                  }}
                  className="text-5xl mb-8"
                />
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  NeuroNest is your intelligent memory vault — capture thoughts,
                  save media, jot notes, set reminders, and share seamlessly.
                </p>
                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link to="#link">
                      <span className="text-nowrap">Get Started</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <SvgComp />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Powering the best teams</p>
              </div>
              <section
                id="teams"
                className="relative py-6 md:w-[calc(100%-11rem)]"
              >
                <InfiniteSlider gap={112}>
                  <div className="flex items-center gap-3">
                    <RiNotionFill size={40} />
                    <span className="text-xl">Notion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <SiEvernote size={40} />
                    <span className="text-xl">Evernote</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <SiObsidian size={40} />
                    <span className="text-xl">Obsidian</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaGoogleDrive size={40} />
                    <span className="text-xl">Drive</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaDropbox size={40} />
                    <span className="text-xl">Dropbox</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaSlack size={40} />
                    <span className="text-xl">Slack</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTrello size={40} />
                    <span className="text-xl">Trello</span>
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Teams", href: "#teams" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="group bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-6xl px-3 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-1 lg:gap-0 lg:py-3">
            <div className="flex w-full items-center justify-between gap-16 lg:w-auto">
              <div className="flex items-center">
                <Link
                  to="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  {theme === "dark" ? <DarkLogo /> : <LightLogo />}
                </Link>
                <div className="comic-neue-bold text-xl">NeuroNST</div>
              </div>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row items-center sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <span>Login</span>
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  asChild
                  size="sm"
                >
                  <span>Sign Up</span>
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const LightLogo = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="40pt"
      height="40pt"
      viewBox="0 0 300.000000 300.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      {" "}
      <g
        transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        {" "}
        <path d="M1309 2130 c-44 -13 -79 -41 -105 -85 -18 -31 -33 -44 -55 -49 -69 -14 -132 -120 -112 -190 8 -28 5 -34 -33 -71 -51 -49 -63 -99 -40 -165 9 -28 13 -60 9 -87 -17 -126 85 -243 211 -243 93 0 146 47 146 128 0 43 -20 68 -46 58 -12 -5 -15 -15 -11 -39 6 -47 -11 -76 -53 -87 -90 -24 -190 54 -190 149 0 36 -1 36 36 16 34 -18 115 -20 132 -3 7 7 8 17 1 30 -7 14 -21 18 -61 18 -45 0 -54 4 -89 39 -50 50 -53 95 -10 143 l30 33 28 -27 c31 -29 71 -48 91 -41 24 9 12 41 -23 62 -41 24 -75 75 -75 114 0 36 23 81 52 101 23 17 53 22 44 8 -8 -14 31 -89 55 -105 17 -12 26 -14 36 -5 19 15 16 26 -12 60 -17 21 -25 41 -25 69 0 78 94 140 168 110 54 -23 57 -34 62 -314 3 -141 3 -257 0 -257 -3 0 -10 8 -16 18 -16 25 -103 70 -150 78 -30 4 -43 2 -53 -10 -17 -21 1 -46 33 -46 46 0 127 -51 157 -98 26 -42 29 -54 29 -133 0 -90 11 -116 44 -103 14 5 16 29 16 189 0 238 13 278 113 341 21 14 37 32 37 43 0 38 13 53 67 76 42 19 57 32 68 60 9 19 20 35 25 35 5 0 24 -13 42 -29 28 -25 32 -35 33 -81 l0 -52 -37 -4 c-46 -4 -88 -30 -88 -55 0 -28 23 -33 60 -14 44 23 92 13 124 -26 14 -17 26 -42 26 -55 0 -29 -26 -84 -40 -84 -16 0 -11 -37 5 -44 19 -7 20 -65 1 -109 -18 -44 -78 -95 -121 -103 -48 -9 -119 19 -146 57 -12 17 -23 48 -26 69 -7 48 -26 68 -48 50 -22 -18 -18 -59 11 -119 60 -120 211 -152 313 -64 69 58 102 146 83 217 -6 20 -7 38 -1 41 4 3 13 24 19 45 15 56 -1 110 -45 149 -32 28 -34 33 -29 74 11 80 -50 172 -127 191 -17 4 -29 15 -33 30 -13 51 -105 106 -176 106 -36 -1 -105 -34 -123 -60 -15 -22 -15 -22 -26 -2 -6 11 -30 29 -54 41 -45 22 -83 25 -128 11z m401 -65 c38 -20 60 -53 60 -90 0 -41 -7 -48 -67 -79 -54 -27 -73 -49 -73 -85 0 -12 -4 -21 -10 -21 -5 0 -28 -16 -50 -36 l-40 -36 0 138 c0 121 3 143 20 172 31 51 101 67 160 37z" />{" "}
        <path d="M1330 1935 c-10 -12 -7 -21 19 -50 24 -27 31 -45 31 -75 0 -41 -26 -80 -54 -80 -22 0 -29 -33 -11 -46 22 -16 51 -7 85 28 54 54 52 148 -5 205 -37 37 -47 40 -65 18z" />{" "}
        <path d="M1702 1611 c-20 -12 -11 -45 13 -49 49 -8 75 -25 83 -56 6 -24 14 -31 32 -31 32 0 38 29 16 70 -26 49 -111 88 -144 66z" />{" "}
        <path d="M987 1223 c-32 -31 24 -63 179 -103 128 -33 229 -43 392 -38 134 4 164 8 205 27 48 22 107 38 107 28 0 -10 -73 -48 -89 -45 -9 1 -45 -8 -81 -19 -36 -12 -93 -27 -127 -34 -85 -16 -308 -7 -401 17 -61 15 -75 16 -82 4 -21 -34 26 -56 174 -81 99 -17 301 -6 396 21 94 27 219 85 297 138 61 41 74 57 66 80 -7 18 -26 15 -118 -17 -142 -50 -225 -64 -385 -64 -163 0 -283 18 -421 64 -93 31 -102 33 -112 22z" />{" "}
        <path d="M1792 979 c-117 -54 -331 -78 -464 -51 -48 9 -68 2 -68 -25 0 -24 52 -35 177 -41 155 -6 256 12 396 71 38 16 47 24 45 41 -4 28 -33 30 -86 5z" />{" "}
      </g>{" "}
    </svg>
  );
};

const DarkLogo = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300.000000 300.000000"
      preserveAspectRatio="xMidYMid meet"
      width="40pt"
      height="40pt"
    >
      {" "}
      <g
        transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
        fill="#ffffff"
        stroke="none"
      >
        {" "}
        <path d="M1309 2130 c-44 -13 -79 -41 -105 -85 -18 -31 -33 -44 -55 -49 -69 -14 -132 -120 -112 -190 8 -28 5 -34 -33 -71 -51 -49 -63 -99 -40 -165 9 -28 13 -60 9 -87 -17 -126 85 -243 211 -243 93 0 146 47 146 128 0 43 -20 68 -46 58 -12 -5 -15 -15 -11 -39 6 -47 -11 -76 -53 -87 -90 -24 -190 54 -190 149 0 36 -1 36 36 16 34 -18 115 -20 132 -3 7 7 8 17 1 30 -7 14 -21 18 -61 18 -45 0 -54 4 -89 39 -50 50 -53 95 -10 143 l30 33 28 -27 c31 -29 71 -48 91 -41 24 9 12 41 -23 62 -41 24 -75 75 -75 114 0 36 23 81 52 101 23 17 53 22 44 8 -8 -14 31 -89 55 -105 17 -12 26 -14 36 -5 19 15 16 26 -12 60 -17 21 -25 41 -25 69 0 78 94 140 168 110 54 -23 57 -34 62 -314 3 -141 3 -257 0 -257 -3 0 -10 8 -16 18 -16 25 -103 70 -150 78 -30 4 -43 2 -53 -10 -17 -21 1 -46 33 -46 46 0 127 -51 157 -98 26 -42 29 -54 29 -133 0 -90 11 -116 44 -103 14 5 16 29 16 189 0 238 13 278 113 341 21 14 37 32 37 43 0 38 13 53 67 76 42 19 57 32 68 60 9 19 20 35 25 35 5 0 24 -13 42 -29 28 -25 32 -35 33 -81 l0 -52 -37 -4 c-46 -4 -88 -30 -88 -55 0 -28 23 -33 60 -14 44 23 92 13 124 -26 14 -17 26 -42 26 -55 0 -29 -26 -84 -40 -84 -16 0 -11 -37 5 -44 19 -7 20 -65 1 -109 -18 -44 -78 -95 -121 -103 -48 -9 -119 19 -146 57 -12 17 -23 48 -26 69 -7 48 -26 68 -48 50 -22 -18 -18 -59 11 -119 60 -120 211 -152 313 -64 69 58 102 146 83 217 -6 20 -7 38 -1 41 4 3 13 24 19 45 15 56 -1 110 -45 149 -32 28 -34 33 -29 74 11 80 -50 172 -127 191 -17 4 -29 15 -33 30 -13 51 -105 106 -176 106 -36 -1 -105 -34 -123 -60 -15 -22 -15 -22 -26 -2 -6 11 -30 29 -54 41 -45 22 -83 25 -128 11z m401 -65 c38 -20 60 -53 60 -90 0 -41 -7 -48 -67 -79 -54 -27 -73 -49 -73 -85 0 -12 -4 -21 -10 -21 -5 0 -28 -16 -50 -36 l-40 -36 0 138 c0 121 3 143 20 172 31 51 101 67 160 37z" />{" "}
        <path d="M1330 1935 c-10 -12 -7 -21 19 -50 24 -27 31 -45 31 -75 0 -41 -26 -80 -54 -80 -22 0 -29 -33 -11 -46 22 -16 51 -7 85 28 54 54 52 148 -5 205 -37 37 -47 40 -65 18z" />{" "}
        <path d="M1702 1611 c-20 -12 -11 -45 13 -49 49 -8 75 -25 83 -56 6 -24 14 -31 32 -31 32 0 38 29 16 70 -26 49 -111 88 -144 66z" />{" "}
        <path d="M987 1223 c-32 -31 24 -63 179 -103 128 -33 229 -43 392 -38 134 4 164 8 205 27 48 22 107 38 107 28 0 -10 -73 -48 -89 -45 -9 1 -45 -8 -81 -19 -36 -12 -93 -27 -127 -34 -85 -16 -308 -7 -401 17 -61 15 -75 16 -82 4 -21 -34 26 -56 174 -81 99 -17 301 -6 396 21 94 27 219 85 297 138 61 41 74 57 66 80 -7 18 -26 15 -118 -17 -142 -50 -225 -64 -385 -64 -163 0 -283 18 -421 64 -93 31 -102 33 -112 22z" />{" "}
        <path d="M1792 979 c-117 -54 -331 -78 -464 -51 -48 9 -68 2 -68 -25 0 -24 52 -35 177 -41 155 -6 256 12 396 71 38 16 47 24 45 41 -4 28 -33 30 -86 5z" />{" "}
      </g>{" "}
    </svg>
  );
};
