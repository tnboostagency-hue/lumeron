"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PortalLang = "en" | "ar";

type NotificationPrefs = {
  ticketUpdates: boolean;
  slaBreaches: boolean;
  incidentAlerts: boolean;
  monthlyReports: boolean;
  channelEmail: boolean;
  channelInApp: boolean;
};

const defaultNotifications: NotificationPrefs = {
  ticketUpdates: true,
  slaBreaches: true,
  incidentAlerts: true,
  monthlyReports: true,
  channelEmail: true,
  channelInApp: true,
};

type ClientPortalState = {
  lang: PortalLang;
  profileName: string;
  profileCompany: string;
  profileRole: string;
  notifications: NotificationPrefs;
  setLang: (lang: PortalLang) => void;
  setProfile: (p: Partial<{ profileName: string; profileCompany: string; profileRole: string }>) => void;
  setNotifications: (n: Partial<NotificationPrefs>) => void;
};

export const useClientPortalStore = create<ClientPortalState>()(
  persist(
    (set) => ({
      lang: "en",
      profileName: "Noor Al-Rashidi",
      profileCompany: "ARAMCO Digital Division",
      profileRole: "IT Director",
      notifications: defaultNotifications,
      setLang: (lang) => set({ lang }),
      setProfile: (p) => set((s) => ({ ...s, ...p })),
      setNotifications: (n) =>
        set((s) => ({ notifications: { ...s.notifications, ...n } })),
    }),
    { name: "lumeron-client-portal-v1" }
  )
);
