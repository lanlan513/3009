import { getSeedData } from './seed.js';
import type { Microbe, Category, MicrobeQuery } from '../../shared/types.js';

let microbesData: Microbe[] = [];

function initializeData() {
  if (microbesData.length === 0) {
    const seedData = getSeedData();
    const now = new Date().toISOString();
    microbesData = seedData.map((m, index) => ({
      id: index + 1,
      name: m.name,
      scientificName: m.scientificName,
      category: m.category,
      habitat: m.habitat,
      description: m.description,
      imageUrl: m.imageUrl,
      characteristics: m.characteristics,
      createdAt: now,
      updatedAt: now,
    }));
    console.log(`Initialized ${microbesData.length} microbes in memory database.`);
  }
}

initializeData();

export function findAll(query: MicrobeQuery = {}): Microbe[] {
  let result = [...microbesData];

  if (query.category) {
    result = result.filter(m => m.category === query.category);
  }

  if (query.search) {
    const searchTerm = query.search.toLowerCase();
    result = result.filter(m =>
      m.name.toLowerCase().includes(searchTerm) ||
      m.scientificName.toLowerCase().includes(searchTerm) ||
      m.description.toLowerCase().includes(searchTerm) ||
      m.habitat.toLowerCase().includes(searchTerm)
    );
  }

  result.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  return result;
}

export function findById(id: number): Microbe | null {
  return microbesData.find(m => m.id === id) || null;
}

export function findByCategory(category: Category): Microbe[] {
  return microbesData
    .filter(m => m.category === category)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function findSimilar(id: number, category: Category, limit = 4): Microbe[] {
  const similar = microbesData
    .filter(m => m.category === category && m.id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
  return similar;
}

export function count(): number {
  return microbesData.length;
}

export { microbesData };
