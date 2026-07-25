/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  subtitle?: string;
  bottomRightDescription?: string;
  iconSrc: string | undefined;
  iconAlt: string;
  items?: { title: string; description: string }[];
  actionLabel: string;
}

export default function ServiceCard({ service }: { service: ServiceItem }) {
  const [open, setOpen] = useState(false);
  const {
    title,
    description,
    fullDescription,
    subtitle,
    bottomRightDescription,
    iconSrc,
    iconAlt,
    items = [],
    actionLabel,
  } = service;

  return (
    <motion.div
      layout
      className="glass flex flex-col rounded-card p-6"
      transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
    >
      <motion.div layout="position" className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-700 p-3.5">
          <img src={iconSrc} alt={iconAlt} className="h-full w-full object-contain" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink-100">{title}</h3>
        <p className="mt-2 text-sm text-ink-300">{description}</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-ink-100 transition-colors hover:bg-blue-600"
        >
          {actionLabel}
        </button>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-white/10 pt-5 text-left">
              <p className="text-sm leading-relaxed text-ink-300">{fullDescription}</p>
              {subtitle && (
                <h4 className="text-sm font-medium text-blue-300">{subtitle}</h4>
              )}
              {items.length > 0 && (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.title} className="text-sm leading-relaxed">
                      <span className="font-medium text-ink-100">{item.title}: </span>
                      <span className="text-ink-300">{item.description}</span>
                    </li>
                  ))}
                </ul>
              )}
              {bottomRightDescription && (
                <p className="text-sm leading-relaxed text-ink-300">
                  {bottomRightDescription}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
