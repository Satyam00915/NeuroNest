import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { useTheme } from "./theme-provider";

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-32">
            <div className="relative mx-auto flex items-center max-w-6xl px-2 flex-col lg:flex-row">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  Ship 10x Faster with NS
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Highly customizable components for building modern websites
                  and applications that look and feel the way you mean it.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link to="#link">
                      <span className="text-nowrap">Start Building</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base"
                  >
                    <Link to="#link">
                      <span className="text-nowrap">Request a demo</span>
                    </Link>
                  </Button>
                </div>
              </div>
              {/* <img
                className="pointer-events-none order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
                src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                alt="Abstract Object"
                height="4000"
                width="3000"
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500"
                viewBox="0 0 799.031 618.112"
                role="img"
                className="px-24 lg:px-0"
              >
                <g transform="translate(-560.484 -230.944)">
                  <path
                    d="M15.18,488.763c0,.872.478,1.573,1.073,1.573h535.1c.6,0,1.073-.7,1.073-1.573s-.478-1.573-1.073-1.573H16.253C15.658,487.191,15.18,487.891,15.18,488.763Z"
                    transform="translate(675.195 358.72)"
                    fill="#ccc"
                  />
                  <rect
                    width="19.105"
                    height="3.371"
                    transform="translate(865.646 842.298)"
                    fill="#b6b3c5"
                  />
                  <rect
                    width="19.105"
                    height="3.371"
                    transform="translate(1034.779 842.861)"
                    fill="#b6b3c5"
                  />
                  <path
                    d="M352.955,370.945a27.529,27.529,0,0,1-54.321,0H229.146V521.536h193.3V370.945Z"
                    transform="translate(634.205 321.322)"
                    fill="#d6d6e3"
                  />
                  <rect
                    width="193.296"
                    height="5.242"
                    transform="translate(863.914 830.927)"
                    fill="#090814"
                  />
                  <path
                    d="M788.255,487.17H10.776A10.788,10.788,0,0,1,0,476.394V32.688A10.788,10.788,0,0,1,10.776,21.911H788.255a10.789,10.789,0,0,1,10.776,10.776V476.394a10.789,10.789,0,0,1-10.776,10.776Z"
                    transform="translate(560.484 209.033)"
                    fill="#090814"
                  />
                  <rect
                    width="760.822"
                    height="429.297"
                    transform="translate(578.588 248)"
                    fill="#fff"
                  />
                  <g transform="translate(0 -41.857)">
                    <g transform="translate(-588.477 33.946)">
                      <path
                        d="M35.524,67.628A24.524,24.524,0,0,1,11,43.1V36.524A24.524,24.524,0,0,1,35.524,12a1.492,1.492,0,1,1,0,2.983,21.54,21.54,0,0,0-21.54,21.54V43.1a21.54,21.54,0,1,0,43.081,0V31.259a1.492,1.492,0,1,1,2.983,0V43.1A24.524,24.524,0,0,1,35.524,67.628Z"
                        transform="translate(1535.985 422.718)"
                      />
                      <path
                        d="M28.524,67.628A24.524,24.524,0,0,1,4,43.1V31.259a1.492,1.492,0,1,1,2.983,0V43.1a21.54,21.54,0,1,0,43.081,0V36.524a21.54,21.54,0,0,0-21.54-21.54,1.492,1.492,0,0,1,0-2.983A24.524,24.524,0,0,1,53.047,36.524V43.1A24.524,24.524,0,0,1,28.524,67.628Z"
                        transform="translate(1496.922 422.718)"
                      />
                      <path
                        d="M58.556,46.441a1.492,1.492,0,0,1-1.492-1.492V26.524a21.54,21.54,0,1,0-43.081,0,1.492,1.492,0,1,1-2.983,0,24.524,24.524,0,1,1,49.047,0V44.949A1.492,1.492,0,0,1,58.556,46.441Z"
                        transform="translate(1535.985 366.911)"
                      />
                      <path
                        d="M51.556,93.821a1.492,1.492,0,0,1-1.492-1.492V26.524a21.54,21.54,0,1,0-43.081,0V44.949a1.492,1.492,0,0,1-2.983,0V26.524A24.524,24.524,0,0,1,45.864,9.183a24.363,24.363,0,0,1,7.183,17.341V92.329A1.492,1.492,0,0,1,51.556,93.821Z"
                        transform="translate(1496.922 366.911)"
                      />
                      <g transform="translate(1570.017 382.073)">
                        <path
                          d="M20.782,57.047a1.492,1.492,0,1,1,0-2.983,21.54,21.54,0,1,0,0-43.081h-3.29a1.492,1.492,0,0,1,0-2.983h3.29a24.524,24.524,0,1,1,0,49.047Z"
                          transform="translate(-10.602 18.322)"
                        />
                        <path
                          d="M19.372,37.305a1.492,1.492,0,1,1,0-2.983,11.67,11.67,0,1,0,0-23.339h-1.88a1.492,1.492,0,0,1,0-2.983h1.88a14.653,14.653,0,1,1,0,29.305Z"
                          transform="translate(-16 -8)"
                        />
                        <path
                          d="M19.372,37.305h-1.88a1.492,1.492,0,1,1,0-2.983h1.88a11.67,11.67,0,0,0,0-23.339,1.492,1.492,0,0,1,0-2.983,14.653,14.653,0,0,1,0,29.305Z"
                          transform="translate(-16 62.894)"
                        />
                      </g>
                      <g transform="translate(1492.234 382.073)">
                        <path
                          d="M40.523,57.047A24.524,24.524,0,0,1,40.523,8h3.29a1.492,1.492,0,1,1,0,2.983h-3.29a21.54,21.54,0,0,0,0,43.081,1.492,1.492,0,0,1,0,2.983Z"
                          transform="translate(-16 18.322)"
                        />
                        <path
                          d="M30.652,37.305A14.653,14.653,0,0,1,30.652,8h1.88a1.492,1.492,0,1,1,0,2.983h-1.88a11.67,11.67,0,0,0,0,23.339,1.492,1.492,0,0,1,0,2.983Z"
                          transform="translate(0.678 -8)"
                        />
                        <path
                          d="M32.532,37.305h-1.88A14.653,14.653,0,0,1,30.652,8a1.492,1.492,0,0,1,0,2.983,11.67,11.67,0,0,0,0,23.339h1.88a1.492,1.492,0,1,1,0,2.983Z"
                          transform="translate(0.679 62.894)"
                        />
                      </g>
                    </g>
                    <g transform="translate(864.012 553.398)">
                      <rect
                        width="29.619"
                        height="7.13"
                        rx="3.565"
                        transform="translate(37.298)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(159.064)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(179.908)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="70.756"
                        height="7.13"
                        rx="3.565"
                        transform="translate(77.338)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="29.619"
                        height="7.13"
                        rx="3.565"
                        transform="translate(0.001 46.074)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(121.767 46.074)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(142.61 46.074)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="70.756"
                        height="7.13"
                        rx="3.565"
                        transform="translate(40.041 46.074)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="29.619"
                        height="7.13"
                        rx="3.565"
                        transform="translate(122.316 15.906)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="29.619"
                        height="7.13"
                        rx="3.565"
                        transform="translate(0.001 15.906)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(0.001)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(0 31.264)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="70.756"
                        height="7.13"
                        rx="3.565"
                        transform="translate(41.686 15.906)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="29.619"
                        height="7.13"
                        rx="3.565"
                        transform="translate(60.884 31.264)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="29.619"
                        height="7.13"
                        rx="3.565"
                        transform="translate(20.843 31.264)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(18.675)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="10.421"
                        height="7.13"
                        rx="3.565"
                        transform="translate(181.553 31.264)"
                        fill="#6c63ff"
                      />
                      <rect
                        width="70.756"
                        height="7.13"
                        rx="3.565"
                        transform="translate(100.375 31.264)"
                        fill="#6c63ff"
                      />
                    </g>
                  </g>
                  <g transform="translate(626.555 602.469)">
                    <path
                      d="M805.134,330.7H727.95a1.546,1.546,0,0,1-1.544-1.544V314.612h.618V329.16a.928.928,0,0,0,.927.927h77.184a.928.928,0,0,0,.927-.927V314.51h.618V329.16A1.546,1.546,0,0,1,805.134,330.7Z"
                      transform="translate(-646.44 -292.702)"
                      fill="#3f3d56"
                    />
                    <rect
                      width="181.374"
                      height="0.618"
                      transform="translate(5.3 21.601)"
                      fill="#3f3d56"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(0.001 16.549)"
                      fill="#6c63ff"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(53.991 16.549)"
                      fill="#6c63ff"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(90.634 32.165)"
                      fill="#3f3d56"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(118.489 32.165)"
                      fill="#ccc"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(104.991 16.549)"
                      fill="#6c63ff"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(180.632 16.549)"
                      fill="#6c63ff"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(154.616 16.549)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M537.36,277.577a.309.309,0,0,1-.309-.309V262.022a1.546,1.546,0,0,1,1.544-1.544H553.63a.309.309,0,1,1,0,.618H538.6a.928.928,0,0,0-.927.927v15.246a.309.309,0,0,1-.309.309Z"
                      transform="translate(-515.571 -255.358)"
                      fill="#3f3d56"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(33.452 0)"
                      fill="#e6e6e6"
                    />
                    <path
                      d="M921.669,277.268h-.618V262.022a1.546,1.546,0,0,1,1.544-1.544H937.63v.618H922.6a.928.928,0,0,0-.927.927Z"
                      transform="translate(-780.967 -255.358)"
                      fill="#3f3d56"
                    />
                    <ellipse
                      cx="5.313"
                      cy="5.313"
                      rx="5.313"
                      ry="5.313"
                      transform="translate(152.058 0)"
                      fill="#e6e6e6"
                    />
                  </g>
                  <path
                    d="M496.375,205.477c-2.221,0-4.027.792-4.027,1.764v1.411c0,.973,1.806,1.764,4.027,1.764h93.434c2.221,0,4.027-.792,4.027-1.764v-1.411c0-.973-1.806-1.764-4.027-1.764Z"
                    transform="translate(635.637 363.33)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M670.026,309.282c4,0,7.249,1.75,7.249,3.9v30.351c0,2.152-3.252,3.9-7.249,3.9H497.656c-4,0-7.249-1.75-7.249-3.9V313.184c0-2.152,3.252-3.9,7.249-3.9"
                    transform="translate(637.578 297.505)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M496.375,234.581c-2.221,0-4.027.973-4.027,2.168s1.806,2.168,4.027,2.168H639.748c2.221,0,4.027-.973,4.027-2.168s-1.806-2.168-4.027-2.168Z"
                    transform="translate(635.637 343.828)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M496.375,234.581c-2.221,0-4.027.973-4.027,2.168s1.806,2.168,4.027,2.168H639.748c2.221,0,4.027-.973,4.027-2.168s-1.806-2.168-4.027-2.168Z"
                    transform="translate(635.637 352.828)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 93.872)"
                    fill="#6c63ff"
                  />
                  <path
                    d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 81.146)"
                    fill="#6c63ff"
                  />
                  <g transform="translate(690.275 280.103)">
                    <ellipse
                      cx="6.686"
                      cy="6.686"
                      rx="6.686"
                      ry="6.686"
                      transform="translate(0 0)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                      transform="translate(-841.667 -576.242)"
                      fill="#fff"
                    />
                  </g>
                  <path
                    d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 129.452)"
                    fill="#6c63ff"
                  />
                  <path
                    d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 116.727)"
                    fill="#6c63ff"
                  />
                  <g transform="translate(690.275 315.683)">
                    <ellipse
                      cx="6.686"
                      cy="6.686"
                      rx="6.686"
                      ry="6.686"
                      transform="translate(0 0)"
                      fill="#e6e6e6"
                    />
                    <path
                      d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                      transform="translate(-841.667 -576.242)"
                      fill="#fff"
                    />
                  </g>
                  <path
                    d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 165.032)"
                    fill="#6c63ff"
                  />
                  <path
                    d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 152.307)"
                    fill="#6c63ff"
                  />
                  <g transform="translate(690.275 351.262)">
                    <ellipse
                      cx="6.686"
                      cy="6.686"
                      rx="6.686"
                      ry="6.686"
                      transform="translate(0 0)"
                      fill="#e6e6e6"
                    />
                    <path
                      d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                      transform="translate(-841.667 -576.242)"
                      fill="#fff"
                    />
                  </g>
                  <path
                    d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 200.611)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 187.886)"
                    fill="#e6e6e6"
                  />
                  <g transform="translate(690.275 386.842)">
                    <ellipse
                      cx="6.686"
                      cy="6.686"
                      rx="6.686"
                      ry="6.686"
                      transform="translate(0 0)"
                      fill="#e6e6e6"
                    />
                    <path
                      d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                      transform="translate(-841.667 -576.242)"
                      fill="#fff"
                    />
                  </g>
                  <path
                    d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 236.191)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
                    transform="translate(-212.074 223.466)"
                    fill="#e6e6e6"
                  />
                  <g transform="translate(690.275 422.422)">
                    <ellipse
                      cx="6.686"
                      cy="6.686"
                      rx="6.686"
                      ry="6.686"
                      transform="translate(0 0)"
                      fill="#e6e6e6"
                    />
                    <path
                      d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                      transform="translate(-841.667 -576.242)"
                      fill="#fff"
                    />
                  </g>
                  <g transform="translate(587.66 -327.248)">
                    <path
                      d="M345.8,318H248.438a.3.3,0,0,1-.3-.3c0-2.109,97.967-.168,97.967,0A.3.3,0,0,1,345.8,318Z"
                      transform="translate(381.092 338.302)"
                      fill="#090814"
                    />
                    <path
                      d="M290.014,369.407h-8.855a.905.905,0,0,1-.9-.9V356.3a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9V368.5A.905.905,0,0,1,290.014,369.407Z"
                      transform="translate(360.316 283.544)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M335.73,348.208h-8.855a.905.905,0,0,1-.9-.9V323.518a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9V347.3A.905.905,0,0,1,335.73,348.208Z"
                      transform="translate(330.75 304.743)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M381.445,369.407H372.59a.905.905,0,0,1-.9-.9V356.3a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9V368.5A.905.905,0,0,1,381.445,369.407Z"
                      transform="translate(301.181 283.544)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M427.161,339.839h-8.855a.886.886,0,0,1-.9-.863V310.539a.886.886,0,0,1,.9-.863h8.855a.886.886,0,0,1,.9.863v28.437A.886.886,0,0,1,427.161,339.839Z"
                      transform="translate(271.615 313.112)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M472.877,324.777h-8.855a.905.905,0,0,1-.9-.9V287.291a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9v36.581A.905.905,0,0,1,472.877,324.777Z"
                      transform="translate(242.049 328.175)"
                      fill="#6c63ff"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Powering the best teams</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                      alt="Lemon Squeezy Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/laravel.svg"
                      alt="Laravel Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-7 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lilly.svg"
                      alt="Lilly Logo"
                      height="28"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-6 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/openai.svg"
                      alt="OpenAI Logo"
                      height="24"
                      width="auto"
                    />
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const { theme } = useTheme();
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
                <Button asChild variant="outline" size="sm">
                  <Link to="#">
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="#">
                    <span>Sign Up</span>
                  </Link>
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
