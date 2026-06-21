import type { MonthData, MigrationInfo, RegionalSeasonInfo, ObservationGuide, SeasonalPattern, MonthNumber, Season, MonthlyButterfly } from "@/types";

export const months: MonthNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const monthNames: Record<MonthNumber, string> = {
  1: "一月",
  2: "二月",
  3: "三月",
  4: "四月",
  5: "五月",
  6: "六月",
  7: "七月",
  8: "八月",
  9: "九月",
  10: "十月",
  11: "十一月",
  12: "十二月",
};

export const seasonColors: Record<Season, { bg: string; text: string; light: string; accent: string }> = {
  "春": { bg: "from-pink-100 via-green-50 to-emerald-100", text: "text-emerald-700", light: "bg-emerald-50", accent: "#10B981" },
  "夏": { bg: "from-amber-100 via-yellow-50 to-orange-100", text: "text-amber-700", light: "bg-amber-50", accent: "#F59E0B" },
  "秋": { bg: "from-orange-100 via-rose-50 to-red-100", text: "text-orange-700", light: "bg-orange-50", accent: "#F97316" },
  "冬": { bg: "from-sky-100 via-blue-50 to-indigo-100", text: "text-sky-700", light: "bg-sky-50", accent: "#0EA5E9" },
};

export const monthlyCalendar: MonthData[] = [
  {
    month: 1,
    monthName: "一月",
    season: "冬",
    theme: "冬日寻蝶 · 越冬之美",
    description: "寒冬时节，多数蝴蝶以卵或蛹的形态静静等待春天的到来。在温暖的南方地区，仍有少数坚强的蝴蝶在冬日暖阳中翩翩起舞。",
    colorTheme: "winter",
    commonButterflies: [
      { butterflyId: "8", highlight: "以成虫越冬，早春最早出现", abundance: "较少", lifeStage: "成虫期", observationNote: "在阳光充足的林间空地可能见到" },
      { butterflyId: "4", highlight: "温暖地区全年可见", abundance: "常见", lifeStage: "全年可见", observationNote: "南方冬季仍较活跃" },
    ],
    rareButterflies: [
      { butterflyId: "7", highlight: "越冬蛹期，极难观察到成虫", abundance: "稀有", lifeStage: "蛹期", observationNote: "需在高海拔山地寻找" },
    ],
    tips: [
      { title: "寻找越冬蛹", description: "留意树枝、树皮缝隙和落叶层中的蝶蛹", icon: "leaf" },
      { title: "南方观蝶", description: "前往华南、东南亚等地仍有机会看到多种蝴蝶", icon: "sun" },
      { title: "准备装备", description: "利用冬季时间整理观察笔记和摄影器材", icon: "book" },
    ],
    bestRegions: ["华南地区", "东南亚", "澳大利亚", "中美洲"],
    averageTemperature: "-5°C ~ 10°C（北半球）",
    daylightHours: "约 9-10 小时",
  },
  {
    month: 2,
    monthName: "二月",
    season: "冬",
    theme: "早春初醒 · 梅香蝶影",
    description: "立春之后，天气渐暖，越冬的蝴蝶开始苏醒。南方的梅花、山茶花盛开，吸引着早春第一批蝴蝶的造访。",
    colorTheme: "winter",
    commonButterflies: [
      { butterflyId: "8", highlight: "早春最先出现的蝴蝶之一", abundance: "较多", lifeStage: "成虫期", observationNote: "天气晴暖时开始活动" },
      { butterflyId: "4", highlight: "温暖地区数量逐渐增多", abundance: "常见", lifeStage: "成虫期", observationNote: "吸食早春花蜜" },
    ],
    rareButterflies: [
      { butterflyId: "7", highlight: "部分早发个体开始羽化", abundance: "稀有", lifeStage: "蛹期", observationNote: "高海拔山地仍以蛹为主" },
    ],
    tips: [
      { title: "观察羽化", description: "在温暖的午后留意蛹的羽化过程", icon: "eye" },
      { title: "梅园寻蝶", description: "梅花盛开时是观察早春蝴蝶的好时机", icon: "flower" },
      { title: "记录首现", description: "记录当年第一次见到的蝴蝶种类", icon: "pencil" },
    ],
    bestRegions: ["长江以南", "日本南部", "印度北部", "地中海沿岸"],
    averageTemperature: "0°C ~ 15°C（北半球）",
    daylightHours: "约 10-11 小时",
  },
  {
    month: 3,
    monthName: "三月",
    season: "春",
    theme: "春花烂漫 · 蝶舞初启",
    description: "春分时节，百花齐放，蝴蝶世界也迎来了新的一年。越冬的成虫活跃起来，第一代幼虫开始孵化，整个蝶界充满生机。",
    colorTheme: "spring",
    commonButterflies: [
      { butterflyId: "5", highlight: "春季第一代成虫开始出现", abundance: "较多", lifeStage: "成虫期", observationNote: "菜园、田野间常见" },
      { butterflyId: "8", highlight: "越冬成虫最为活跃的时期", abundance: "较多", lifeStage: "成虫期", observationNote: "常在春花间飞舞" },
      { butterflyId: "11", highlight: "春季数量逐渐增多", abundance: "常见", lifeStage: "成虫期", observationNote: "草甸山坡常见" },
      { butterflyId: "4", highlight: "温暖地区全年可见", abundance: "常见", lifeStage: "成虫期", observationNote: "数量持续增加" },
    ],
    rareButterflies: [
      { butterflyId: "7", highlight: "春季羽化高峰期", abundance: "稀有", lifeStage: "成虫期", observationNote: "高海拔山地阔叶林缘" },
      { butterflyId: "21", highlight: "春季开始活动", abundance: "稀有", lifeStage: "成虫期", observationNote: "常绿阔叶林中" },
    ],
    tips: [
      { title: "追踪产卵", description: "观察雌蝶在寄主植物上产卵的过程", icon: "egg" },
      { title: "幼虫观察", description: "仔细寻找刚孵化的一龄幼虫", icon: "bug" },
      { title: "花季访花", description: "油菜花、樱花季蝴蝶活动频繁", icon: "flower" },
    ],
    bestRegions: ["长江流域", "日本", "美国南部", "南欧"],
    averageTemperature: "5°C ~ 20°C（北半球）",
    daylightHours: "约 11-12 小时",
  },
  {
    month: 4,
    monthName: "四月",
    season: "春",
    theme: "春暖蝶喧 · 百花争艳",
    description: "四月是春季观蝶的黄金时期。气温适宜，花开遍野，多种蝴蝶的第一代成虫纷纷羽化，林间花丛蝶影翩翩，美不胜收。",
    colorTheme: "spring",
    commonButterflies: [
      { butterflyId: "10", highlight: "春季成虫开始出现", abundance: "较多", lifeStage: "成虫期", observationNote: "草甸山坡间常见" },
      { butterflyId: "6", highlight: "春季第一代成虫", abundance: "较多", lifeStage: "成虫期", observationNote: "柑橘园附近易见" },
      { butterflyId: "5", highlight: "数量显著增加", abundance: "极多", lifeStage: "成虫期", observationNote: "田间地头随处可见" },
      { butterflyId: "11", highlight: "春季发生高峰期", abundance: "常见", lifeStage: "成虫期", observationNote: "草地中数量众多" },
      { butterflyId: "8", highlight: "越冬成虫接近尾声", abundance: "常见", lifeStage: "成虫期", observationNote: "数量逐渐减少" },
    ],
    rareButterflies: [
      { butterflyId: "7", highlight: "成虫观察最佳时期", abundance: "稀有", lifeStage: "成虫期", observationNote: "高海拔山地常绿阔叶林" },
      { butterflyId: "2", highlight: "热带雨林全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "南美洲雨林" },
    ],
    tips: [
      { title: "选择晴天", description: "晴朗温暖的天气蝴蝶最为活跃", icon: "sun" },
      { title: "蜜源植物", description: "在花丛密集处容易观察到多种蝴蝶", icon: "flower" },
      { title: "缓慢移动", description: "观察时动作要轻缓，避免惊扰蝴蝶", icon: "eye" },
    ],
    bestRegions: ["中国中南部", "日本", "欧洲南部", "美国大部分地区"],
    averageTemperature: "10°C ~ 25°C（北半球）",
    daylightHours: "约 12-13 小时",
  },
  {
    month: 5,
    monthName: "五月",
    season: "春",
    theme: "蝶舞飞扬 · 生机盎然",
    description: "暮春时节，蝴蝶种类和数量都达到春季的顶峰。凤蝶、粉蝶、蛱蝶纷纷登场，在万花丛中翩翩起舞，是春季观蝶的最佳时机。",
    colorTheme: "spring",
    commonButterflies: [
      { butterflyId: "6", highlight: "春季数量高峰期", abundance: "极多", lifeStage: "成虫期", observationNote: "柑橘园和林缘常见" },
      { butterflyId: "12", highlight: "春季成虫大量出现", abundance: "较多", lifeStage: "成虫期", observationNote: "林缘和庭园常见" },
      { butterflyId: "5", highlight: "多代繁殖，数量众多", abundance: "极多", lifeStage: "成虫期", observationNote: "随处可见" },
      { butterflyId: "10", highlight: "春季发生盛期", abundance: "较多", lifeStage: "成虫期", observationNote: "草甸山坡常见" },
      { butterflyId: "4", highlight: "数量持续增加", abundance: "常见", lifeStage: "成虫期", observationNote: "草地林间均可见" },
    ],
    rareButterflies: [
      { butterflyId: "15", highlight: "春季成虫期", abundance: "稀有", lifeStage: "成虫期", observationNote: "热带亚热带森林" },
      { butterflyId: "20", highlight: "春季开始出现", abundance: "稀有", lifeStage: "成虫期", observationNote: "溪流旁低海拔森林" },
      { butterflyId: "7", highlight: "成虫期末尾", abundance: "稀有", lifeStage: "成虫期", observationNote: "高海拔山地" },
    ],
    tips: [
      { title: "凤蝶观察", description: "五月是观察多种凤蝶的好时节", icon: "butterfly" },
      { title: "幼虫摄影", description: "寻找各种蝴蝶的幼虫进行拍摄", icon: "camera" },
      { title: "记录种类", description: "开始建立个人的蝴蝶观察清单", icon: "book" },
    ],
    bestRegions: ["中国大部", "日本", "欧洲", "北美大部分地区"],
    averageTemperature: "15°C ~ 28°C（北半球）",
    daylightHours: "约 13-14 小时",
  },
  {
    month: 6,
    monthName: "六月",
    season: "夏",
    theme: "盛夏蝶盛 · 缤纷绚烂",
    description: "夏至到来，蝴蝶世界进入繁盛期。夏季第一代成虫纷纷羽化，种类繁多、色彩斑斓，林间草地处处可见蝶影翩跹。",
    colorTheme: "summer",
    commonButterflies: [
      { butterflyId: "3", highlight: "夏季数量高峰期", abundance: "较多", lifeStage: "成虫期", observationNote: "柑橘园和森林边缘" },
      { butterflyId: "6", highlight: "第二代成虫出现", abundance: "极多", lifeStage: "成虫期", observationNote: "城市公园也能见到" },
      { butterflyId: "13", highlight: "夏季成虫数量最多", abundance: "较多", lifeStage: "成虫期", observationNote: "林缘和花园常见" },
      { butterflyId: "5", highlight: "持续多代繁殖", abundance: "极多", lifeStage: "成虫期", observationNote: "蔬菜地附近极多" },
      { butterflyId: "14", highlight: "夏季成虫期", abundance: "常见", lifeStage: "成虫期", observationNote: "竹林中活动" },
    ],
    rareButterflies: [
      { butterflyId: "2", highlight: "雨林中全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "亚马逊雨林" },
      { butterflyId: "9", highlight: "银白闪蝶夏季活跃", abundance: "稀有", lifeStage: "成虫期", observationNote: "南美热带雨林深处" },
      { butterflyId: "21", highlight: "夏季成虫活跃", abundance: "稀有", lifeStage: "成虫期", observationNote: "常绿阔叶林冠层" },
    ],
    tips: [
      { title: "避开正午", description: "正午阳光强烈，蝴蝶多在树荫下休息", icon: "sun" },
      { title: "溪边吸水", description: "溪流边常能见到成群蝴蝶吸水", icon: "droplet" },
      { title: "防暑降温", description: "夏季观蝶注意防晒补水", icon: "thermometer" },
    ],
    bestRegions: ["中国大部", "日本", "东南亚", "美国", "欧洲大部"],
    averageTemperature: "20°C ~ 35°C（北半球）",
    daylightHours: "约 14-15 小时",
  },
  {
    month: 7,
    monthName: "七月",
    season: "夏",
    theme: "繁花蝶影 · 盛夏华彩",
    description: "七月盛夏，是一年中蝴蝶种类最丰富的月份之一。热带的闪蝶、温带的凤蝶、高山的珍蝶，都在这个季节展现最美的姿态。",
    colorTheme: "summer",
    commonButterflies: [
      { butterflyId: "17", highlight: "夏季数量最多时期", abundance: "较多", lifeStage: "成虫期", observationNote: "低海拔山区常见" },
      { butterflyId: "12", highlight: "多代繁殖持续活跃", abundance: "常见", lifeStage: "成虫期", observationNote: "林缘庭园均可见" },
      { butterflyId: "16", highlight: "夏季成虫盛期", abundance: "较多", lifeStage: "成虫期", observationNote: "山坡草地常见" },
      { butterflyId: "19", highlight: "夏季发生高峰期", abundance: "常见", lifeStage: "成虫期", observationNote: "草甸田野数量众多" },
      { butterflyId: "18", highlight: "夏季成虫活跃", abundance: "常见", lifeStage: "成虫期", observationNote: "河边林缘常见" },
    ],
    rareButterflies: [
      { butterflyId: "2", highlight: "蓝闪蝶全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "中美洲和南美洲" },
      { butterflyId: "15", highlight: "巴黎翠凤蝶夏季常见", abundance: "稀有", lifeStage: "成虫期", observationNote: "热带亚热带森林" },
      { butterflyId: "20", highlight: "燕凤蝶夏季活跃", abundance: "稀有", lifeStage: "成虫期", observationNote: "溪流旁低海拔森林" },
    ],
    tips: [
      { title: "山地观蝶", description: "夏季山区气候凉爽，蝴蝶种类丰富", icon: "mountain" },
      { title: "夜间观察", description: "可尝试夜间观察蛾类和趋光蝴蝶", icon: "moon" },
      { title: "雨后寻蝶", description: "雨后初晴蝴蝶常出来晒太阳", icon: "cloud" },
    ],
    bestRegions: ["中国西南山地", "喜马拉雅", "安第斯山脉", "非洲中部"],
    averageTemperature: "22°C ~ 36°C（北半球）",
    daylightHours: "约 14-15 小时",
  },
  {
    month: 8,
    monthName: "八月",
    season: "夏",
    theme: "蝶舞蝉鸣 · 夏末盛景",
    description: "八月是夏季的尾声，也是蝴蝶活动的高峰期。帝王蝶开始准备秋季的大迁徙，许多蝴蝶进入一年中的最后一代繁殖期。",
    colorTheme: "summer",
    commonButterflies: [
      { butterflyId: "1", highlight: "开始向南迁徙", abundance: "较多", lifeStage: "成虫期", observationNote: "北美地区可见大规模迁徙" },
      { butterflyId: "4", highlight: "全年可见，夏季数量高峰", abundance: "极多", lifeStage: "成虫期", observationNote: "草丛花间随处可见" },
      { butterflyId: "6", highlight: "夏季多代繁殖", abundance: "极多", lifeStage: "成虫期", observationNote: "柑橘园附近数量众多" },
      { butterflyId: "11", highlight: "夏季数量最多时期", abundance: "常见", lifeStage: "成虫期", observationNote: "草丛间快速穿梭" },
      { butterflyId: "8", highlight: "第二代成虫出现", abundance: "较多", lifeStage: "成虫期", observationNote: "林间花丛常见" },
    ],
    rareButterflies: [
      { butterflyId: "14", highlight: "箭环蝶成虫期", abundance: "稀有", lifeStage: "成虫期", observationNote: "竹林中活动" },
      { butterflyId: "2", highlight: "热带雨林全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "南美雨林" },
    ],
    tips: [
      { title: "迁徙观察", description: "关注帝王蝶等迁徙蝶种的动向", icon: "navigation" },
      { title: "秋花寻蝶", description: "夏末秋初的花卉仍吸引大量蝴蝶", icon: "flower" },
      { title: "幼虫采集", description: "可寻找末代幼虫进行人工饲养观察", icon: "bug" },
    ],
    bestRegions: ["北美大陆", "中国大部", "日本", "欧洲"],
    averageTemperature: "20°C ~ 34°C（北半球）",
    daylightHours: "约 13-14 小时",
  },
  {
    month: 9,
    monthName: "九月",
    season: "秋",
    theme: "金秋蝶舞 · 迁徙时节",
    description: "秋风送爽，蝴蝶世界迎来迁徙的季节。帝王蝶万里南迁，众多蝴蝶进入越冬前的准备阶段。秋花烂漫，仍是观蝶好时节。",
    colorTheme: "autumn",
    commonButterflies: [
      { butterflyId: "1", highlight: "大规模南迁中", abundance: "较多", lifeStage: "成虫期", observationNote: "北美地区壮观的迁徙队伍" },
      { butterflyId: "8", highlight: "成虫准备越冬", abundance: "较多", lifeStage: "成虫期", observationNote: "秋花上常见其吸食花蜜" },
      { butterflyId: "5", highlight: "末代成虫期", abundance: "常见", lifeStage: "成虫期", observationNote: "菜园中仍较常见" },
      { butterflyId: "4", highlight: "秋季仍活跃", abundance: "常见", lifeStage: "成虫期", observationNote: "南方地区数量仍多" },
      { butterflyId: "10", highlight: "秋季成虫仍可见", abundance: "常见", lifeStage: "成虫期", observationNote: "山坡草甸间" },
    ],
    rareButterflies: [
      { butterflyId: "7", highlight: "以蛹越冬", abundance: "稀有", lifeStage: "蛹期", observationNote: "高海拔山地" },
      { butterflyId: "21", highlight: "秋季成虫仍可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "常绿阔叶林" },
    ],
    tips: [
      { title: "迁徙追踪", description: "参与帝王蝶迁徙观察项目", icon: "map" },
      { title: "储备花蜜", description: "蝴蝶会大量吸食花蜜储备越冬能量", icon: "flower" },
      { title: "寻蛹准备", description: "开始寻找越冬蛹的位置", icon: "leaf" },
    ],
    bestRegions: ["北美迁徙路线", "中国大部", "日本", "南欧"],
    averageTemperature: "15°C ~ 28°C（北半球）",
    daylightHours: "约 12-13 小时",
  },
  {
    month: 10,
    monthName: "十月",
    season: "秋",
    theme: "秋叶蝶影 · 越冬序曲",
    description: "深秋时节，多数蝴蝶进入越冬阶段。以成虫越冬的种类寻找避风处休眠，以蛹或卵越冬的种类则静静等待来年春天。",
    colorTheme: "autumn",
    commonButterflies: [
      { butterflyId: "1", highlight: "到达越冬地开始集群", abundance: "较多", lifeStage: "成虫期", observationNote: "墨西哥冷杉林大群越冬" },
      { butterflyId: "8", highlight: "进入越冬休眠", abundance: "常见", lifeStage: "成虫期", observationNote: "在树洞、石缝中越冬" },
      { butterflyId: "4", highlight: "温暖地区仍活跃", abundance: "常见", lifeStage: "成虫期", observationNote: "南方秋季仍常见" },
    ],
    rareButterflies: [
      { butterflyId: "2", highlight: "热带雨林全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "南美洲" },
    ],
    tips: [
      { title: "越冬观察", description: "寻找蝴蝶的越冬场所", icon: "snowflake" },
      { title: "秋末摄影", description: "在秋花上拍摄最后的蝴蝶身影", icon: "camera" },
      { title: "整理记录", description: "整理全年的观察记录和照片", icon: "book" },
    ],
    bestRegions: ["墨西哥越冬地", "中国南方", "东南亚", "澳大利亚"],
    averageTemperature: "8°C ~ 20°C（北半球）",
    daylightHours: "约 11-12 小时",
  },
  {
    month: 11,
    monthName: "十一月",
    season: "秋",
    theme: "初霜蝶隐 · 静待春来",
    description: "立冬将至，北方的蝴蝶已基本消失，进入漫长的越冬期。南方温暖地区仍有少数蝴蝶在晴暖的日子里短暂活动。",
    colorTheme: "autumn",
    commonButterflies: [
      { butterflyId: "1", highlight: "在越冬地集群休眠", abundance: "较多", lifeStage: "成虫期", observationNote: "墨西哥冷杉林中" },
      { butterflyId: "4", highlight: "南方温暖地区仍可见", abundance: "常见", lifeStage: "成虫期", observationNote: "晴朗温暖的日子" },
      { butterflyId: "8", highlight: "以成虫越冬休眠", abundance: "常见", lifeStage: "成虫期", observationNote: "避风处越冬中" },
    ],
    rareButterflies: [
      { butterflyId: "2", highlight: "热带雨林全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "南美洲雨林" },
    ],
    tips: [
      { title: "越冬研究", description: "利用冬季学习蝴蝶越冬知识", icon: "book" },
      { title: "南方旅行", description: "前往温暖的南方继续观蝶", icon: "plane" },
      { title: "规划来年", description: "制定下一年的蝴蝶观察计划", icon: "calendar" },
    ],
    bestRegions: ["墨西哥", "华南地区", "东南亚", "中美洲"],
    averageTemperature: "2°C ~ 15°C（北半球）",
    daylightHours: "约 10-11 小时",
  },
  {
    month: 12,
    monthName: "十二月",
    season: "冬",
    theme: "寒冬蝶眠 · 孕育希望",
    description: "隆冬时节，蝴蝶世界进入沉寂期。在蛹壳中、在卵壳里、在避风的角落，生命都在静静等待春天的讯息，孕育着新一年的希望。",
    colorTheme: "winter",
    commonButterflies: [
      { butterflyId: "1", highlight: "在越冬地集群休眠", abundance: "较多", lifeStage: "成虫期", observationNote: "数百万只聚集越冬" },
      { butterflyId: "4", highlight: "热带地区全年活跃", abundance: "常见", lifeStage: "成虫期", observationNote: "东南亚等地" },
    ],
    rareButterflies: [
      { butterflyId: "2", highlight: "热带雨林全年可见", abundance: "稀有", lifeStage: "成虫期", observationNote: "亚马逊雨林" },
    ],
    tips: [
      { title: "越冬摄影", description: "拍摄越冬蝴蝶集群的壮观景象", icon: "camera" },
      { title: "冬日阅读", description: "阅读蝴蝶书籍增加知识储备", icon: "book" },
      { title: "器材保养", description: "清洁保养摄影和观察器材", icon: "settings" },
    ],
    bestRegions: ["墨西哥蝴蝶谷", "东南亚", "澳大利亚", "中美洲"],
    averageTemperature: "-5°C ~ 8°C（北半球）",
    daylightHours: "约 9-10 小时",
  },
];

export const regionalSeasons: RegionalSeasonInfo[] = [
  {
    region: "华北地区",
    continent: "亚洲",
    bestMonths: [4, 5, 6, 7, 8, 9],
    peakSeason: "5月-9月",
    butterflyCount: 200,
    highlights: ["菜粉蝶", "柑橘凤蝶", "金凤蝶", "灰蝶"],
    climate: "温带季风气候",
  },
  {
    region: "华东地区",
    continent: "亚洲",
    bestMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    peakSeason: "4月-10月",
    butterflyCount: 350,
    highlights: ["玉带凤蝶", "虎斑蝶", "枯叶蛱蝶", "大凤蝶"],
    climate: "亚热带季风气候",
  },
  {
    region: "华南地区",
    continent: "亚洲",
    bestMonths: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    peakSeason: "3月-11月",
    butterflyCount: 500,
    highlights: ["金斑喙凤蝶", "巴黎翠凤蝶", "燕凤蝶", "美凤蝶"],
    climate: "热带亚热带季风气候",
  },
  {
    region: "西南山地",
    continent: "亚洲",
    bestMonths: [4, 5, 6, 7, 8, 9],
    peakSeason: "5月-8月",
    butterflyCount: 600,
    highlights: ["金斑喙凤蝶", "箭环蝶", "多凤蝶种类", "多种蛱蝶"],
    climate: "亚热带高山气候",
  },
  {
    region: "日本",
    continent: "亚洲",
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    peakSeason: "5月-9月",
    butterflyCount: 250,
    highlights: ["大紫蛱蝶", "凤蝶多种", "粉蝶类", "灰蝶类"],
    climate: "温带海洋性气候",
  },
  {
    region: "东南亚",
    continent: "亚洲",
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakSeason: "全年可见，旱季更佳",
    butterflyCount: 1500,
    highlights: ["蓝闪蝶", "巴黎翠凤蝶", "燕凤蝶", "鸟翼凤蝶"],
    climate: "热带雨林气候",
  },
  {
    region: "欧洲",
    continent: "欧洲",
    bestMonths: [4, 5, 6, 7, 8, 9],
    peakSeason: "6月-8月",
    butterflyCount: 400,
    highlights: ["孔雀蛱蝶", "金凤蝶", "菜粉蝶", "多种灰蝶"],
    climate: "温带海洋性气候",
  },
  {
    region: "北美洲",
    continent: "北美洲",
    bestMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    peakSeason: "5月-9月",
    butterflyCount: 500,
    highlights: ["帝王蝶", "大凤蝶", "美洲虎纹凤蝶", "彩蝶"],
    climate: "温带大陆性气候",
  },
  {
    region: "南美洲亚马逊",
    continent: "南美洲",
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakSeason: "全年可见，雨季更盛",
    butterflyCount: 3000,
    highlights: ["蓝闪蝶", "银白闪蝶", "猫头鹰蝶", "多种凤蝶"],
    climate: "热带雨林气候",
  },
  {
    region: "非洲中部",
    continent: "非洲",
    bestMonths: [1, 2, 3, 10, 11, 12],
    peakSeason: "雨季前后",
    butterflyCount: 1000,
    highlights: ["帝王斑蝶", "凤蝶多种", "粉蝶类", "环蝶类"],
    climate: "热带草原气候",
  },
  {
    region: "澳大利亚",
    continent: "大洋洲",
    bestMonths: [9, 10, 11, 12, 1, 2, 3],
    peakSeason: "11月-2月",
    butterflyCount: 400,
    highlights: ["帝王蝶", "天堂凤蝶", "粉蝶类", "灰蝶类"],
    climate: "热带温带并存",
  },
];

export const migrationInfo: MigrationInfo[] = [
  {
    butterflyId: "1",
    butterflyName: "帝王蝶",
    fromRegion: "加拿大和美国北部",
    toRegion: "墨西哥中部",
    startMonth: 8,
    endMonth: 11,
    duration: "约2-3个月",
    distance: "4000-5000公里",
    description: "帝王蝶是世界上最著名的迁徙蝴蝶。每年秋季，数百万只帝王蝶从加拿大和美国北部飞越数千公里，前往墨西哥中部的冷杉林中越冬。越冬的帝王蝶会在来年春天苏醒，开始向北迁移，途中产卵繁殖，经过数代才能完成返程。",
  },
  {
    butterflyId: "4",
    butterflyName: "虎斑蝶",
    fromRegion: "北方地区",
    toRegion: "南方温暖地区",
    startMonth: 10,
    endMonth: 11,
    duration: "约1个月",
    distance: "1000-2000公里",
    description: "虎斑蝶具有季节性迁飞习性。秋季气温下降时，它们会向南方温暖地区移动，寻找更适宜的生存环境。与帝王蝶不同，虎斑蝶的迁徙是逐步扩散式的，没有固定的越冬地点。",
  },
  {
    butterflyId: "17",
    butterflyName: "美凤蝶",
    fromRegion: "高海拔山区",
    toRegion: "低海拔河谷",
    startMonth: 10,
    endMonth: 11,
    duration: "约2周",
    distance: "几百公里",
    description: "美凤蝶会随季节进行垂直迁移。秋季气温下降时，它们从高海拔山区向低海拔河谷地带移动，冬季在温暖的山谷中越冬。春季则向高海拔地区扩散繁殖。",
  },
];

export const seasonalPatterns: SeasonalPattern[] = [
  {
    butterflyId: "1",
    butterflyName: "帝王蝶",
    adultMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    larvaMonths: [4, 5, 6, 7, 8, 9],
    pupaMonths: [4, 5, 6, 7, 8, 9, 10],
    eggMonths: [3, 4, 5, 6, 7, 8, 9],
    generationsPerYear: 4,
    overwinteringStage: "成虫",
    region: "北美",
  },
  {
    butterflyId: "5",
    butterflyName: "菜粉蝶",
    adultMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    larvaMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    pupaMonths: [4, 5, 6, 7, 8, 9, 10, 11],
    eggMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    generationsPerYear: 5,
    overwinteringStage: "蛹",
    region: "全球温带地区",
  },
  {
    butterflyId: "6",
    butterflyName: "柑橘凤蝶",
    adultMonths: [4, 5, 6, 7, 8, 9, 10],
    larvaMonths: [4, 5, 6, 7, 8, 9, 10],
    pupaMonths: [5, 6, 7, 8, 9, 10, 11, 3, 4],
    eggMonths: [4, 5, 6, 7, 8, 9],
    generationsPerYear: 3,
    overwinteringStage: "蛹",
    region: "东亚",
  },
  {
    butterflyId: "8",
    butterflyName: "孔雀蛱蝶",
    adultMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    larvaMonths: [5, 6, 7, 8],
    pupaMonths: [6, 7, 8, 9],
    eggMonths: [5, 6, 7],
    generationsPerYear: 2,
    overwinteringStage: "成虫",
    region: "欧亚大陆",
  },
  {
    butterflyId: "7",
    butterflyName: "金斑喙凤蝶",
    adultMonths: [3, 4, 5],
    larvaMonths: [4, 5, 6, 7],
    pupaMonths: [7, 8, 9, 10, 11, 12, 1, 2, 3],
    eggMonths: [3, 4, 5],
    generationsPerYear: 1,
    overwinteringStage: "蛹",
    region: "中国南方山地",
  },
  {
    butterflyId: "2",
    butterflyName: "蓝闪蝶",
    adultMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    larvaMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    pupaMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    eggMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    generationsPerYear: 6,
    overwinteringStage: "不越冬",
    region: "南美热带雨林",
  },
];

export const observationGuides: ObservationGuide[] = [
  {
    id: "g1",
    title: "春季观蝶入门",
    subtitle: "Spring Butterfly Watching",
    category: "新手入门",
    icon: "flower",
    content: "春季是开始蝴蝶观察的最佳季节。随着气温回升，越冬的蝴蝶苏醒，第一代成虫陆续羽化。从公园常见的菜粉蝶、孔雀蛱蝶开始，逐步认识更多蝶种。",
    keyPoints: [
      "选择晴朗温暖的上午出发",
      "从身边常见的蝴蝶开始认识",
      "准备一本蝴蝶图鉴做参考",
      "用手机或相机记录观察到的蝴蝶",
      "注意观察蝴蝶的寄主植物",
    ],
    bestTime: "3月-5月",
    bestLocation: "城市公园、郊外田野",
    difficulty: "入门",
  },
  {
    id: "g2",
    title: "凤蝶观察指南",
    subtitle: "Swallowtail Guide",
    category: "季节观察",
    icon: "butterfly",
    content: "凤蝶是蝴蝶中最引人注目的类群，多数体型较大，色彩艳丽，后翅常带有尾突。春夏季是观察凤蝶的最佳时期，它们常在柑橘园、林缘地带活动。",
    keyPoints: [
      "凤蝶飞行有力，善于滑翔",
      "雄蝶有领地行为，常在固定区域巡逻",
      "幼虫多以芸香科、伞形科植物为食",
      "柑橘凤蝶是东亚最常见的凤蝶",
      "山顶常能看到凤蝶聚集求偶",
    ],
    bestTime: "4月-9月",
    bestLocation: "柑橘园、林缘地带、山顶",
    difficulty: "进阶",
  },
  {
    id: "g3",
    title: "帝王蝶迁徙追踪",
    subtitle: "Monarch Migration",
    category: "迁徙追踪",
    icon: "navigation",
    content: "帝王蝶的迁徙是自然界最壮观的奇迹之一。每年秋季，数百万只帝王蝶从北美北部飞越数千公里前往墨西哥越冬。你可以参与公民科学项目，记录观察数据。",
    keyPoints: [
      "秋季向南迁徙，春季向北返回",
      "迁徙需要数代蝴蝶接力完成",
      "利用太阳和地磁进行导航",
      "越冬时成千上万只聚集在树上",
      "可参与迁徙监控公民科学项目",
    ],
    bestTime: "8月-11月（秋季迁徙）",
    bestLocation: "北美大陆迁徙路线",
    difficulty: "专家",
  },
  {
    id: "g4",
    title: "幼虫饲养观察",
    subtitle: "Caterpillar Rearing",
    category: "生命周期",
    icon: "bug",
    content: "从野外采集健康的幼虫或卵，在人工条件下饲养，可以完整观察蝴蝶的变态过程。这是深入了解蝴蝶生活史的最佳方式，也有助于保育工作。",
    keyPoints: [
      "准备清洁的饲养容器",
      "提供新鲜的寄主植物叶片",
      "保持适宜的温度和湿度",
      "注意清理粪便和枯叶",
      "记录各阶段的变化和时间",
    ],
    bestTime: "春季-夏季",
    bestLocation: "室内/室外饲养盒",
    difficulty: "进阶",
  },
  {
    id: "g5",
    title: "热带雨林探蝶",
    subtitle: "Rainforest Butterflies",
    category: "地区指南",
    icon: "tree-palm",
    content: "热带雨林是蝴蝶多样性最丰富的生态系统。蓝闪蝶、猫头鹰蝶、鸟翼凤蝶等珍稀种类都生活在这里。雨林探蝶需要耐心和专业装备。",
    keyPoints: [
      "林冠层是很多蝴蝶的活动区",
      "溪流边常能看到蝴蝶群集吸水",
      "果实发酵的气味可吸引多种蝴蝶",
      "使用长焦镜头拍摄林冠层蝴蝶",
      "注意防虫和防暑，保护自身安全",
    ],
    bestTime: "旱季初期",
    bestLocation: "亚马逊、东南亚、刚果盆地",
    difficulty: "专家",
  },
  {
    id: "g6",
    title: "冬季寻蝶记",
    subtitle: "Winter Butterflies",
    category: "季节观察",
    icon: "snowflake",
    content: "冬季大多数蝴蝶都以卵、幼虫或蛹的形式越冬，但也有少数种类以成虫越冬。在温暖的南方和热带地区，冬季仍能看到蝴蝶飞舞。",
    keyPoints: [
      "孔雀蛱蝶等以成虫越冬",
      "晴朗温暖的午后可能见到越冬成虫",
      "冬季是寻找蝶蛹的好时机",
      "树干缝隙、落叶层是越冬场所",
      "南方和热带地区冬季仍可观蝶",
    ],
    bestTime: "12月-2月",
    bestLocation: "南方地区、热带雨林",
    difficulty: "进阶",
  },
];

export function getCurrentMonth(): MonthNumber {
  return (new Date().getMonth() + 1) as MonthNumber;
}

export function getMonthData(month: MonthNumber): MonthData | undefined {
  return monthlyCalendar.find((m) => m.month === month);
}

export function getSeasonFromMonth(month: MonthNumber): Season {
  if (month >= 3 && month <= 5) return "春";
  if (month >= 6 && month <= 8) return "夏";
  if (month >= 9 && month <= 11) return "秋";
  return "冬";
}

export function getRegionsByMonth(month: MonthNumber): RegionalSeasonInfo[] {
  return regionalSeasons.filter((r) => r.bestMonths.includes(month));
}

export function getMigrationsByMonth(month: MonthNumber): MigrationInfo[] {
  return migrationInfo.filter((m) => month >= m.startMonth && month <= m.endMonth);
}

export function getGuidesByCategory(category: ObservationGuide["category"]): ObservationGuide[] {
  return observationGuides.filter((g) => g.category === category);
}

export function getSeasonalPattern(butterflyId: string): SeasonalPattern | undefined {
  return seasonalPatterns.find((p) => p.butterflyId === butterflyId);
}

export function getButterfliesByMonth(month: MonthNumber): { common: MonthlyButterfly[]; rare: MonthlyButterfly[] } {
  const monthData = getMonthData(month);
  if (!monthData) return { common: [], rare: [] };
  return {
    common: monthData.commonButterflies,
    rare: monthData.rareButterflies,
  };
}