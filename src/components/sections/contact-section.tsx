"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxWrapper from '@/components/animations/parallax-wrapper';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactSection() {
  const { lang, t } = useLanguage();
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
      value: "+966 11 511 8787",
      href: "tel:+966115118787"
    },
    {
      icon: MapPin,
      label: lang === 'ar' ? "العنوان" : "Address",
      value: lang === 'ar' ? "شارع الأمير تركي، برج الفرادان، الطابق الثالث\nالخبر 34413، المملكة العربية السعودية" : "Prince Turkey Street, Al Fardan Tower, Floor 3\nAl Khobar 34413, Saudi Arabia",
      href: "https://www.google.com/maps/search/Prince+Turkey+Street+Al+Fardan+Tower+Al+Khobar"
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
                    <div className="relative rounded-[20px] overflow-hidden border border-border bg-muted h-[240px] sm:h-[300px] md:h-[360px]" data-lenis-prevent>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.1!2d50.2!3d26.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49f5e9b0000000%3A0x1!2sPrince+Turkey+Street%2C+Al+Fardan+Tower%2C+Al+Khobar+34413%2C+Saudi+Arabia!5e0!3m2!1sen!2ssa!4v1740000000000!5m2!1sen!2ssa"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                    
                    {/* Map overlay link */}
                    <a 
                      href="https://www.google.com/maps/search/Prince+Turkey+Street+Al+Fardan+Tower+Al+Khobar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute bottom-4 ${lang === 'ar' ? 'left-4 flex-row-reverse' : 'right-4'} bg-white rounded-full px-4 py-2 flex items-center gap-2 text-[14px] font-semibold text-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
                    >
                      {lang === 'ar' ? "افتح في الخرائط" : "Open in Maps"}
                      <ArrowUpRight size={16} />
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
