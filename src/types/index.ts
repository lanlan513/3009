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
