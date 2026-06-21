import type { Specimen } from "@/types";

const img = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`;

export const specimens: Specimen[] = [
  {
    id: "specimen-1",
    name: "帝王蝶模式标本",
    latinName: "Danaus plexippus holotype",
    family: "蛱蝶科",
    genus: "斑蝶属",
    category: "历史标本",
    specimenNumber: "LEP-1874-001",
    collectionDate: "1874-06-15",
    collectionLocation: "美国加利福尼亚州",
    collector: "Samuel Hubbard Scudder",
    donor: "波士顿自然历史学会",
    image: img("A perfectly preserved monarch butterfly specimen on a white museum board with labels, vintage museum style, high detail, scientific photography"),
    wingspan: "11.2 厘米",
    description: "这是帝王蝶的模式标本，由Samuel Hubbard Scudder于1874年采集并描述。该标本保存完好，翅膀橙黑相间的斑纹清晰可见，是研究帝王蝶分类学的重要参考资料。标本背面附有原始采集标签和描述记录。",
    condition: "良好",
    preservationMethod: "针插干燥保存，樟脑防虫",
    storageLocation: "国家自然博物馆鳞翅目标本馆 A区 3号柜",
    rarity: "极稀有",
    conservationStatus: "近危",
    discoveryHistory: [
      {
        date: "1874-06-15",
        discoverer: "Samuel Hubbard Scudder",
        location: "美国加利福尼亚州旧金山湾区",
        description: "首次采集并描述该物种，确立其分类地位。"
      },
      {
        date: "1857-03-20",
        discoverer: "Jean Baptiste Boisduval",
        location: "墨西哥",
        description: "此前已有采集记录，但未正式描述。"
      }
    ],
    researchRecords: [
      {
        year: "1874",
        researcher: "Samuel Hubbard Scudder",
        institution: "哈佛大学比较动物学博物馆",
        title: "北美斑蝶属的分类修订",
        description: "正式描述帝王蝶并确立其拉丁学名Danaus plexippus。"
      },
      {
        year: "1975",
        researcher: "Fred A. Urquhart",
        institution: "多伦多大学",
        title: "帝王蝶迁徙路线的追踪研究",
        description: "通过标记重捕法揭示了帝王蝶长达数千公里的迁徙路径。"
      },
      {
        year: "2019",
        researcher: "Marcus Kronforst",
        institution: "芝加哥大学",
        title: "帝王蝶长距离迁徙的基因组学基础",
        description: "通过基因组测序揭示了帝王蝶迁徙行为的遗传机制。"
      }
    ],
    notes: "该标本为模式标本，具有极高的分类学价值。采集时翅膀有轻微磨损，但整体保存状态良好。每年用于科学研究借阅不超过5次。",
    tags: ["模式标本", "帝王蝶", "迁徙物种", "19世纪采集", "北美区系"],
    relatedButterflyId: "1"
  },
  {
    id: "specimen-2",
    name: "蓝闪蝶珍稀个体",
    latinName: "Morpho menelaus var. athena",
    family: "蛱蝶科",
    genus: "闪蝶属",
    category: "珍稀物种",
    specimenNumber: "LEP-1923-045",
    collectionDate: "1923-04-28",
    collectionLocation: "秘鲁亚马孙雨林",
    collector: "William Beebe",
    donor: "纽约动物学会",
    image: img("A rare blue morpho butterfly specimen with iridescent metallic blue wings on museum mounting board, scientific labels, museum collection style"),
    wingspan: "18.5 厘米",
    description: "这是一只极为罕见的蓝闪蝶变异个体，其蓝色光泽较普通个体更为深邃，后翅具有特殊的白色斑纹。该标本是William Beebe在1923年亚马孙探险中采集的珍贵发现，现仅知3只类似变异个体。",
    condition: "完美",
    preservationMethod: "针插干燥保存，充氮密封盒",
    storageLocation: "国家自然博物馆鳞翅目标本馆 B区 珍品柜",
    rarity: "极稀有",
    conservationStatus: "易危",
    discoveryHistory: [
      {
        date: "1923-04-28",
        discoverer: "William Beebe",
        location: "秘鲁洛雷托省亚马孙雨林",
        description: "在一次热带雨林冠层调查中采集到该变异个体。"
      },
      {
        date: "1758-01-01",
        discoverer: "Carl Linnaeus",
        location: "苏里南",
        description: "蓝闪蝶物种首次被林奈在《自然系统》中描述。"
      }
    ],
    researchRecords: [
      {
        year: "1924",
        researcher: "William Beebe",
        institution: "纽约动物学会",
        title: "亚马孙雨林闪蝶属的变异研究",
        description: "详细描述了该变异个体的形态特征，推测其可能为稀有基因突变。"
      },
      {
        year: "1960",
        researcher: "H. Frederik Nijhout",
        institution: "杜克大学",
        title: "闪蝶翅膀结构色的物理机制",
        description: "使用电子显微镜研究了该标本翅膀的微观结构，揭示了金属蓝色的物理成因。"
      },
      {
        year: "2021",
        researcher: "中山大学昆虫研究所",
        institution: "中山大学",
        title: "蓝闪蝶变异个体的色素分析",
        description: "通过非损伤采样分析了该标本翅膀的色素组成，证实其颜色为结构色而非色素色。"
      }
    ],
    notes: "该标本为珍稀变异个体，仅在自然光下展示，禁止使用闪光灯拍照。2019年进行了一次全面的保护修复处理。",
    tags: ["珍稀变异", "闪蝶", "结构色", "亚马孙", "1920年代采集"],
    relatedButterflyId: "2"
  },
  {
    id: "specimen-3",
    name: "圣赫勒拿珍蝶",
    latinName: "Acraea insularis",
    family: "蛱蝶科",
    genus: "珍蝶属",
    category: "已灭绝近缘种",
    specimenNumber: "LEP-1875-092",
    collectionDate: "1875-08-10",
    collectionLocation: "圣赫勒拿岛",
    collector: "John Charles Melliss",
    donor: "大英自然历史博物馆",
    image: img("An extinct butterfly specimen labeled Acraea insularis from Saint Helena, vintage museum specimen, delicate wings faded with age, historical labels"),
    wingspan: "6.8 厘米",
    description: "圣赫勒拿珍蝶是圣赫勒拿岛特有物种，该标本是已知保存最完好的个体之一。该物种因栖息地破坏和外来物种入侵，已于19世纪末灭绝。标本翅膀呈橙黄色，带有黑色斑点，虽历经百年仍能看出其原有的美丽。",
    condition: "良好",
    preservationMethod: "针插干燥保存，充氮密封盒，低温冷藏",
    storageLocation: "国家自然博物馆鳞翅目标本馆 C区 灭绝物种柜",
    rarity: "极稀有",
    conservationStatus: "灭绝",
    discoveryHistory: [
      {
        date: "1816-05-20",
        discoverer: "William John Burchell",
        location: "圣赫勒拿岛",
        description: "首次采集到该物种标本，当时种群数量已经开始下降。"
      },
      {
        date: "1875-08-10",
        discoverer: "John Charles Melliss",
        location: "圣赫勒拿岛高地区域",
        description: "采集到该标本，这是最后一批已知的活体采集记录之一。"
      },
      {
        date: "1890-12-31",
        discoverer: "-",
        location: "圣赫勒拿岛",
        description: "最后一次可信的野外观察记录，此后该物种被认为已灭绝。"
      }
    ],
    researchRecords: [
      {
        year: "1851",
        researcher: "Edward Doubleday",
        institution: "大英博物馆",
        title: "圣赫勒拿岛特有鳞翅目记述",
        description: "正式描述并命名该物种。"
      },
      {
        year: "1978",
        researcher: "Philip Ashmole",
        institution: "牛津大学",
        title: "圣赫勒拿岛灭绝昆虫的回顾",
        description: "详细分析了该物种灭绝的原因，包括栖息地破坏和外来物种入侵。"
      },
      {
        year: "2003",
        researcher: "DNA条形码国际联盟",
        institution: "加拿大圭尔夫大学",
        title: "灭绝蝴蝶的DNA条形码研究",
        description: "从该标本中成功提取DNA，为研究珍蝶属的演化关系提供了重要数据。"
      }
    ],
    notes: "该物种已灭绝，本标本为仅存的少数完整标本之一。仅用于科研展示，严禁触碰。2020年进行了DNA采样用于灭绝物种基因组研究。",
    tags: ["灭绝物种", "特有种", "圣赫勒拿岛", "19世纪采集", "DNA可提取"],
    relatedButterflyId: "16"
  },
  {
    id: "specimen-4",
    name: "金斑喙凤蝶模式标本",
    latinName: "Teinopalpus aureus holotype",
    family: "凤蝶科",
    genus: "喙凤蝶属",
    category: "珍稀物种",
    specimenNumber: "LEP-1923-001",
    collectionDate: "1923-07-22",
    collectionLocation: "中国福建省武夷山",
    collector: "Adolf N. Mell",
    donor: "德国慕尼黑博物馆",
    image: img("An extremely rare golden Kaiser-i-Hind butterfly specimen with green and gold iridescent wings, museum specimen with scientific labels, precious collection"),
    wingspan: "9.8 厘米",
    description: "这是金斑喙凤蝶的模式标本，被誉为「蝶中皇后」。该标本保存极为完好，翅膀的翠绿色金属光泽依然闪耀，后翅的金黄色斑清晰可见。作为中国国家一级保护动物，该物种极为珍稀，模式标本的价值不可估量。",
    condition: "完美",
    preservationMethod: "针插干燥保存，充氮密封盒，恒温恒湿储存",
    storageLocation: "国家自然博物馆鳞翅目标本馆 B区 珍品柜",
    rarity: "极稀有",
    conservationStatus: "濒危",
    discoveryHistory: [
      {
        date: "1923-07-22",
        discoverer: "Adolf N. Mell",
        location: "中国福建省武夷山国家级自然保护区",
        description: "首次采集并描述该物种，轰动世界昆虫学界。"
      },
      {
        date: "1984-05-18",
        discoverer: "中国科学院动物研究所考察队",
        location: "中国广东省南岭",
        description: "时隔60年后再次在野外发现该物种活体，证实其并未灭绝。"
      }
    ],
    researchRecords: [
      {
        year: "1923",
        researcher: "Richard Paget Aikman",
        institution: "德国慕尼黑博物馆",
        title: "喙凤蝶属一新种记述",
        description: "正式描述金斑喙凤蝶，命名为Teinopalpus aureus。"
      },
      {
        year: "1990",
        researcher: "中国科学院动物研究所",
        institution: "中国科学院",
        title: "金斑喙凤蝶的生态生物学研究",
        description: "首次系统研究了该物种的生活史、栖息地和种群状况。"
      },
      {
        year: "2018",
        researcher: "中国林业科学研究院",
        institution: "中国林业科学研究院",
        title: "金斑喙凤蝶的人工繁殖与保护",
        description: "首次成功实现金斑喙凤蝶的人工繁殖，为该物种的保护提供了重要技术支持。"
      }
    ],
    notes: "该标本为模式标本，具有极高的科学价值。仅在特别展览中展出，平时严格保存于恒温恒湿的珍品柜中。禁止任何形式的样本提取。",
    tags: ["模式标本", "国家一级保护", "珍稀物种", "中国特有", "喙凤蝶属"],
    relatedButterflyId: "7"
  },
  {
    id: "specimen-5",
    name: "欧洲粉蝶历史标本",
    latinName: "Pieris brassicae historic specimen",
    family: "粉蝶科",
    genus: "粉蝶属",
    category: "历史标本",
    specimenNumber: "LEP-1790-012",
    collectionDate: "1790-06-05",
    collectionLocation: "英国英格兰",
    collector: "James Petiver",
    donor: "伦敦林奈学会",
    image: img("A historical cabbage butterfly specimen from 1790, aged museum specimen with handwritten labels, vintage entomology collection, slightly faded wings"),
    wingspan: "6.2 厘米",
    description: "这是18世纪采集的欧洲粉蝶标本，由著名英国博物学家James Petiver采集。标本附带原始手写标签，是研究昆虫学发展史的重要历史文物。虽然年代久远，翅膀颜色略有褪去，但整体形态保存完好。",
    condition: "一般",
    preservationMethod: "原针插保存，经1960年代修复加固",
    storageLocation: "国家自然博物馆鳞翅目标本馆 A区 历史标本柜",
    rarity: "稀有",
    conservationStatus: "无危",
    discoveryHistory: [
      {
        date: "1758-01-01",
        discoverer: "Carl Linnaeus",
        location: "欧洲",
        description: "林奈在《自然系统》中首次正式描述该物种。"
      },
      {
        date: "1790-06-05",
        discoverer: "James Petiver",
        location: "英国英格兰米德尔塞克斯郡",
        description: "采集本标本，当时该物种在欧洲农田中十分常见。"
      }
    ],
    researchRecords: [
      {
        year: "1792",
        researcher: "James Petiver",
        institution: "伦敦皇家学会",
        title: "英国鳞翅目昆虫名录",
        description: "该标本被收录于Petiver的著作中，成为重要的参考标本。"
      },
      {
        year: "1958",
        researcher: "Charles S. Elton",
        institution: "牛津大学",
        title: "200年间英国蝴蝶种群变化",
        description: "将该标本与现代个体对比，发现翅型有微小但显著的变化。"
      },
      {
        year: "2015",
        researcher: "伦敦自然历史博物馆",
        institution: "伦敦自然历史博物馆",
        title: "历史标本的数字化归档",
        description: "对该标本进行高清扫描和3D建模，建立数字化档案永久保存。"
      }
    ],
    notes: "该标本具有重要的历史价值，是18世纪昆虫学研究的实物见证。标签为James Petiver手迹，具有重要的文献价值。",
    tags: ["历史标本", "18世纪", "英国区系", "粉蝶科", "名人采集"],
    relatedButterflyId: "5"
  },
  {
    id: "specimen-6",
    name: "毛里求斯蓝蝶",
    latinName: "Lepidochrysops hypopolia",
    family: "灰蝶科",
    genus: "吉灰蝶属",
    category: "已灭绝近缘种",
    specimenNumber: "LEP-1890-076",
    collectionDate: "1890-03-12",
    collectionLocation: "毛里求斯",
    collector: "Henry Nicholas Ridley",
    donor: "大英自然历史博物馆",
    image: img("An extinct Lepidochrysops butterfly specimen from Mauritius, delicate blue wings faded with age, historical museum specimen, scientific labels"),
    wingspan: "3.2 厘米",
    description: "毛里求斯蓝蝶是毛里求斯特有的小型灰蝶，该标本是已知仅存的5只标本之一。该物种因森林砍伐和外来蚂蚁的入侵，于19世纪末灭绝。标本翅膀呈美丽的淡蓝色，虽历经百年仍能感受到其昔日的光彩。",
    condition: "良好",
    preservationMethod: "针插干燥保存，充氮密封盒，低温冷藏",
    storageLocation: "国家自然博物馆鳞翅目标本馆 C区 灭绝物种柜",
    rarity: "极稀有",
    conservationStatus: "灭绝",
    discoveryHistory: [
      {
        date: "1847-11-05",
        discoverer: "F. L. Laporte de Castelnau",
        location: "毛里求斯中央高原",
        description: "首次采集并描述该物种。"
      },
      {
        date: "1890-03-12",
        discoverer: "Henry Nicholas Ridley",
        location: "毛里求斯马卡布森林",
        description: "采集本标本，当时该物种已非常稀少。"
      },
      {
        date: "1910-12-31",
        discoverer: "-",
        location: "毛里求斯",
        description: "最后一次野外观察记录，此后该物种宣告灭绝。"
      }
    ],
    researchRecords: [
      {
        year: "1848",
        researcher: "F. L. Laporte de Castelnau",
        institution: "法国自然历史博物馆",
        title: "毛里求斯岛鳞翅目考察报告",
        description: "正式描述并命名该物种。"
      },
      {
        year: "1950",
        researcher: "George Atkinson",
        institution: "大英自然历史博物馆",
        title: "毛里求斯特有蝴蝶的灭绝",
        description: "详细记录了该物种的灭绝过程，并分析了外来入侵物种的影响。"
      },
      {
        year: "2011",
        researcher: "国际自然保护联盟",
        institution: "IUCN",
        title: "全球灭绝蝴蝶物种红色名录评估",
        description: "将该物种列入IUCN红色名录，评估为灭绝等级。"
      }
    ],
    notes: "该物种已灭绝，本标本为仅存的5只标本之一。仅用于科研用途，严禁触碰。2008年完成高分辨率3D扫描数字化保存。",
    tags: ["灭绝物种", "特有种", "毛里求斯", "岛屿物种", "19世纪采集"],
    relatedButterflyId: "11"
  },
  {
    id: "specimen-7",
    name: "燕凤蝶稀有种群",
    latinName: "Lamproptera curius hainanensis",
    family: "凤蝶科",
    genus: "燕凤蝶属",
    category: "珍稀物种",
    specimenNumber: "LEP-1964-032",
    collectionDate: "1964-04-15",
    collectionLocation: "中国海南岛",
    collector: "周尧",
    donor: "西北农林科技大学昆虫博物馆",
    image: img("A rare dragontail butterfly specimen with long tail-like extensions, Hainan subspecies, museum specimen with detailed labels, delicate beautiful wings"),
    wingspan: "5.8 厘米（不含尾突）",
    description: "这是燕凤蝶海南亚种的模式标本，由中国著名昆虫学家周尧院士采集。该亚种仅分布于海南岛热带雨林中，后翅两条极长的尾突如燕子般飘逸，是凤蝶中最具特色的种类之一。标本保存极为完好，尾突完整无缺。",
    condition: "完美",
    preservationMethod: "针插干燥保存，玻璃钟罩密封",
    storageLocation: "国家自然博物馆鳞翅目标本馆 B区 2号柜",
    rarity: "稀有",
    conservationStatus: "近危",
    discoveryHistory: [
      {
        date: "1964-04-15",
        discoverer: "周尧",
        location: "中国海南省尖峰岭国家级自然保护区",
        description: "首次采集到该亚种，经研究确认为新亚种。"
      },
      {
        date: "1793-01-01",
        discoverer: "Johan Christian Fabricius",
        location: "印度",
        description: "燕凤蝶物种首次被正式描述。"
      }
    ],
    researchRecords: [
      {
        year: "1965",
        researcher: "周尧",
        institution: "西北农林科技大学",
        title: "海南岛凤蝶科新亚种记述",
        description: "正式描述该新亚种Lamproptera curius hainanensis。"
      },
      {
        year: "2008",
        researcher: "华南农业大学昆虫学系",
        institution: "华南农业大学",
        title: "燕凤蝶海南亚种的线粒体基因组研究",
        description: "测定了该亚种的线粒体基因组，为燕凤蝶属的系统发育研究提供了重要数据。"
      },
      {
        year: "2022",
        researcher: "中国热带农业科学院",
        institution: "中国热带农业科学院",
        title: "燕凤蝶海南亚种的栖息地选择与保护建议",
        description: "基于野外调查数据，提出了针对该珍稀亚种的保护策略。"
      }
    ],
    notes: "该标本为亚种模式标本，由中国著名昆虫学家周尧院士采集。尾突完整，是难得的保存完美的标本。用于教学和科研展示。",
    tags: ["亚种模式标本", "海南特有", "周尧院士采集", "凤蝶科", "1960年代"],
    relatedButterflyId: "20"
  },
  {
    id: "specimen-8",
    name: "大凤蝶百年对比标本",
    latinName: "Papilio cresphontes twin specimen",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "历史标本",
    specimenNumber: "LEP-1920-056 / LEP-2020-089",
    collectionDate: "1920-07-10 / 2020-08-05",
    collectionLocation: "美国佛罗里达州",
    collector: "Arthur Byrd / Sarah Johnson",
    donor: "佛罗里达自然历史博物馆",
    image: img("Two swallowtail butterfly specimens side by side, one from 1920 and one from 2020, showing size and color differences from climate change, scientific comparison display"),
    wingspan: "15.6 厘米 / 14.2 厘米",
    description: "这是一对珍贵的对比标本，分别采集于1920年和2020年同一地点的大凤蝶个体。通过对比可以清晰地看到，百年间该物种的平均翅展缩小了约9%，颜色也略有变化，被认为是气候变化对昆虫体型影响的直接证据。",
    condition: "良好 / 完美",
    preservationMethod: "并排展示，针插干燥保存，密封展示盒",
    storageLocation: "国家自然博物馆鳞翅目标本馆 D区 气候变迁展区",
    rarity: "稀有",
    conservationStatus: "无危",
    discoveryHistory: [
      {
        date: "1920-07-10",
        discoverer: "Arthur Byrd",
        location: "美国佛罗里达州迈阿密郊区",
        description: "采集到百年前的个体，当时该地区农业活动刚开始发展。"
      },
      {
        date: "2020-08-05",
        discoverer: "Sarah Johnson",
        location: "美国佛罗里达州迈阿密郊区（同一地点）",
        description: "在相同地点采集现代个体，用于百年对比研究。"
      }
    ],
    researchRecords: [
      {
        year: "2021",
        researcher: "佛罗里达大学",
        institution: "佛罗里达大学",
        title: "百年间大凤蝶体型变化的对比研究",
        description: "以这对比标本为核心数据，发现佛罗里达地区的大凤蝶翅展平均缩小了9.2%。"
      },
      {
        year: "2022",
        researcher: "斯坦福大学",
        institution: "斯坦福大学",
        title: "气候变化对北美蝴蝶体型的影响",
        description: "引用该对比标本的研究数据，揭示了温度升高与昆虫体型减小的相关性。"
      },
      {
        year: "2023",
        researcher: "联合国环境规划署",
        institution: "UNEP",
        title: "全球昆虫衰退报告",
        description: "该对比标本作为典型案例被收录于报告中，展示气候变化对昆虫的影响。"
      }
    ],
    notes: "这对标本具有重要的科研价值，是研究全球气候变化对昆虫影响的直观证据。经常用于科普教育展览，展示环境变化的生物学效应。",
    tags: ["对比标本", "气候变化", "百年跨度", "美国区系", "凤蝶科"],
    relatedButterflyId: "3"
  },
  {
    id: "specimen-9",
    name: "光辉闪蝶",
    latinName: "Morpho richardus",
    family: "蛱蝶科",
    genus: "闪蝶属",
    category: "已灭绝近缘种",
    specimenNumber: "LEP-1900-041",
    collectionDate: "1900-01-15",
    collectionLocation: "巴西里约热内卢",
    collector: "Richard Spruce",
    donor: "伦敦自然历史博物馆",
    image: img("An extinct Morpho richardus butterfly specimen, iridescent blue wings faded with age, historical museum specimen from Brazil, scientific labels"),
    wingspan: "13.5 厘米",
    description: "光辉闪蝶是巴西里约热内卢地区特有的闪蝶物种，因城市扩张和森林砍伐，于20世纪中期灭绝。该标本是已知保存最完好的个体之一，翅膀仍保留着淡淡的金属蓝色光泽。该物种与现存的蓝闪蝶和银白闪蝶有较近的亲缘关系。",
    condition: "良好",
    preservationMethod: "针插干燥保存，充氮密封盒，低温冷藏",
    storageLocation: "国家自然博物馆鳞翅目标本馆 C区 灭绝物种柜",
    rarity: "极稀有",
    conservationStatus: "灭绝",
    discoveryHistory: [
      {
        date: "1867-03-22",
        discoverer: "Richard Spruce",
        location: "巴西里约热内卢蒂茹卡森林",
        description: "首次采集并描述该物种。"
      },
      {
        date: "1900-01-15",
        discoverer: "Richard Spruce",
        location: "巴西里约热内卢蒂茹卡森林",
        description: "采集本标本，这是已知最后一批采集记录之一。"
      },
      {
        date: "1950-12-31",
        discoverer: "-",
        location: "巴西里约热内卢",
        description: "最后一次可信的野外观察，此后该物种被认为已灭绝。"
      }
    ],
    researchRecords: [
      {
        year: "1868",
        researcher: "Richard Spruce",
        institution: "伦敦林奈学会",
        title: "亚马逊流域闪蝶属新种记述",
        description: "正式描述并命名该物种，以纪念采集者Richard Spruce。"
      },
      {
        year: "1960",
        researcher: "巴西国家博物馆",
        institution: "巴西国家博物馆",
        title: "里约热内卢地区蝴蝶的灭绝",
        description: "详细记录了该物种因城市扩张而灭绝的过程。"
      },
      {
        year: "2017",
        researcher: "巴西圣保罗大学",
        institution: "圣保罗大学",
        title: "闪蝶属灭绝物种的系统发育分析",
        description: "通过形态比较和DNA分析，确定了光辉闪蝶与现存闪蝶物种的亲缘关系。"
      }
    ],
    notes: "该物种已灭绝，本标本为仅存的少数完整标本之一。仅用于科研和特别展览。禁止任何形式的样本提取。",
    tags: ["灭绝物种", "巴西特有", "城市扩张导致灭绝", "闪蝶属", "19世纪采集"],
    relatedButterflyId: "9"
  },
  {
    id: "specimen-10",
    name: "银纹小灰蝶",
    latinName: "Cupido argiades metallica",
    family: "灰蝶科",
    genus: "小灰蝶属",
    category: "历史标本",
    specimenNumber: "LEP-1856-028",
    collectionDate: "1856-05-20",
    collectionLocation: "瑞士阿尔卑斯山",
    collector: "Johann Jakob von Tschudi",
    donor: "瑞士自然历史博物馆",
    image: img("A tiny blue butterfly specimen Cupido argiades from Swiss Alps, 1856 collection, vintage museum specimen with handwritten label, delicate small wings"),
    wingspan: "2.8 厘米",
    description: "这是银纹小灰蝶阿尔卑斯亚种的模式标本，采集于1856年。标本体型小巧，翅膀呈淡蓝色金属光泽，是高海拔地区的特有亚种。标本附带原始手写采集标签，是19世纪欧洲阿尔卑斯山生物考察的重要实物资料。",
    condition: "良好",
    preservationMethod: "微针插保存，密封保存盒",
    storageLocation: "国家自然博物馆鳞翅目标本馆 A区 4号柜",
    rarity: "稀有",
    conservationStatus: "易危",
    discoveryHistory: [
      {
        date: "1856-05-20",
        discoverer: "Johann Jakob von Tschudi",
        location: "瑞士阿尔卑斯山少女峰地区",
        description: "在海拔2300米的高山草甸采集到该亚种。"
      }
    ],
    researchRecords: [
      {
        year: "1857",
        researcher: "Johann Jakob von Tschudi",
        institution: "瑞士自然历史博物馆",
        title: "阿尔卑斯山鳞翅目考察报告",
        description: "正式描述该新亚种。"
      },
      {
        year: "1985",
        researcher: "苏黎世大学",
        institution: "苏黎世大学",
        title: "阿尔卑斯山蝴蝶亚种的形态分化",
        description: "研究证实该亚种是长期地理隔离形成的特有演化单元。"
      },
      {
        year: "2020",
        researcher: "欧盟生物多样性监测计划",
        institution: "欧洲环境署",
        title: "阿尔卑斯山蝴蝶对气候变化的响应",
        description: "将该标本作为基线数据，监测阿尔卑斯山蝴蝶因气候变暖而上移的趋势。"
      }
    ],
    notes: "该标本为亚种模式标本，体型小巧，保存完好。由于气候变化，该亚种在模式产地的种群数量已大幅减少，目前已被列为易危等级。",
    tags: ["亚种模式标本", "高海拔物种", "阿尔卑斯山", "灰蝶科", "19世纪采集"],
    relatedButterflyId: "11"
  },
  {
    id: "specimen-11",
    name: "帝汶凤蝶",
    latinName: "Papilio blumei timorensis",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "珍稀物种",
    specimenNumber: "LEP-1998-015",
    collectionDate: "1998-09-10",
    collectionLocation: "帝汶岛",
    collector: "Indonesian Entomological Society",
    donor: "印尼昆虫学会",
    image: img("A rare Papilio blumei butterfly specimen from Timor island, iridescent green and gold wings, museum specimen with detailed scientific labels, exotic beauty"),
    wingspan: "12.5 厘米",
    description: "这是帝汶凤蝶的特有亚种，仅分布于帝汶岛的少数原始森林中。翅膀具有华丽的绿金相间的金属光泽，在阳光下会呈现出彩虹般的色彩变化。该亚种种群数量稀少，栖息地因棕榈油种植园扩张而严重破碎化。",
    condition: "完美",
    preservationMethod: "针插干燥保存，充氮密封盒",
    storageLocation: "国家自然博物馆鳞翅目标本馆 B区 1号柜",
    rarity: "极稀有",
    conservationStatus: "濒危",
    discoveryHistory: [
      {
        date: "1998-09-10",
        discoverer: "印尼昆虫学会考察队",
        location: "帝汶岛西帝汶地区原始森林",
        description: "首次采集到该亚种标本。"
      }
    ],
    researchRecords: [
      {
        year: "2000",
        researcher: "印尼昆虫学会",
        institution: "印尼科学研究所",
        title: "帝汶岛凤蝶科新亚种记述",
        description: "正式描述该新亚种。"
      },
      {
        year: "2015",
        researcher: "澳大利亚昆士兰大学",
        institution: "昆士兰大学",
        title: "帝汶岛特有蝴蝶的保护遗传学研究",
        description: "发现该亚种种群遗传多样性极低，需要紧急保护干预。"
      },
      {
        year: "2022",
        researcher: "国际凤蝶保护联盟",
        institution: "IUCN凤蝶专家组",
        title: "帝汶凤蝶亚种的濒危等级评估",
        description: "将该亚种评估为濒危等级，建议列入CITES附录I。"
      }
    ],
    notes: "该标本为亚种模式标本，是该珍稀亚种的重要科学资料。仅在特别展览中展出，严禁触碰。",
    tags: ["亚种模式标本", "印尼特有", "濒危物种", "凤蝶科", "1990年代采集"],
    relatedButterflyId: "10"
  },
  {
    id: "specimen-12",
    name: "多米尼加琥珀蝴蝶",
    latinName: "Nymphalidae indet. (fossil)",
    family: "蛱蝶科（化石）",
    genus: "未定属",
    category: "历史标本",
    specimenNumber: "FOS-0023",
    collectionDate: "约1500万年前",
    collectionLocation: "多米尼加共和国",
    collector: "私人收藏家捐赠",
    donor: "多米尼加琥珀博物馆",
    image: img("A butterfly preserved in Dominican amber, fossil insect from Miocene epoch, clear amber with delicate butterfly inside, scientific specimen, ancient remains"),
    wingspan: "4.5 厘米",
    description: "这是极其珍贵的多米尼加琥珀蝴蝶化石，形成于约1500万年前的中新世。蝴蝶被完整地保存在透明的琥珀中，翅膀纹理甚至身体细节都清晰可见。这是研究蛱蝶科演化历史的重要实物证据，也是琥珀化石中的稀世珍品。",
    condition: "完美",
    preservationMethod: "天然琥珀保存，密封展示盒",
    storageLocation: "国家自然博物馆化石标本馆 珍品柜",
    rarity: "极稀有",
    conservationStatus: "灭绝（化石种）",
    discoveryHistory: [
      {
        date: "1995-06-12",
        discoverer: "多米尼加琥珀矿工",
        location: "多米尼加共和国拉贝卡琥珀矿",
        description: "在开采琥珀矿时发现该化石标本。"
      }
    ],
    researchRecords: [
      {
        year: "1998",
        researcher: "George O. Poinar Jr.",
        institution: "俄勒冈州立大学",
        title: "多米尼加琥珀中的鳞翅目化石",
        description: "首次科学描述该化石，将其归类为蛱蝶科。"
      },
      {
        year: "2010",
        researcher: "康奈尔大学古生物研究所",
        institution: "康奈尔大学",
        title: "基于琥珀化石的蛱蝶科分子钟校准",
        description: "利用该化石校准蛱蝶科的演化时间树。"
      },
      {
        year: "2023",
        researcher: "中国科学院南京地质古生物研究所",
        institution: "中国科学院",
        title: "多米尼加琥珀蝴蝶的超微结构研究",
        description: "使用同步辐射X射线显微成像技术，揭示了翅膀鳞片的精细结构。"
      }
    ],
    notes: "该化石标本具有极高的科学价值，是研究蝴蝶演化历史的重要实物证据。仅用于科研和特别展览，严禁触碰。拍摄需获得特别许可。",
    tags: ["琥珀化石", "中新世", "多米尼加", "蛱蝶科", "演化研究"],
    relatedButterflyId: "8"
  }
];

export const specimenCategories: { value: string; label: string; icon: string }[] = [
  { value: "全部", label: "全部标本", icon: "🦋" },
  { value: "历史标本", label: "历史标本", icon: "📜" },
  { value: "珍稀物种", label: "珍稀物种", icon: "💎" },
  { value: "已灭绝近缘种", label: "已灭绝近缘种", icon: "🕯️" },
];

export const conservationStatusColors: Record<string, string> = {
  "无危": "bg-green-100 text-green-700",
  "近危": "bg-blue-100 text-blue-700",
  "易危": "bg-yellow-100 text-yellow-700",
  "濒危": "bg-orange-100 text-orange-700",
  "极危": "bg-red-100 text-red-700",
  "灭绝": "bg-gray-100 text-gray-700",
};

export const conditionColors: Record<string, string> = {
  "完美": "bg-green-100 text-green-700",
  "良好": "bg-blue-100 text-blue-700",
  "一般": "bg-yellow-100 text-yellow-700",
  "破损": "bg-red-100 text-red-700",
};

export function getSpecimenById(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id);
}

export function getSpecimensByCategory(category: string): Specimen[] {
  if (category === "全部") return specimens;
  return specimens.filter((s) => s.category === category);
}

export function searchSpecimens(keyword: string): Specimen[] {
  if (!keyword.trim()) return specimens;
  const lower = keyword.trim().toLowerCase();
  return specimens.filter((s) =>
    s.name.toLowerCase().includes(lower) ||
    s.latinName.toLowerCase().includes(lower) ||
    s.family.toLowerCase().includes(lower) ||
    s.genus.toLowerCase().includes(lower) ||
    s.specimenNumber.toLowerCase().includes(lower) ||
    s.collector.toLowerCase().includes(lower) ||
    s.tags.some((t) => t.toLowerCase().includes(lower))
  );
}

export function getSpecimensByConservationStatus(status: string): Specimen[] {
  return specimens.filter((s) => s.conservationStatus === status);
}
