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
            "Yes, this is completely an online event. You can participate from the comfort of your home.",
    },
    {
        question: "3. Who can participate?",
        answer:
            "Students, professionals, and coding enthusiasts from all backgrounds are welcome to participate.",
    },
    {
        question: "4. How can I get involved?",
        answer:
            "You can register on our website and join our Discord server to stay updated and find teammates.",
    },
    {
        question: "5. What is the limit on the team size?",
        answer: "You can have a team of 3 to 5 members.",
    },
    {
        question: "6. Lorem ipsum dolor sit amet?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        question: "7. Ultricies mi quis hendrerit?",
        answer: "Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Elementum sagittis vitae et leo duis ut diam.",
    },
    {
        question: "8. Eget arcu dictum varius?",
        answer: "Eget arcu dictum varius duis at consectetur lorem donec massa. Sapien faucibus et molestie ac feugiat sed lectus.",
    },
    {
        question: "9. Massa enim nec dui?",
        answer: "Massa enim nec dui nunc mattis enim ut tellus elementum. Arcu odio ut sem nulla pharetra diam sit.",
    },
    {
        question: "10. Tellus id interdum velit?",
        answer: "Tellus id interdum velit laoreet id donec ultrices tincidunt. Morbi tincidunt augue interdum velit euismod in pellentesque.",
    },
    {
        question: "11. Diam maecenas sed enim?",
        answer: "Diam maecenas sed enim ut sem viverra aliquet. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.",
    },
    {
        question: "12. Arcu ac tortor dignissim?",
        answer: "Arcu ac tortor dignissim convallis aenean et tortor at risus. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi.",
    },
    {
        question: "13. Blandit aliquam etiam erat?",
        answer: "Blandit aliquam etiam erat velit scelerisque in dictum. Eget mi proin sed libero enim sed faucibus turpis.",
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
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#f17575ff] mb-12 font-['PPMori']">
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
