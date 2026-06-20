import type { Butterfly, Continent, Climate, RarityLevel } from "@/types";

const img = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`;

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
  },
  {
    id: "22",
    name: "绿尾大蚕蛾",
    latinName: "Actias ningpoana",
    family: "大蚕蛾科",
    genus: "尾蚕蛾属",
    category: "蛾类",
    image: img("A Chinese moon moth with elegant pale green wings and long feathery tails, on a pine branch, ethereal, night butterfly"),
    description: "绿尾大蚕蛾虽属蛾类，但其美丽程度丝毫不逊于任何蝴蝶。翅膀呈淡雅的苹果绿色，后翅拖着飘逸的长尾巴，被誉为「凤凰蛾」。",
    distribution: "中国、俄罗斯远东、朝鲜半岛、日本",
    distributionRegions: [
      { continent: "亚洲", countries: ["中国", "俄罗斯", "韩国", "朝鲜", "日本"] },
    ],
    wingspan: "12 – 15 厘米",
    habitat: "温带针阔混交林、公园",
    climate: ["温带"],
    rarity: "较常见",
    features: ["翅膀苹果绿色", "后翅长尾飘逸", "具趋光性", "体型硕大"],
    popularity: 85,
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

