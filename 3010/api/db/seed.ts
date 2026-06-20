import type { Category } from '../../shared/types.js';

interface SeedMicrobe {
  name: string;
  scientificName: string;
  category: Category;
  habitat: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

const encodePrompt = (microbe: SeedMicrobe, type: string) => {
  const categoryPrompts: Record<Category, string> = {
    bacteria: `microscopic photography of ${microbe.scientificName} bacteria, 400x magnification, scientific imaging, vibrant stained sample, dark field microscopy, detailed cellular structure`,
    fungi: `microscopic view of ${microbe.scientificName} fungi, hyphae and spores, scientific micrograph, detailed cellular structure, dark background`,
    virus: `3D render of ${microbe.scientificName} virus particle, detailed capsid structure, scientific visualization, electron microscopy style`,
    archaea: `microscopic photography of ${microbe.scientificName} archaea, extreme environment microbe, scientific micrograph, detailed structure`,
  };
  return encodeURIComponent(categoryPrompts[microbe.category]);
};

export const seedData: SeedMicrobe[] = [
  {
    name: '大肠杆菌',
    scientificName: 'Escherichia coli',
    category: 'bacteria',
    habitat: '哺乳动物肠道、环境样本',
    description: '大肠杆菌是最著名的模式生物之一。这种杆状细菌通常生活在温血动物的肠道中，大多数菌株是无害的，但某些菌株会引起食物中毒。在实验室中，大肠杆菌是分子生物学和生物技术的主力军，被用于生产重组蛋白和研究基因表达。',
    imageUrl: '',
    characteristics: ['革兰氏阴性', '杆状形态', '兼性厌氧菌', '运动性（鞭毛）', '快速繁殖（20分钟一代）'],
  },
  {
    name: '乳酸菌',
    scientificName: 'Lactobacillus',
    category: 'bacteria',
    habitat: '发酵食品、人体肠道、口腔',
    description: '乳酸菌是一类能够将碳水化合物发酵为乳酸的细菌。它们在食品发酵中起着关键作用，用于制作酸奶、奶酪、泡菜等发酵食品。同时，它们也是人体益生菌的重要组成部分，有助于维持肠道健康。',
    imageUrl: '',
    characteristics: ['革兰氏阳性', '耐酸性', '发酵产乳酸', '无芽孢', '厌氧或微需氧'],
  },
  {
    name: '金黄色葡萄球菌',
    scientificName: 'Staphylococcus aureus',
    category: 'bacteria',
    habitat: '人体皮肤、鼻腔、医院环境',
    description: '金黄色葡萄球菌是一种常见的人类病原菌，因其在显微镜下呈现出葡萄串状排列而得名。它是皮肤感染、食物中毒和医院获得性感染的常见原因。耐甲氧西林金黄色葡萄球菌（MRSA）是一种重要的多重耐药菌。',
    imageUrl: '',
    characteristics: ['革兰氏阳性', '球形（葡萄串状排列）', '兼性厌氧菌', '产生毒素', '耐药性问题'],
  },
  {
    name: '幽门螺杆菌',
    scientificName: 'Helicobacter pylori',
    category: 'bacteria',
    habitat: '人体胃黏膜',
    description: '幽门螺杆菌是一种螺旋形细菌，能够在人类胃部的酸性环境中生存。它是慢性胃炎、胃溃疡和胃癌的主要致病因子。澳大利亚科学家巴里·马歇尔和罗宾·沃伦因发现这种细菌而获得2005年诺贝尔生理学或医学奖。',
    imageUrl: '',
    characteristics: ['螺旋形态', '革兰氏阴性', '微需氧', '产生脲酶中和胃酸', '鞭毛运动穿透黏液层'],
  },
  {
    name: '硝化细菌',
    scientificName: 'Nitrosomonas & Nitrobacter',
    category: 'bacteria',
    habitat: '土壤、淡水、海水',
    description: '硝化细菌是一类能够将氨转化为硝酸盐的化能自养细菌，在自然界氮循环中起着关键作用。它们将氨氧化为亚硝酸盐（亚硝化单胞菌），再进一步氧化为硝酸盐（硝化杆菌）。这个过程是污水处理和农业生态系统的重要环节。',
    imageUrl: '',
    characteristics: ['化能自养', '革兰氏阴性', '好氧', '将氨转化为硝酸盐', '在氮循环中起关键作用'],
  },
  {
    name: '酵母菌',
    scientificName: 'Saccharomyces cerevisiae',
    category: 'fungi',
    habitat: '水果表面、发酵环境',
    description: '酿酒酵母是人类历史上最重要的微生物之一，数千年来一直被用于面包发酵和酒精酿造。这种单细胞真菌也是分子生物学研究中最重要的真核模式生物之一。它的基因组于1996年被完整测序，是第一个完成基因组测序的真核生物。',
    imageUrl: '',
    characteristics: ['单细胞真菌', '出芽繁殖', '兼性厌氧', '发酵糖产生酒精和CO2', '重要的模式生物'],
  },
  {
    name: '青霉菌',
    scientificName: 'Penicillium',
    category: 'fungi',
    habitat: '土壤、腐烂的水果、潮湿环境',
    description: '青霉菌是一类常见的丝状真菌，因其产生的青霉素而闻名于世。1928年亚历山大·弗莱明在被污染的培养皿中发现了青霉菌的抗菌作用，这一发现开启了抗生素时代，拯救了数以百万计的生命。',
    imageUrl: '',
    characteristics: ['丝状真菌', '产生分生孢子', '分泌青霉素等抗生素', '无性繁殖为主', '在食品工业中用于奶酪生产'],
  },
  {
    name: '双孢蘑菇',
    scientificName: 'Agaricus bisporus',
    category: 'fungi',
    habitat: '草原、腐生在腐烂的有机物',
    description: '双孢蘑菇是世界上最常见的栽培食用蘑菇。它的生命周期包括地下菌丝体阶段和地上的子实体（我们食用的部分）。真菌在生态系统中作为分解者起着关键作用，将复杂的有机物质分解为简单的化合物。',
    imageUrl: '',
    characteristics: ['大型真菌（产生子实体）', '腐生营养', '双核菌丝体', '产生担孢子', '重要的食用真菌'],
  },
  {
    name: '冬虫夏草',
    scientificName: 'Ophiocordyceps sinensis',
    category: 'fungi',
    habitat: '青藏高原高海拔地区',
    description: '冬虫夏草是一种奇特的寄生真菌，它感染并最终杀死昆虫幼虫，从幼虫体内生长出子实体。这种真菌在传统中医药中被认为具有药用价值。它的生命周期完美地展示了真菌与昆虫之间复杂的生态相互作用。',
    imageUrl: '',
    characteristics: ['昆虫寄生真菌', '子座从寄主体内长出', '高海拔特异性', '有性和无性阶段', '传统药用真菌'],
  },
  {
    name: '黑曲霉',
    scientificName: 'Aspergillus niger',
    category: 'fungi',
    habitat: '土壤、腐烂植物、室内环境',
    description: '黑曲霉是一种广泛分布的丝状真菌，因其黑色的孢子而得名。它在工业上被广泛用于生产柠檬酸和各种酶类。这种真菌能够产生多种胞外酶，具有强大的分解能力，在生物技术和食品工业中有重要应用。',
    imageUrl: '',
    characteristics: ['丝状真菌', '产生黑色分生孢子', '好氧腐生', '分泌多种酶类', '工业生产柠檬酸'],
  },
  {
    name: '噬菌体T4',
    scientificName: 'Bacteriophage T4',
    category: 'virus',
    habitat: '环境中、感染细菌',
    description: 'T4噬菌体是感染大肠杆菌的病毒，是研究最深入的噬菌体之一。它具有标志性的蝌蚪状结构，包括一个包含DNA的头部和一个用于附着和注入DNA的尾部结构。噬菌体在基因工程中被用作载体，也是分子生物学研究的重要工具。',
    imageUrl: '',
    characteristics: ['DNA病毒', '蝌蚪状结构', '专一感染细菌', '裂解性感染周期', '分子生物学研究工具'],
  },
  {
    name: '新冠病毒',
    scientificName: 'SARS-CoV-2',
    category: 'virus',
    habitat: '人体呼吸道、人传人',
    description: '严重急性呼吸系统综合征冠状病毒2型（SARS-CoV-2）是引发COVID-19全球大流行的病原体。这种RNA病毒表面有特征性的冠状刺突蛋白，因此得名冠状病毒。它通过呼吸道飞沫传播，引起从轻微感冒症状到严重肺炎等多种临床表现。',
    imageUrl: '',
    characteristics: ['正链RNA病毒', '包膜病毒', '刺突蛋白结合ACE2受体', '人传人', '引起COVID-19'],
  },
  {
    name: '流感病毒',
    scientificName: 'Influenza virus',
    category: 'virus',
    habitat: '人体呼吸道、动物宿主',
    description: '流感病毒是引起流行性感冒的病原体，分为甲、乙、丙三型。甲型流感病毒因其血凝素（HA）和神经氨酸酶（NA）表面蛋白会不断发生抗原漂移和抗原转换，导致每年季节性流感的发生。流感病毒具有分段的RNA基因组，易于发生突变和重配。',
    imageUrl: '',
    characteristics: ['负链RNA病毒', '分节段基因组', '包膜病毒', '高突变率', '引起季节性流感'],
  },
  {
    name: '烟草花叶病毒',
    scientificName: '烟草花叶病毒',
    category: 'virus',
    habitat: '植物细胞、植物间传播',
    description: '烟草花叶病毒（TMV）是第一个被发现的病毒，也是第一个被结晶的病毒。这种杆状病毒感染烟草等植物，引起叶片斑驳症状。TMV的研究帮助建立了病毒学这门学科，并对我们对病毒本质的理解。',
    imageUrl: '',
    characteristics: ['RNA病毒', '杆状形态', '无包膜', '高度稳定', '第一个被发现的病毒'],
  },
  {
    name: '人类免疫缺陷病毒',
    scientificName: 'Human Immunodeficiency Virus',
    category: 'virus',
    habitat: '人体免疫系统细胞',
    description: '人类免疫缺陷病毒（HIV）是引起获得性免疫缺陷综合征（AIDS）的病原体。这种逆转录病毒专门感染CD4+ T淋巴细胞，逐渐破坏人体免疫系统。HIV具有逆转录酶，能将RNA基因组逆转录为DNA并整合到宿主细胞基因组中。',
    imageUrl: '',
    characteristics: ['逆转录病毒', 'RNA病毒，逆转录为DNA', '感染CD4+ T细胞', '包膜病毒，表面有gp120刺突', '引起AIDS'],
  },
  {
    name: '嗜热菌',
    scientificName: 'Thermus aquaticus',
    category: 'archaea',
    habitat: '热泉、深海热液喷口',
    description: '嗜热古菌能够在极高温度的环境中生存，如热泉和深海热液喷口。水生嗜热菌是最著名的嗜热古菌之一，它产生的Taq DNA聚合酶是聚合酶链式反应（PCR）技术的关键酶，彻底改变了分子生物学。',
    imageUrl: '',
    characteristics: ['嗜热（最适生长温度70-80°C', '细胞膜含特殊脂质', '蛋白质热稳定', '产生热稳定DNA聚合酶', '化能自养或异养'],
  },
  {
    name: '嗜盐菌',
    scientificName: 'Halobacterium',
    category: 'archaea',
    habitat: '盐湖、盐场、高盐环境',
    description: '嗜盐古菌生活在极高盐浓度的环境中，如死海和大盐湖。它们具有特殊的适应机制，包括在细胞内积累高浓度的钾离子来平衡外部的渗透压力。有些嗜盐菌含有菌视紫红质，能够利用光能产生ATP。',
    imageUrl: '',
    characteristics: ['需要高盐浓度（>2M NaCl）', '细胞内积累K+平衡渗透压', '含菌视紫红质', '耐盐酶类', '细胞膜特殊脂质组成'],
  },
  {
    name: '产甲烷菌',
    scientificName: 'Methanococcus',
    category: 'archaea',
    habitat: '厌氧环境如沼泽、动物肠道',
    description: '产甲烷古菌是唯一能够产生甲烷的微生物，它们将二氧化碳和氢气转化为甲烷，或者分解复杂有机物质产生甲烷。它们在厌氧环境中起着关键分解者，在沼气生产和温室气体排放中起重要作用。',
    imageUrl: '',
    characteristics: ['严格厌氧', '产生甲烷', '化能自养', '利用H2和CO2产生CH4', '在反刍动物瘤胃中存在'],
  },
  {
    name: '嗜酸菌',
    scientificName: 'Picrophilus torridus',
    category: 'archaea',
    habitat: '酸性热泉、火山地区',
    description: '嗜酸古菌能够在极低pH值（pH 0-2）的环境中生存，有些甚至能在pH低于0的环境中生长。它们具有特殊的细胞膜和蛋白质，能够在强酸环境中维持细胞内pH接近中性。这些微生物在生物冶金中被用于从矿石中浸出金属。',
    imageUrl: '',
    characteristics: ['嗜酸（最适pH <2', '细胞膜特殊结构', '胞内维持中性pH', '许多也是嗜热', '参与生物冶金'],
  },
  {
    name: '嗜冷菌',
    scientificName: 'Psychrophilic archaea',
    category: 'archaea',
    habitat: '极地海洋、深海、永久冻土',
    description: '嗜冷古菌生活在极寒环境中，如南极洲和深海。它们具有特殊的适应机制，包括细胞膜含有更多不饱和脂肪酸以保持流动性，以及含有抗冻蛋白和冷适应酶类。这些微生物扩展了我们对生命极限的理解。',
    imageUrl: '',
    characteristics: ['嗜冷（最适生长温度<15°C', '细胞膜含不饱和脂肪酸', '产生抗冻蛋白', '冷适应酶类', '在永久冻土和深海中生存'],
  },
];

seedData.forEach(microbe => {
  const imageSize = 'square_hd';
  microbe.imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodePrompt(microbe, microbe.category)}&image_size=${imageSize}`;
});

export function getSeedData(): SeedMicrobe[] {
  return seedData;
}
