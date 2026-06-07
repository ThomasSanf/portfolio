import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "../lib/LanguageContext";

const originalText = new WeakMap();

const dictionary = [
  ["Hi, I'm", "你好，我是"],
  ["Electronic Engineering Student · FPGA & Embedded Systems Developer", "電子工程學生 · FPGA 與嵌入式系統開發者"],
  [
    "I'm a French electronic engineering student at National Taipei University of Technology in Taipei, focused on FPGA, digital systems, embedded systems, low-level hardware development, and modern web applications. Before studying electronic engineering, I studied cybersecurity and worked as a freelance web developer, mainly with TypeScript, React, Vue.js, and CMS-based websites.",
    "我是一名來自法國、目前就讀於國立臺北科技大學電子工程系的學生，專注於 FPGA、數位系統、嵌入式系統、低階硬體開發，以及現代網頁應用程式。在轉向電子工程之前，我曾學習資安與軟體開發，也曾以自由接案的方式使用 TypeScript、React、Vue.js 與 CMS 為小型公司開發網站。"
  ],
  ["Work", "作品"],
  ["My work", "作品"],
  ["My last works", "近期作品"],
  ["Contact", "聯絡"],
  ["Built with Next.js.", "使用 Next.js 製作。"],
  ["Back home", "回首頁"],
  ["← Back home", "← 回首頁"],
  ["Table of Contents", "目錄"],
  ["Overview", "概覽"],
  ["Stack", "技術堆疊"],
  ["Highlights", "重點"],

  ["Renesas H8/300H Pedometer Reverse Engineering", "Renesas H8/300H 計步器逆向工程"],
  [
    "A reverse-engineering project focused on understanding and reproducing the behavior of a Renesas H8/300H-based pedometer system.",
    "一個針對 Renesas H8/300H 架構計步器的逆向工程專案，目標是理解並重現其系統行為。"
  ],
  [
    "A retro-engineering project focused on understanding and reproducing the behavior of a Renesas H8/300H-based pedometer system.",
    "一個針對 Renesas H8/300H 架構計步器的逆向工程專案，目標是理解並重現其系統行為。"
  ],
  [
    "This project focuses on reverse engineering a pedometer built around the Renesas H8/300H architecture. The work involves studying the original firmware and hardware behavior, understanding the embedded system architecture, and using that knowledge to reproduce or reimplement key functionality on modern hardware.",
    "這個專案聚焦於一個以 Renesas H8/300H 架構為核心的計步器逆向工程。我分析原始韌體與硬體行為，理解其嵌入式系統架構，並將這些觀察轉化為可在現代硬體上重現或重新實作的功能。"
  ],

  ["FPGA LR35902-Based CISC CPU Digital System", "基於 LR35902 的 FPGA CISC CPU 數位系統"],
  ["FPGA CISC CPU Digital System", "FPGA CISC CPU 數位系統"],
  [
    "A complete FPGA-based digital system built around an LR35902-inspired CISC CPU, with custom video, audio, HDMI output, SDRAM experiments, and hardware debugging.",
    "一個以 LR35902 風格 CISC CPU 為核心的完整 FPGA 數位系統，包含影像、音訊、HDMI 輸出、SDRAM 實驗與硬體除錯。"
  ],
  [
    "A complete FPGA-based digital system built around an LR35902-inspired CISC CPU architecture. The CPU is based on the Sharp LR35902 used in the original Game Boy family, combining an 8-bit register-oriented instruction model with memory-mapped I/O, interrupt handling, stack operations, and tight timing requirements. The system also includes an integrated pixel processing unit, audio processing unit, HDMI output, external memory experiments, and hardware-level debugging.",
    "這是一個以 LR35902 風格 CISC CPU 架構為核心的完整 FPGA 數位系統。CPU 參考原始 Game Boy 系列所使用的 Sharp LR35902，結合 8 位元暫存器導向的指令模型、記憶體映射 I/O、中斷處理、堆疊操作與嚴格的時序需求。系統也包含像素處理單元、音訊處理單元、HDMI 輸出、外部記憶體實驗，以及硬體層級除錯。"
  ],
  ["CPU Architecture", "CPU 架構"],
  ["Instruction Set", "指令集"],
  ["Integrated GPU: Pixel Processing Unit", "整合式 GPU：像素處理單元"],
  ["Audio Processing Unit", "音訊處理單元"],
  ["FPGA Integration Process on Quartus", "Quartus 上的 FPGA 整合流程"],
  ["Saleae Logic Analyzer Debugging", "使用 Saleae 邏輯分析儀除錯"],
  ["HDMI Driver", "HDMI Driver"],
  ["PLL 25 MHz Clock", "PLL 25 MHz 時脈"],
  ["LPDDR2 SDRAM and Its Limits", "LPDDR2 SDRAM 與其限制"],

  ["PlayPal Club", "PlayPal Club"],
  [
    "A mobile app for university tennis clubs to organize games, manage players, and build local sports communities.",
    "一款為大學網球社群設計的手機應用程式，用於組織球局、管理玩家並建立在地運動社群。"
  ],
  [
    "PlayPal Club is a social sports app designed for tennis clubs and university communities in Taiwan. It allows users to create games, join matches, manage profiles, track activity, and connect with other players through a mobile-first experience.",
    "PlayPal Club 是一款為台灣網球社與大學社群設計的社交運動 App。使用者可以建立球局、加入比賽、管理個人資料、追蹤活動，並透過行動優先的體驗與其他球友連結。"
  ],
];

const shouldSkip = (node) => {
  const parent = node.parentElement;
  if (!parent) return true;

  const tag = parent.tagName?.toLowerCase();
  if (["script", "style", "noscript", "code", "pre", "textarea", "input"].includes(tag)) {
    return true;
  }

  if (parent.closest("[data-no-translate]")) {
    return true;
  }

  return false;
};

const translateText = (text) => {
  let output = text;

  for (const [en, zh] of dictionary) {
    output = output.split(en).join(zh);
  }

  return output;
};

const walkTextNodes = (root, callback) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let node = walker.nextNode();
  while (node) {
    callback(node);
    node = walker.nextNode();
  }
};

function applyTranslation(lang) {
  if (typeof document === "undefined") return;

  walkTextNodes(document.body, (node) => {
    if (shouldSkip(node)) return;

    if (!originalText.has(node)) {
      originalText.set(node, node.nodeValue);
    }

    const original = originalText.get(node);

    if (lang === "zh") {
      node.nodeValue = translateText(original);
    } else {
      node.nodeValue = original;
    }
  });
}

export default function LanguageDomTranslator() {
  const { lang } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      applyTranslation(lang);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [lang, router.asPath]);

  return null;
}
