import { useState } from "react";
import { KeywordsData } from "./KeywordsData";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";

const KeywordInputs = () => {
  const [service, setService] = useState("");
  const [area, setArea] = useState("");

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

  return (
    <div>
      <Toaster richColors position="top-right" />

      <div className="mt-16 flex items-center justify-center gap-1.5">
        <select
          name=""
          id=""
          className="border-gray-400 border-1 p-2 rounded-md shadow-sm w-2/12 mx-1.5"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Select Service</option>
          <option value="Dental">Dental</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Laparoscopic">Laparoscopic</option>
          <option value="Endoscopic">Endoscopic</option>
          <option value="Urology">Urology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Gastroenterology">Gastroenterology</option>
        </select>
        <select
          name=""
          id=""
          className="border-gray-400 border-1 p-2 rounded-md shadow-sm w-2/12 mx-1.5"
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
          className="px-6 py-2 bg-orange-400 text-white rounded-md cursor-pointer"
          onClick={showKeywords}
        >
          Search
        </button>
      </div>

      <div className="w-4/12 justify-center m-auto mt-15">
        <AnimatePresence>
          {generatedKeywords.length > 0 && (
            <div>
              <ul className=" p-8 rounded-md">
                {generatedKeywords.map((keyword, index) => (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 10 }}
                    transition={{ delay: index * 0.1 }} // step-by-step animation
                    className="your-keyword-card"
                  >
                    <li
                      key={index}
                      className="p-3 bg-white rounded shadow-lg mb-2 flex justify-between items-center"
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
    </div>
  );
};

export default KeywordInputs;
