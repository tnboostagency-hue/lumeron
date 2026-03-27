"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import * as THREE from 'three';

// ─── Service data ─────────────────────────────────────────────────────────────

interface ServiceItem {
  id: string;
  number: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  link: string;
  color: string;
  steps: {
    iconPath: string;
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
  }[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "ai",
    number: "01",
    titleEn: "Artificial Intelligence & Advanced Analytics",
    titleAr: "الذكاء الاصطناعي والتحليلات المتقدمة",
    descEn: "Advanced AI systems — from Arabic-native LLMs to industrial edge inference — transforming data into sovereign national intelligence.",
    descAr: "أنظمة ذكاء اصطناعي متقدمة — من نماذج اللغة العربية الأصيلة إلى الاستدلال الصناعي على الحافة — تحول البيانات إلى ذكاء وطني سيادي.",
    link: "/services/ai",
    color: "#3ec8ba",
    steps: [
      {
        iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
        headingEn: "Arabic-Native Language Models",
        headingAr: "نماذج لغة عربية أصيلة",
        bodyEn: "Custom LLMs fine-tuned on Arabic corpora delivering culturally aligned intelligence for government and enterprise workloads.",
        bodyAr: "نماذج لغوية مخصصة مدربة على مجموعات البيانات العربية لتقديم ذكاء متوافق ثقافياً للأحمال الحكومية والمؤسسية.",
      },
      {
        iconPath: "M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z",
        headingEn: "Industrial Edge AI",
        headingAr: "الذكاء الاصطناعي الصناعي على الحافة",
        bodyEn: "Real-time inference at the edge for manufacturing, energy, and logistics — reducing latency while keeping data within sovereign boundaries.",
        bodyAr: "استدلال فوري على الحافة لقطاعات التصنيع والطاقة واللوجستيات مع الحفاظ على البيانات داخل الحدود السيادية.",
      },
      {
        iconPath: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z",
        headingEn: "AI-Driven Automation",
        headingAr: "الأتمتة المدفوعة بالذكاء الاصطناعي",
        bodyEn: "Intelligent process automation and computer-vision pipelines streamlining operations across every vertical.",
        bodyAr: "أتمتة ذكية للعمليات وخطوط رؤية الحاسوب تُبسّط العمليات عبر جميع القطاعات.",
      },
    ],
  },
  {
    id: "data-centers",
    number: "02",
    titleEn: "Digital Infrastructure & Data Centers",
    titleAr: "البنية التحتية الرقمية ومراكز البيانات",
    descEn: "Sovereign hyperscale data centers and digital infrastructure anchoring national digital independence with compute power built for hyper-scale intelligence.",
    descAr: "مراكز بيانات سيادية فائقة النطاق وبنية تحتية رقمية ترسخ الاستقلال الرقمي الوطني.",
    link: "/services/data-centers",
    color: "#229388",
    steps: [
      {
        iconPath: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z",
        headingEn: "Hyperscale Infrastructure",
        headingAr: "البنية التحتية فائقة النطاق",
        bodyEn: "Tier IV facilities delivering 99.999% uptime with green-energy cooling and NCA-compliant architecture.",
        bodyAr: "مرافق من الدرجة الرابعة تقدم نسبة تشغيل 99.999٪ مع تبريد بالطاقة الخضراء وهندسة متوافقة.",
      },
      {
        iconPath: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z",
        headingEn: "Sovereign Cloud Fabric",
        headingAr: "نسيج السحابة السيادي",
        bodyEn: "Multi-availability-zone cloud fabric keeping all data on-Kingdom and under full regulatory control.",
        bodyAr: "نسيج سحابي متعدد مناطق التوافر يحافظ على جميع البيانات داخل المملكة تحت السيطرة التنظيمية.",
      },
      {
        iconPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        headingEn: "Edge & Colocation",
        headingAr: "الحافة والاستضافة المشتركة",
        bodyEn: "Distributed edge nodes and colocation pods bringing low-latency compute to every region of the Kingdom.",
        bodyAr: "عقد حافة موزعة تجلب الحوسبة منخفضة الكمون إلى كل منطقة في المملكة.",
      },
    ],
  },
  {
    id: "industrial",
    number: "03",
    titleEn: "Industrial Digitalization (Industry 4.0)",
    titleAr: "التحول الصناعي الرقمي (الصناعة 4.0)",
    descEn: "Bridging MASCO's industrial heritage with cutting-edge digital operations — IIoT, digital twins, and smart factory integration for world-class operational efficiency.",
    descAr: "ربط الإرث الصناعي لماسكو بالعمليات الرقمية المتطورة — إنترنت الأشياء الصناعي والتوائم الرقمية وتكامل المصانع الذكية.",
    link: "/services/industrial",
    color: "#1a8077",
    steps: [
      {
        iconPath: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
        headingEn: "Smart Factory Integration",
        headingAr: "تكامل المصنع الذكي",
        bodyEn: "IIoT platforms connecting OT and IT systems for real-time visibility, predictive maintenance, and zero-defect production.",
        bodyAr: "منصات IIoT تربط أنظمة OT وIT لتحقيق الرؤية الفورية والصيانة التنبؤية والإنتاج بدون عيوب.",
      },
      {
        iconPath: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
        headingEn: "Digital Twin Operations",
        headingAr: "عمليات التوأم الرقمي",
        bodyEn: "High-fidelity digital twins of industrial assets enabling simulation-driven optimisation and risk-free testing.",
        bodyAr: "توائم رقمية عالية الدقة للأصول الصناعية تُمكّن من التحسين القائم على المحاكاة والاختبار الخالي من المخاطر.",
      },
      {
        iconPath: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
        headingEn: "Workforce Capability Building",
        headingAr: "بناء قدرات القوى العاملة",
        bodyEn: "Structured training and Saudisation programs ensuring local talent operates and evolves national industrial assets.",
        bodyAr: "برامج تدريب منظمة وسعودة تضمن قيام المواهب المحلية بتشغيل وتطوير الأصول الصناعية الوطنية.",
      },
    ],
  },
  {
    id: "cybersecurity",
    number: "04",
    titleEn: "Cybersecurity & Digital Trust",
    titleAr: "الأمن السيبراني والثقة الرقمية",
    descEn: "End-to-end security posture management, 24/7 SOC operations, and cyber resilience aligned with NCA standards and national frameworks.",
    descAr: "إدارة شاملة للمكانة الأمنية وعمليات مركز العمليات الأمنية والصمود السيبراني المتوافق مع معايير الهيئة الوطنية للأمن السيبراني.",
    link: "/services/cybersecurity",
    color: "#3ec8ba",
    steps: [
      {
        iconPath: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
        headingEn: "24/7 SOC Operations",
        headingAr: "عمليات مركز العمليات الأمنية 24/7",
        bodyEn: "Round-the-clock threat monitoring, detection, and response with Saudi-certified analysts and AI-augmented triage.",
        bodyAr: "مراقبة التهديدات واكتشافها والاستجابة لها على مدار الساعة مع محللين سعوديين معتمدين وفرز معزز بالذكاء الاصطناعي.",
      },
      {
        iconPath: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
        headingEn: "Zero-Trust Architecture",
        headingAr: "معمارية انعدام الثقة",
        bodyEn: "Identity-centric zero-trust frameworks protecting every endpoint, workload, and data flow across hybrid environments.",
        bodyAr: "أطر انعدام الثقة المتمحورة حول الهوية لحماية كل نقطة نهاية وحمل عمل وتدفق بيانات عبر البيئات الهجينة.",
      },
      {
        iconPath: "M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z",
        headingEn: "NCA Compliance",
        headingAr: "الامتثال لهيئة الأمن السيبراني",
        bodyEn: "Full-stack compliance advisory and implementation aligned with NCA ECC, CSCC, and international ISO frameworks.",
        bodyAr: "استشارات وتنفيذ الامتثال الشامل المتوافق مع معايير هيئة الأمن السيبراني والأطر الدولية.",
      },
    ],
  },
  {
    id: "smart-infra",
    number: "05",
    titleEn: "Smart Infrastructure & Connectivity",
    titleAr: "البنية التحتية الذكية والاتصالات",
    descEn: "Comprehensive smart infrastructure, managed connectivity, and 24/7 operations delivering guaranteed SLAs across your entire digital estate.",
    descAr: "بنية تحتية ذكية شاملة واتصالات مدارة وعمليات على مدار الساعة مع اتفاقيات مستوى خدمة مضمونة عبر منظومتك الرقمية.",
    link: "/services/smart-infrastructure",
    color: "#229388",
    steps: [
      {
        iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
        headingEn: "Proactive Infrastructure Management",
        headingAr: "إدارة البنية التحتية الاستباقية",
        bodyEn: "AI-driven monitoring and automated remediation keeping your infrastructure healthy before incidents arise.",
        bodyAr: "مراقبة مدفوعة بالذكاء الاصطناعي وإصلاح تلقائي للحفاظ على صحة بنيتك التحتية قبل وقوع الحوادث.",
      },
      {
        iconPath: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z",
        headingEn: "Guaranteed SLA Delivery",
        headingAr: "تسليم اتفاقيات مستوى الخدمة المضمونة",
        bodyEn: "Contractually backed SLAs with transparent dashboards giving clients real-time visibility into every commitment.",
        bodyAr: "اتفاقيات مستوى خدمة مدعومة تعاقدياً مع لوحات معلومات شفافة تمنح العملاء رؤية فورية لكل التزام.",
      },
      {
        iconPath: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
        headingEn: "Dedicated Support Teams",
        headingAr: "فرق دعم مخصصة",
        bodyEn: "Bilingual Saudi-staffed support teams providing Tier 1–3 assistance with deep context of your environment.",
        bodyAr: "فرق دعم سعودية ثنائية اللغة تقدم مساعدة من الطبقة 1-3 بمعرفة عميقة ببيئتك.",
      },
    ],
  },
];

// ─── Per-service 3D animations ────────────────────────────────────────────────

type SceneObjects = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  clock: THREE.Clock;
  animFn: (t: number) => void;
};

function buildAIScene(color: THREE.Color, scene: THREE.Scene) {
  // Neural network: interconnected icosahedron + floating nodes
  const coreGeo = new THREE.IcosahedronGeometry(0.8, 2);
  const coreMat = new THREE.MeshPhongMaterial({
    color, emissive: color, emissiveIntensity: 0.2,
    transparent: true, opacity: 0.15, wireframe: false,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  const wireMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.3 });
  const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 2), wireMat);
  scene.add(wire);

  // Orbiting node ring
  const nodes: THREE.Mesh[] = [];
  const nGeo = new THREE.SphereGeometry(0.055, 8, 8);
  const nMat = new THREE.MeshBasicMaterial({ color });
  for (let i = 0; i < 12; i++) {
    const n = new THREE.Mesh(nGeo, nMat);
    nodes.push(n);
    scene.add(n);
  }

  // Outer ring
  const ringGeo = new THREE.TorusGeometry(1.3, 0.008, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.005, 8, 80), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 }));
  ring2.rotation.x = -Math.PI / 5;
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  return (t: number) => {
    core.rotation.y = t * 0.25;
    core.rotation.x = t * 0.1;
    wire.rotation.y = -t * 0.18;
    wire.rotation.z = t * 0.08;
    ring.rotation.z = t * 0.15;
    ring2.rotation.y = t * 0.12;
    nodes.forEach((n, i) => {
      const angle = (i / 12) * Math.PI * 2 + t * 0.4;
      n.position.set(Math.cos(angle) * 1.3, Math.sin(angle * 0.7) * 0.4, Math.sin(angle) * 1.3);
    });
    const pulse = 1 + 0.04 * Math.sin(t * 2.5);
    core.scale.setScalar(pulse);
  };
}

function buildRoboticsScene(color: THREE.Color, scene: THREE.Scene) {
  // Octahedron body with rotating arm rings
  const bodyGeo = new THREE.OctahedronGeometry(0.75, 1);
  const bodyMat = new THREE.MeshPhongMaterial({
    color, emissive: color, emissiveIntensity: 0.18,
    transparent: true, opacity: 0.18,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  scene.add(body);

  const wireMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 });
  const wire = new THREE.Mesh(new THREE.OctahedronGeometry(0.77, 1), wireMat);
  scene.add(wire);

  // Three intersecting torus "arms"
  const arms: THREE.Mesh[] = [];
  const armAngles = [0, Math.PI / 3, (2 * Math.PI) / 3];
  armAngles.forEach((a, i) => {
    const t = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.012, 6, 60),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 - i * 0.1 })
    );
    t.rotation.x = a;
    t.rotation.y = a * 0.7;
    arms.push(t);
    scene.add(t);
  });

  // Particle dust
  const pCount = 80;
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 3.5;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color, size: 0.022, transparent: true, opacity: 0.5 }));
  scene.add(particles);

  return (t: number) => {
    body.rotation.y = t * 0.3;
    body.rotation.x = t * 0.15;
    wire.rotation.y = -t * 0.2;
    arms[0].rotation.z = t * 0.4;
    arms[1].rotation.z = -t * 0.35;
    arms[2].rotation.x = t * 0.3;
    particles.rotation.y = t * 0.06;
    body.scale.setScalar(1 + 0.035 * Math.sin(t * 2));
  };
}

function buildDataCentersScene(color: THREE.Color, scene: THREE.Scene) {
  // Box grid: server rack visual
  const boxGeo = new THREE.BoxGeometry(0.18, 0.08, 0.22);
  const boxes: THREE.Mesh[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 4; c++) {
      const m = new THREE.Mesh(
        boxGeo,
        new THREE.MeshPhongMaterial({
          color, emissive: color, emissiveIntensity: 0.1 + Math.random() * 0.25,
          transparent: true, opacity: 0.3 + Math.random() * 0.3,
        })
      );
      m.position.set(-0.35 + c * 0.25, -0.22 + r * 0.125, 0);
      boxes.push(m);
      scene.add(m);
    }
  }

  // Outer shell wireframe cube
  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.2, 0.6),
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.18 })
  );
  scene.add(shell);

  // Data stream lines (vertical)
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
  for (let i = 0; i < 8; i++) {
    const pts = [
      new THREE.Vector3(-0.7 + i * 0.22, -1.2, 0),
      new THREE.Vector3(-0.7 + i * 0.22, 1.2, 0),
    ];
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  }

  return (t: number) => {
    shell.rotation.y = t * 0.15;
    shell.rotation.x = Math.sin(t * 0.3) * 0.15;
    boxes.forEach((b, i) => {
      const mat = b.material as THREE.MeshPhongMaterial;
      mat.emissiveIntensity = 0.1 + 0.35 * Math.abs(Math.sin(t * 1.2 + i * 0.5));
    });
  };
}

function buildIndustrialScene(color: THREE.Color, scene: THREE.Scene) {
  // Gear-like: cylinder + torus stack
  const cyl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32),
    new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.2, transparent: true, opacity: 0.25 })
  );
  scene.add(cyl);

  const wireCyl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.52, 0.52, 0.27, 32),
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 })
  );
  scene.add(wireCyl);

  // Orbiting torus gear rings
  const gears: THREE.Mesh[] = [];
  const radii = [0.85, 1.1, 1.38];
  radii.forEach((r, i) => {
    const g = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.04 - i * 0.008, 8, 48),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 - i * 0.08 })
    );
    gears.push(g);
    scene.add(g);
  });

  // Floating spheres (bolts)
  const boltGeo = new THREE.SphereGeometry(0.04, 6, 6);
  const bolts: THREE.Mesh[] = [];
  for (let i = 0; i < 10; i++) {
    const b = new THREE.Mesh(boltGeo, new THREE.MeshBasicMaterial({ color }));
    bolts.push(b);
    scene.add(b);
  }

  return (t: number) => {
    cyl.rotation.y = t * 0.4;
    wireCyl.rotation.y = -t * 0.4;
    gears[0].rotation.z = t * 0.5;
    gears[1].rotation.z = -t * 0.35;
    gears[2].rotation.x = t * 0.2;
    bolts.forEach((b, i) => {
      const a = (i / 10) * Math.PI * 2 + t * 0.3;
      b.position.set(Math.cos(a) * 1.1, Math.sin(t * 0.8 + i) * 0.3, Math.sin(a) * 1.1);
    });
    cyl.scale.setScalar(1 + 0.03 * Math.sin(t * 2));
  };
}

function buildCybersecScene(color: THREE.Color, scene: THREE.Scene) {
  // Shield shape: icosahedron + rotating hexagonal layers
  const shieldGeo = new THREE.IcosahedronGeometry(0.72, 1);
  const shieldMat = new THREE.MeshPhongMaterial({
    color, emissive: color, emissiveIntensity: 0.25,
    transparent: true, opacity: 0.2,
  });
  const shield = new THREE.Mesh(shieldGeo, shieldMat);
  scene.add(shield);

  const wireShield = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.74, 1),
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.4 })
  );
  scene.add(wireShield);

  // Scanning rings
  const scanRings: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.82 + i * 0.2, 0.006, 6, 60),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 - i * 0.1 })
    );
    r.rotation.x = Math.PI / 2;
    scanRings.push(r);
    scene.add(r);
  }

  // Binary-style floating dots
  const dotGeo = new THREE.SphereGeometry(0.02, 4, 4);
  const dots: { mesh: THREE.Mesh; speed: number; offset: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }));
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.2 + Math.random() * 0.5;
    d.userData = { angle, radius, y: (Math.random() - 0.5) * 2 };
    dots.push({ mesh: d, speed: 0.3 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2 });
    scene.add(d);
  }

  return (t: number) => {
    shield.rotation.y = t * 0.22;
    wireShield.rotation.y = -t * 0.18;
    wireShield.rotation.z = t * 0.06;
    scanRings.forEach((r, i) => {
      r.rotation.z = t * (0.3 + i * 0.1) * (i % 2 === 0 ? 1 : -1);
    });
    dots.forEach(({ mesh, speed, offset }) => {
      const a = mesh.userData.angle + t * speed;
      mesh.position.set(
        Math.cos(a) * mesh.userData.radius,
        mesh.userData.y + 0.15 * Math.sin(t * 1.5 + offset),
        Math.sin(a) * mesh.userData.radius
      );
    });
    shield.scale.setScalar(1 + 0.03 * Math.sin(t * 3));
  };
}

function buildManagedScene(color: THREE.Color, scene: THREE.Scene) {
  // Network sphere: many interconnected nodes
  const nodeCount = 18;
  const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const nodeMat = new THREE.MeshBasicMaterial({ color });
  const nodePositions: THREE.Vector3[] = [];
  const nodes: THREE.Mesh[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    const r = 0.9;
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    nodePositions.push(pos);
    const n = new THREE.Mesh(nodeGeo, nodeMat.clone());
    n.position.copy(pos);
    nodes.push(n);
    scene.add(n);
  }

  // Edges connecting close nodes
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < 0.85) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]),
          lineMat
        );
        scene.add(line);
      }
    }
  }

  // Core sphere
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.3, transparent: true, opacity: 0.35 })
  );
  scene.add(core);

  // Outer wire globe
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 16, 16),
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 })
  );
  scene.add(globe);

  const pivot = new THREE.Object3D();
  nodes.forEach(n => pivot.add(n));
  scene.add(pivot);
  nodes.forEach(n => scene.remove(n)); // re-add via pivot

  return (t: number) => {
    pivot.rotation.y = t * 0.2;
    pivot.rotation.x = t * 0.08;
    globe.rotation.y = -t * 0.1;
    core.scale.setScalar(1 + 0.05 * Math.sin(t * 2.5));
  };
}

// ─── Three.js Canvas ──────────────────────────────────────────────────────────

function ServiceCanvas({ serviceId, color }: { serviceId: string; color: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const sceneRef = useRef<SceneObjects | null>(null);
  const serviceIdRef = useRef(serviceId);
  const [opacity, setOpacity] = useState(1);

  // Build or rebuild the Three.js scene
  const buildScene = useCallback((id: string, col: string) => {
    const el = mountRef.current;
    if (!el) return;

    // Tear down existing
    if (sceneRef.current) {
      cancelAnimationFrame(frameRef.current);
      sceneRef.current.renderer.dispose();
      if (el.contains(sceneRef.current.renderer.domElement))
        el.removeChild(sceneRef.current.renderer.domElement);
      sceneRef.current = null;
    }

    const W = el.clientWidth || 380;
    const H = el.clientHeight || 380;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.z = 3.5;
    const threeCol = new THREE.Color(col);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(threeCol, 1.4);
    dir.position.set(2, 3, 2);
    scene.add(dir);

    const clock = new THREE.Clock();
    let animFn: (t: number) => void;
    switch (id) {
      case "ai": animFn = buildAIScene(threeCol, scene); break;
      case "robotics": animFn = buildRoboticsScene(threeCol, scene); break;
      case "data-centers": animFn = buildDataCentersScene(threeCol, scene); break;
      case "industrial":
      case "industrial-excellence": animFn = buildIndustrialScene(threeCol, scene); break;
      case "cybersecurity": animFn = buildCybersecScene(threeCol, scene); break;
      case "smart-infra":
      case "managed-services": animFn = buildManagedScene(threeCol, scene); break;
      default: animFn = buildAIScene(threeCol, scene);
    }

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      animFn(clock.getElapsedTime());
      renderer.render(scene, camera);
    };
    animate();
    sceneRef.current = { renderer, scene, camera, clock, animFn };
  }, []);

  // Initial mount
  useEffect(() => {
    buildScene(serviceId, color);
    return () => {
      cancelAnimationFrame(frameRef.current);
      const el = mountRef.current;
      if (sceneRef.current) {
        sceneRef.current.renderer.dispose();
        if (el && el.contains(sceneRef.current.renderer.domElement))
          el.removeChild(sceneRef.current.renderer.domElement);
        sceneRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Crossfade on service change
  useEffect(() => {
    if (serviceIdRef.current === serviceId) return;
    serviceIdRef.current = serviceId;
    // Fade out → rebuild → fade in
    setOpacity(0);
    const t = setTimeout(() => {
      buildScene(serviceId, color);
      setOpacity(1);
    }, 220);
    return () => clearTimeout(t);
  }, [serviceId, color, buildScene]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ transition: 'opacity 0.22s ease', opacity }}
    />
  );
}

function canvasServiceId(id: string): string {
  if (id === "smart-infra") return "managed-services";
  return id;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesCarousel() {
  const { lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollDriverRef = useRef<HTMLDivElement>(null);
  const isAr = lang === "ar";

  const active = SERVICES[activeIdx];
  const total = SERVICES.length;

  const scrollToServiceIndex = useCallback((i: number) => {
    const el = scrollDriverRef.current;
    if (!el || typeof window === "undefined") {
      setActiveIdx(i);
      return;
    }
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      setActiveIdx(i);
      return;
    }
    const vh = window.innerHeight;
    const totalScroll = el.offsetHeight - vh;
    if (totalScroll <= 0) {
      setActiveIdx(i);
      return;
    }
    const n = SERVICES.length;
    const p = n <= 1 ? 0 : i / (n - 1);
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top + p * totalScroll;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    setActiveIdx(i);
  }, []);

  useEffect(() => {
    const el = scrollDriverRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = el.offsetHeight - vh;
      if (totalScroll <= 0) return;
      const scrolled = Math.min(Math.max(0, -rect.top), totalScroll);
      const p = scrolled / totalScroll;
      const n = SERVICES.length;
      const idx = Math.min(n - 1, Math.max(0, Math.floor(p * n + 1e-6)));
      setActiveIdx((prev) => (prev === idx ? prev : idx));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const ServicePills = ({
    compact,
    onSelect,
  }: {
    compact?: boolean;
    onSelect?: (i: number) => void;
  }) => (
    <div
      className={`flex gap-2 ${compact ? "flex-nowrap overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1" : `flex-wrap mb-8 lg:mb-10`} ${isAr ? (compact ? "" : "flex-row-reverse") : ""}`}
      role="tablist"
      aria-label={isAr ? "اختر الخدمة" : "Select a service"}
    >
      {SERVICES.map((s, i) => {
        const selected = i === activeIdx;
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => (onSelect ? onSelect(i) : scrollToServiceIndex(i))}
            className={`rounded-full border text-left transition-all duration-200 shrink-0 snap-start ${isAr ? "text-right" : ""} ${
              compact ? "max-w-[200px] px-2.5 py-1.5" : "px-3.5 py-2 max-w-[min(100%,220px)] sm:max-w-[260px]"
            }`}
            style={{
              borderColor: selected ? s.color : "#e5e7eb",
              background: selected ? `${s.color}12` : "#fff",
              boxShadow: selected ? `0 0 0 1px ${s.color}33` : undefined,
            }}
          >
            <span
              className="block text-[9px] uppercase tracking-[0.12em] font-bold"
              style={{ color: selected ? s.color : "#9ca3af" }}
            >
              {s.number}
            </span>
            <span
              className={`block font-semibold leading-snug mt-0.5 line-clamp-2 ${
                compact ? "text-[10px]" : "text-[11px] sm:text-[12px]"
              } ${selected ? "text-foreground" : "text-gray-500"}`}
            >
              {isAr ? s.titleAr : s.titleEn}
            </span>
          </button>
        );
      })}
    </div>
  );

  const DetailBlock = ({
    compact,
    canvasHeight,
  }: {
    compact?: boolean;
    canvasHeight: string;
  }) => (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start ${compact ? "gap-3 pb-2" : "pb-10"}`}>
      <div className={`lg:col-span-5 ${compact ? "" : ""}`}>
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#229388]/10"
          style={{
            height: canvasHeight,
            minHeight: compact ? "120px" : "220px",
            background: "linear-gradient(135deg,#f7fffe 0%,#edfbf9 100%)",
          }}
        >
          <ServiceCanvas serviceId={canvasServiceId(active.id)} color={active.color} />
          <div
            className={`absolute bottom-2 font-bold leading-none select-none pointer-events-none ${isAr ? "left-3" : "right-3"}`}
            style={{ fontSize: compact ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 10vw, 56px)", color: active.color, opacity: 0.1 }}
          >
            {active.number}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div key={active.id} className={isAr ? "text-right" : ""} style={{ animation: "fadeSlideIn 0.4s ease forwards" }}>
          <div className={`flex items-center gap-2 mb-1.5 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full" style={{ background: active.color }} />
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: active.color }}>
              {active.number} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3
            className={`font-semibold text-foreground leading-[1.15] mb-2 ${
              compact ? "text-[16px] sm:text-[17px]" : "text-[22px] sm:text-[26px] lg:text-[28px]"
            }`}
          >
            {isAr ? active.titleAr : active.titleEn}
          </h3>
          <p
            className={`leading-relaxed text-gray-500 mb-4 max-w-[540px] ${
              compact ? "text-[11px] sm:text-[12px] line-clamp-4" : "text-[14px] sm:text-[15px] mb-6"
            }`}
          >
            {isAr ? active.descAr : active.descEn}
          </p>
          <Link
            href={active.link}
            className={`group inline-flex items-center gap-2 text-white rounded-full font-medium transition-all duration-300 ${isAr ? "flex-row-reverse" : ""} ${
              compact ? "px-4 py-2 text-[11px]" : "px-5 py-2.5 text-[13px] gap-2.5"
            }`}
            style={{
              background: active.color,
              boxShadow: `0 0 0 0 ${active.color}66`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px 3px ${active.color}44`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${active.color}66`;
            }}
          >
            <span>{isAr ? "اكتشف المزيد" : "Explore Service"}</span>
            <svg
              className={`transition-transform duration-300 group-hover:translate-x-0.5 ${isAr ? "rotate-180" : ""} ${compact ? "w-3 h-3" : "w-4 h-4"}`}
              viewBox="0 0 21 16"
              fill="none"
            >
              <path d="M12.8078 0L20.202 7.39706V8.58824L12.8078 16L11.3554 14.5441L16.8277 9.05882H0V6.92647H16.8277L11.3554 1.44118L12.8078 0Z" fill="white" />
            </svg>
          </Link>
        </div>

        {compact ? (
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory mt-3 pb-1 -mx-1 px-1">
            {active.steps.map((step, stIdx) => (
              <div key={stIdx} className="w-[min(88vw,260px)] shrink-0 snap-start">
                <CompactStepCard step={step} isAr={isAr} accent={active.color} compact />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8">
            {active.steps.map((step, stIdx) => (
              <CompactStepCard key={stIdx} step={step} isAr={isAr} accent={active.color} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="services" className="bg-white relative z-[2] pb-12 lg:pb-28" dir={isAr ? "rtl" : "ltr"}>
      <div className="container mx-auto px-5 sm:px-8 max-w-[1440px] pt-10 pb-4 lg:pt-20 lg:pb-12 relative z-20">
        <div className={`flex items-center gap-3 mb-2 lg:mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
          <div className="w-2 h-2 bg-[#229388] flex-shrink-0" />
          <span className="uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-[#229388] font-semibold">
            {isAr ? "خدماتنا وقدراتنا" : "Our Services & Capabilities"}
          </span>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-[#229388] via-[#3ec8ba] to-transparent mb-3 lg:mb-4 opacity-60" />
        <h2
          className={`text-[22px] sm:text-[28px] md:text-[36px] lg:text-[52px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground max-w-[800px] ${isAr ? "text-right" : ""}`}
        >
          {isAr ? (
            <>
              تقنيات <span className="text-[#229388]">تُشكّل</span> المستقبل
            </>
          ) : (
            <>
              Technologies that <span className="text-[#229388]">shape</span> the future
            </>
          )}
        </h2>
        <p className={`mt-2 lg:mt-3 text-[13px] sm:text-[15px] lg:text-[16px] text-gray-500 max-w-[640px] leading-[1.55] lg:leading-[1.6] ${isAr ? "text-right" : ""}`}>
          {isAr
            ? "تسريع الاقتصاد الرقمي من خلال بنية تحتية مرنة وخدمات مدارة وابتكارات متطورة."
            : "Accelerating the digital economy through resilient infrastructure, managed services, and cutting-edge innovations."}
        </p>
      </div>

      {/* Mobile & tablet: one compact scroll area */}
      <div className="lg:hidden container mx-auto px-5 sm:px-8 max-w-[1440px]">
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#fafcfb] p-3 sm:p-4 shadow-sm">
          <ServicePills compact onSelect={(i) => setActiveIdx(i)} />
          <DetailBlock compact canvasHeight="clamp(120px, 32vw, 160px)" />
          <Link
            href="/services"
            className={`mt-3 inline-flex items-center gap-2 border-2 text-foreground rounded-full px-4 py-2 text-[11px] font-medium transition-all duration-300 hover:text-white ${isAr ? "flex-row-reverse" : ""}`}
            style={{ borderColor: "#229388" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#229388";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <span>{isAr ? "عرض جميع الخدمات" : "View All Services"}</span>
            <svg className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} viewBox="0 0 21 16" fill="none">
              <path d="M12.8078 0L20.202 7.39706V8.58824L12.8078 16L11.3554 14.5441L16.8277 9.05882H0V6.92647H16.8277L11.3554 1.44118L12.8078 0Z" fill="currentColor" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Desktop: scroll advances active service (sticky viewport) */}
      <div ref={scrollDriverRef} className="hidden lg:block relative" style={{ height: `${SERVICES.length * 100}vh` }}>
        <div className="sticky top-0 min-h-[100dvh] flex flex-col justify-center py-6 box-border">
          <div className="container mx-auto px-5 sm:px-8 max-w-[1440px] w-full">
            <p className={`text-[11px] text-[#64748b] mb-4 max-w-xl ${isAr ? "text-right ml-auto" : ""}`}>
              {isAr ? "مرر لأسفل للتنقل بين الخدمات." : "Scroll down to move through each service."}
            </p>
            <ServicePills />
            <DetailBlock canvasHeight="min(42vw, 280px)" />
            <Link
              href="/services"
              className={`group mt-6 inline-flex items-center gap-3 border-2 text-foreground rounded-full px-6 py-3 text-[13px] font-medium transition-all duration-300 hover:text-white ${isAr ? "flex-row-reverse" : ""}`}
              style={{ borderColor: "#229388" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#229388";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span>{isAr ? "عرض جميع الخدمات" : "View All Services"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 ${isAr ? "rotate-180" : ""}`}
                viewBox="0 0 21 16"
                fill="none"
              >
                <path d="M12.8078 0L20.202 7.39706V8.58824L12.8078 16L11.3554 14.5441L16.8277 9.05882H0V6.92647H16.8277L11.3554 1.44118L12.8078 0Z" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─── Compact capability card (grid; no scroll-linked motion) ─────────────────

function CompactStepCard({
  step,
  isAr,
  accent,
  compact,
}: {
  step: ServiceItem['steps'][0];
  isAr: boolean;
  accent: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div
        className={`flex min-h-0 flex-col gap-1.5 rounded-lg border border-black/[0.06] bg-white/80 p-2.5 shadow-sm ${isAr ? 'text-right' : ''}`}
      >
        <div className={`flex items-center gap-1.5 ${isAr ? 'flex-row-reverse' : ''}`}>
          <div
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
            style={{
              background: `${accent}14`,
              border: `1.5px solid ${accent}`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" style={{ color: accent }}>
              <path d={step.iconPath} />
            </svg>
          </div>
        </div>
        <h5 className="text-[11px] font-semibold leading-tight text-foreground line-clamp-2">
          {isAr ? step.headingAr : step.headingEn}
        </h5>
        <p className="text-[10px] leading-snug text-gray-500 line-clamp-3">
          {isAr ? step.bodyAr : step.bodyEn}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white/60 p-4 shadow-[0_2px_12px_rgba(30,129,120,0.06)] ${isAr ? 'text-right' : ''}`}
    >
      <div
        className={`flex items-center gap-2.5 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            background: `${accent}14`,
            border: `2px solid ${accent}`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]" style={{ color: accent }}>
            <path d={step.iconPath} />
          </svg>
        </div>
      </div>
      <h5 className="text-[13px] font-semibold leading-snug text-foreground">
        {isAr ? step.headingAr : step.headingEn}
      </h5>
      <p className="text-[12px] leading-[1.65] text-gray-500">
        {isAr ? step.bodyAr : step.bodyEn}
      </p>
    </div>
  );
}
