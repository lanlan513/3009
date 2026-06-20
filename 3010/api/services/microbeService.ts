import * as db from '../db/database.js';
import type { Microbe, MicrobeQuery, Category } from '../../shared/types.js';

export class MicrobeService {
  getAllMicrobes(query: MicrobeQuery = {}): Microbe[] {
    return db.findAll(query);
  }

  getMicrobeById(id: number): Microbe | null {
    return db.findById(id);
  }

  getMicrobesByCategory(category: Category): Microbe[] {
    return db.findByCategory(category);
  }

  getSimilarMicrobes(id: number, category: Category, limit?: number): Microbe[] {
    return db.findSimilar(id, category, limit);
  }
}

export const microbeService = new MicrobeService();
