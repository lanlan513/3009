import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HotspotInfo {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  description: string;
  diagramSvg: string;
  cameraTarget: { x: number; y: number; z: number };
  cameraPosition: { x: number; y: number; z: number };
}

export interface Butterfly3DConfig {
  id: string;
  name: string;
  primaryColor: number;
  secondaryColor: number;
  accentColor: number;
  bodyColor: number;
  wingPattern: "monarch" | "morpho" | "kaiser";
  hotspots: HotspotInfo[];
}

const butterflyConfigs: Record<string, Butterfly3DConfig> = {
  "specimen-1": {
    id: "specimen-1",
    name: "帝王蝶",
    primaryColor: 0xff6b35,
    secondaryColor: 0x1a1a2e,
    accentColor: 0xffffff,
    bodyColor: 0x2d2d2d,
    wingPattern: "monarch",
    hotspots: [
      {
        id: "wing-edge",
        name: "翅膀边缘",
        position: { x: 2.2, y: 0.8, z: 0 },
        description:
          "帝王蝶翅膀边缘具有独特的双层结构。外层由加厚的翅脉支撑，形成坚固的边框；内层分布着白色斑点，每边约有8-12个。边缘翅脉的特殊排列有助于在长距离迁徙中抵御风力损伤。研究表明，帝王蝶翅膀边缘的厚度比普通蝴蝶厚约15%，这是其能完成数千公里迁徙的重要结构基础。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <defs>
              <linearGradient id="wingEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff6b35" stop-opacity="0.8"/>
                <stop offset="50%" stop-color="#1a1a2e" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.7"/>
              </linearGradient>
            </defs>
            <path d="M50,100 Q80,30 180,40 Q260,50 270,100 Q260,150 180,160 Q80,170 50,100 Z" 
                  fill="url(#wingEdgeGrad)" stroke="#1a1a2e" stroke-width="2"/>
            <path d="M180,40 Q260,50 270,100 Q260,150 180,160" 
                  fill="none" stroke="#ffd700" stroke-width="4" stroke-dasharray="8,4" opacity="0.9"/>
            <circle cx="230" cy="70" r="8" fill="white" stroke="#1a1a2e" stroke-width="1.5"/>
            <circle cx="245" cy="100" r="7" fill="white" stroke="#1a1a2e" stroke-width="1.5"/>
            <circle cx="230" cy="130" r="8" fill="white" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="265" y1="100" x2="295" y2="100" stroke="#ffd700" stroke-width="2" marker-end="url(#arrow)"/>
            <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ffd700"/></marker></defs>
            <text x="250" y="45" text-anchor="middle" fill="#ffd700" font-size="11" font-weight="bold">加厚翅脉</text>
            <text x="250" y="175" text-anchor="middle" fill="#ff6b35" font-size="10">白色斑点带</text>
          </svg>
        `,
        cameraTarget: { x: 1.5, y: 0.5, z: 0 },
        cameraPosition: { x: 3.5, y: 1.5, z: 3 },
      },
      {
        id: "antenna",
        name: "触角棒槌",
        position: { x: 0, y: 1.6, z: 0.6 },
        description:
          "帝王蝶的触角末端膨大呈典型的棒槌状结构，这是鳞翅目蝶类的重要分类特征。棒槌区域密集分布着约2000个嗅觉感受器，能够远距离感知性信息素和植物挥发物。迁徙中的帝王蝶还利用触角中的光感受蛋白进行太阳罗盘定向，其生物钟精确调节迁徙方向，使数千公里的旅程不致迷失。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <line x1="150" y1="180" x2="130" y2="60" stroke="#2d2d2d" stroke-width="3"/>
            <line x1="150" y1="180" x2="170" y2="60" stroke="#2d2d2d" stroke-width="3"/>
            <ellipse cx="125" cy="45" rx="18" ry="28" fill="#ff6b35" stroke="#1a1a2e" stroke-width="2"/>
            <ellipse cx="175" cy="45" rx="18" ry="28" fill="#ff6b35" stroke="#1a1a2e" stroke-width="2"/>
            <circle cx="120" cy="35" r="2" fill="#ffd700" opacity="0.8"/>
            <circle cx="130" cy="42" r="2" fill="#ffd700" opacity="0.8"/>
            <circle cx="123" cy="50" r="2" fill="#ffd700" opacity="0.8"/>
            <circle cx="170" cy="35" r="2" fill="#ffd700" opacity="0.8"/>
            <circle cx="180" cy="42" r="2" fill="#ffd700" opacity="0.8"/>
            <circle cx="173" cy="50" r="2" fill="#ffd700" opacity="0.8"/>
            <text x="230" y="50" fill="#ff6b35" font-size="11" font-weight="bold">棒槌区</text>
            <line x1="200" y1="55" x2="185" y2="48" stroke="#ff6b35" stroke-width="1.5" marker-end="url(#arr2)"/>
            <defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#ff6b35"/></marker></defs>
            <text x="80" y="120" fill="#1a1a2e" font-size="10">~2000个嗅觉感受器</text>
            <text x="150" y="195" text-anchor="middle" fill="#2d2d2d" font-size="10" font-style="italic">触角基部</text>
          </svg>
        `,
        cameraTarget: { x: 0, y: 1.2, z: 0.3 },
        cameraPosition: { x: 1.5, y: 2, z: 3 },
      },
      {
        id: "proboscis",
        name: "口器卷曲处",
        position: { x: -0.1, y: 1.1, z: 0.4 },
        description:
          "帝王蝶的虹吸式口器（喙管）是其最精巧的取食器官。平时紧密盘卷如钟表发条，取食花蜜时借助肌肉和血压的协同作用伸展。喙管由两个外颚叶特化愈合而成，内部形成直径约0.05mm的食物道。取食时，喙管顶端的化学感受器先探测花蜜浓度，再通过节律性抽吸动作将花蜜吸入消化道。帝王蝶偏好高浓度花蜜，这为其长途迁徙提供充足能量。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <path d="M150,40 C130,60 110,80 130,100 C150,120 170,110 160,90 C150,70 140,90 150,110 C160,130 180,120 170,100 C160,80 140,90 150,110" 
                  fill="none" stroke="#2d2d2d" stroke-width="5" stroke-linecap="round"/>
            <path d="M150,40 L170,20 L185,25 L165,50 Z" fill="#ff6b35" stroke="#1a1a2e" stroke-width="1.5"/>
            <circle cx="170" cy="30" r="3" fill="#ffd700"/>
            <text x="60" y="70" fill="#ff6b35" font-size="11" font-weight="bold">卷曲的喙管</text>
            <line x1="110" y1="75" x2="130" y2="80" stroke="#ff6b35" stroke-width="1.5"/>
            <text x="210" y="40" fill="#2d2d2d" font-size="10" font-weight="bold">化学感受器</text>
            <line x1="200" y1="45" x2="180" y2="32" stroke="#2d2d2d" stroke-width="1.5"/>
            <text x="150" y="180" text-anchor="middle" fill="#1a1a2e" font-size="10">盘卷约3.5圈，伸展时可达12mm</text>
            <circle cx="150" cy="110" r="25" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="4,4" opacity="0.7"/>
          </svg>
        `,
        cameraTarget: { x: 0, y: 0.9, z: 0.5 },
        cameraPosition: { x: 1, y: 1.2, z: 3 },
      },
      {
        id: "wing-vein",
        name: "翅脉结构",
        position: { x: 1.2, y: 0.3, z: 0 },
        description:
          "帝王蝶的翅脉系统呈现典型的蛱蝶科脉相。前翅有12条主脉从翅基辐射而出，后翅则有9条主脉。翅脉不仅是支撑翅膀的骨架，其内部还包含气管和神经，构成完整的生理系统。帝王蝶翅脉的独特排列方式——尤其是中室区域的封闭结构，是斑蝶亚科的重要鉴别特征，也是其分类学研究的关键依据。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <path d="M60,100 Q90,40 180,50 Q250,60 260,100 Q250,140 180,150 Q90,160 60,100 Z" 
                  fill="#ff6b35" fill-opacity="0.3" stroke="#1a1a2e" stroke-width="2"/>
            <line x1="60" y1="100" x2="120" y2="55" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="150" y2="48" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="180" y2="50" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="210" y2="65" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="230" y2="100" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="210" y2="135" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="180" y2="150" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="150" y2="152" stroke="#1a1a2e" stroke-width="1.5"/>
            <line x1="60" y1="100" x2="120" y2="145" stroke="#1a1a2e" stroke-width="1.5"/>
            <rect x="120" y="80" width="60" height="40" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="5,3"/>
            <text x="150" y="102" text-anchor="middle" fill="#ffd700" font-size="10" font-weight="bold">中室</text>
            <text x="20" y="100" fill="#2d2d2d" font-size="10">翅基</text>
            <text x="255" y="105" fill="#2d2d2d" font-size="10">翅缘</text>
          </svg>
        `,
        cameraTarget: { x: 0.8, y: 0.2, z: 0 },
        cameraPosition: { x: 2.5, y: 0.5, z: 2.5 },
      },
    ],
  },
  "specimen-2": {
    id: "specimen-2",
    name: "蓝闪蝶",
    primaryColor: 0x1e90ff,
    secondaryColor: 0x003366,
    accentColor: 0x87ceeb,
    bodyColor: 0x1a1a2e,
    wingPattern: "morpho",
    hotspots: [
      {
        id: "wing-edge",
        name: "翅膀边缘",
        position: { x: 2.4, y: 0.9, z: 0 },
        description:
          "蓝闪蝶翅膀边缘呈现深棕色镶边，与蓝色翅面形成鲜明对比。边缘区域密布着特殊的黑色鳞片，这些鳞片不含结构色，仅含黑色素。边缘翅脉的增厚结构使其在快速穿越雨林冠层时能有效抵御碰撞损伤。蓝闪蝶的飞行速度可达每小时20公里，翅膀边缘的特殊结构是其高速飞行的重要保障。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <defs>
              <linearGradient id="morphoEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e90ff" stop-opacity="0.9"/>
                <stop offset="70%" stop-color="#003366" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#2d1810" stop-opacity="1"/>
              </linearGradient>
            </defs>
            <path d="M40,100 Q70,25 180,35 Q270,45 280,100 Q270,155 180,165 Q70,175 40,100 Z" 
                  fill="url(#morphoEdge)" stroke="#1a1a2e" stroke-width="2"/>
            <path d="M180,35 Q270,45 280,100 Q270,155 180,165" 
                  fill="none" stroke="#ffd700" stroke-width="4" stroke-dasharray="8,4" opacity="0.8"/>
            <rect x="210" y="60" width="15" height="10" fill="#2d1810" opacity="0.9"/>
            <rect x="230" y="55" width="15" height="12" fill="#2d1810" opacity="0.9"/>
            <rect x="220" y="125" width="15" height="11" fill="#2d1810" opacity="0.9"/>
            <text x="245" y="40" fill="#ffd700" font-size="11" font-weight="bold">棕色镶边</text>
            <text x="240" y="185" text-anchor="middle" fill="#1e90ff" font-size="10">增厚翅脉结构</text>
            <line x1="275" y1="100" x2="295" y2="100" stroke="#ffd700" stroke-width="2"/>
          </svg>
        `,
        cameraTarget: { x: 1.6, y: 0.6, z: 0 },
        cameraPosition: { x: 3.5, y: 1.5, z: 3 },
      },
      {
        id: "antenna",
        name: "触角棒槌",
        position: { x: 0, y: 1.7, z: 0.6 },
        description:
          "蓝闪蝶的触角细长，末端棒槌状结构不如其他蝶类明显，这是闪蝶属的特征之一。触角全长约15-18mm，棒槌区占触角长度的约1/6。棒槌上分布的化学感受器对发酵果实和树液的气味特别敏感，因为蓝闪蝶的主要食物来源并非花蜜，而是雨林中腐烂的果实。这种独特的食性偏好与其触角感受器的特化密切相关。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <line x1="150" y1="180" x2="125" y2="40" stroke="#1a1a2e" stroke-width="2"/>
            <line x1="150" y1="180" x2="175" y2="40" stroke="#1a1a2e" stroke-width="2"/>
            <ellipse cx="122" cy="32" rx="10" ry="20" fill="#003366" stroke="#1e90ff" stroke-width="1.5"/>
            <ellipse cx="178" cy="32" rx="10" ry="20" fill="#003366" stroke="#1e90ff" stroke-width="1.5"/>
            <circle cx="120" cy="25" r="1.5" fill="#87ceeb" opacity="0.8"/>
            <circle cx="124" cy="32" r="1.5" fill="#87ceeb" opacity="0.8"/>
            <circle cx="176" cy="25" r="1.5" fill="#87ceeb" opacity="0.8"/>
            <circle cx="180" cy="32" r="1.5" fill="#87ceeb" opacity="0.8"/>
            <text x="50" y="50" fill="#003366" font-size="11" font-weight="bold">棒槌区</text>
            <text x="50" y="65" fill="#1a1a2e" font-size="9">(占全长1/6)</text>
            <line x1="95" y1="55" x2="115" y2="38" stroke="#003366" stroke-width="1.5"/>
            <text x="220" y="100" fill="#1e90ff" font-size="10">发酵果实</text>
            <text x="220" y="115" fill="#1e90ff" font-size="10">感受器富集</text>
            <line x1="215" y1="90" x2="185" y2="38" stroke="#1e90ff" stroke-width="1.5" stroke-dasharray="4,3"/>
          </svg>
        `,
        cameraTarget: { x: 0, y: 1.3, z: 0.3 },
        cameraPosition: { x: 1.5, y: 2.2, z: 3 },
      },
      {
        id: "proboscis",
        name: "口器卷曲处",
        position: { x: -0.1, y: 1.15, z: 0.4 },
        description:
          "蓝闪蝶的喙管比一般访花蝶类更粗壮，这与其取食发酵果实的习性相适应。喙管全长约14mm，盘卷约3圈，取食时可完全伸展探入果实裂缝。喙管内壁有细密的倒刺状结构，有助于刮取果实表面的发酵汁液。研究发现，蓝闪蝶偏好酒精浓度在5-15%之间的发酵果实，这也解释了它们在雨林中常聚集于落果区域的行为。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <path d="M150,40 C128,65 105,90 130,110 C155,130 180,115 168,90 C156,65 138,85 150,110 C162,135 185,120 175,95 C165,70 145,85 152,110" 
                  fill="none" stroke="#1a1a2e" stroke-width="6" stroke-linecap="round"/>
            <path d="M150,40 L172,18 L190,24 L168,52 Z" fill="#003366" stroke="#1e90ff" stroke-width="1.5"/>
            <path d="M160,32 L172,24 L180,30 L170,40 Z" fill="#87ceeb" opacity="0.5"/>
            <text x="40" y="80" fill="#003366" font-size="11" font-weight="bold">粗壮喙管</text>
            <text x="40" y="95" fill="#1a1a2e" font-size="9">(约14mm)</text>
            <line x1="95" y1="88" x2="125" y2="80" stroke="#003366" stroke-width="1.5"/>
            <text x="220" y="50" fill="#87ceeb" font-size="10" font-weight="bold">刮取结构</text>
            <line x1="215" y1="58" x2="185" y2="35" stroke="#87ceeb" stroke-width="1.5"/>
            <text x="150" y="185" text-anchor="middle" fill="#1a1a2e" font-size="10">盘卷约3圈，适应发酵果实取食</text>
            <circle cx="150" cy="105" r="28" fill="none" stroke="#1e90ff" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
          </svg>
        `,
        cameraTarget: { x: 0, y: 0.95, z: 0.5 },
        cameraPosition: { x: 1, y: 1.3, z: 3 },
      },
      {
        id: "wing-scales",
        name: "结构色鳞片",
        position: { x: 1.4, y: 0.5, z: 0 },
        description:
          "蓝闪蝶最著名的特征是翅膀闪耀的金属蓝色，这并非色素色，而是典型的结构色。翅膀上每平方毫米分布约2000片鳞片，每片鳞片表面有高度规则的纳米级脊状结构，间距约200nm，正好匹配蓝光波长。光在这些结构间发生干涉、衍射和散射，最终只反射特定波长的蓝光。这种精妙的光子结构已成为仿生学研究的热点。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <defs>
              <linearGradient id="structGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#87ceeb"/>
                <stop offset="25%" stop-color="#1e90ff"/>
                <stop offset="50%" stop-color="#00bfff"/>
                <stop offset="75%" stop-color="#1e90ff"/>
                <stop offset="100%" stop-color="#87ceeb"/>
              </linearGradient>
            </defs>
            <rect x="30" y="30" width="240" height="140" fill="url(#structGrad)" rx="8"/>
            <g transform="translate(50,60)">
              <line x1="0" y1="0" x2="0" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="12" y1="0" x2="12" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="24" y1="0" x2="24" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="36" y1="0" x2="36" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="48" y1="0" x2="48" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="60" y1="0" x2="60" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="72" y1="0" x2="72" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="84" y1="0" x2="84" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="96" y1="0" x2="96" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="108" y1="0" x2="108" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="120" y1="0" x2="120" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="132" y1="0" x2="132" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="144" y1="0" x2="144" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <line x1="156" y1="0" x2="156" y2="80" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
              <text x="78" y="100" text-anchor="middle" fill="#1a1a2e" font-size="10">~200nm脊状间距</text>
            </g>
            <text x="150" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">纳米级光子结构</text>
            <text x="150" y="192" text-anchor="middle" fill="#1a1a2e" font-size="10">每mm²约2000片鳞片 · 光干涉产生结构色</text>
          </svg>
        `,
        cameraTarget: { x: 0.9, y: 0.3, z: 0 },
        cameraPosition: { x: 2.5, y: 0.6, z: 2.5 },
      },
    ],
  },
  "specimen-4": {
    id: "specimen-4",
    name: "金斑喙凤蝶",
    primaryColor: 0x228b22,
    secondaryColor: 0xffd700,
    accentColor: 0x006400,
    bodyColor: 0x1a2e1a,
    wingPattern: "kaiser",
    hotspots: [
      {
        id: "wing-edge",
        name: "翅膀边缘",
        position: { x: 2.3, y: 0.85, z: 0 },
        description:
          "金斑喙凤蝶翅膀边缘呈现深绿色至黑色的过渡带，前翅外缘有整齐排列的金绿色弦月纹。后翅尾突细长如丝带，末端略呈匙形膨大，这是喙凤蝶属独有的特征。尾突边缘翅脉高度强化，使其在穿越密林时不会被树枝轻易折断。这种优雅的尾突结构在求偶飞行中还能产生特殊的气流扰动，增强雄性的视觉吸引力。",
        diagramSvg: `
          <svg viewBox="0 0 300 220" class="w-full h-full">
            <defs>
              <linearGradient id="kaiserEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#228b22" stop-opacity="0.85"/>
                <stop offset="60%" stop-color="#006400" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#1a2e1a" stop-opacity="1"/>
              </linearGradient>
            </defs>
            <path d="M35,110 Q70,30 180,40 Q265,50 275,110 Q265,170 180,180 Q70,190 35,110 Z" 
                  fill="url(#kaiserEdge)" stroke="#1a2e1a" stroke-width="2"/>
            <path d="M180,40 Q265,50 275,110 Q265,170 180,180" 
                  fill="none" stroke="#ffd700" stroke-width="4" stroke-dasharray="8,4" opacity="0.8"/>
            <path d="M180,180 L170,210 L185,205 L190,180 Z" fill="#006400" stroke="#ffd700" stroke-width="1.5"/>
            <path d="M220,180 L215,215 L232,210 L230,180 Z" fill="#006400" stroke="#ffd700" stroke-width="1.5"/>
            <circle cx="235" cy="75" r="6" fill="#ffd700" opacity="0.9"/>
            <circle cx="248" cy="100" r="5" fill="#ffd700" opacity="0.9"/>
            <circle cx="235" cy="135" r="6" fill="#ffd700" opacity="0.9"/>
            <text x="250" y="35" fill="#ffd700" font-size="11" font-weight="bold">金绿弦月纹</text>
            <text x="200" y="218" text-anchor="middle" fill="#006400" font-size="10">尾突结构</text>
            <line x1="272" y1="110" x2="295" y2="110" stroke="#ffd700" stroke-width="2"/>
          </svg>
        `,
        cameraTarget: { x: 1.5, y: 0.55, z: 0 },
        cameraPosition: { x: 3.5, y: 1.5, z: 3 },
      },
      {
        id: "antenna",
        name: "触角棒槌",
        position: { x: 0, y: 1.65, z: 0.6 },
        description:
          "金斑喙凤蝶的触角长约22-25mm，末端棒槌膨大明显，呈典型的纺锤形。棒槌区表面覆盖约3000个高密度的嗅觉感受器，对雌性释放的性信息素具有极高的灵敏度——雄性可在5公里外探测到单只雌性的存在。这一特征在金斑喙凤蝶种群密度极低的栖息地中尤为重要，确保了雌雄个体能够成功相遇交配。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <line x1="150" y1="185" x2="120" y2="35" stroke="#1a2e1a" stroke-width="3"/>
            <line x1="150" y1="185" x2="180" y2="35" stroke="#1a2e1a" stroke-width="3"/>
            <ellipse cx="116" cy="26" rx="14" ry="24" fill="#228b22" stroke="#ffd700" stroke-width="2"/>
            <ellipse cx="184" cy="26" rx="14" ry="24" fill="#228b22" stroke="#ffd700" stroke-width="2"/>
            <ellipse cx="116" cy="26" rx="8" ry="16" fill="#006400" opacity="0.6"/>
            <ellipse cx="184" cy="26" rx="8" ry="16" fill="#006400" opacity="0.6"/>
            <circle cx="113" cy="18" r="1.8" fill="#ffd700" opacity="0.9"/>
            <circle cx="119" cy="26" r="1.8" fill="#ffd700" opacity="0.9"/>
            <circle cx="113" cy="34" r="1.8" fill="#ffd700" opacity="0.9"/>
            <circle cx="181" cy="18" r="1.8" fill="#ffd700" opacity="0.9"/>
            <circle cx="187" cy="26" r="1.8" fill="#ffd700" opacity="0.9"/>
            <circle cx="181" cy="34" r="1.8" fill="#ffd700" opacity="0.9"/>
            <text x="45" y="50" fill="#006400" font-size="11" font-weight="bold">纺锤形棒槌</text>
            <text x="45" y="65" fill="#1a2e1a" font-size="9">~3000个感受器</text>
            <line x1="95" y1="58" x2="112" y2="32" stroke="#006400" stroke-width="1.5"/>
            <text x="225" y="110" fill="#ffd700" font-size="10" font-weight="bold">5公里外</text>
            <text x="225" y="125" fill="#ffd700" font-size="10">可探测信息素</text>
            <path d="M220,100 Q195,70 188,40" fill="none" stroke="#ffd700" stroke-width="1.5" stroke-dasharray="5,3"/>
          </svg>
        `,
        cameraTarget: { x: 0, y: 1.25, z: 0.3 },
        cameraPosition: { x: 1.5, y: 2.1, z: 3 },
      },
      {
        id: "proboscis",
        name: "口器卷曲处",
        position: { x: -0.1, y: 1.12, z: 0.4 },
        description:
          "金斑喙凤蝶的喙管是凤蝶科中最长的种类之一，完全伸展可达25-30mm，平时紧密盘卷约4.5圈。这种超长口器与其偏好的蜜源植物——深山含笑、金叶含笑等木兰科植物的长花冠管完美契合。喙管末端有特化的味觉感受器，能够精准判断花蜜中的糖分浓度和氨基酸组成，只选择营养最优的花朵取食。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <path d="M150,35 C122,65 95,100 128,120 C160,140 195,120 178,90 C160,60 130,85 150,115 C170,145 200,125 185,95 C170,65 140,90 152,118 C165,145 192,128 180,100" 
                  fill="none" stroke="#1a2e1a" stroke-width="5" stroke-linecap="round"/>
            <path d="M150,35 L175,12 L195,18 L170,50 Z" fill="#228b22" stroke="#ffd700" stroke-width="1.5"/>
            <path d="M160,28 L178,15 L190,22 L172,40 Z" fill="#006400" opacity="0.7"/>
            <circle cx="178" cy="22" r="3" fill="#ffd700"/>
            <text x="35" y="85" fill="#006400" font-size="11" font-weight="bold">超长喙管</text>
            <text x="35" y="100" fill="#1a2e1a" font-size="9">(25-30mm)</text>
            <line x1="92" y1="95" x2="125" y2="80" stroke="#006400" stroke-width="1.5"/>
            <text x="220" y="35" fill="#ffd700" font-size="10" font-weight="bold">味觉感受器</text>
            <line x1="215" y1="45" x2="185" y2="28" stroke="#ffd700" stroke-width="1.5"/>
            <text x="150" y="192" text-anchor="middle" fill="#1a2e1a" font-size="10">盘卷约4.5圈 · 适应木兰科长花冠</text>
            <circle cx="150" cy="110" r="32" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
          </svg>
        `,
        cameraTarget: { x: 0, y: 0.92, z: 0.5 },
        cameraPosition: { x: 1, y: 1.25, z: 3 },
      },
      {
        id: "gold-spot",
        name: "后翅金斑",
        position: { x: -1.6, y: 0.7, z: 0 },
        description:
          "金斑喙凤蝶名字的由来——后翅正面的大型半透明金斑。每片金斑由特殊的黄色色素和多层薄膜结构共同形成，在阳光下会随角度变化呈现从金黄到翠绿的虹彩效果。金斑的大小、形状和亮度是区分个体性别的重要特征：雄性金斑更大更亮，边缘呈齿状；雌性金斑略小，形状更圆润。这些金斑在求偶时起到关键的视觉信号作用。",
        diagramSvg: `
          <svg viewBox="0 0 300 200" class="w-full h-full">
            <defs>
              <linearGradient id="goldSpotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#228b22" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#006400" stop-opacity="0.95"/>
              </linearGradient>
              <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffff99" stop-opacity="0.95"/>
                <stop offset="40%" stop-color="#ffd700" stop-opacity="0.9"/>
                <stop offset="80%" stop-color="#daa520" stop-opacity="0.85"/>
                <stop offset="100%" stop-color="#b8860b" stop-opacity="0.8"/>
              </radialGradient>
            </defs>
            <path d="M40,100 Q70,30 170,40 Q250,50 260,100 Q250,150 170,160 Q70,170 40,100 Z" 
                  fill="url(#goldSpotGrad)" stroke="#1a2e1a" stroke-width="2"/>
            <ellipse cx="95" cy="85" rx="38" ry="28" fill="url(#goldGrad)" stroke="#b8860b" stroke-width="1.5" opacity="0.9"/>
            <ellipse cx="92" cy="115" rx="32" ry="22" fill="url(#goldGrad)" stroke="#b8860b" stroke-width="1.5" opacity="0.85"/>
            <path d="M80,62 L100,68 L115,60 L128,72 L110,80 Z" fill="none" stroke="#fffacd" stroke-width="1.5" opacity="0.6"/>
            <line x1="60" y1="85" x2="30" y2="60" stroke="#ffd700" stroke-width="2" stroke-dasharray="4,3"/>
            <text x="15" y="55" fill="#ffd700" font-size="11" font-weight="bold">虹彩金斑</text>
            <text x="15" y="70" fill="#1a2e1a" font-size="9">随角度变色</text>
            <line x1="130" y1="50" x2="160" y2="30" stroke="#228b22" stroke-width="1.5"/>
            <text x="165" y="28" fill="#228b22" font-size="10">雄性齿状边缘</text>
            <text x="150" y="192" text-anchor="middle" fill="#1a2e1a" font-size="10">分类学关键特征 · 求偶视觉信号</text>
          </svg>
        `,
        cameraTarget: { x: -1.2, y: 0.4, z: 0 },
        cameraPosition: { x: -3, y: 0.8, z: 2.5 },
      },
    ],
  },
};

interface Butterfly3DViewerProps {
  specimenId: string;
  className?: string;
}

export default function Butterfly3DViewer({ specimenId, className }: Butterfly3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const butterflyGroupRef = useRef<THREE.Group | null>(null);
  const hotspotMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const animationIdRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(7.5);
  const targetZoomRef = useRef(7.5);
  const autoRotateRef = useRef(true);
  const cameraAnimatingRef = useRef(false);
  const cameraStartPosRef = useRef(new THREE.Vector3());
  const cameraEndPosRef = useRef(new THREE.Vector3());
  const cameraStartTargetRef = useRef(new THREE.Vector3());
  const cameraEndTargetRef = useRef(new THREE.Vector3());
  const cameraAnimProgressRef = useRef(0);

  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const config = butterflyConfigs[specimenId];

  const createWingShape = useCallback((pattern: string, isForewing: boolean, isLeft: boolean) => {
    const shape = new THREE.Shape();

    if (isForewing) {
      if (isLeft) {
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.3, 0.8, 1.2, 1.4, 2.2, 1.0);
        shape.bezierCurveTo(2.5, 0.6, 2.4, -0.4, 2.0, -0.8);
        shape.bezierCurveTo(1.2, -1.0, 0.3, -0.6, 0, 0);
      } else {
        shape.moveTo(0, 0);
        shape.bezierCurveTo(-0.3, 0.8, -1.2, 1.4, -2.2, 1.0);
        shape.bezierCurveTo(-2.5, 0.6, -2.4, -0.4, -2.0, -0.8);
        shape.bezierCurveTo(-1.2, -1.0, -0.3, -0.6, 0, 0);
      }
    } else {
      if (isLeft) {
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.2, 0.5, 1.0, 1.1, 1.8, 0.7);
        shape.bezierCurveTo(2.1, 0.3, 2.0, -0.5, 1.6, -1.0);
        shape.bezierCurveTo(1.0, -1.4, 0.4, -1.0, 0, 0);
      } else {
        shape.moveTo(0, 0);
        shape.bezierCurveTo(-0.2, 0.5, -1.0, 1.1, -1.8, 0.7);
        shape.bezierCurveTo(-2.1, 0.3, -2.0, -0.5, -1.6, -1.0);
        shape.bezierCurveTo(-1.0, -1.4, -0.4, -1.0, 0, 0);
      }
    }

    return shape;
  }, []);

  const createWingTexture = useCallback(
    (cfg: Butterfly3DConfig, isForewing: boolean, isLeft: boolean) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;

      const { primaryColor, secondaryColor, accentColor, wingPattern } = cfg;

      const toHex = (c: number) => "#" + c.toString(16).padStart(6, "0");

      const grad = ctx.createRadialGradient(
        isLeft ? 200 : 824,
        256,
        50,
        isLeft ? 200 : 824,
        256,
        400
      );
      grad.addColorStop(0, toHex(primaryColor));
      grad.addColorStop(1, toHex(secondaryColor));

      ctx.fillStyle = grad;
      if (isForewing) {
        if (isLeft) {
          ctx.beginPath();
          ctx.moveTo(50, 256);
          ctx.bezierCurveTo(80, 100, 300, 50, 600, 80);
          ctx.bezierCurveTo(850, 110, 900, 280, 850, 400);
          ctx.bezierCurveTo(600, 450, 200, 430, 50, 256);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(974, 256);
          ctx.bezierCurveTo(944, 100, 724, 50, 424, 80);
          ctx.bezierCurveTo(174, 110, 124, 280, 174, 400);
          ctx.bezierCurveTo(424, 450, 824, 430, 974, 256);
          ctx.fill();
        }
      } else {
        if (isLeft) {
          ctx.beginPath();
          ctx.moveTo(50, 256);
          ctx.bezierCurveTo(100, 130, 320, 80, 550, 120);
          ctx.bezierCurveTo(800, 160, 820, 320, 780, 420);
          ctx.bezierCurveTo(500, 480, 180, 450, 50, 256);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(974, 256);
          ctx.bezierCurveTo(924, 130, 704, 80, 474, 120);
          ctx.bezierCurveTo(224, 160, 204, 320, 244, 420);
          ctx.bezierCurveTo(524, 480, 844, 450, 974, 256);
          ctx.fill();
        }
      }

      if (wingPattern === "monarch") {
        ctx.strokeStyle = toHex(secondaryColor);
        ctx.lineWidth = 4;
        for (let i = 0; i < 6; i++) {
          const offset = (i + 1) * 70;
          ctx.beginPath();
          if (isForewing) {
            const startX = isLeft ? 100 + offset : 924 - offset;
            ctx.moveTo(startX, 256);
            ctx.lineTo(startX + (isLeft ? 80 : -80), 100 + i * 30);
            ctx.stroke();
          } else {
            const startX = isLeft ? 100 + offset : 924 - offset;
            ctx.moveTo(startX, 256);
            ctx.lineTo(startX + (isLeft ? 60 : -60), 400 - i * 25);
            ctx.stroke();
          }
        }

        ctx.fillStyle = toHex(accentColor);
        for (let i = 0; i < 8; i++) {
          const t = (i + 0.5) / 8;
          const edgeX = isLeft
            ? isForewing
              ? 800 + Math.sin(t * Math.PI) * 50
              : 600 - Math.sin(t * Math.PI) * 50
            : isForewing
            ? 750 + Math.sin(t * Math.PI) * 40
            : 550 - Math.sin(t * Math.PI) * 40;
          const edgeY = isForewing ? 80 + t * 300 : 150 + t * 260;
          ctx.beginPath();
          ctx.arc(edgeX, edgeY, 10, 0, Math.PI * 2);
          ctx.fill();
        }

        const borderGrad = ctx.createLinearGradient(0, 0, 512, 256);
        borderGrad.addColorStop(0, toHex(secondaryColor));
        borderGrad.addColorStop(1, toHex(secondaryColor) + "80");
        ctx.strokeStyle = toHex(secondaryColor);
        ctx.lineWidth = 16;
      } else if (wingPattern === "morpho") {
        for (let y = 30; y < 490; y += 6) {
          for (let x = 30; x < 994; x += 6) {
            const shimmer =
              Math.sin(x * 0.02 + y * 0.015) * 0.5 +
              Math.cos(x * 0.01 - y * 0.025) * 0.5;
            const alpha = Math.max(0, shimmer) * 0.35;
            if (alpha > 0.05) {
              ctx.fillStyle = `rgba(200, 230, 255, ${alpha})`;
              ctx.fillRect(x, y, 3, 3);
            }
          }
        }

        ctx.strokeStyle = "rgba(26, 26, 46, 0.4)";
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
          const offset = (i + 1) * 55;
          ctx.beginPath();
          if (isForewing) {
            const startX = isLeft ? 100 + offset : 924 - offset;
            ctx.moveTo(startX, 256);
            ctx.quadraticCurveTo(
              startX + (isLeft ? 120 : -120),
              80,
              startX + (isLeft ? 180 : -180),
              120 + i * 20
            );
            ctx.stroke();
          }
        }

        ctx.strokeStyle = "#2d1810";
        ctx.lineWidth = 20;
      } else if (wingPattern === "kaiser") {
        const shineGrad = ctx.createLinearGradient(0, 0, 1024, 512);
        shineGrad.addColorStop(0, "rgba(255, 215, 0, 0.0)");
        shineGrad.addColorStop(0.5, "rgba(255, 215, 0, 0.25)");
        shineGrad.addColorStop(1, "rgba(255, 215, 0, 0.0)");
        ctx.fillStyle = shineGrad;
        if (isForewing) {
          if (isLeft) {
            ctx.beginPath();
            ctx.moveTo(60, 256);
            ctx.bezierCurveTo(90, 110, 310, 60, 610, 90);
            ctx.bezierCurveTo(860, 120, 910, 290, 860, 410);
            ctx.bezierCurveTo(610, 460, 210, 440, 60, 256);
            ctx.fill();
          }
        }

        if (!isForewing) {
          ctx.fillStyle = toHex(accentColor);
          const goldX = isLeft ? 250 : 774;
          for (let i = 0; i < 3; i++) {
            const g = ctx.createRadialGradient(
              goldX + (isLeft ? i * 25 : -i * 25),
              200 + i * 50,
              10,
              goldX + (isLeft ? i * 25 : -i * 25),
              200 + i * 50,
              70
            );
            g.addColorStop(0, "rgba(255, 255, 150, 0.95)");
            g.addColorStop(0.4, "rgba(255, 215, 0, 0.85)");
            g.addColorStop(1, "rgba(218, 165, 32, 0.0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.ellipse(
              goldX + (isLeft ? i * 25 : -i * 25),
              200 + i * 50,
              60,
              40,
              i * 0.2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }

        ctx.strokeStyle = "rgba(255, 215, 0, 0.5)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
          const offset = (i + 1) * 45;
          ctx.beginPath();
          const startX = isLeft ? 100 + offset : 924 - offset;
          ctx.moveTo(startX, 256);
          ctx.lineTo(
            startX + (isLeft ? 150 : -150),
            90 + i * 22
          );
          ctx.stroke();
        }
      }

      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 6;

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    },
    []
  );

  const createButterfly = useCallback(
    (cfg: Butterfly3DConfig) => {
      const group = new THREE.Group();

      const bodyGroup = new THREE.Group();

      const bodyGeom = new THREE.CapsuleGeometry(0.12, 1.2, 8, 16);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: cfg.bodyColor,
        metalness: 0.3,
        roughness: 0.7,
      });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      body.rotation.x = Math.PI / 2;
      body.position.z = 0.1;
      bodyGroup.add(body);

      const headGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({
        color: cfg.bodyColor,
        metalness: 0.4,
        roughness: 0.6,
      });
      const head = new THREE.Mesh(headGeom, headMat);
      head.position.set(0, 0.82, 0.1);
      bodyGroup.add(head);

      const eyeGeom = new THREE.SphereGeometry(0.04, 8, 8);
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.8,
        roughness: 0.2,
      });
      const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
      leftEye.position.set(-0.08, 0.88, 0.22);
      bodyGroup.add(leftEye);
      const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
      rightEye.position.set(0.08, 0.88, 0.22);
      bodyGroup.add(rightEye);

      const antennaMat = new THREE.MeshStandardMaterial({
        color: cfg.bodyColor,
        metalness: 0.5,
        roughness: 0.4,
      });

      for (let side = 0; side < 2; side++) {
        const antennaGroup = new THREE.Group();
        const dir = side === 0 ? -1 : 1;

        const antennaCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(dir * 0.08, 0.25, 0.05),
          new THREE.Vector3(dir * 0.15, 0.5, 0.12),
          new THREE.Vector3(dir * 0.18, 0.7, 0.22),
        ]);
        const antennaGeom = new THREE.TubeGeometry(antennaCurve, 20, 0.012, 8, false);
        const antenna = new THREE.Mesh(antennaGeom, antennaMat);
        antennaGroup.add(antenna);

        const clubGeom = new THREE.CapsuleGeometry(0.035, 0.1, 6, 10);
        const clubMat = new THREE.MeshStandardMaterial({
          color: cfg.bodyColor,
          metalness: 0.5,
          roughness: 0.3,
        });
        const club = new THREE.Mesh(clubGeom, clubMat);
        club.position.set(dir * 0.18, 0.8, 0.28);
        club.rotation.z = dir * 0.4;
        club.rotation.x = 0.3;
        antennaGroup.add(club);

        antennaGroup.position.set(dir * 0.04, 0.82, 0.12);
        bodyGroup.add(antennaGroup);
      }

      const proboscisCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.78, 0.28),
        new THREE.Vector3(0.02, 0.65, 0.4),
        new THREE.Vector3(-0.02, 0.55, 0.35),
        new THREE.Vector3(0.03, 0.5, 0.3),
        new THREE.Vector3(-0.01, 0.58, 0.38),
        new THREE.Vector3(0.02, 0.62, 0.32),
      ]);
      const proboscisGeom = new THREE.TubeGeometry(proboscisCurve, 30, 0.01, 6, false);
      const proboscisMat = new THREE.MeshStandardMaterial({
        color: cfg.bodyColor,
        metalness: 0.6,
        roughness: 0.3,
      });
      const proboscis = new THREE.Mesh(proboscisGeom, proboscisMat);
      bodyGroup.add(proboscis);

      const legMat = new THREE.MeshStandardMaterial({
        color: cfg.bodyColor,
        metalness: 0.5,
        roughness: 0.5,
      });

      for (let i = 0; i < 3; i++) {
        for (let side = 0; side < 2; side++) {
          const dir = side === 0 ? -1 : 1;
          const legCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(dir * 0.08, 0.3 + i * 0.2, 0.08),
            new THREE.Vector3(dir * 0.15, 0.15 + i * 0.15, 0.05),
            new THREE.Vector3(dir * 0.2, -0.05 + i * 0.1, 0.1),
          ]);
          const legGeom = new THREE.TubeGeometry(legCurve, 10, 0.008, 4, false);
          const leg = new THREE.Mesh(legGeom, legMat);
          bodyGroup.add(leg);
        }
      }

      group.add(bodyGroup);

      const wingGroup = new THREE.Group();

      const wingConfigs = [
        { fore: true, left: true, y: 0.02, z: 0.02, ry: -0.15 },
        { fore: true, left: false, y: 0.02, z: 0.02, ry: 0.15 },
        { fore: false, left: true, y: -0.01, z: -0.05, ry: -0.2 },
        { fore: false, left: false, y: -0.01, z: -0.05, ry: 0.2 },
      ];

      wingConfigs.forEach((wc) => {
        const wingShape = createWingShape(cfg.wingPattern, wc.fore, wc.left);
        const wingGeom = new THREE.ExtrudeGeometry(wingShape, {
          depth: 0.03,
          bevelEnabled: true,
          bevelThickness: 0.005,
          bevelSize: 0.008,
          bevelSegments: 2,
        });

        const frontTexture = createWingTexture(cfg, wc.fore, wc.left);
        const backCanvas = document.createElement("canvas");
        backCanvas.width = 1024;
        backCanvas.height = 512;
        const bctx = backCanvas.getContext("2d")!;
        bctx.drawImage(frontTexture.image as HTMLCanvasElement, 0, 0);
        bctx.globalAlpha = 0.6;
        bctx.fillStyle = "rgba(40, 30, 20, 0.3)";
        bctx.fillRect(0, 0, 1024, 512);
        const backTexture = new THREE.CanvasTexture(backCanvas);

        const wingMat = new THREE.MeshStandardMaterial({
          map: frontTexture,
          side: THREE.DoubleSide,
          metalness: cfg.wingPattern === "morpho" ? 0.55 : 0.12,
          roughness: cfg.wingPattern === "morpho" ? 0.22 : 0.72,
          transparent: true,
          opacity: 0.98,
        });

        const wing = new THREE.Mesh(wingGeom, wingMat);
        wing.rotation.y = wc.ry;
        wing.rotation.z = wc.left ? -0.1 : 0.1;
        wing.position.y = wc.y;
        wing.position.z = wc.z;

        wingGroup.add(wing);
      });

      group.add(wingGroup);
      return group;
    },
    [createWingShape, createWingTexture]
  );

  const animateCameraTo = useCallback(
    (hotspot: HotspotInfo) => {
      if (!cameraRef.current) return;

      const camera = cameraRef.current;
      cameraStartPosRef.current.copy(camera.position);
      cameraStartTargetRef.current.set(0, 0.3, 0);

      const zoomFactor = 2.2;
      cameraEndPosRef.current.set(
        hotspot.cameraPosition.x / zoomFactor,
        hotspot.cameraPosition.y / zoomFactor + 0.2,
        hotspot.cameraPosition.z / zoomFactor
      );
      cameraEndTargetRef.current.set(
        hotspot.cameraTarget.x,
        hotspot.cameraTarget.y + 0.1,
        hotspot.cameraTarget.z
      );

      cameraAnimatingRef.current = true;
      cameraAnimProgressRef.current = 0;
      setIsZooming(true);
    },
    []
  );

  const resetCamera = useCallback(() => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    cameraStartPosRef.current.copy(camera.position);
    cameraStartTargetRef.current.set(0, 0.3, 0);
    cameraEndPosRef.current.set(0, 1.4, zoomRef.current);
    cameraEndTargetRef.current.set(0, 0.3, 0);

    cameraAnimatingRef.current = true;
    cameraAnimProgressRef.current = 0;
    setIsZooming(false);
    setSelectedHotspot(null);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !config) return;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.4, 7.5);
    camera.lookAt(0, 0.3, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.5);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xaaddff, 0.4);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8, 20, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 6, 3);
    spotLight.target.position.set(0, 0.3, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(spotLight.target);

    const butterfly = createButterfly(config);
    butterfly.position.set(0, 0.2, 0);
    scene.add(butterfly);
    butterflyGroupRef.current = butterfly;

    const platformGeom = new THREE.CylinderGeometry(2.0, 2.3, 0.08, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0xf5f0e8,
      metalness: 0.1,
      roughness: 0.8,
    });
    const platform = new THREE.Mesh(platformGeom, platformMat);
    platform.position.y = -0.7;
    platform.receiveShadow = true;
    scene.add(platform);

    const ringGeom = new THREE.TorusGeometry(2.15, 0.02, 8, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4a574,
      metalness: 0.8,
      roughness: 0.3,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.66;
    scene.add(ring);

    hotspotMeshesRef.current.clear();

    config.hotspots.forEach((hotspot) => {
      const glowGeom = new THREE.SphereGeometry(0.09, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.92,
      });
      const glow = new THREE.Mesh(glowGeom, glowMat);
      glow.position.set(hotspot.position.x, hotspot.position.y, hotspot.position.z);
      glow.userData = { hotspotId: hotspot.id, isHotspot: true };
      butterfly.add(glow);
      hotspotMeshesRef.current.set(hotspot.id, glow);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let startX = 0;
    let startY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if (cameraAnimatingRef.current) return;
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      startX = e.clientX;
      startY = e.clientY;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        Array.from(hotspotMeshesRef.current.values())
      );

      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        const hotspotId = mesh.userData.hotspotId;
        const hotspot = config.hotspots.find((h) => h.id === hotspotId);
        if (hotspot) {
          setSelectedHotspot(hotspot);
          animateCameraTo(hotspot);
          isDraggingRef.current = false;
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || cameraAnimatingRef.current) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(
        -0.8,
        Math.min(0.8, targetRotationRef.current.x - deltaY * 0.006)
      );

      startX = e.clientX;
      startY = e.clientY;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (cameraAnimatingRef.current) return;
      e.preventDefault();
      const delta = e.deltaY * 0.002;
      targetZoomRef.current = Math.max(
        3.5,
        Math.min(12, targetZoomRef.current + delta)
      );
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });

    let t = 0;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      t += 0.016;

      if (autoRotateRef.current && !isDraggingRef.current && !cameraAnimatingRef.current) {
        targetRotationRef.current.y += 0.004;
      }

      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.08;

      if (butterflyGroupRef.current) {
        butterflyGroupRef.current.rotation.x = rotationRef.current.x;
        butterflyGroupRef.current.rotation.y = rotationRef.current.y;

        const wingFlap = Math.sin(t * 2) * 0.03;
        butterflyGroupRef.current.children.forEach((child, idx) => {
          if (idx > 0) {
            child.rotation.x = wingFlap;
          }
        });
      }

      hotspotMeshesRef.current.forEach((mesh) => {
        const scale = 1 + Math.sin(t * 3) * 0.2;
        mesh.scale.setScalar(scale);

        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.6 + Math.sin(t * 3) * 0.3;
      });

      if (cameraAnimatingRef.current) {
        cameraAnimProgressRef.current += 0.018;
        const p = cameraAnimProgressRef.current;

        if (p >= 1) {
          cameraAnimProgressRef.current = 1;
          cameraAnimatingRef.current = false;
        }

        const ease = 1 - Math.pow(1 - p, 3);

        camera.position.lerpVectors(
          cameraStartPosRef.current,
          cameraEndPosRef.current,
          ease
        );

        const currentTarget = new THREE.Vector3().lerpVectors(
          cameraStartTargetRef.current,
          cameraEndTargetRef.current,
          ease
        );
        camera.lookAt(currentTarget);
      } else if (!isDraggingRef.current && !isZooming) {
        const targetPos = new THREE.Vector3(
          Math.sin(rotationRef.current.y * 0.3) * 0.5,
          1.2 + rotationRef.current.x * 0.8,
          zoomRef.current
        );
        camera.position.lerp(targetPos, 0.04);
        camera.lookAt(0, 0.3, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [config, createButterfly, animateCameraTo, isZooming]);

  if (!config) {
    return null;
  }

  const currentIndex = selectedHotspot
    ? config.hotspots.findIndex((h) => h.id === selectedHotspot.id)
    : -1;

  const navigateHotspot = (direction: number) => {
    if (currentIndex < 0) return;
    const next = (currentIndex + direction + config.hotspots.length) % config.hotspots.length;
    const h = config.hotspots[next];
    setSelectedHotspot(h);
    animateCameraTo(h);
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {selectedHotspot && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500" />
        </div>
      )}

      {selectedHotspot && (
        <div className="absolute right-4 top-4 bottom-4 w-[320px] max-w-[85%] pointer-events-auto z-20 animate-fade-up">
          <div className="h-full bg-gradient-to-br from-amber-50/98 to-cream-100/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/60 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-amber-200/50 bg-gradient-to-r from-amber-100/60 to-rose-100/40">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-md">
                    <Info className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-butterfly-ink leading-tight">
                    {selectedHotspot.name}
                  </h3>
                </div>
                <button
                  onClick={resetCamera}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all text-butterfly-ink/70 hover:text-butterfly-pink-deep"
                  title="返回全局视图"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => navigateHotspot(-1)}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all text-butterfly-ink/70 hover:text-butterfly-pink-deep"
                  title="上一个热点"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-1.5">
                  {config.hotspots.map((h, i) => (
                    <div
                      key={h.id}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === currentIndex
                          ? "w-6 bg-gradient-to-r from-amber-500 to-rose-500"
                          : "w-1.5 bg-amber-200 hover:bg-amber-300"
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={() => navigateHotspot(1)}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all text-butterfly-ink/70 hover:text-butterfly-pink-deep"
                  title="下一个热点"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="mb-5 rounded-2xl overflow-hidden bg-gradient-to-br from-cream-50 to-amber-50/60 border border-amber-100/80 shadow-inner p-3">
                <div
                  className="w-full h-44 rounded-xl overflow-hidden bg-white"
                  dangerouslySetInnerHTML={{ __html: selectedHotspot.diagramSvg }}
                />
                <p className="mt-3 text-center text-xs text-butterfly-ink/50 font-medium">
                  结构示意图 · 半透明叠加
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-butterfly-ink/80 leading-[1.8] first-letter:text-lg first-letter:font-semibold first-letter:text-butterfly-pink-deep first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5">
                  {selectedHotspot.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-amber-200/50 bg-gradient-to-r from-cream-50/80 to-amber-50/60">
              <button
                onClick={resetCamera}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-butterfly-pink-deep to-rose-500 text-white font-medium text-sm shadow-lg hover:shadow-xl hover:from-butterfly-pink-deep/90 hover:to-rose-500/90 transition-all active:scale-[0.98]"
              >
                返回全局视图
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-4 bottom-4 flex flex-wrap gap-2 pointer-events-auto z-10">
        {config.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => {
              setSelectedHotspot(hotspot);
              animateCameraTo(hotspot);
            }}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5",
              selectedHotspot?.id === hotspot.id
                ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg scale-105"
                : "bg-white/85 backdrop-blur-sm text-butterfly-ink/75 border border-amber-200/50 hover:bg-white hover:border-amber-300 hover:shadow-md hover:text-butterfly-pink-deep"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                selectedHotspot?.id === hotspot.id ? "bg-white" : "bg-amber-500"
              )}
            />
            {hotspot.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export { butterflyConfigs };
