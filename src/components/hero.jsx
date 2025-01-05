import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  // Animation variants for the text content
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut", staggerChildren: 0.2 },
    },
  };

  // Image animation with scale effect
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <header className="bg-white dark:bg-gray-900 h-[92dvh] flex items-center">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="lg:max-w-lg">
              <motion.h1
                className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-5xl"
                variants={textVariants}
              >
                Best place to choose <br /> your{" "}
                <span className="text-blue-500">Doctor</span>
              </motion.h1>

              <motion.p
                className="mt-3 text-gray-600 dark:text-gray-400"
                variants={textVariants}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                beatae error laborum ab amet sunt recusandae? Reiciendis natus
                perspiciatis optio.
              </motion.p>

              <Link to="/doctors">
                <motion.button
                  className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                  variants={textVariants}
                >
                  Shop Now
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <motion.img
              className="w-full h-full lg:max-w-3xl"
              src="src/assets/header_img-DhAi3lLA.png"
              alt="Catalogue-pana.svg"
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
