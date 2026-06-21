import type { Butterfly, Continent, Climate, RarityLevel, TaxonFamily, TaxonGenus, FlightPatternType, ActivityTimeType, FlightHabitatType, FlightTrackPoint } from "@/types";

const img = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`;

function generateTrajectoryPoints(pattern: FlightPatternType, numPoints: number = 60): FlightTrackPoint[] {
  const points: FlightTrackPoint[] = [];
  const centerX = 50;
  const centerY = 50;

  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 2;
    let x = centerX;
    let y = centerY;

    switch (pattern) {
      case "直线滑翔":
        x = 10 + t * 12.7 + Math.sin(t * 2) * 3;
        y = 50 + Math.sin(t * 3) * 5;
        break;
      case "波浪起伏":
        x = 10 + t * 12.7;
        y = 50 + Math.sin(t * 2) * 20 + Math.sin(t * 4) * 8;
        break;
      case "快速穿梭":
        x = 50 + Math.cos(t * 3) * 30 * Math.sin(t * 0.5);
        y = 50 + Math.sin(t * 5) * 25 * Math.cos(t * 0.3);
        break;
      case "优雅盘旋":
        const spiral = t * 6;
        x = 50 + Math.cos(t * 1.5) * spiral * 0.8;
        y = 50 + Math.sin(t * 1.5) * spiral * 0.8;
        break;
      case "飘忽不定":
        x = 50 + Math.sin(t * 1.7) * 25 + Math.cos(t * 3.2) * 12;
        y = 50 + Math.cos(t * 2.3) * 20 + Math.sin(t * 4.1) * 10;
        break;
      case "缓慢漂浮":
        x = 50 + Math.cos(t * 0.8) * 30 + Math.sin(t * 0.5) * 10;
        y = 50 + Math.sin(t * 1.2) * 15 + Math.cos(t * 0.7) * 8;
        break;
      case "敏捷跳跃":
        x = 20 + (t / (Math.PI * 2)) * 60 + Math.sin(t * 8) * 8;
        y = 50 + Math.abs(Math.sin(t * 6)) * 25;
        break;
    }

    points.push({ x: Math.max(5, Math.min(95, x)), y: Math.max(10, Math.min(90, y)), t: i });
  }

  return points;
}

function createFlightData(
  patternType: FlightPatternType,
  activityTimes: ActivityTimeType[],
  habitat: FlightHabitatType,
  minAlt: number,
  maxAlt: number,
  preferredAlt: string,
  patternDesc: string,
  activityDesc: string,
  altitudeDesc: string,
  speed: number,
  agility: number,
  wingbeat: string,
  flightDuration: string,
  seasonal: string,
  habits: string[]
): Butterfly["flight"] {
  return {
    pattern: {
      patternType,
      description: patternDesc,
      speed,
      agility,
      wingbeatFrequency: wingbeat,
    },
    activity: {
      activeTime: activityTimes,
      description: activityDesc,
      flightDuration,
      seasonalPattern: seasonal,
    },
    altitude: {
      habitat,
      minAltitude: minAlt,
      maxAltitude: maxAlt,
      preferredAltitude: preferredAlt,
      description: altitudeDesc,
    },
    trajectory: {
      pattern: patternType,
      points: generateTrajectoryPoints(patternType),
      duration: 8,
      scale: 1,
    },
    habits,
  };
}

export const continents: Continent[] = [
  "北美洲",
  "南美洲",
  "欧洲",
  "非洲",
  "亚洲",
  "大洋洲",
];

export const climates: Climate[] = [
  "热带",
  "亚热带",
  "温带",
  "寒带",
  "高山",
  "地中海",
];

export const rarityLevels: RarityLevel[] = [
  "常见",
  "较常见",
  "稀有",
  "极稀有",
  "濒危",
];

export const butterflies: Butterfly[] = [
  {
    id: "1",
    name: "帝王蝶",
    latinName: "Danaus plexippus",
    family: "蛱蝶科",
    genus: "斑蝶属",
    category: "蛱蝶",
    image: img("A beautiful monarch butterfly with orange and black wings resting on a flower, natural light, macro photography, high detail"),
    description: "帝王蝶是世界上最著名的蝴蝶之一，以其壮观的年度迁徙闻名。每年秋季，数百万只帝王蝶从加拿大和美国北部飞越数千公里，前往墨西哥中部的冷杉林中越冬。",
    distribution: "北美洲、中美洲、南美洲北部、澳大利亚、新西兰",
    distributionRegions: [
      { continent: "北美洲", countries: ["加拿大", "美国", "墨西哥"] },
      { continent: "南美洲", countries: ["委内瑞拉", "哥伦比亚"] },
      { continent: "大洋洲", countries: ["澳大利亚", "新西兰"] },
    ],
    wingspan: "8.5 – 12 厘米",
    habitat: "草地、田野、花园、森林边缘",
    climate: ["温带", "亚热带", "热带"],
    rarity: "较常见",
    features: ["翅膀呈鲜明的橙黑色", "带有白色斑点", "以有毒的马利筋植物为食", "具有超长距离迁徙能力"],
    popularity: 98,
    flight: createFlightData(
      "直线滑翔",
      ["上午活跃", "下午活跃"],
      "开阔草地",
      1,
      50,
      "5-20米",
      "飞行姿态稳健有力，翅膀缓慢而有节奏地扇动，滑翔时双翅平展呈V字形，利用上升气流进行长距离迁徙。",
      "白天活动，上午和下午最为活跃，中午酷热时会在树荫下休息。",
      "通常在草地和田野上方1-20米高度飞行，迁徙时可利用热气流攀升至数百米高空。",
      85,
      45,
      "约5-8次/秒",
      "单次飞行可持续数小时，每天可飞行100-150公里",
      "春季向北迁徙，秋季向南迁徙，冬季在越冬地集群休眠",
      ["利用热气流滑翔节省体力", "迁徙时利用太阳和地磁导航", "越冬时成千上万只聚集在同一棵树上", "飞行路线代代相传"]
    ),
  },
  {
    id: "2",
    name: "蓝闪蝶",
    latinName: "Morpho menelaus",
    family: "蛱蝶科",
    genus: "闪蝶属",
    category: "蛱蝶",
    image: img("A stunning blue morpho butterfly with iridescent metallic blue wings in a tropical rainforest, lush green background, high detail"),
    description: "蓝闪蝶是热带雨林中的璀璨宝石，其翅膀呈现出令人惊叹的金属般虹彩蓝色。这种蓝色并非来自色素，而是翅膀上的微观结构对光线的折射作用。",
    distribution: "中美洲、南美洲热带雨林",
    distributionRegions: [
      { continent: "南美洲", countries: ["巴西", "秘鲁", "哥伦比亚", "厄瓜多尔", "委内瑞拉"] },
    ],
    wingspan: "12 – 20 厘米",
    habitat: "热带雨林、次生林、林缘地带",
    climate: ["热带"],
    rarity: "稀有",
    features: ["翅膀具有梦幻金属蓝光泽", "结构色原理", "飞行时翅膀闪烁", "常聚集于溪流边吸水"],
    popularity: 95,
    flight: createFlightData(
      "优雅盘旋",
      ["上午活跃", "中午活跃"],
      "林冠层",
      5,
      40,
      "10-25米",
      "飞行姿态优雅飘逸，翅膀扇动缓慢而深沉，常在林冠层缓缓盘旋，翅膀闪烁的金属蓝色在阳光下如梦似幻。",
      "多在上午和中午活动，阳光充足时最为活跃，常沿林间空地和溪流飞行。",
      "主要在热带雨林林冠层活动，飞行高度通常在10-25米，有时会下降到溪流边吸水。",
      60,
      70,
      "约4-6次/秒",
      "单次飞行可达数十分钟，常在林间空地长时间滑翔",
      "全年活跃，雨季活动更为频繁",
      ["飞行时翅膀闪烁产生炫目光效", "常沿固定路线巡逻觅食", "雄蝶有领地行为，会驱赶入侵者", "常在湿润的泥土上吸水获取矿物质"]
    ),
  },
  {
    id: "3",
    name: "大凤蝶",
    latinName: "Papilio cresphontes",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "凤蝶",
    image: img("A giant swallowtail butterfly with yellow and black striped wings on citrus leaves, elegant, nature photography"),
    description: "大凤蝶是北美洲最大的蝴蝶之一，翅膀上有醒目的黄色和黑色斑纹，形似燕尾的后翅尾突是其标志。幼虫被称为「橙狗」，以柑橘类植物为食。",
    distribution: "北美洲南部、中美洲、加勒比地区",
    distributionRegions: [
      { continent: "北美洲", countries: ["美国", "墨西哥"] },
    ],
    wingspan: "10 – 16 厘米",
    habitat: "森林、柑橘园、市郊花园",
    climate: ["亚热带", "热带"],
    rarity: "较常见",
    features: ["后翅有燕尾状突起", "黄黑相间的醒目花纹", "体型硕大", "幼虫酷似鸟粪"],
    popularity: 88,
    flight: createFlightData(
      "波浪起伏",
      ["上午活跃", "下午活跃"],
      "林缘地带",
      2,
      25,
      "3-10米",
      "飞行时呈优美的波浪状起伏，翅膀扇动有力，后翅的燕尾状尾突随风飘动，姿态优雅高贵。",
      "主要在白天活动，上午和下午最为活跃，飞行路线覆盖柑橘园和森林边缘。",
      "通常在树冠层下方3-10米处飞行，有时会飞得很高在林冠上方滑翔。",
      75,
      65,
      "约6-9次/秒",
      "单次飞行可超过数百米，善于利用气流滑翔",
      "春季至秋季活跃，冬季以蛹期越冬",
      ["飞行时后翅尾突飘逸摆动", "雄蝶会在山顶等候雌蝶", "善于在花丛中精准悬停", "受惊时会快速飞入高空"]
    ),
  },
  {
    id: "4",
    name: "虎斑蝶",
    latinName: "Danaus genutia",
    family: "蛱蝶科",
    genus: "斑蝶属",
    category: "蛱蝶",
    image: img("A tiger butterfly with orange and black striped wings on a wildflower, sunny meadow, beautiful nature shot"),
    description: "虎斑蝶因其橙黑相间的虎纹而得名，是亚洲常见的美丽蝴蝶。它体内含有从幼虫时期积累的毒素，捕食者对其敬而远之。",
    distribution: "中国、印度、东南亚、澳大利亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "印度", "泰国", "越南", "马来西亚", "印度尼西亚", "菲律宾"] },
      { continent: "大洋洲", countries: ["澳大利亚"] },
    ],
    wingspan: "7 – 9 厘米",
    habitat: "草地、农田、林缘、花园",
    climate: ["热带", "亚热带", "温带"],
    rarity: "常见",
    features: ["橙黑相间的虎纹", "具有毒性", "飞行缓慢优雅", "喜吸食花蜜"],
    popularity: 82,
    flight: createFlightData(
      "缓慢漂浮",
      ["上午活跃", "下午活跃", "黄昏活跃"],
      "花丛低空",
      0.5,
      8,
      "1-3米",
      "飞行姿态缓慢优雅，翅膀扇动轻柔，常常在花丛间漂浮，因为体内含有毒素，无需快速飞行躲避天敌。",
      "白天大部分时间都在活动，从上午到黄昏都能见到其身影，中午会在树荫下短暂休息。",
      "主要在离地面1-3米的花丛间低空飞行，便于随时停落吸食花蜜。",
      30,
      25,
      "约3-5次/秒",
      "单次飞行多为短途，常在花间频繁起落",
      "全年可见，温暖季节数量最多",
      ["因有毒性，飞行时悠然自得不惧天敌", "常长时间停栖在花朵上吸食花蜜", "有迁飞习性，会随季节变化移动", "飞行路线蜿蜒曲折，搜寻蜜源"]
    ),
  },
  {
    id: "5",
    name: "菜粉蝶",
    latinName: "Pieris rapae",
    family: "粉蝶科",
    genus: "粉蝶属",
    category: "粉蝶",
    image: img("A small white cabbage butterfly with delicate wings resting on green leaves, soft natural light, macro photography"),
    description: "菜粉蝶是世界上分布最广的蝴蝶之一，白色翅膀上带有黑色斑点。其幼虫菜青虫是十字花科蔬菜的常见害虫，但成虫也是重要的传粉者。",
    distribution: "欧洲、亚洲、北美洲、非洲、大洋洲",
    distributionRegions: [
      { continent: "欧洲", countries: ["英国", "法国", "德国", "意大利", "西班牙", "俄罗斯"] },
      { continent: "亚洲", countries: ["中国", "日本", "韩国", "印度"] },
      { continent: "北美洲", countries: ["美国", "加拿大"] },
      { continent: "非洲", countries: ["南非", "埃及"] },
      { continent: "大洋洲", countries: ["澳大利亚", "新西兰"] },
    ],
    wingspan: "4.5 – 6.5 厘米",
    habitat: "田野、菜园、草地、公园",
    climate: ["温带", "亚热带", "地中海"],
    rarity: "常见",
    features: ["乳白色翅膀", "翅尖和翅面有黑斑", "飞行姿态轻盈", "喜十字花科植物"],
    popularity: 70,
    flight: createFlightData(
      "敏捷跳跃",
      ["清晨活跃", "上午活跃", "下午活跃"],
      "开阔草地",
      0.3,
      5,
      "0.5-2米",
      "飞行姿态轻盈敏捷，翅膀快速扇动，飞行路线呈跳跃式，时高时低，善于在蔬菜花丛间快速穿梭。",
      "清晨就开始活动，上午和下午最为活跃，阴天也能见到其飞行。",
      "贴近地面飞行，高度通常在0.5-2米，便于在植物叶片间寻找产卵地点。",
      55,
      85,
      "约10-15次/秒",
      "单次飞行多为短距离跳跃，频繁起降",
      "春季至秋季多代繁殖，数量随季节波动",
      ["飞行路线蜿蜒曲折，搜索寄主植物", "善于在叶片背面精准产卵", "受惊时会快速起飞躲避", "雄蝶会追逐雌蝶进行求偶飞行"]
    ),
  },
  {
    id: "6",
    name: "柑橘凤蝶",
    latinName: "Papilio xuthus",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "凤蝶",
    image: img("An Asian swallowtail butterfly with yellow and black patterned wings on a citrus tree, elegant, garden setting"),
    description: "柑橘凤蝶是东亚地区最常见的凤蝶，翅膀黄黑相间，后翅有漂亮的蓝绿色月纹和红色眼斑。幼虫以柑橘等芸香科植物为食。",
    distribution: "中国、日本、朝鲜半岛、缅甸",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "日本", "韩国", "朝鲜", "缅甸"] },
    ],
    wingspan: "8 – 11 厘米",
    habitat: "柑橘园、市郊林缘、公园",
    climate: ["温带", "亚热带"],
    rarity: "较常见",
    features: ["后翅有红蓝色眼斑", "黄黑条纹清晰", "尾突明显", "幼虫遇敌伸出臭角"],
    popularity: 86,
    flight: createFlightData(
      "波浪起伏",
      ["上午活跃", "下午活跃"],
      "林缘地带",
      1,
      15,
      "2-8米",
      "飞行姿态优雅，翅膀扇动有力，飞行路线呈波浪状起伏，后翅的尾突在飞行中轻轻摆动，十分优美。",
      "白天活动，上午和下午最为活跃，常在柑橘园和林缘地带穿梭飞行。",
      "通常在2-8米高度飞行，有时会飞得很高在树冠上方滑翔。",
      70,
      75,
      "约7-10次/秒",
      "单次飞行可达数百米，善于在花丛间精准穿梭",
      "春季至秋季可见，夏季数量最多",
      ["飞行时后翅尾突优雅摆动", "善于在飞行中精准定位花朵", "雄蝶有领地行为，在柑橘园巡逻", "求偶时雄蝶会在空中追逐雌蝶"]
    ),
  },
  {
    id: "7",
    name: "金斑喙凤蝶",
    latinName: "Teinopalpus aureus",
    family: "凤蝶科",
    genus: "喙凤蝶属",
    category: "凤蝶",
    image: img("A rare golden Kaiser-i-Hind butterfly with green and gold iridescent wings in a misty mountain forest, precious, high detail"),
    description: "金斑喙凤蝶是中国最珍贵的蝴蝶，被誉为「蝶中皇后」，属国家一级保护动物。其翅膀闪烁着翠绿与金黄的金属光泽，极为罕见。",
    distribution: "中国福建、广东、广西、海南及越南北部",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "越南"] },
    ],
    wingspan: "8 – 10 厘米",
    habitat: "海拔1000米以上的山地常绿阔叶林",
    climate: ["亚热带", "高山"],
    rarity: "濒危",
    features: ["翅膀呈翠绿色金属光泽", "后翅有金黄色斑", "尾突细长", "数量极稀少"],
    popularity: 96,
    flight: createFlightData(
      "优雅盘旋",
      ["上午活跃", "中午活跃"],
      "林冠层",
      5,
      30,
      "10-20米",
      "飞行姿态高贵优雅，常在高山林冠层缓缓盘旋，翅膀的翠绿色金属光泽在阳光下闪烁如宝石，飞行速度缓慢但姿态优美。",
      "主要在上午和中午活动，尤其喜欢在阳光充足的林间空地飞行，阴天很少活动。",
      "栖息于高海拔山地，常在10-20米高的林冠层飞行，很少下降到地面。",
      55,
      65,
      "约5-7次/秒",
      "单次飞行可持续数十分钟，常在林间长时间滑翔",
      "春季和夏季出现，一年发生一代",
      ["雄蝶常停栖在树冠顶端守候雌蝶", "飞行路线固定，常在同一区域活动", "对栖息地要求极高，仅存于原始森林", "数量极为稀少，难得一见其飞行姿态"]
    ),
  },
  {
    id: "8",
    name: "孔雀蛱蝶",
    latinName: "Aglais io",
    family: "蛱蝶科",
    genus: "蛱蝶属",
    category: "蛱蝶",
    image: img("A peacock butterfly with stunning eye-spot patterns on wings, perched on a purple flower, vivid colors, macro shot"),
    description: "孔雀蛱蝶因翅膀上四个酷似孔雀尾羽的眼斑而得名，是欧洲和亚洲最美丽的蝴蝶之一。它以成虫形态越冬，早春便可看到其身影。",
    distribution: "欧洲、亚洲温带地区",
    distributionRegions: [
      { continent: "欧洲", countries: ["英国", "法国", "德国", "波兰", "瑞典", "西班牙"] },
      { continent: "亚洲", countries: ["中国", "日本", "韩国", "哈萨克斯坦"] },
    ],
    wingspan: "5 – 6.5 厘米",
    habitat: "森林、田野、花园、公园",
    climate: ["温带"],
    rarity: "较常见",
    features: ["翅膀有四个大眼斑", "眼斑用于震慑天敌", "以成虫越冬", "翅膀底色红棕"],
    popularity: 84,
    flight: createFlightData(
      "飘忽不定",
      ["上午活跃", "下午活跃"],
      "林缘地带",
      0.5,
      10,
      "1-5米",
      "飞行姿态飘忽不定，翅膀快速扇动，飞行路线变化多端，遇到危险时会突然打开翅膀展示眼斑以震慑天敌。",
      "白天活动，上午和下午最为活跃，早春时节是最早出现的蝴蝶之一。",
      "通常在1-5米高度飞行，常在花丛和灌丛间穿梭。",
      65,
      80,
      "约12-18次/秒",
      "单次飞行多为中短途，频繁停栖吸食花蜜",
      "早春便开始活动，秋季以成虫形态越冬",
      ["飞行时会突然展示翅膀眼斑震慑天敌", "越冬后早春即开始活动", "雄蝶有领地行为，会驱赶其他雄蝶", "善于在飞行中快速改变方向"]
    ),
  },
  {
    id: "9",
    name: "银白闪蝶",
    latinName: "Morpho laertes",
    family: "蛱蝶科",
    genus: "闪蝶属",
    category: "蛱蝶",
    image: img("A pearlescent white morpho butterfly with opalescent wings in a sunlit tropical forest, dreamy, ethereal"),
    description: "银白闪蝶是闪蝶家族中少见的银白色种类，翅膀泛着珍珠般的虹彩光泽，在阳光照射下如梦似幻。",
    distribution: "巴西、秘鲁、玻利维亚等南美国家",
    distributionRegions: [
      { continent: "南美洲", countries: ["巴西", "秘鲁", "玻利维亚", "厄瓜多尔"] },
    ],
    wingspan: "10 – 14 厘米",
    habitat: "热带雨林深处",
    climate: ["热带"],
    rarity: "稀有",
    features: ["翅膀呈珍珠银白光泽", "结构色原理", "飞行姿态飘逸", "常出没于林间空地"],
    popularity: 87,
    flight: createFlightData(
      "缓慢漂浮",
      ["上午活跃", "中午活跃"],
      "林冠层",
      8,
      35,
      "15-25米",
      "飞行姿态飘逸如仙，翅膀扇动缓慢而轻盈，常在热带雨林的林冠层缓缓漂浮，珍珠般的银白色翅膀在阳光下闪烁着神秘的虹彩。",
      "多在上午和中午活动，阳光充足时最为活跃，常常在林间空地长时间滑翔。",
      "主要在热带雨林林冠层活动，飞行高度通常在15-25米，很少下降到地面。",
      50,
      60,
      "约3-5次/秒",
      "单次飞行可达数十分钟，善于利用林间气流长时间滑翔",
      "全年活跃，雨季数量较多",
      ["飞行时翅膀闪烁珍珠般虹彩光泽", "常沿林间空地缓慢滑翔", "雄蝶会在树冠顶端建立领地", "飞行姿态飘逸，被誉为雨林精灵"]
    ),
  },
  {
    id: "10",
    name: "金凤蝶",
    latinName: "Papilio machaon",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "凤蝶",
    image: img("An Old World swallowtail butterfly with vibrant yellow and black wings, on wild fennel, classic beauty, nature"),
    description: "金凤蝶是凤蝶科的模式种，也是欧洲最具代表性的蝴蝶。翅膀金黄，缀有黑色条纹和蓝红斑纹，尾突修长优雅。",
    distribution: "欧洲、亚洲、北美洲北部",
    distributionRegions: [
      { continent: "欧洲", countries: ["英国", "法国", "德国", "意大利", "西班牙", "希腊"] },
      { continent: "亚洲", countries: ["中国", "日本", "土耳其", "伊朗", "哈萨克斯坦"] },
      { continent: "北美洲", countries: ["加拿大", "阿拉斯加"] },
    ],
    wingspan: "6.5 – 10 厘米",
    habitat: "草甸、山坡、花园、田野",
    climate: ["温带", "地中海", "寒带"],
    rarity: "较常见",
    features: ["后翅有蓝色和红色斑点", "长尾突明显", "黄黑花纹经典", "幼虫以伞形科植物为食"],
    popularity: 90,
    flight: createFlightData(
      "波浪起伏",
      ["上午活跃", "下午活跃"],
      "开阔草地",
      0.5,
      20,
      "2-10米",
      "飞行姿态高贵典雅，翅膀扇动有力而富有节奏，飞行路线呈优美的波浪状起伏，修长的尾突随风飘动，尽显优雅气质。",
      "白天活动，上午和下午最为活跃，常在山坡和草甸间穿梭飞行。",
      "通常在2-10米高度飞行，有时会利用上升气流滑翔至更高处。",
      72,
      78,
      "约6-9次/秒",
      "单次飞行可达数百米，善于在花丛间快速穿梭",
      "春季至秋季可见，夏季数量最多",
      ["飞行时尾突优雅摆动", "善于在飞行中精准定位花朵", "雄蝶会在山顶聚集等候雌蝶", "受惊扰时会快速飞入高空"]
    ),
  },
  {
    id: "11",
    name: "灰蝶",
    latinName: "Lycaena phlaeas",
    family: "灰蝶科",
    genus: "灰蝶属",
    category: "灰蝶",
    image: img("A tiny copper butterfly with vivid orange and brown wings on a clover flower, macro photography, delicate details"),
    description: "灰蝶是小型蝴蝶，雄蝶翅膀正面常呈现出金属般的蓝紫色光泽，雌蝶则偏棕橙色。它们是大自然中灵动的小精灵。",
    distribution: "欧洲、亚洲、非洲、北美洲",
    distributionRegions: [
      { continent: "欧洲", countries: ["英国", "法国", "德国", "波兰", "西班牙"] },
      { continent: "亚洲", countries: ["中国", "日本", "印度", "土耳其"] },
      { continent: "非洲", countries: ["摩洛哥", "阿尔及利亚", "南非"] },
      { continent: "北美洲", countries: ["美国", "加拿大"] },
    ],
    wingspan: "2.5 – 3.5 厘米",
    habitat: "草地、荒原、山坡、花园",
    climate: ["温带", "地中海"],
    rarity: "常见",
    features: ["体型小巧玲珑", "雄蝶有金属蓝紫光", "飞行快速敏捷", "喜停栖于日光处"],
    popularity: 72,
    flight: createFlightData(
      "快速穿梭",
      ["上午活跃", "中午活跃", "下午活跃"],
      "花丛低空",
      0.2,
      3,
      "0.3-1米",
      "飞行姿态快速敏捷，翅膀扇动频率极高，飞行路线变幻莫测，如同大自然中的小精灵在草丛间快速穿梭。",
      "白天活动，尤其喜欢阳光充足的时段，在阳光下飞行最为活跃。",
      "贴近地面飞行，高度通常在0.3-1米之间，便于在草丛中寻找食物和配偶。",
      90,
      95,
      "约20-25次/秒",
      "单次飞行多为短距离快速冲刺，频繁停栖在叶片上晒太阳",
      "春季至秋季多代繁殖，夏季数量最多",
      ["飞行速度极快，难以捕捉", "常在阳光充足的叶片上停栖取暖", "雄蝶会追逐雌蝶进行求偶飞行", "受惊时会快速飞入草丛躲避"]
    ),
  },
  {
    id: "12",
    name: "玉带凤蝶",
    latinName: "Papilio polytes",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "凤蝶",
    image: img("A common Mormon butterfly with black wings and a white band, on tropical flowers, Asia, elegant nature photography"),
    description: "玉带凤蝶是亚洲常见的凤蝶，雄蝶翅膀黑色，横贯一条如玉带般的白斑，雌蝶则有多型现象，有些个体模仿有毒的红珠凤蝶。",
    distribution: "中国南部、印度、东南亚、日本",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "日本", "印度", "泰国", "越南", "马来西亚", "印度尼西亚", "菲律宾"] },
    ],
    wingspan: "8 – 10 厘米",
    habitat: "林缘、庭园、柑橘园",
    climate: ["亚热带", "热带"],
    rarity: "较常见",
    features: ["雄蝶有白色横带", "雌蝶多型性", "拟态保护", "喜访马缨丹等花"],
    popularity: 78,
    flight: createFlightData(
      "波浪起伏",
      ["上午活跃", "下午活跃"],
      "林缘地带",
      1,
      15,
      "2-8米",
      "飞行姿态优雅大方，翅膀扇动有力，飞行路线呈波浪状起伏，雄蝶的白色翅带在阳光下如同一条飘动的玉带。",
      "白天活动，上午和下午最为活跃，常在林缘和庭园间穿梭飞行。",
      "通常在2-8米高度飞行，有时会在树冠上方滑翔。",
      68,
      72,
      "约6-9次/秒",
      "单次飞行可达数百米，善于在花丛间灵活穿梭",
      "春季至秋季可见，夏季数量最多",
      ["雄蝶有领地行为，常在林缘巡逻", "雌蝶飞行缓慢，模仿有毒蝴蝶姿态", "善于在飞行中精准定位花朵", "求偶时雄蝶会在空中追逐雌蝶"]
    ),
  },
  {
    id: "13",
    name: "红珠凤蝶",
    latinName: "Pachliopta aristolochiae",
    family: "凤蝶科",
    genus: "珠凤蝶属",
    category: "凤蝶",
    image: img("A rose butterfly with dark red wings and pink spots, on green foliage, tropical Asia, striking beauty"),
    description: "红珠凤蝶又称红纹凤蝶，体黑翅红，翅缘有一圈红色珠状斑点，身体含有从马兜铃植物中积累的毒素，是许多蝴蝶的拟态对象。",
    distribution: "中国南部、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "印度", "泰国", "越南", "马来西亚", "印度尼西亚"] },
    ],
    wingspan: "8 – 11 厘米",
    habitat: "林缘、花园、低海拔山区",
    climate: ["亚热带", "热带"],
    rarity: "较常见",
    features: ["翅膀深红近黑", "外缘有红色珠斑", "具有毒性", "被其他蝴蝶拟态"],
    popularity: 76,
    flight: createFlightData(
      "缓慢漂浮",
      ["上午活跃", "下午活跃"],
      "林缘地带",
      1,
      10,
      "2-6米",
      "飞行姿态缓慢优雅，因体内含有毒素，无需快速飞行躲避天敌，常在林缘和花园间悠然漂浮，翅膀扇动缓慢而深沉。",
      "白天活动，上午和下午最为活跃，飞行时悠然自得，不怕鸟类攻击。",
      "通常在2-6米高度飞行，便于在花丛间寻找蜜源和在马兜铃植物上产卵。",
      35,
      30,
      "约4-6次/秒",
      "单次飞行多为中短途，常在花间长时间停栖吸食花蜜",
      "全年可见，温暖季节数量最多",
      ["因有毒性，飞行时悠然不惧天敌", "飞行速度缓慢，姿态优雅", "雌蝶会缓慢飞行搜寻马兜铃植物产卵", "是其他无毒蝴蝶的拟态对象"]
    ),
  },
  {
    id: "14",
    name: "箭环蝶",
    latinName: "Stichophthalma howqua",
    family: "环蝶科",
    genus: "箭环蝶属",
    category: "环蝶",
    image: img("A jungle queen butterfly with large tawny wings and eye rings, in a bamboo forest, China, majestic natural shot"),
    description: "箭环蝶是环蝶科中体型最大的种类之一，翅膀黄褐色，翅缘有一排箭头状的斑纹。它们栖息于竹林中，幼虫以竹叶为食。",
    distribution: "中国南方、越南、缅甸",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "越南", "缅甸"] },
    ],
    wingspan: "12 – 16 厘米",
    habitat: "竹林、亚热带常绿阔叶林",
    climate: ["亚热带"],
    rarity: "稀有",
    features: ["体型硕大", "翅膀黄褐色", "外缘有箭头状环纹", "竹林栖息"],
    popularity: 74,
    flight: createFlightData(
      "缓慢漂浮",
      ["上午活跃", "下午活跃"],
      "竹林木中",
      2,
      15,
      "5-10米",
      "飞行姿态缓慢优雅，翅膀扇动深沉而有力，常在竹林中缓缓漂浮，硕大的翅膀在竹林间投下斑驳的光影。",
      "白天活动，上午和下午最为活跃，常在竹林间穿梭飞行。",
      "主要在竹林中上部飞行，高度通常在5-10米，便于在竹叶间寻找产卵地点。",
      40,
      35,
      "约3-5次/秒",
      "单次飞行多为短途，常在竹枝间停栖休息",
      "夏季数量较多，一年发生一代",
      ["飞行时翅膀扇动缓慢，姿态优雅", "常在竹林间穿梭，躲避天敌", "幼虫以竹叶为食，成虫飞行范围不大", "受惊时会飞入竹林深处躲避"]
    ),
  },
  {
    id: "15",
    name: "巴黎翠凤蝶",
    latinName: "Papilio paris",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "凤蝶",
    image: img("A Paris peacock swallowtail with emerald green metallic wings, on tropical flowers, exquisite beauty, high detail"),
    description: "巴黎翠凤蝶虽名中有巴黎，实际分布于亚洲热带地区。其翅膀闪烁着华丽的翠绿色金属光泽，后翅有蓝紫色的大型眼斑，极为华贵。",
    distribution: "中国南方、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "印度", "泰国", "越南", "马来西亚", "印度尼西亚"] },
    ],
    wingspan: "10 – 13 厘米",
    habitat: "热带亚热带森林、林缘",
    climate: ["热带", "亚热带"],
    rarity: "稀有",
    features: ["翅膀翠绿色金属光泽", "后翅有蓝紫色大眼斑", "飞行姿态优雅", "喜访花蜜"],
    popularity: 92,
    flight: createFlightData(
      "优雅盘旋",
      ["上午活跃", "下午活跃"],
      "林冠层",
      3,
      30,
      "8-20米",
      "飞行姿态高贵华丽，翅膀扇动缓慢而优雅，常在林冠层缓缓盘旋，翠绿色的金属光泽在阳光下闪烁如宝石，后翅的蓝紫色眼斑更添华贵气质。",
      "白天活动，上午和下午最为活跃，常在森林边缘和林间空地飞行。",
      "主要在8-20米高度的林冠层飞行，有时会下降到林缘花丛吸食花蜜。",
      60,
      68,
      "约5-7次/秒",
      "单次飞行可持续数十分钟，善于利用林间气流滑翔",
      "春季至秋季可见，夏季数量最多",
      ["飞行时翅膀闪烁翠绿色金属光泽", "雄蝶有领地行为，常在树冠顶端巡逻", "善于在飞行中精准定位花朵", "求偶时雄蝶会在空中优雅地追逐雌蝶"]
    ),
  },
  {
    id: "16",
    name: "苎麻珍蝶",
    latinName: "Acraea issoria",
    family: "蛱蝶科",
    genus: "珍蝶属",
    category: "蛱蝶",
    image: img("A yellow coster butterfly with translucent orange-yellow wings, on a sunny meadow, delicate, ethereal nature shot"),
    description: "苎麻珍蝶又称黄珍蝶，翅膀半透明，呈温暖的橙黄色，翅脉清晰如网。飞行时如一片飘动的薄纱，轻盈无比。",
    distribution: "中国南方、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "印度", "尼泊尔", "缅甸", "泰国", "越南"] },
    ],
    wingspan: "5.5 – 7 厘米",
    habitat: "山坡草地、林缘、田野",
    climate: ["亚热带", "热带"],
    rarity: "较常见",
    features: ["翅膀半透明橙黄色", "翅脉如网纹", "飞行轻盈飘逸", "幼虫以苎麻为食"],
    popularity: 71,
    flight: createFlightData(
      "缓慢漂浮",
      ["上午活跃", "下午活跃"],
      "开阔草地",
      0.5,
      6,
      "1-3米",
      "飞行姿态轻盈飘逸，翅膀扇动轻柔，如同一片飘动的薄纱，在阳光下半透明的橙黄色翅膀显得格外梦幻。",
      "白天活动，上午和下午最为活跃，常在山坡草地和田野间缓缓飞行。",
      "贴近地面飞行，高度通常在1-3米，便于在草丛间寻找苎麻等寄主植物。",
      25,
      30,
      "约3-5次/秒",
      "单次飞行多为短途，常在花间频繁停栖",
      "春季至秋季可见，夏季数量最多",
      ["飞行时如薄纱般轻盈飘逸", "翅膀半透明，阳光下梦幻美丽", "常在山坡草地缓慢飞行搜寻寄主", "幼虫以苎麻为食，成虫飞行范围不大"]
    ),
  },
  {
    id: "17",
    name: "美凤蝶",
    latinName: "Papilio memnon",
    family: "凤蝶科",
    genus: "凤蝶属",
    category: "凤蝶",
    image: img("A great Mormon butterfly with large dark wings and subtle blue markings, on citrus tree, Asia, powerful elegant"),
    description: "美凤蝶又称大凤蝶，是凤蝶科中体型较大的种类。雄蝶通体蓝黑色，后翅带有金属蓝光泽；雌蝶多型，色彩变化丰富。",
    distribution: "中国南方、日本、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "日本", "印度", "泰国", "越南", "马来西亚", "印度尼西亚", "菲律宾"] },
    ],
    wingspan: "10 – 14 厘米",
    habitat: "低海拔山区、柑橘园、庭园",
    climate: ["亚热带", "热带"],
    rarity: "较常见",
    features: ["体型硕大", "雄蝶有蓝黑金属光泽", "雌蝶多型现象显著", "飞行有力"],
    popularity: 80,
    flight: createFlightData(
      "波浪起伏",
      ["上午活跃", "下午活跃"],
      "林缘地带",
      2,
      25,
      "5-15米",
      "飞行姿态强劲有力，翅膀扇动深沉而有节奏，飞行路线呈波浪状起伏，硕大的翅膀在阳光下闪烁着神秘的蓝黑色金属光泽。",
      "白天活动，上午和下午最为活跃，常在山区和柑橘园间穿梭飞行。",
      "通常在5-15米高度飞行，有时会飞得很高在树冠上方滑翔。",
      80,
      70,
      "约6-8次/秒",
      "单次飞行可达数百米，善于利用气流进行长距离滑翔",
      "春季至秋季可见，夏季数量最多",
      ["雄蝶有领地行为，常在山顶巡逻", "雌蝶飞行缓慢，搜寻寄主植物产卵", "飞行时翅膀闪烁蓝黑色金属光泽", "善于在高空滑翔，姿态威武"]
    ),
  },
  {
    id: "18",
    name: "文蛱蝶",
    latinName: "Vindula erota",
    family: "蛱蝶科",
    genus: "文蛱蝶属",
    category: "蛱蝶",
    image: img("A cruiser butterfly with orange and black patterned wings, in tropical garden, warm sunlight, vivid colors"),
    description: "文蛱蝶又称巡航蛱蝶，翅膀橙黄色，布满深色豹纹状斑点，雄蝶后翅还有一条优雅的长尾突，飞行如巡航般悠然。",
    distribution: "中国华南、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "印度", "泰国", "越南", "马来西亚", "印度尼西亚"] },
    ],
    wingspan: "7 – 9 厘米",
    habitat: "热带森林边缘、河边、花园",
    climate: ["热带", "亚热带"],
    rarity: "较常见",
    features: ["橙黄色豹纹翅膀", "雄蝶有长尾突", "飞行姿态优雅", "常在河边活动"],
    popularity: 73,
    flight: createFlightData(
      "优雅盘旋",
      ["上午活跃", "下午活跃"],
      "溪流沿岸",
      1,
      12,
      "2-6米",
      "飞行姿态悠然优雅，翅膀扇动缓慢而富有节奏，常在河边和林缘缓缓巡航，雄蝶的长尾突随风飘动，姿态优美。",
      "白天活动，上午和下午最为活跃，常在河边和森林边缘飞行。",
      "通常在2-6米高度飞行，有时会沿着河流来回巡航。",
      55,
      70,
      "约5-8次/秒",
      "单次飞行可持续较长时间，常沿固定路线巡航",
      "春季至秋季可见，夏季数量最多",
      ["雄蝶有领地行为，常在河边巡逻", "飞行时后翅长尾突优雅飘动", "常在河边吸水获取矿物质", "善于在飞行中精准定位花朵"]
    ),
  },
  {
    id: "19",
    name: "豆粉蝶",
    latinName: "Colias hyale",
    family: "粉蝶科",
    genus: "豆粉蝶属",
    category: "粉蝶",
    image: img("A pale clouded yellow butterfly with soft yellow-green wings on clover, meadow, gentle light, delicate nature"),
    description: "豆粉蝶是一类中小型粉蝶，翅膀呈柔和的柠檬黄或淡绿色，是田野和草甸中常见的蝴蝶。其幼虫以豆科植物为食。",
    distribution: "欧洲、亚洲温带地区",
    distributionRegions: [
      { continent: "欧洲", countries: ["法国", "德国", "波兰", "瑞典", "俄罗斯"] },
      { continent: "亚洲", countries: ["中国", "蒙古", "哈萨克斯坦"] },
    ],
    wingspan: "4.5 – 5.5 厘米",
    habitat: "草甸、田野、山坡、荒地",
    climate: ["温带", "寒带"],
    rarity: "常见",
    features: ["翅膀淡黄绿色", "雄蝶颜色较鲜明", "喜访豆科花卉", "飞行敏捷"],
    popularity: 65,
    flight: createFlightData(
      "敏捷跳跃",
      ["上午活跃", "下午活跃"],
      "开阔草地",
      0.3,
      6,
      "0.5-2米",
      "飞行姿态敏捷快速，翅膀扇动频率高，飞行路线呈跳跃式，善于在草甸和田野间快速穿梭，是温带地区最敏捷的粉蝶之一。",
      "白天活动，上午和下午最为活跃，阴天也能见到其飞行。",
      "贴近地面飞行，高度通常在0.5-2米，便于在豆科植物间寻找产卵地点。",
      65,
      90,
      "约12-18次/秒",
      "单次飞行多为短距离跳跃，频繁起降",
      "春季至秋季多代繁殖，夏季数量最多",
      ["飞行路线跳跃式，善于快速改变方向", "雄蝶会快速追逐雌蝶求偶", "善于在豆科花丛间快速穿梭", "受惊时会快速起飞躲避"]
    ),
  },
  {
    id: "20",
    name: "燕凤蝶",
    latinName: "Lamproptera curius",
    family: "凤蝶科",
    genus: "燕凤蝶属",
    category: "凤蝶",
    image: img("A white dragontail butterfly with long tail-like extensions on wings, hovering over a tropical flower, magical, Asia"),
    description: "燕凤蝶是凤蝶中最具特色的种类之一，后翅有两条极长的尾突，如同燕子的剪刀尾，飞舞时长尾飘飘，宛如仙子。",
    distribution: "中国华南、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "印度", "泰国", "越南", "马来西亚", "印度尼西亚"] },
    ],
    wingspan: "4.5 – 6 厘米（不含尾突）",
    habitat: "低海拔森林边缘、溪流旁",
    climate: ["热带", "亚热带"],
    rarity: "稀有",
    features: ["有极长的尾突", "翅膀透明如纱", "飞行如燕子般灵动", "喜在水边吸水"],
    popularity: 89,
    flight: createFlightData(
      "快速穿梭",
      ["上午活跃", "下午活跃"],
      "溪流沿岸",
      0.5,
      8,
      "1-4米",
      "飞行姿态灵动飘逸，翅膀快速扇动，飞行路线变幻莫测，后翅两条极长的尾突随风飘动，如同燕子般轻盈灵动，是凤蝶中最具飞行特色的种类。",
      "白天活动，上午和下午最为活跃，常在溪流沿岸快速穿梭飞行。",
      "通常在1-4米高度飞行，常在溪流沿岸快速穿梭，有时会停栖在湿润的泥土上吸水。",
      85,
      92,
      "约15-20次/秒",
      "单次飞行多为中短途，常在溪流沿岸来回穿梭",
      "春季至秋季可见，夏季数量最多",
      ["飞行时尾突飘逸摆动，如燕子般灵动", "常在溪流沿岸快速穿梭吸水", "善于在空中悬停吸食花蜜", "雄蝶会在溪流边建立领地，等待雌蝶"]
    ),
  },
  {
    id: "21",
    name: "枯叶蛱蝶",
    latinName: "Kallima inachus",
    family: "蛱蝶科",
    genus: "枯叶蛱蝶属",
    category: "蛱蝶",
    image: img("A dead leaf butterfly perfectly camouflaged as a dried leaf on a branch, showing incredible mimicry, forest setting"),
    description: "枯叶蛱蝶是自然界拟态的绝佳典范。当它双翅合拢栖息时，无论形状、颜色还是叶脉纹理，都与一片干枯的树叶无异，令人叹为观止。",
    distribution: "中国南部、日本、印度、东南亚",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "日本", "印度", "泰国", "越南", "马来西亚", "印度尼西亚"] },
    ],
    wingspan: "8 – 11 厘米",
    habitat: "常绿阔叶林、雨林",
    climate: ["亚热带", "热带"],
    rarity: "稀有",
    features: ["翅膀反面完美拟态枯叶", "正面色彩艳丽蓝紫", "是拟态的经典案例", "飞行迅速"],
    popularity: 93,
    flight: createFlightData(
      "飘忽不定",
      ["上午活跃", "下午活跃"],
      "林冠层",
      2,
      25,
      "5-15米",
      "飞行姿态飘忽不定，翅膀快速扇动，飞行路线变化多端，一旦停歇便立刻合拢翅膀拟态枯叶，让天敌难以追踪。飞行时翅膀正面会闪现出艳丽的蓝紫色光泽。",
      "白天活动，上午和下午最为活跃，常在森林中上层穿梭飞行。",
      "通常在5-15米高度飞行，善于利用森林中的光影来隐藏自己。",
      75,
      85,
      "约12-18次/秒",
      "单次飞行多为中短途，频繁停歇拟态躲避天敌",
      "春季至秋季可见，夏季数量最多",
      ["飞行时会突然改变方向，难以捕捉", "停歇时立刻合拢翅膀拟态枯叶", "善于利用森林光影隐藏自己", "飞行时翅膀正面闪现蓝紫色光泽"]
    ),
  },
];

export function getPopularButterflies(limit: number = 8): Butterfly[] {
  return [...butterflies]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getRandomButterflies(limit: number = 6): Butterfly[] {
  const shuffled = [...butterflies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

export function getButterflyById(id: string): Butterfly | undefined {
  return butterflies.find((b) => b.id === id);
}

export function searchButterflies(keyword: string): Butterfly[] {
  if (!keyword.trim()) return butterflies;
  const lower = keyword.trim().toLowerCase();
  return butterflies.filter((b) =>
    b.name.toLowerCase().includes(lower) ||
    b.latinName.toLowerCase().includes(lower) ||
    b.category.toLowerCase().includes(lower) ||
    b.family.toLowerCase().includes(lower) ||
    b.description.toLowerCase().includes(lower) ||
    b.features.some((f) => f.toLowerCase().includes(lower))
  );
}

export const categories = [...new Set(butterflies.map((b) => b.category))];

export const trueButterflies = butterflies.filter((b) => b.category !== "蛾类");

export function getButterfliesByContinent(continent: Continent): Butterfly[] {
  return trueButterflies.filter((b) =>
    b.distributionRegions.some((r) => r.continent === continent)
  );
}

export function getButterfliesByCountry(country: string): Butterfly[] {
  const lower = country.toLowerCase();
  return trueButterflies.filter((b) =>
    b.distributionRegions.some((r) =>
      r.countries.some((c) => c.toLowerCase().includes(lower))
    )
  );
}

export function getAllCountries(): string[] {
  const countries = new Set<string>();
  trueButterflies.forEach((b) => {
    b.distributionRegions.forEach((r) => {
      r.countries.forEach((c) => countries.add(c));
    });
  });
  return Array.from(countries).sort();
}

export function getCountriesByContinent(continent: Continent): string[] {
  const countries = new Set<string>();
  trueButterflies.forEach((b) => {
    b.distributionRegions
      .filter((r) => r.continent === continent)
      .forEach((r) => {
        r.countries.forEach((c) => countries.add(c));
      });
  });
  return Array.from(countries).sort();
}

export function getButterfliesByClimate(climate: Climate): Butterfly[] {
  return trueButterflies.filter((b) => b.climate.includes(climate));
}

export function getButterfliesByRarity(rarity: RarityLevel): Butterfly[] {
  return trueButterflies.filter((b) => b.rarity === rarity);
}

function mapToSpecies(butterflyIds: string[]): TaxonGenus["species"] {
  return butterflyIds
    .map((id) => butterflies.find((b) => b.id === id))
    .filter(Boolean)
    .map((b) => ({
      id: b!.id,
      name: b!.name,
      latinName: b!.latinName,
      image: b!.image,
      rarity: b!.rarity,
      description: b!.description,
    }));
}

export const butterflyFamilyTree: TaxonFamily[] = [
  {
    name: "凤蝶科",
    latinName: "Papilionidae",
    description: "凤蝶科是蝴蝶中最引人注目的类群之一，多数种类体型较大，色彩艳丽，后翅常带有尾突。它们飞翔姿态优美，被誉为「会飞的花朵」。",
    characteristics: [
      "多数种类体型较大",
      "后翅常具燕尾状尾突",
      "色彩艳丽，多为黄、黑、蓝、绿等色",
      "幼虫多以芸香科、伞形科等植物为食",
      "部分种类具有迁飞习性",
    ],
    subfamilies: [
      {
        name: "凤蝶亚科",
        latinName: "Papilioninae",
        description: "凤蝶亚科是凤蝶科中最大的亚科，包含了绝大多数凤蝶种类。它们多为大中型蝴蝶，色彩华丽，飞翔能力强。",
        genera: [
          {
            name: "凤蝶属",
            latinName: "Papilio",
            description: "凤蝶属是凤蝶亚科中种类最多的属，包含了许多著名的蝴蝶种类。它们的翅膀多具有鲜艳的黄黑或蓝黑色花纹，后翅尾发达。",
            species: mapToSpecies(["3", "6", "10", "12", "15", "17"]),
          },
          {
            name: "喙凤蝶属",
            latinName: "Teinopalpus",
            description: "喙凤蝶属是极为珍贵的蝶类，被誉为「蝶中皇后」。它们翅膀具有华丽的金属光泽，数量稀少，属于保护物种。",
            species: mapToSpecies(["7"]),
          },
          {
            name: "珠凤蝶属",
            latinName: "Pachliopta",
            description: "珠凤蝶属的蝴蝶身体含有从马兜铃植物中积累的毒素，具有警戒色，常被其他蝴蝶拟态。",
            species: mapToSpecies(["13"]),
          },
          {
            name: "燕凤蝶属",
            latinName: "Lamproptera",
            description: "燕凤蝶属是凤蝶科中最具特色的类群之一，后翅具有两条极长的尾突，飞翔时如燕子般灵动。",
            species: mapToSpecies(["20"]),
          },
        ],
      },
    ],
  },
  {
    name: "粉蝶科",
    latinName: "Pieridae",
    description: "粉蝶科是蝶类中数量最多的类群之一，多为中小型蝴蝶，翅膀多为白色或黄色，带有黑色斑点。它们飞行姿态轻盈，是田野和花园中最常见的蝴蝶。",
    characteristics: [
      "多为中小型蝴蝶",
      "翅膀多为白色、黄色或橙色",
      "飞行姿态轻盈敏捷",
      "幼虫多以十字花科、豆科植物为食",
      "部分种类具有群集迁飞习性",
    ],
    subfamilies: [
      {
        name: "粉蝶亚科",
        latinName: "Pierinae",
        description: "粉蝶亚科包含了绝大多数粉蝶种类，翅膀多为白色，带有黑色斑纹，是最常见的蝴蝶类群之一。",
        genera: [
          {
            name: "粉蝶属",
            latinName: "Pieris",
            description: "粉蝶属是粉蝶亚科的代表属，其中菜粉蝶是世界上分布最广的蝴蝶之一，几乎遍及全球温带地区。",
            species: mapToSpecies(["5"]),
          },
          {
            name: "豆粉蝶属",
            latinName: "Colias",
            description: "豆粉蝶属的蝴蝶翅膀多呈柔和的黄色或淡绿色，喜欢在草甸和田野中活动，幼虫以豆科植物为食。",
            species: mapToSpecies(["19"]),
          },
        ],
      },
    ],
  },
  {
    name: "蛱蝶科",
    latinName: "Nymphalidae",
    description: "蛱蝶科是蝴蝶中种类最多的一科，形态多样，色彩丰富。它们的前足退化，仅用四足行走，因此也被称为「四足蝶」。许多种类具有拟态或保护色。",
    characteristics: [
      "种类繁多，形态各异",
      "前足退化，仅用四足行走",
      "色彩丰富，多具艳丽斑纹",
      "许多种类具有拟态或保护色",
      "飞翔能力强，部分种类能长距离迁徙",
    ],
    subfamilies: [
      {
        name: "斑蝶亚科",
        latinName: "Danainae",
        description: "斑蝶亚科的蝴蝶体内含有从幼虫时期积累的毒素，具有警戒色，能有效抵御天敌。其中帝王蝶以长距离迁徙闻名于世。",
        genera: [
          {
            name: "斑蝶属",
            latinName: "Danaus",
            description: "斑蝶属的代表是帝王蝶和虎斑蝶，它们都具有毒素，是迁徙型蝴蝶的典型代表。",
            species: mapToSpecies(["1", "4"]),
          },
        ],
      },
      {
        name: "闪蝶亚科",
        latinName: "Morphinae",
        description: "闪蝶亚科以其令人惊叹的金属光泽翅膀而闻名，这种光泽并非来自色素，而是翅膀微观结构对光线的折射作用，称为「结构色」。",
        genera: [
          {
            name: "闪蝶属",
            latinName: "Morpho",
            description: "闪蝶属是闪蝶亚科的代表，它们的翅膀呈现梦幻般的金属蓝或银白色光泽，是热带雨林中的璀璨宝石。",
            species: mapToSpecies(["2", "9"]),
          },
        ],
      },
      {
        name: "蛱蝶亚科",
        latinName: "Nymphalinae",
        description: "蛱蝶亚科是蛱蝶科中最大的亚科，种类繁多，形态各异。许多种类具有眼斑或其他警戒图案。",
        genera: [
          {
            name: "蛱蝶属",
            latinName: "Aglais",
            description: "蛱蝶属的代表是孔雀蛱蝶，翅膀上有四个酷似孔雀尾羽的大眼斑，用于震慑天敌。",
            species: mapToSpecies(["8"]),
          },
          {
            name: "枯叶蛱蝶属",
            latinName: "Kallima",
            description: "枯叶蛱蝶是自然界拟态的绝佳典范，双翅合拢时与干枯的树叶几乎一模一样。",
            species: mapToSpecies(["21"]),
          },
          {
            name: "珍蝶属",
            latinName: "Acraea",
            description: "珍蝶属的蝴蝶翅膀多呈半透明状，翅脉清晰如网，飞行时轻盈飘逸。",
            species: mapToSpecies(["16"]),
          },
          {
            name: "文蛱蝶属",
            latinName: "Vindula",
            description: "文蛱蝶属的雄蝶后翅具有优雅的长尾突，飞行姿态如巡航般悠然。",
            species: mapToSpecies(["18"]),
          },
        ],
      },
    ],
  },
  {
    name: "灰蝶科",
    latinName: "Lycaenidae",
    description: "灰蝶科是蝴蝶中体型最小的类群，被称为「大自然的小精灵」。雄蝶翅膀正面常呈现出金属般的蓝紫色光泽，十分艳丽。",
    characteristics: [
      "体型小巧，多为小型蝴蝶",
      "雄蝶翅膀常具金属蓝紫色光泽",
      "飞行快速敏捷",
      "部分种类与蚂蚁形成共生关系",
      "喜停栖于日光充足之处",
    ],
    subfamilies: [
      {
        name: "灰蝶亚科",
        latinName: "Lycaeninae",
        description: "灰蝶亚科包含了绝大多数灰蝶种类，翅膀色彩丰富，多具有金属光泽。",
        genera: [
          {
            name: "灰蝶属",
            latinName: "Lycaena",
            description: "灰蝶属的蝴蝶体型小巧玲珑，翅膀呈橙棕色或金属蓝紫色，在阳光下熠熠生辉。",
            species: mapToSpecies(["11"]),
          },
        ],
      },
    ],
  },
  {
    name: "环蝶科",
    latinName: "Amathusiidae",
    description: "环蝶科多为大中型蝴蝶，翅膀多呈黄褐色或灰褐色，翅缘常具有环状或箭头状的斑纹。它们多栖息于竹林或森林中。",
    characteristics: [
      "多为大中型蝴蝶",
      "翅膀多呈黄褐色或灰褐色",
      "翅缘常具环状或箭头状斑纹",
      "多栖息于竹林或森林环境",
      "飞翔缓慢优雅",
    ],
    subfamilies: [
      {
        name: "环蝶亚科",
        latinName: "Amathusiinae",
        description: "环蝶亚科的蝴蝶体型较大，翅膀宽阔，多栖息于森林深处。",
        genera: [
          {
            name: "箭环蝶属",
            latinName: "Stichophthalma",
            description: "箭环蝶属的代表是箭环蝶，是环蝶科中体型最大的种类之一，翅膀外缘有一排箭头状的斑纹。",
            species: mapToSpecies(["14"]),
          },
        ],
      },
    ],
  },
];

export function getAllFamilyNames(): string[] {
  return butterflyFamilyTree.map((f) => f.name);
}

export function getFamilyByName(name: string): TaxonFamily | undefined {
  return butterflyFamilyTree.find(
    (f) => f.name === name || f.latinName.toLowerCase() === name.toLowerCase()
  );
}

export function getButterfliesByFamily(familyName: string): Butterfly[] {
  return trueButterflies.filter((b) => b.family === familyName);
}

export function getButterfliesByGenus(genusName: string): Butterfly[] {
  return trueButterflies.filter((b) => b.genus === genusName);
}
