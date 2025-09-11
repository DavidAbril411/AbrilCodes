"use client";

import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        setErrorMsg("");
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                throw new Error(data.error || 'Error');
            }
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || 'Error inesperado');
        } finally {
            setTimeout(() => {
                setStatus("idle");
            }, 4000);
        }
    }

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
                        <FaEnvelope className="text-white text-[18px] md:text-[24px] bg-[#06067E] w-[45px] h-[45px] md:w-[63px] md:h-[63px] rounded-full p-3 md:p-4" />
                        <span className="text-[#08089D] text-[clamp(14px,1.5vw,18px)]">
                            davidabril411@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[600px] h-full flex flex-col items-center justify-center mt-6">
                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-3 md:space-y-4">
                    {/* Honeypot */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
                        required
                        className="w-full h-[45px] md:h-[50px] px-4 bg-transparent text-[#08089D] placeholder-[#08089D6B] outline-none text-[14px] md:text-base"
                        style={{
                            borderRadius: "30px",
                            border: "2px solid #0A0AE4",
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                        required
                        className="w-full h-[45px] md:h-[50px] px-4 bg-transparent text-[#08089D] placeholder-[#08089D6B] outline-none text-[14px] md:text-base"
                        style={{
                            borderRadius: "30px",
                            border: "2px solid #0A0AE4",
                        }}
                    />
                    <textarea
                        placeholder="Comment or Message"
                        value={message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setMessage(e.target.value)}
                        required
                        className="w-full h-[120px] md:h-[150px] px-4 py-3 md:py-4 bg-transparent text-[#08089D] placeholder-[#08089D6B] outline-none resize-none text-[14px] md:text-base"
                        style={{
                            borderRadius: "30px",
                            border: "2px solid #0A0AE4",
                        }}
                    />
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full h-[45px] md:h-[50px] bg-gradient-to-r from-[#08089D] to-[#030337] text-white rounded-[30px] text-[14px] md:text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Submit'}
                    </button>
                    {status === 'error' && (
                        <p className="text-red-600 text-sm">{errorMsg}</p>
                    )}
                    {status === 'success' && (
                        <p className="text-green-600 text-sm">Mensaje enviado correctamente.</p>
                    )}
                </form>
            </div>
        </section>
    );
}