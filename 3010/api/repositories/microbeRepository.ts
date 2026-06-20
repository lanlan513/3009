import * as db from '../db/database.js';
import type { Microbe, Category, MicrobeQuery } from '../../shared/types.js';

export class MicrobeRepository {
  findAll(query: MicrobeQuery = {}): Microbe[] {
    return db.findAll(query);
  }

  findById(id: number): Microbe | null {
    return db.findById(id);
  }

  findByCategory(category: Category): Microbe[] {
    return db.findByCategory(category);
  }

  findSimilar(id: number, category: Category, limit = 4): Microbe[] {
    return db.findSimilar(id, category, limit);
  }

  count(): number {
    return db.count();
  }
}

export const microbeRepository = new MicrobeRepository();
