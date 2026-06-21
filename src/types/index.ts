export type Continent =
  | "北美洲"
  | "南美洲"
  | "欧洲"
  | "非洲"
  | "亚洲"
  | "大洋洲";

export interface TaxonSpecies {
  id: string;
  name: string;
  latinName: string;
  image: string;
  rarity: RarityLevel;
  description: string;
}

export interface TaxonGenus {
  name: string;
  latinName: string;
  description: string;
  species: TaxonSpecies[];
}

export interface TaxonSubfamily {
  name: string;
  latinName: string;
  description: string;
  genera: TaxonGenus[];
}

export interface TaxonFamily {
  name: string;
  latinName: string;
  description: string;
  characteristics: string[];
  subfamilies: TaxonSubfamily[];
}

export type TaxonNode = TaxonFamily | TaxonSubfamily | TaxonGenus | TaxonSpecies;

export interface BreadcrumbItem {
  level: "family" | "subfamily" | "genus" | "species";
  name: string;
  latinName?: string;
}

export type Climate =
  | "热带"
  | "亚热带"
  | "温带"
  | "寒带"
  | "高山"
  | "地中海";

export type RarityLevel = "常见" | "较常见" | "稀有" | "极稀有" | "濒危";

export type FlightPatternType =
  | "直线滑翔"
  | "波浪起伏"
  | "快速穿梭"
  | "优雅盘旋"
  | "飘忽不定"
  | "缓慢漂浮"
  | "敏捷跳跃";

export type ActivityTimeType =
  | "清晨活跃"
  | "上午活跃"
  | "中午活跃"
  | "下午活跃"
  | "黄昏活跃"
  | "全天活跃"
  | "傍晚活跃";

export type FlightHabitatType =
  | "林冠层"
  | "林缘地带"
  | "开阔草地"
  | "花丛低空"
  | "溪流沿岸"
  | "山顶高空"
  | "竹林木中";

export interface FlightPattern {
  patternType: FlightPatternType;
  description: string;
  speed: number;
  agility: number;
  wingbeatFrequency: string;
}

export interface FlightActivity {
  activeTime: ActivityTimeType[];
  description: string;
  flightDuration: string;
  seasonalPattern: string;
}

export interface FlightAltitude {
  habitat: FlightHabitatType;
  minAltitude: number;
  maxAltitude: number;
  preferredAltitude: string;
  description: string;
}

export interface FlightTrackPoint {
  x: number;
  y: number;
  t: number;
}

export interface FlightTrajectory {
  pattern: FlightPatternType;
  points: FlightTrackPoint[];
  duration: number;
  scale: number;
}

export interface FlightInfo {
  pattern: FlightPattern;
  activity: FlightActivity;
  altitude: FlightAltitude;
  trajectory: FlightTrajectory;
  habits: string[];
}

export interface DistributionRegion {
  continent: Continent;
  countries: string[];
}

export interface Butterfly {
  id: string;
  name: string;
  latinName: string;
  family: string;
  genus: string;
  category: string;
  image: string;
  description: string;
  distribution: string;
  distributionRegions: DistributionRegion[];
  wingspan: string;
  habitat: string;
  climate: Climate[];
  rarity: RarityLevel;
  features: string[];
  popularity: number;
  flight: FlightInfo;
}

export type SpecimenCategory = "历史标本" | "珍稀物种" | "已灭绝近缘种";

export interface DiscoveryRecord {
  date: string;
  discoverer: string;
  location: string;
  description: string;
}

export interface ResearchRecord {
  year: string;
  researcher: string;
  institution: string;
  title: string;
  description: string;
}

export interface Specimen {
  id: string;
  name: string;
  latinName: string;
  family: string;
  genus: string;
  category: SpecimenCategory;
  specimenNumber: string;
  collectionDate: string;
  collectionLocation: string;
  collector: string;
  donor: string;
  image: string;
  wingspan: string;
  description: string;
  condition: "完美" | "良好" | "一般" | "破损" | string;
  preservationMethod: string;
  storageLocation: string;
  rarity: RarityLevel;
  conservationStatus: "无危" | "近危" | "易危" | "濒危" | "极危" | "灭绝" | string;
  discoveryHistory: DiscoveryRecord[];
  researchRecords: ResearchRecord[];
  notes: string;
  tags: string[];
  relatedButterflyId?: string;
}

export interface DiscoveryLocation {
  name: string;
  continent: Continent;
  country: string;
  x: number;
  y: number;
}

export interface ExplorationRoute {
  from: DiscoveryLocation;
  to: DiscoveryLocation;
  year: number;
  description: string;
}

export interface DiscoveryEvent {
  id: string;
  year: number;
  yearDisplay: string;
  era: string;
  title: string;
  description: string;
  butterflyName?: string;
  butterflyLatinName?: string;
  butterflyImage?: string;
  discoverer: string;
  discovererBio?: string;
  location: DiscoveryLocation;
  significance: string;
  image?: string;
  tags: string[];
  category: "物种发现" | "分类学突破" | "迁徙研究" | "保护里程碑" | "探索远征";
}

export interface EraInfo {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  description: string;
  color: string;
}
