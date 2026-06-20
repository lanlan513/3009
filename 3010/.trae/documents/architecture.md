## 1. 架构设计

```mermaid
graph TD
    F["前端 React 18"] -->|HTTP请求| B["后端 Express 4"]
    B -->|SQL查询| D["SQLite 数据库"]
    B -->|返回JSON| F
    
    subgraph F["前端层"]
        F1["首页 Home"]
        F2["详情页 Detail"]
        F3["路由 React Router"]
        F4["状态管理 Zustand"]
        F5["样式 TailwindCSS 3"]
    end
    
    subgraph B["后端层"]
        B1["API 路由控制器"]
        B2["业务逻辑 Service"]
        B3["数据访问 Repository"]
    end
    
    subgraph D["数据层"]
        D1["microbes 表"]
        D2["分类数据"]
    end
```

## 2. 技术描述

- **前端**：React 18 + TypeScript + Vite + TailwindCSS 3 + Zustand + React Router DOM
- **后端**：Express 4 + TypeScript + better-sqlite3
- **数据库**：SQLite（文件型，无需额外服务）
- **初始化工具**：使用 `react-express-ts` 模板

## 3. 路由定义

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 微生物列表、搜索、分类筛选 |
| `/microbe/:id` | 详情页 | 单个微生物详细信息 |
| `/api/microbes` | API | 获取微生物列表（支持搜索和分类筛选） |
| `/api/microbes/:id` | API | 获取单个微生物详情 |

## 4. API 定义

### 类型定义

```typescript
// 微生物分类
type Category = 'bacteria' | 'fungi' | 'virus' | 'archaea';

// 微生物实体
interface Microbe {
  id: number;
  name: string;
  scientificName: string;
  category: Category;
  habitat: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

// 列表查询参数
interface MicrobeQuery {
  category?: Category;
  search?: string;
}

// API 响应
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

### 接口说明

**GET /api/microbes**
- 请求参数：`category`（可选）、`search`（可选）
- 成功响应：`ApiResponse<Microbe[]>`

**GET /api/microbes/:id**
- 请求参数：`id`（路径参数）
- 成功响应：`ApiResponse<Microbe>`
- 失败响应：`{ success: false, message: "微生物不存在" }`

## 5. 服务器架构图

```mermaid
graph LR
    R["路由层 (routes/microbes.ts)"] --> S["服务层 (services/microbeService.ts)"]
    S --> R2["数据访问层 (repositories/microbeRepository.ts)"]
    R2 --> D["SQLite 数据库"]
    
    style R fill:#f87171,color:white
    style S fill:#fbbf24,color:white
    style R2 fill:#a78bfa,color:white
    style D fill:#22d3ee,color:black
```

## 6. 数据模型

### 6.1 ER图

```mermaid
erDiagram
    MICROBES {
        INTEGER id PK "主键，自增"
        TEXT name "中文名称"
        TEXT scientific_name "学名"
        TEXT category "分类 (bacteria/fungi/virus/archaea)"
        TEXT habitat "生存环境"
        TEXT description "详细简介"
        TEXT image_url "图片URL"
        TEXT characteristics "特征 (JSON数组)"
        DATETIME created_at "创建时间"
        DATETIME updated_at "更新时间"
    }
```

### 6.2 DDL 语句

```sql
CREATE TABLE IF NOT EXISTS microbes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('bacteria', 'fungi', 'virus', 'archaea')),
  habitat TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  characteristics TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_microbes_category ON microbes(category);
CREATE INDEX IF NOT EXISTS idx_microbes_name ON microbes(name);
```

### 6.3 初始数据

预置20条微生物数据，每个分类5条：
- **细菌**：大肠杆菌、乳酸菌、金黄色葡萄球菌、幽门螺杆菌、硝化细菌
- **真菌**：酵母菌、青霉菌、蘑菇、冬虫夏草、黑曲霉
- **病毒**：噬菌体、新冠病毒、流感病毒、烟草花叶病毒、HIV
- **古菌**：嗜热菌、嗜盐菌、产甲烷菌、嗜酸菌、嗜冷菌
