"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Mail, Phone, MapPin, Clock, Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxWrapper from '@/components/animations/parallax-wrapper';
import { useLanguage } from '@/context/LanguageContext';

const LumeronLocationMap = dynamic(() => import('./lumeron-location-map'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-primary/10" />,
});

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const mapsUrl = "https://maps.app.goo.gl/941sLW8n7d3y4Fyv9?g_st=ic";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) {
        setSubmitError(true);
        setIsSubmitting(false);
        return;
      }
    } catch {
      setSubmitError(true);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: lang === 'ar' ? "البريد الإلكتروني" : "Email",
      value: "info@lumeron.sa",
      href: "mailto:info@lumeron.sa"
    },
    {
      icon: Phone,
      label: lang === 'ar' ? "الهاتف" : "Phone",
      value: "+966138048367",
      href: "tel:+966138048367"
    },
    {
      icon: MapPin,
      label: lang === 'ar' ? "العنوان" : "Address",
      value: lang === 'ar' ? "شارع الأمير تركي، برج الفرادان، الطابق الثالث\nالخبر 34413، المملكة العربية السعودية" : "Prince Turkey Street, Al Fardan Tower, Floor 3\nAl Khobar 34413, Saudi Arabia",
      href: mapsUrl
    },
    {
      icon: Clock,
      label: lang === 'ar' ? "ساعات العمل" : "Business Hours",
      value: lang === 'ar' ? "الأحد - الخميس\n9:00 صباحاً - 6:00 مساءً (توقيت مكة)" : "Sunday - Thursday\n9:00 AM - 6:00 PM (AST)",
      href: null
    }
  ];

  return (
        <section id="contact" className="py-[80px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-[1440px]">
          {/* Section Header */}
          <div className="text-center max-w-[700px] mx-auto mb-10 md:mb-16">
            <span className="text-tagline mb-4 block">{lang === 'ar' ? "تواصل معنا" : "Get In Touch"}</span>
            <h2 className="text-[26px] sm:text-[36px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground mb-4">
              {lang === 'ar' ? "لنقم بالبناء معاً" : "Let's Build Together"}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form with parallax */}
            <ParallaxWrapper speed={-0.05} className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={`bg-muted rounded-[24px] p-8 md:p-10 ${lang === 'ar' ? 'text-right' : ''}`}>
                  <h3 className="text-[24px] font-semibold text-foreground mb-6">
                    {lang === 'ar' ? "أرسل لنا رسالة" : "Send us a Message"}
                  </h3>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Send size={28} />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">{lang === 'ar' ? "تم إرسال الرسالة!" : "Message Sent!"}</h4>
                      <p className="text-muted-foreground">{lang === 'ar' ? "سنرد عليك في غضون 24 ساعة." : "We'll get back to you within 24 hours."}</p>
                    </div>
                  ) : submitError ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
                        <Send size={28} />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">{lang === 'ar' ? "حدث خطأ" : "Something went wrong"}</h4>
                      <p className="text-muted-foreground mb-6">{lang === 'ar' ? "لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة." : "We couldn't send your message. Please try again or contact us directly at info@lumeron.sa"}</p>
                      <button onClick={() => setSubmitError(false)} className="btn-primary px-6 py-3 text-sm">
                        {lang === 'ar' ? "حاول مجدداً" : "Try Again"}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-[14px] font-medium text-foreground mb-2">
                            {lang === 'ar' ? "الاسم" : "Name"} <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input ${lang === 'ar' ? 'text-right' : ''}`}
                            placeholder={lang === 'ar' ? "اسمك" : "Your name"}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-[14px] font-medium text-foreground mb-2">
                            {lang === 'ar' ? "البريد الإلكتروني" : "Email"} <span className="text-primary">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${lang === 'ar' ? 'text-right' : ''}`}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-[14px] font-medium text-foreground mb-2">
                          {lang === 'ar' ? "الموضوع" : "Subject"}
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`form-input ${lang === 'ar' ? 'text-right' : ''}`}
                          placeholder={lang === 'ar' ? "كيف يمكننا المساعدة؟" : "How can we help?"}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-[14px] font-medium text-foreground mb-2">
                          {lang === 'ar' ? "الرسالة" : "Message"} <span className="text-primary">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className={`form-textarea ${lang === 'ar' ? 'text-right' : ''}`}
                          placeholder={lang === 'ar' ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
                          rows={5}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-primary w-full sm:w-auto px-10 py-4 text-[15px] flex items-center justify-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {lang === 'ar' ? "جاري الإرسال..." : "Sending..."}
                          </>
                        ) : (
                          <>
                            {lang === 'ar' ? "إرسال الرسالة" : "Send Message"}
                            <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </ParallaxWrapper>

            {/* Contact Info & Map with parallax */}
            <ParallaxWrapper speed={0.05} className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Contact Information */}
                <div>
                  <h3 className={`text-[24px] font-semibold text-foreground mb-6 ${lang === 'ar' ? 'text-right' : ''}`}>
                    {lang === 'ar' ? "معلومات الاتصال" : "Contact Information"}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="group">
                        <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                            <item.icon size={22} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              {item.label}
                            </p>
                            {item.href ? (
                              <a 
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-foreground font-medium whitespace-pre-line hover:text-primary transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-foreground font-medium whitespace-pre-line">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div>
                  <h3 className={`text-[24px] font-semibold text-foreground mb-6 ${lang === 'ar' ? 'text-right' : ''}`}>
                    {lang === 'ar' ? "موقعنا" : "Our Location"}
                  </h3>
                    <div className="relative rounded-[24px] overflow-hidden border border-primary/20 bg-muted h-[280px] sm:h-[330px] md:h-[380px] shadow-[0_20px_50px_rgba(34,147,136,0.12)]" data-lenis-prevent>
                    <LumeronLocationMap mapsUrl={mapsUrl} />

                    {/* Brand tint keeps the map visually connected to Lumeron without obscuring it. */}
                    <div className="pointer-events-none absolute inset-0 z-[400] bg-gradient-to-b from-primary/10 via-transparent to-foreground/30" />

                    <div className={`absolute top-4 z-[500] ${lang === 'ar' ? 'right-4' : 'left-4'} flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md`}>
                      <img src="/lumeron-map-icon.svg" alt="Lumeron" className="h-9 w-9 rounded-xl shadow-[0_6px_18px_rgba(34,147,136,0.34)]" />
                      <div className={lang === 'ar' ? 'text-right' : ''}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{lang === 'ar' ? 'لوميرون' : 'Lumeron'}</p>
                        <p className="text-xs font-medium text-foreground">{lang === 'ar' ? 'المقر الرئيسي · الخبر' : 'Headquarters · Al Khobar'}</p>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-colors hover:text-primary/70 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                          {lang === 'ar' ? 'زيارتنا على الخريطة' : 'Visit us on Maps'}
                          <ArrowUpRight size={12} className={lang === 'ar' ? 'rotate-[-90deg]' : ''} />
                        </a>
                      </div>
                    </div>

                    {/* Map overlay link */}
                    <a 
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={lang === 'ar' ? "الحصول على الاتجاهات إلى مقر لوميرون" : "Get directions to Lumeron headquarters"}
                      className={`absolute bottom-4 z-[500] ${lang === 'ar' ? 'left-4 text-right' : 'right-4'} flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-3 py-3 text-[14px] font-semibold text-foreground shadow-xl backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-2xl`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                        <MapPin size={18} strokeWidth={2} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{lang === 'ar' ? 'الفرع الرئيسي' : 'Visit us'}</span>
                        <span className="block whitespace-nowrap">{lang === 'ar' ? 'الحصول على الاتجاهات' : 'Get directions'}</span>
                      </span>
                      <ArrowUpRight size={18} className={lang === 'ar' ? 'rotate-[-90deg]' : ''} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </ParallaxWrapper>
          </div>
        </div>
      </section>
  );
}
