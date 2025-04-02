"use client";

import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
    return (
        <section className="w-full flex flex-col md:flex-row items-center md:items-start justify-center mt-10 md:mt-20 relative z-10 gap-8 md:gap-16 lg:gap-28 max-w-[1200px] mx-auto px-5">
            
            <div className="flex flex-col items-center md:items-start">
                <h2
                    className="text-[clamp(28px,6vw,64px)] text-[#000] w-full md:w-[clamp(300px,40vw,465px)] text-center md:text-start"
                    style={{
                        fontWeight: "600",
                        lineHeight: "1.2",
                        background:
                            "linear-gradient(252deg, #03033B 37.6%, #080898 87.25%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Get in touch with me
                </h2>
                <div className="flex flex-col items-start mt-4 md:mt-6 space-y-3 md:space-y-4 w-full">
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <FaPhoneAlt className="text-white text-[18px] md:text-[24px] bg-[#06067E] w-[45px] h-[45px] md:w-[63px] md:h-[63px] rounded-full p-3 md:p-4" />
                        <span className="text-[#08089D] text-[clamp(14px,1.5vw,18px)]">
                            (+54) 351 236 2542
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <FaEnvelope className="text-white text-[18px] md:text-[24px] bg-[#06067E] w-[45px] h-[45px] md:w-[63px] md:h-[63px] rounded-full p-3 md:p-4"/>
                        <span className="text-[#08089D] text-[clamp(14px,1.5vw,18px)]">
                            davidabril411@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[600px] h-full flex flex-col items-center justify-center mt-6">
                <form className="w-full flex flex-col space-y-3 md:space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full h-[45px] md:h-[50px] px-4 bg-transparent text-[#08089D6B] placeholder-[#08089D6B] outline-none text-[14px] md:text-base"
                        style={{
                            borderRadius: "30px",
                            border: "2px solid #0A0AE4",
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-[45px] md:h-[50px] px-4 bg-transparent text-[#08089D6B] placeholder-[#08089D6B] outline-none text-[14px] md:text-base"
                        style={{
                            borderRadius: "30px",
                            border: "2px solid #0A0AE4",
                        }}
                    />
                    <textarea
                        placeholder="Comment or Message"
                        className="w-full h-[120px] md:h-[150px] px-4 py-3 md:py-4 bg-transparent text-[#08089D6B] placeholder-[#08089D6B] outline-none resize-none text-[14px] md:text-base"
                        style={{
                            borderRadius: "30px",
                            border: "2px solid #0A0AE4",
                        }}
                    />
                    <button
                        type="submit"
                        className="w-full h-[45px] md:h-[50px] bg-gradient-to-r from-[#08089D] to-[#030337] text-white rounded-[30px] text-[14px] md:text-base mt-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}