import { useState } from "react";
import { KeywordsData } from "./KeywordsData";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { div } from "framer-motion/client";

const KeywordInputs = () => {
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [generatedKeywords, setGeneratedKeywords] = useState([]);

  const getGeneratedKeywords = () => {
    if (service && area) {
      const templates = KeywordsData[service] || [];

      return templates.map((template) => template.replace("{{area}}", area));
    } else {
      return [];
    }
  };

  const showKeywords = () => {
    const keywords = getGeneratedKeywords();
    setGeneratedKeywords(keywords);
  };

  const copyKeyword = async (keyword) => {
    try {
      await navigator.clipboard.writeText(keyword);
      toast.success(`Copied Successfully`);
    } catch (err) {
      toast.error("Failed to copy keyword");
    }
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = generatedKeywords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = generatedKeywords.length / itemsPerPage;

  return (
    <div>
      <Toaster richColors position="top-right" />

      <div className=" mt-16 flex-col text-center items-center justify-center md:gap-1.5 md:flex-row">
        <select
          name=""
          id=""
          className="service-select border-gray-400 border-1 py-3 px-4 mb-3 text-lg rounded-lg shadow-gray-400 shadow-md w-10/12 mx-1.5 md:w-2/12 appearance-none bg-white relative z-10"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Select Service</option>
          <option value="Dental">Dental</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Urology">Urology</option>

          <option value="Pulmonology">Pulmonology</option>
          <option value="Gastroenterology">Gastroenterology</option>
        </select>
        <select
          name=""
          id=""
          className="area-select border-gray-400 border-1 py-3 px-4 text-lg rounded-lg mb-3 shadow-gray-400 shadow-md w-10/12 mx-1.5 md:w-2/12 appearance-none bg-white relative z-10"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">Select Area</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Madhapur">Madhapur</option>
          <option value="Jubilee Hills">Jubilee Hills</option>
          <option value="Banjara Hills">Banjara Hills</option>
          <option value="Gachibowli">Gachibowli</option>
          <option value="Uppal">Uppal</option>
          <option value="Habsiguda">Habsiguda</option>
          <option value="Nacharam">Nacharam</option>
          <option value="AS Rao Nagar">AS Rao Nagar</option>
        </select>

        <button
          className="px-8 py-3 bg-orange-400 text-white text-lg font-bold rounded-4xl cursor-pointer mx-auto ml-3 w-fit md:w-auto"
          onClick={showKeywords}
        >
          Search
        </button>
      </div>

      <div className="w-12/12 md:w-4/12 justify-center m-auto mt-15">
        <AnimatePresence>
          {generatedKeywords.length > 0 && (
            <div>
              <ul className=" p-8 rounded-md">
                {currentItems.map((keyword, index) => (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 10 }}
                    transition={{ delay: index * 0.1 }} // step-by-step animation
                    className="your-keyword-card"
                  >
                    <li
                      key={index}
                      className="p-3 bg-white rounded shadow-gray-400 shadow-md text-lg mb-4 flex justify-between items-center"
                    >
                      <span>{keyword}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => copyKeyword(keyword)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-copy"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                          />
                        </svg>
                      </button>
                    </li>
                  </motion.div>
                ))}
              </ul>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-3/12 items-center justify-center flex text-center m-auto ">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className="py-2 px-4 bg-orange-400 m-2 text-white rounded-md shadow-lg cursor-pointer"
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeywordInputs;
