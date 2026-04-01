import { track } from '@vercel/analytics';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const LOCAL_CLICK_STATS_KEY = 'portfolio-local-click-stats';

export const initGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return;
  }

  if (window.gtag) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
};

export const trackEvent = (eventName, params = {}) => {
  try {
    track(eventName, params);
  } catch (error) {
    console.error('Vercel analytics tracking failed:', error);
  }

  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, params);
  }
};

export const trackLinkClick = ({ label, href, section }) => {
  if (typeof window !== 'undefined') {
    const existingStats = JSON.parse(window.localStorage.getItem(LOCAL_CLICK_STATS_KEY) || '{}');
    const statKey = `${section}:${label}`;
    const nextStats = {
      ...existingStats,
      [statKey]: (existingStats[statKey] || 0) + 1,
    };
    window.localStorage.setItem(LOCAL_CLICK_STATS_KEY, JSON.stringify(nextStats));
  }

  trackEvent('portfolio_link_click', {
    label,
    href,
    section,
  });
};
