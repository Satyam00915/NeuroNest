import FadeContent from "./ui/FadeContent";

const Features = () => {
  return (
    <section id="features">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Built for creators, devs & innovators
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Neuronest gives you the power to build, share, and collaborate on
            meaningful content — without limits.
          </p>
        </div>

        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12  md:space-y-0">
          {/* 1. Content Reach */}
          <FadeContent
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
          >
            <div className="border hover:scale-105 transition-all duration-500 py-6 px-3 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-zinc-900">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                {/* Same icon */}
                <svg
                  className="w-6 h-6 text-primary-600 lg:w-7 lg:h-7 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Content Reach
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Publish once, reach everywhere. From articles to videos, share
                your ideas seamlessly across the web.
              </p>
            </div>
          </FadeContent>
          {/* 2. Secure & Compliant */}
          <FadeContent
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
            delay={300}
          >
            <div className="border hover:scale-105 transition-all duration-500 py-6 px-3 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-zinc-900">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Secure & Compliant
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your data stays yours. Built with best practices to keep your
                content and identity protected.
              </p>
            </div>
          </FadeContent>
          {/* 3. Smart Workflows */}
          <FadeContent
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
            delay={600}
          >
            <div className="border hover:scale-105 transition-all duration-500 py-6 px-3 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-zinc-900">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-primary-600 lg:w-7 lg:h-7 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Smart Workflows
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                From auto-tagging to image optimization — our platform works
                smarter so you don’t have to.
              </p>
            </div>
          </FadeContent>
          {/* 4. Insights & Analytics */}
          <FadeContent
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
            delay={1000}
          >
            <div className="border hover:scale-105 transition-all duration-500 py-6 px-3 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-zinc-900">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Insights & Analytics
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Know what’s working. Dive into performance metrics, views, and
                engagement stats in real-time.
              </p>
            </div>
          </FadeContent>
          {/* 5. Minimalist UI */}
          <FadeContent
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
            delay={1200}
          >
            <div className="border hover:scale-105 transition-all duration-500 py-6 px-3 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-zinc-900">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Minimalist UI
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Designed to look sleek and feel intuitive. <br />
                Customize your dashboard <br /> to fit your vibe.
              </p>
            </div>
          </FadeContent>

          {/* 6. Scalable Infra */}
          <FadeContent
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
            delay={1400}
          >
            <div className="border hover:scale-105 transition-all duration-500 py-6 px-3 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-zinc-900">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Scalable Infra
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Whether it’s 10 files or 10 million — Neuronest scales with your
                ambitions, no configs needed.
              </p>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
};

export default Features;
