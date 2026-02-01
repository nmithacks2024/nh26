"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "1. What is a Hackathon?",
        answer:
            "A hackathon is a meet and code event where coding/tech enthusiasts come together to create new digital solutions for an existing or possible problem!",
    },
    {
        question: "2. Is this an online event?",
        answer:
            "With online gangs thriving today, we hope to spread your physical connections and hence, our hackathon will be conducted in the Nitte University Bangalore campus, your social hub!",
    },
    {
        question: "3. Who can participate?",
        answer:
            "Registration is open to undergraduates. Code, collab and create! The main goal is to socialize while tackling social issues!",
    },
    {
        question: "4. How can I get involved?",
        answer:
            "Register your team through Devfolio to submit your project idea and secure your spot. Follow us on our social media handles to stay up to date.",
    },
    {
        question: "5. What is the limit on the team size?",
        answer: "A team can have a maximum of 4 participants. We also accept individual registrations from the Tony Starks out there.",
    },
    {
        question: "6. Is there a registration fee?",
        answer: "Just like an open-wifi, our hub of new connections costs only $FREE! Join in and code away with our worry-free hospitality!",
    },
    {
        question: "7. Is there free WiFi?",
        answer: "We believe that strong connections help bring out global change. So, yes! WiFi is on us!",
    },
    {
        question: "8. Do I have to give a project demo?",
        answer: "Yes. Teams have to demonstrate the working of their project before the jury. After all, reviews are a fundamental part of any project!",
    },
    {
        question: "9. What is the evaluation criteria?",
        answer: "An independent jury will score the participants based on the relevance, feasibility, implementation, presentation, and creativity of their project.",
    },
    {
        question: "10. Can I submit a pre-existing project?",
        answer: "No. That would be grounds for disqualification. Conception of new ideas is the aim of this collab so follow the spirit!",
    },
    {
        question: "11. How would you ensure that the projects haven't been repeated?",
        answer: "GitHub repositories of your team's project will have to be set to \"public\" (before, during and after the hackathon) so your idea could maybe become the spark needed to ignite a newer idea, all in real-time, with every update!",
    },
    {
        question: "12. Will food be provided during the hackathon?",
        answer: "Yes, food will be provided during hackathon hours to keep your energy flowing and ideas growing!",
    },
    {
        question: "13. Will accommodation be arranged for participants?",
        answer: "Yes, accommodation will be provided so you can stay connected, collaborate without limits and co-create change throughout the event.",
    },
];

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const displayedFaqs = showAll ? faqs : faqs.slice(0, 6);

    return (
        <div className="w-full py-20 px-4 md:px-10 bg-[#010524ff]">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-[#f17575ff] mb-12 font-['PPMori']">
                <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
                    Frequently Asked Questions
                </span>
            </h2>
            <div className="flex flex-col w-full">
                <AnimatePresence initial={false}>
                    {displayedFaqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-[0.5px] border-[#b69898ff] rounded-lg overflow-hidden w-full"
                        >
                            <div
                                className="flex justify-between items-center w-full p-5 cursor-pointer bg-[#02093D]"
                                onClick={() => toggleFaq(index)}
                            >
                                <h3 className={`text-lg md:text-xl font-medium font-['PPMori'] hover:text-[#f17575ff] ${activeIndex === index ? 'text-[#f17575ff]' : 'text-white'}`}>
                                    {faq.question}
                                </h3>
                                <div className="text-white text-xl font-light hover:text-[#f17575ff]">
                                    {activeIndex === index ? (
                                        <span>&#215;</span>
                                    ) : (
                                        <span>&#43;</span>
                                    )}
                                </div>
                            </div>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="bg-white/0"
                                    >
                                        <p className="p-6 text-base text-white font-['PPMori']">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!showAll ? (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-8 py-1 bg-white text-black rounded-full font-bold text-lg hover:bg-neutral-200 cursor-pointer transition-colors"
                    >
                        More
                    </button>
                </div>
            ) : (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setShowAll(false)}
                        className="px-8 py-1 bg-white text-black rounded-full font-bold text-lg hover:bg-neutral-200 cursor-pointer transition-colors"
                    >
                        Less
                    </button>
                </div>
            )}
        </div>
    );
};


export default Faqs;
