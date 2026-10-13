/** Single source of truth for links, contact details and public pricing used across the site. */

export const BOOKING_URL = "https://calendar.app.google/FEyhB3T1gC1Nnk5h6";
export const PORTAL_URL = "https://app.noshowkillerai.com";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61585860255283";
export const SUPPORT_EMAIL = "onboarding@noshowkillerai.com";

/** Ava's public line (sales inbound). Prospects can call and talk to her directly. */
export const AVA_PHONE_DISPLAY = "+1 (515) 316-5623";
export const AVA_PHONE_TEL = "+15153165623";

export const PLANS = [
  { name: "Starter", price: 497, minutes: 500, note: "One location, one line." },
  { name: "Growth", price: 997, minutes: 1500, note: "Busy practices and multi-line front desks.", featured: true },
  { name: "Scale", price: 1997, minutes: 4000, note: "Groups and multi-location practices." },
] as const;

export const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
