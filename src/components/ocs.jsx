import { motion } from "framer-motion";

export default function Ocs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Adds delay between each card
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-900 h-auto py-32 mt-44">
      <div className="container px-6 py-10 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              What our clients are saying
            </h1>

            <div className="flex mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>

        <motion.section
          className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Triggers animation when 10% of section is visible
        >
          <motion.div
            className="p-8 border rounded-lg dark:border-gray-700"
            variants={cardVariants}
          >
            <p className="leading-loose text-gray-500 dark:text-gray-400">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                src="src/assets/portrait-man-laughing.jpg"
                alt="Robert"
              />
              <div className="mx-2">
                <h1 className="font-semibold text-gray-800 dark:text-white">
                  Robert
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  User
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-8 bg-blue-500 border border-transparent rounded-lg dark:bg-blue-600"
            variants={cardVariants}
          >
            <p className="leading-loose text-white">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200"
                src="src/assets/10368.jpg"
                alt="Jeny Doe"
              />
              <div className="mx-2">
                <h1 className="font-semibold text-white">Jeny Doe</h1>
                <span className="text-sm text-blue-200">User</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-8 border rounded-lg dark:border-gray-700"
            variants={cardVariants}
          >
            <p className="leading-loose text-gray-500 dark:text-gray-400">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita labrum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                src="src/assets/302.jpg"
                alt="Ema Watson"
              />
              <div className="mx-2">
                <h1 className="font-semibold text-gray-800 dark:text-white">
                  Ema Watson
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  User
                </span>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
