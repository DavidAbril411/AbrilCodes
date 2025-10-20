import type { Messages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import en from "../messages/en.json";
import es from "../messages/es.json";

const messagesByLocale: Record<string, Messages> = {
    en,
    es,
};

export default getRequestConfig(({ locale }) => {
    const resolvedLocale = locale ?? routing.defaultLocale;

    const messages = messagesByLocale[resolvedLocale];

    if (!messages) {
        notFound();
    }

    return { locale: resolvedLocale, messages };
});
