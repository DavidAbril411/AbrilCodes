import type {Messages} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  try {
    const messages = (await import(`../messages/${locale}.json`)).default as Messages;
    return {locale: locale as string, messages};
  } catch {
    notFound();
  }
});
