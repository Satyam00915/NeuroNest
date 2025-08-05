import ProfileCard from "./ui/ProfileCard";

const About = () => {
  return (
    <section id="about" className="bg-transparent py-20">
      <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:items-center">
          <ProfileCard
            name="Satyam Upadhyay"
            title="Web Developer"
            handle="_lucifer_0915"
            avatarUrl="/profile.png"
            status="Available for work"
            contactText="Contact Me"
            contacturl="https://satyam-portfolio-navy.vercel.app"
            miniAvatarUrl="/logod.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          />
        </div>

        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Hi, I'm{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Satyam Upadhyay
            </span>
          </h1>
          <h2 className="mb-6 text-2xl font-semibold text-gray-600 dark:text-gray-300">
            Web Developer
          </h2>

          <div className="max-w-2xl mb-6 space-y-4 text-gray-700 md:text-lg lg:text-xl dark:text-gray-400">
            <p>
              I'm a Computer Science student passionate about building
              meaningful digital products. I specialize in modern web
              development using React, Next.js, TypeScript, and Tailwind CSS,
              and I’m currently diving deeper into backend technologies like
              Node.js, Prisma, and Supabase.
            </p>
            <p>
              Right now, I’m building <strong>Neuronest</strong> — a second
              brain platform designed to help developers organize, retrieve, and
              manage their knowledge seamlessly. It’s my way of merging clean UI
              design with scalable backend logic. Through this project, I’m
              leveling up my full-stack skills while experimenting with DevOps
              workflows, automation, and eventually AI integration to make
              knowledge management smarter and more intuitive.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://www.linkedin.com/in/satyam0915/"
              target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center dark:text-white text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 transition-colors"
            >
              Get in touch
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
