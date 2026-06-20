import { Router, Request, Response } from 'express';
import { microbeService } from '../services/microbeService.js';
import type { MicrobeQuery, ApiResponse } from '../../shared/types.js';

const router = Router();

router.get('/', (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { category, search } = req.query;
    
    const query: MicrobeQuery = {};
    if (category && typeof category === 'string') {
      query.category = category as any;
    }
    if (search && typeof search === 'string') {
      query.search = search;
    }

    const microbes = microbeService.getAllMicrobes(query);
    
    res.json({
      success: true,
      data: microbes,
    });
  } catch (error) {
    console.error('Error fetching microbes:', error);
    res.status(500).json({
      success: false,
      message: '获取微生物列表失败',
    });
  }
});

router.get('/:id', (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: '无效的ID',
      });
    }

    const microbe = microbeService.getMicrobeById(id);
    
    if (!microbe) {
      return res.status(404).json({
        success: false,
        message: '微生物不存在',
      });
    }

    const similar = microbeService.getSimilarMicrobes(id, microbe.category);
    
    res.json({
      success: true,
      data: {
        microbe,
        similar,
      },
    });
  } catch (error) {
    console.error('Error fetching microbe:', error);
    res.status(500).json({
      success: false,
      message: '获取微生物详情失败',
    });
  }
});

export default router;
