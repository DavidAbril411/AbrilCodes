"use client";

import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("Contact");
  const defaultErrorMessage = t("error");

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const fieldClassName =
    "w-full h-[45px] md:h-[50px] px-4 bg-white/5 text-ink-100 placeholder-ink-500 outline-none text-[14px] md:text-base rounded-field border border-white/15 focus:border-blue-400 transition-colors";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.abrilcodes.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error((data && data.error) || defaultErrorMessage);
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : defaultErrorMessage;
      setStatus("error");
      const normalizedMessage =
        message && message !== "Error" && message !== "Error inesperado"
          ? message
          : defaultErrorMessage;
      setErrorMsg(normalizedMessage);
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  }

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8 px-6 py-(--spacing-section) md:flex-row md:items-start md:gap-16 lg:gap-28">
      <div className="flex flex-col items-center md:items-start">
        <h2 className="w-full text-center font-display text-[clamp(28px,6vw,64px)] font-semibold leading-tight text-gradient-accent md:w-[clamp(300px,40vw,465px)] md:text-start">
          {t("title")}
        </h2>
        <div className="mt-4 flex w-full flex-col items-start space-y-3 md:mt-6 md:space-y-4">
          <div className="flex items-center space-x-3 md:space-x-4">
            <FaPhoneAlt className="h-[45px] w-[45px] rounded-full bg-blue-700 p-3 text-[18px] text-ink-100 md:h-[63px] md:w-[63px] md:p-4 md:text-[24px]" />
            <span className="text-ink-100 text-[clamp(14px,1.5vw,18px)]">
              {t("phone")}
            </span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <FaEnvelope className="h-[45px] w-[45px] rounded-full bg-blue-700 p-3 text-[18px] text-ink-100 md:h-[63px] md:w-[63px] md:p-4 md:text-[24px]" />
            <span className="text-ink-100 text-[clamp(14px,1.5vw,18px)]">
              {t("email")}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex h-full w-full max-w-[600px] flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col space-y-3 md:space-y-4"
        >
          {/* Honeypot — must stay empty; bots fill it, humans don't see it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <label htmlFor={nameId} className="sr-only">
            {t("placeholders.name")}
          </label>
          <input
            id={nameId}
            type="text"
            placeholder={t("placeholders.name")}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
            className={fieldClassName}
          />

          <label htmlFor={emailId} className="sr-only">
            {t("placeholders.email")}
          </label>
          <input
            id={emailId}
            type="email"
            placeholder={t("placeholders.email")}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            className={fieldClassName}
          />

          <label htmlFor={messageId} className="sr-only">
            {t("placeholders.message")}
          </label>
          <textarea
            id={messageId}
            placeholder={t("placeholders.message")}
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            required
            className={`${fieldClassName} h-[120px] resize-none py-3 md:h-[150px] md:py-4`}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 h-[45px] w-full rounded-field bg-gradient-to-r from-blue-600 to-blue-700 text-[14px] text-ink-100 transition-opacity disabled:cursor-not-allowed disabled:opacity-60 md:h-[50px] md:text-base"
          >
            {status === "sending"
              ? t("sending")
              : status === "success"
              ? t("sent")
              : t("submit")}
          </button>

          {(status === "error" || status === "success") && (
            <p
              role="status"
              aria-live="polite"
              className={`text-sm ${
                status === "error" ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {status === "error" ? errorMsg : t("success")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
