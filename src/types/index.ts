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

export type ConservationStatus = "无危" | "近危" | "易危" | "濒危" | "极危" | "野外灭绝" | "灭绝";

export type ThreatCategory = "栖息地丧失" | "气候变化" | "非法采集" | "农药污染" | "外来物种入侵" | "过度开发" | "疾病" | "光污染" | "火山活动";

export interface PopulationStatus {
  estimatedPopulation: string;
  trend: "上升" | "稳定" | "下降" | "急剧下降" | "未知";
  lastAssessment: string;
  assessmentSource: string;
}

export interface ThreatFactor {
  category: ThreatCategory;
  severity: "低" | "中" | "高" | "极高";
  description: string;
}

export interface ConservationMeasure {
  title: string;
  description: string;
  type: "法律保护" | "栖息地恢复" | "人工繁育" | "科学研究" | "公众教育" | "国际合作";
  status: "已实施" | "进行中" | "规划中";
}

export interface ConservationRegion {
  name: string;
  continent: Continent;
  country: string;
  description: string;
  keySpecies: string[];
  conservationEfforts: string[];
  challenges: string[];
}

export interface RareButterfly {
  id: string;
  name: string;
  latinName: string;
  family: string;
  genus: string;
  image: string;
  description: string;
  distribution: string;
  distributionRegions: DistributionRegion[];
  wingspan: string;
  habitat: string;
  climate: Climate[];
  rarity: RarityLevel;
  conservationStatus: ConservationStatus;
  isEndemic: boolean;
  endemicRegion?: string;
  features: string[];
  population: PopulationStatus;
  threats: ThreatFactor[];
  conservationMeasures: ConservationMeasure[];
  relatedButterflyId?: string;
}

export interface EraInfo {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  description: string;
  color: string;
}

export type EyespotShape = "圆形" | "椭圆形" | "不规则形" | "新月形";
export type StripePattern = "横条纹" | "纵条纹" | "放射纹" | "锯齿纹" | "网状纹" | "波浪纹";
export type GradientDirection = "由内向外" | "由外向内" | "由上至下" | "由下至上" | "对角线" | "由基向外";
export type WingPosition = "前翅" | "后翅" | "前后翅" | "前翅正面" | "前翅反面" | "后翅正面" | "后翅反面" | "前后翅正面" | "前后翅反面";
export type PatternColor =
  | "橙黑" | "蓝黑" | "黄黑" | "绿黑" | "红黑"
  | "纯白" | "乳白" | "金黄" | "银白" | "翠绿"
  | "粉红" | "紫红" | "棕褐" | "灰白" | "多彩虹彩";
export type TailShape = "无尾突" | "短尾突" | "长尾突" | "双尾突" | "燕尾突";
export type WingEdge = "平滑" | "波浪状" | "锯齿状" | "尾突状";

export interface EyespotElement {
  id: string;
  position: WingPosition;
  location: string;
  shape: EyespotShape;
  size: "极小" | "小" | "中" | "大" | "极大";
  rings: string[];
  centerColor: string;
  description: string;
  count: number;
}

export interface StripeElement {
  id: string;
  position: WingPosition;
  pattern: StripePattern;
  color: string;
  backgroundColor: string;
  width: "细线" | "中等" | "粗线" | "宽带";
  count: number;
  description: string;
}

export interface GradientElement {
  id: string;
  position: WingPosition;
  direction: GradientDirection;
  colors: string[];
  transition: "柔和过渡" | "清晰分界" | "斑驳渐变";
  description: string;
}

export interface WingPattern {
  butterflyId: string;
  butterflyName: string;
  baseColor: string;
  dominantColors: PatternColor[];
  eyespots: EyespotElement[];
  stripes: StripeElement[];
  gradients: GradientElement[];
  tailShape: TailShape;
  wingEdge: WingEdge;
  hasMetallicSheen: boolean;
  metallicDescription?: string;
  patternStyle: string[];
  identificationTips: string[];
  overallDescription: string;
}

export type Season = "春" | "夏" | "秋" | "冬";

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ObservationTip {
  title: string;
  description: string;
  icon: string;
}

export interface MonthlyButterfly {
  butterflyId: string;
  highlight: string;
  abundance: "极多" | "较多" | "常见" | "较少" | "稀有";
  lifeStage: "卵期" | "幼虫期" | "蛹期" | "成虫期" | "全年可见";
  observationNote?: string;
}

export interface MigrationInfo {
  butterflyId: string;
  butterflyName: string;
  fromRegion: string;
  toRegion: string;
  startMonth: MonthNumber;
  endMonth: MonthNumber;
  duration: string;
  distance: string;
  description: string;
}

export interface RegionalSeasonInfo {
  region: string;
  continent: Continent;
  bestMonths: MonthNumber[];
  peakSeason: string;
  butterflyCount: number;
  highlights: string[];
  climate: string;
}

export interface MonthData {
  month: MonthNumber;
  monthName: string;
  season: Season;
  theme: string;
  description: string;
  colorTheme: string;
  commonButterflies: MonthlyButterfly[];
  rareButterflies: MonthlyButterfly[];
  tips: ObservationTip[];
  bestRegions: string[];
  averageTemperature: string;
  daylightHours: string;
}

export interface ObservationGuide {
  id: string;
  title: string;
  subtitle: string;
  category: "季节观察" | "地区指南" | "生命周期" | "迁徙追踪" | "新手入门";
  icon: string;
  content: string;
  keyPoints: string[];
  bestTime?: string;
  bestLocation?: string;
  difficulty: "入门" | "进阶" | "专家";
}

export interface SeasonalPattern {
  butterflyId: string;
  butterflyName: string;
  adultMonths: MonthNumber[];
  larvaMonths: MonthNumber[];
  pupaMonths: MonthNumber[];
  eggMonths: MonthNumber[];
  generationsPerYear: number;
  overwinteringStage: "卵" | "幼虫" | "蛹" | "成虫" | "不越冬";
  region: string;
}

export type VisionScenarioCategory = "觅食导航" | "配偶识别" | "领地防御" | "天敌规避" | "产卵选择";

export interface UVPatternInfo {
  name: string;
  description: string;
  humanVisible: boolean;
  uvColor: string;
  visibleColor: string;
  function: string;
}

export interface FlowerSignal {
  name: string;
  latinName: string;
  image: string;
  humanDescription: string;
  butterflyDescription: string;
  uvPattern: string;
  uvColor: string;
  nectarGuideVisible: boolean;
  nectarGuideDescription?: string;
  landingStripVisible: boolean;
  landingStripDescription?: string;
}

export interface VisionScenario {
  id: string;
  title: string;
  subtitle: string;
  category: VisionScenarioCategory;
  sceneImage: string;
  humanDescription: string;
  butterflyDescription: string;
  uvPatterns: UVPatternInfo[];
  keyDifferences: string[];
  butterflyAdvantage: string;
}

export interface ButterflyVisionCapability {
  wavelengthRange: string;
  colorTypes: string[];
  fieldOfView: string;
  flickerFusionRate: string;
  specialAbilities: string[];
  limitations: string[];
}
