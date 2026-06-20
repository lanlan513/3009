export type Continent =
  | "北美洲"
  | "南美洲"
  | "欧洲"
  | "非洲"
  | "亚洲"
  | "大洋洲";

export type Climate =
  | "热带"
  | "亚热带"
  | "温带"
  | "寒带"
  | "高山"
  | "地中海";

export type RarityLevel = "常见" | "较常见" | "稀有" | "极稀有" | "濒危";

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
}
