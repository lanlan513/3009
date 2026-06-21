import type { WingPattern } from "@/types";

export const wingPatterns: WingPattern[] = [
  {
    butterflyId: "1",
    butterflyName: "帝王蝶",
    baseColor: "橙棕色",
    dominantColors: ["橙黑"],
    eyespots: [
      {
        id: "1-eyespot-1",
        position: "后翅",
        location: "外缘排列",
        shape: "圆形",
        size: "中",
        rings: ["黑色", "白色", "橙黄色"],
        centerColor: "黑色",
        description: "后翅外缘有一排清晰的圆形眼斑，黑白橙三色分明，是重要的识别特征。",
        count: 6,
      },
    ],
    stripes: [
      {
        id: "1-stripe-1",
        position: "前后翅",
        pattern: "纵条纹",
        color: "黑色",
        backgroundColor: "橙棕色",
        width: "粗线",
        count: 8,
        description: "翅膀上有粗壮的黑色纵纹，将橙棕色底色分割成多个区域，脉络清晰分明。",
      },
      {
        id: "1-stripe-2",
        position: "前后翅",
        pattern: "横条纹",
        color: "白色",
        backgroundColor: "黑色",
        width: "细线",
        count: 2,
        description: "翅膀外缘有两排白色斑点组成的横带，与黑色边框形成鲜明对比。",
      },
    ],
    gradients: [
      {
        id: "1-gradient-1",
        position: "前翅",
        direction: "由内向外",
        colors: ["深橙棕色", "亮橙色", "浅橙黄色"],
        transition: "柔和过渡",
        description: "前翅由翅基向外缘颜色逐渐变浅，呈现温暖的橙色渐变。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "波浪状",
    hasMetallicSheen: false,
    patternStyle: ["警戒色", "条纹型", "眼斑型"],
    identificationTips: [
      "橙黑相间的底色是最显著特征",
      "后翅外缘一排眼斑是重要识别点",
      "体型较大，飞行缓慢",
      "注意与虎斑蝶区分：帝王蝶翅脉更粗，眼斑更明显",
    ],
    overallDescription: "帝王蝶翅膀呈现鲜明的橙黑警戒色，粗壮的黑色翅脉将橙色底色分割成独特的图案。后翅外缘的圆形眼斑排列整齐，是其标志性特征。这种鲜艳的色彩向天敌宣告其有毒属性。",
  },
  {
    butterflyId: "2",
    butterflyName: "蓝闪蝶",
    baseColor: "金属蓝色",
    dominantColors: ["蓝黑", "多彩虹彩"],
    eyespots: [
      {
        id: "2-eyespot-1",
        position: "后翅",
        location: "外缘",
        shape: "圆形",
        size: "小",
        rings: ["黑色", "米黄色"],
        centerColor: "白色",
        description: "后翅反面外缘有一排小型眼斑，正面被金属蓝色覆盖不明显。",
        count: 5,
      },
    ],
    stripes: [],
    gradients: [
      {
        id: "2-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深钴蓝色", "亮天蓝色", "银蓝色"],
        transition: "柔和过渡",
        description: "翅膀从基部的深蓝向外缘逐渐过渡到闪亮的天蓝色，结构色产生梦幻虹彩。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "平滑",
    hasMetallicSheen: true,
    metallicDescription: "翅膀正面呈现极为耀眼的金属蓝虹彩，并非色素而是微观结构折射光线产生，不同角度呈现不同蓝调。",
    patternStyle: ["结构色", "单色型", "虹彩型"],
    identificationTips: [
      "飞行时闪烁的金属蓝色是最大特征",
      "翅膀反面为棕褐色，有保护色效果",
      "体型硕大，热带雨林中最醒目的蝴蝶之一",
      "停歇时翅膀合拢，仅露出反面的保护色",
    ],
    overallDescription: "蓝闪蝶是结构色的绝佳典范，翅膀正面的金属蓝虹彩来自鳞片的微观结构。翅膀反面则是低调的棕褐色保护色，带有小型眼斑。正反面的巨大反差体现了其完美的生存策略。",
  },
  {
    butterflyId: "3",
    butterflyName: "大凤蝶",
    baseColor: "黑褐色",
    dominantColors: ["黄黑"],
    eyespots: [
      {
        id: "3-eyespot-1",
        position: "后翅",
        location: "中部",
        shape: "不规则形",
        size: "中",
        rings: ["蓝色", "黑色"],
        centerColor: "黄色",
        description: "后翅中部有不规则的蓝黄相间斑块，形似模糊的眼斑。",
        count: 2,
      },
    ],
    stripes: [
      {
        id: "3-stripe-1",
        position: "前后翅",
        pattern: "纵条纹",
        color: "黄色",
        backgroundColor: "黑褐色",
        width: "宽带",
        count: 6,
        description: "翅膀上有数条醒目的黄色纵带，横贯黑褐色底色，对比强烈。",
      },
    ],
    gradients: [],
    tailShape: "燕尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: false,
    patternStyle: ["条纹型", "尾突型"],
    identificationTips: [
      "黄黑相间的条纹清晰醒目",
      "后翅有一对燕尾状突起",
      "体型硕大，飞行姿态优雅",
      "幼虫酷似鸟粪，成虫色彩艳丽",
    ],
    overallDescription: "大凤蝶翅膀以黑褐色为底色，有数条宽阔明亮的黄色纵带横贯其中。后翅的燕尾状尾突是其家族标志。整体配色对比强烈，在阳光下格外醒目。",
  },
  {
    butterflyId: "4",
    butterflyName: "虎斑蝶",
    baseColor: "橙棕色",
    dominantColors: ["橙黑"],
    eyespots: [
      {
        id: "4-eyespot-1",
        position: "后翅",
        location: "外缘",
        shape: "圆形",
        size: "小",
        rings: ["黑色", "白色"],
        centerColor: "橙黄色",
        description: "后翅外缘有一排小型圆形眼斑，黑白橙三色层次分明。",
        count: 5,
      },
    ],
    stripes: [
      {
        id: "4-stripe-1",
        position: "前后翅",
        pattern: "纵条纹",
        color: "黑色",
        backgroundColor: "橙棕色",
        width: "中等",
        count: 10,
        description: "翅膀上有清晰的黑色纵纹，类似虎斑，将橙棕色底色分割。",
      },
    ],
    gradients: [],
    tailShape: "无尾突",
    wingEdge: "波浪状",
    hasMetallicSheen: false,
    patternStyle: ["警戒色", "条纹型", "眼斑型"],
    identificationTips: [
      "橙黑相间的虎纹是主要特征",
      "与帝王蝶相似但体型较小，翅纹更细",
      "后翅外缘眼斑比帝王蝶小",
      "飞行缓慢，体内有毒不怕天敌",
    ],
    overallDescription: "虎斑蝶翅膀呈橙棕色，布满清晰的黑色纵纹，形如虎斑。后翅外缘有一排小型眼斑。整体色彩与帝王蝶相似，但体型略小，斑纹更细密，同样具有警戒色功能。",
  },
  {
    butterflyId: "5",
    butterflyName: "菜粉蝶",
    baseColor: "乳白色",
    dominantColors: ["乳白", "灰白"],
    eyespots: [],
    stripes: [],
    gradients: [
      {
        id: "5-gradient-1",
        position: "前翅",
        direction: "由外向内",
        colors: ["灰黑色", "乳白色"],
        transition: "柔和过渡",
        description: "前翅翅尖和外缘有灰黑色鳞粉，向翅基逐渐变淡。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "平滑",
    hasMetallicSheen: false,
    patternStyle: ["单色型", "朴素型"],
    identificationTips: [
      "乳白色翅膀是最显著特征",
      "前翅翅尖有灰黑色鳞粉",
      "雌蝶前翅有两个明显黑斑，雄蝶只有一个或无",
      "体型小巧，常见于菜园田野",
    ],
    overallDescription: "菜粉蝶翅膀呈朴素的乳白色，前翅翅尖散布灰黑色鳞粉。雌蝶前翅中央有两个明显的圆形黑斑，雄蝶则只有一个或完全没有。整体外观简洁素雅，是最常见的蝴蝶之一。",
  },
  {
    butterflyId: "6",
    butterflyName: "柑橘凤蝶",
    baseColor: "黄色",
    dominantColors: ["黄黑"],
    eyespots: [
      {
        id: "6-eyespot-1",
        position: "后翅",
        location: "臀角",
        shape: "圆形",
        size: "大",
        rings: ["红色", "蓝色", "黑色"],
        centerColor: "黄色",
        description: "后翅臀角有一个醒目的大圆斑，红、蓝、黑、黄四色层次分明，极为艳丽。",
        count: 1,
      },
    ],
    stripes: [
      {
        id: "6-stripe-1",
        position: "前后翅",
        pattern: "纵条纹",
        color: "黑色",
        backgroundColor: "黄色",
        width: "中等",
        count: 8,
        description: "黄色翅膀上有清晰的黑色纵纹，形成黄黑相间的条纹图案。",
      },
    ],
    gradients: [],
    tailShape: "燕尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: false,
    patternStyle: ["条纹型", "眼斑型", "尾突型"],
    identificationTips: [
      "黄黑条纹是基本配色",
      "后翅臀角的红色大眼斑是重要识别点",
      "后翅有蓝绿色月纹和燕尾突",
      "飞行时黄黑条纹清晰可见",
    ],
    overallDescription: "柑橘凤蝶翅膀以黄色为底色，上有清晰的黑色纵纹。后翅臀角有一个极为醒目的圆斑，由红色外环、蓝色中环、黑色内圈和黄色圆心组成，色彩斑斓。燕尾状尾突增添了优雅气质。",
  },
  {
    butterflyId: "7",
    butterflyName: "金斑喙凤蝶",
    baseColor: "翠绿色",
    dominantColors: ["翠绿", "金黄"],
    eyespots: [],
    stripes: [
      {
        id: "7-stripe-1",
        position: "前翅",
        pattern: "横条纹",
        color: "金色",
        backgroundColor: "翠绿色",
        width: "细线",
        count: 3,
        description: "前翅有三条金色横带，在翠绿底色上如金线般闪耀。",
      },
    ],
    gradients: [
      {
        id: "7-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深翠绿色", "亮翠绿色", "金绿色"],
        transition: "柔和过渡",
        description: "翅膀呈现出宝石般的翠绿色金属光泽，由内向外颜色逐渐明亮。",
      },
    ],
    tailShape: "长尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: true,
    metallicDescription: "翅膀具有强烈的翠绿金属光泽，后翅有大面积的金色斑块，在阳光下如宝石般璀璨夺目，被誉为\"蝶中皇后\"。",
    patternStyle: ["结构色", "虹彩型", "尾突型"],
    identificationTips: [
      "翠绿色金属光泽独一无二",
      "后翅有大面积金黄色斑块",
      "尾突细长如丝带",
      "极为罕见，仅出没于高海拔原始森林",
    ],
    overallDescription: "金斑喙凤蝶是蝶中极品，翅膀闪耀着华丽的翠绿色金属光泽。后翅有大面积金黄色斑块，细长的尾突如金色丝带般飘逸。整体如活宝石般璀璨，是中国最珍贵的蝴蝶。",
  },
  {
    butterflyId: "8",
    butterflyName: "孔雀蛱蝶",
    baseColor: "红棕色",
    dominantColors: ["红黑"],
    eyespots: [
      {
        id: "8-eyespot-1",
        position: "前翅",
        location: "近顶角",
        shape: "圆形",
        size: "极大",
        rings: ["黄色", "蓝色", "黑色", "红色"],
        centerColor: "深紫色",
        description: "前翅近顶角有一个巨大的眼斑，色彩层次丰富如孔雀尾羽。",
        count: 2,
      },
      {
        id: "8-eyespot-2",
        position: "后翅",
        location: "外缘",
        shape: "圆形",
        size: "大",
        rings: ["黄色", "蓝色", "黑色"],
        centerColor: "白色",
        description: "后翅外缘有两个大型眼斑，蓝黄黑三色分明。",
        count: 2,
      },
    ],
    stripes: [],
    gradients: [
      {
        id: "8-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深红褐色", "红棕色", "橙棕色"],
        transition: "柔和过渡",
        description: "翅膀由基部的深红褐向外缘逐渐过渡到明亮的红棕色。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "锯齿状",
    hasMetallicSheen: false,
    patternStyle: ["眼斑型", "警戒色"],
    identificationTips: [
      "四个巨大的眼斑是最显著特征",
      "眼斑颜色层次丰富，酷似孔雀尾羽",
      "翅膀边缘呈锯齿状",
      "受到惊扰时展开翅膀展示眼斑震慑天敌",
    ],
    overallDescription: "孔雀蛱蝶是眼斑型蝴蝶的代表，翅膀上有四个巨大而华丽的眼斑，每个眼斑由多层颜色组成：最外层黄色，中层蓝色，内层黑色，中心深紫色。当它突然展开翅膀时，眼斑如四只眼睛同时睁开，能有效震慑天敌。",
  },
  {
    butterflyId: "9",
    butterflyName: "银白闪蝶",
    baseColor: "珍珠银白色",
    dominantColors: ["银白", "多彩虹彩"],
    eyespots: [],
    stripes: [],
    gradients: [
      {
        id: "9-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["珍珠白", "银白色", "淡粉蓝色"],
        transition: "柔和过渡",
        description: "翅膀呈现珍珠般的银白色虹彩，不同角度泛着淡粉和淡蓝光泽。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "平滑",
    hasMetallicSheen: true,
    metallicDescription: "翅膀正面泛着珍珠般的银白色虹彩，在阳光下会随着角度变化闪现淡粉、淡蓝、淡黄的梦幻光泽，如月光般皎洁。",
    patternStyle: ["结构色", "虹彩型", "单色型"],
    identificationTips: [
      "珍珠般的银白色虹彩独一无二",
      "在阳光下会闪现淡粉、淡蓝的虹彩",
      "体型比蓝闪蝶略小",
      "仅出没于热带雨林深处",
    ],
    overallDescription: "银白闪蝶是闪蝶家族中最梦幻的种类，翅膀呈现珍珠般的银白色虹彩。在阳光下，不同角度会泛出淡粉、淡蓝、淡黄的微妙光泽，如同月光凝结在翅膀上，被誉为雨林精灵。",
  },
  {
    butterflyId: "10",
    butterflyName: "金凤蝶",
    baseColor: "金黄色",
    dominantColors: ["黄黑"],
    eyespots: [
      {
        id: "10-eyespot-1",
        position: "后翅",
        location: "近外缘",
        shape: "圆形",
        size: "中",
        rings: ["蓝色", "黑色", "黄色"],
        centerColor: "红色",
        description: "后翅近外缘有一排蓝色圆斑，每个蓝斑中心有一个红点。",
        count: 5,
      },
    ],
    stripes: [
      {
        id: "10-stripe-1",
        position: "前后翅",
        pattern: "纵条纹",
        color: "黑色",
        backgroundColor: "金黄色",
        width: "中等",
        count: 8,
        description: "金黄色翅膀上有清晰的黑色纵纹，形成经典的黄黑条纹图案。",
      },
    ],
    gradients: [],
    tailShape: "燕尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: false,
    patternStyle: ["条纹型", "眼斑型", "尾突型"],
    identificationTips: [
      "金黄底色配黑色纵纹是典型特征",
      "后翅有一排蓝底红点的圆斑",
      "修长的燕尾突十分飘逸",
      "欧洲最具代表性的凤蝶",
    ],
    overallDescription: "金凤蝶翅膀呈明亮的金黄色，上有清晰的黑色纵纹。后翅外缘有一排醒目的圆斑，每个圆斑以蓝色为底，中心嵌有红色小点。修长的燕尾突随风飘动，尽显高贵优雅。",
  },
  {
    butterflyId: "11",
    butterflyName: "灰蝶",
    baseColor: "橙棕色",
    dominantColors: ["橙黑"],
    eyespots: [
      {
        id: "11-eyespot-1",
        position: "后翅",
        location: "外缘反面",
        shape: "圆形",
        size: "极小",
        rings: ["白色", "黑色"],
        centerColor: "橙棕色",
        description: "后翅反面外缘有一排极小的黑色眼斑，围有白色环。",
        count: 6,
      },
    ],
    stripes: [],
    gradients: [
      {
        id: "11-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深橙棕色", "亮橙棕色", "橙黄色"],
        transition: "柔和过渡",
        description: "翅膀反面由基部向外缘颜色逐渐变浅，呈现温暖的橙棕色渐变。",
      },
    ],
    tailShape: "短尾突",
    wingEdge: "波浪状",
    hasMetallicSheen: true,
    metallicDescription: "雄蝶翅膀正面具有梦幻的金属蓝紫色光泽，在阳光下极为耀眼。雌蝶则无此光泽，呈棕橙色。",
    patternStyle: ["结构色", "虹彩型", "眼斑型"],
    identificationTips: [
      "体型极小，是灰蝶科的典型代表",
      "雄蝶正面有金属蓝紫色光泽",
      "反面呈橙棕色，外缘有微小眼斑",
      "飞行快速敏捷，常停栖于日光下取暖",
    ],
    overallDescription: "灰蝶是小型蝴蝶的代表，雄蝶翅膀正面闪烁着梦幻般的金属蓝紫色光泽。翅膀反面呈温暖的橙棕色，外缘有一排细小的黑色眼斑。体型虽小，却精致灵动。",
  },
  {
    butterflyId: "12",
    butterflyName: "玉带凤蝶",
    baseColor: "黑色",
    dominantColors: ["黄黑"],
    eyespots: [
      {
        id: "12-eyespot-1",
        position: "后翅",
        location: "外缘",
        shape: "新月形",
        size: "小",
        rings: ["红色", "蓝色"],
        centerColor: "黑色",
        description: "后翅外缘有一排新月形红蓝色小斑，雌蝶更为明显。",
        count: 5,
      },
    ],
    stripes: [
      {
        id: "12-stripe-1",
        position: "前后翅",
        pattern: "横条纹",
        color: "白色",
        backgroundColor: "黑色",
        width: "宽带",
        count: 1,
        description: "雄蝶横贯翅膀中部有一条宽阔的白色横带，如一条玉带。",
      },
    ],
    gradients: [],
    tailShape: "燕尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: false,
    patternStyle: ["条纹型", "尾突型", "拟态型"],
    identificationTips: [
      "雄蝶的白色横带如一条玉带是最显著特征",
      "雌蝶多型，有的模仿有毒的红珠凤蝶",
      "后翅有燕尾突",
      "雄蝶在林缘巡逻时有领地行为",
    ],
    overallDescription: "玉带凤蝶雄蝶翅膀呈黑色，横贯中部有一条宽阔的白色横带，如玉带缠身，故而得名。雌蝶具有多型现象，有些个体模仿有毒的红珠凤蝶以获得保护。燕尾突增添了飘逸气质。",
  },
  {
    butterflyId: "13",
    butterflyName: "红珠凤蝶",
    baseColor: "深红近黑",
    dominantColors: ["红黑"],
    eyespots: [
      {
        id: "13-eyespot-1",
        position: "后翅",
        location: "外缘",
        shape: "圆形",
        size: "中",
        rings: ["粉红色", "深红色"],
        centerColor: "白色",
        description: "后翅外缘有一排醒目的圆形红斑，如红色珍珠串联。",
        count: 7,
      },
    ],
    stripes: [],
    gradients: [
      {
        id: "13-gradient-1",
        position: "后翅",
        direction: "由内向外",
        colors: ["深黑色", "深红褐色", "暗红色"],
        transition: "柔和过渡",
        description: "后翅由翅基向外缘逐渐过渡为深红色，外缘红斑更显醒目。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "波浪状",
    hasMetallicSheen: false,
    patternStyle: ["警戒色", "眼斑型"],
    identificationTips: [
      "身体和翅膀呈深红近黑色",
      "后翅外缘一排红色圆斑如珍珠串联",
      "飞行缓慢，因有毒不怕天敌",
      "是玉带凤蝶雌蝶的拟态对象",
    ],
    overallDescription: "红珠凤蝶身体和翅膀呈深红色近黑色，后翅外缘有一排醒目的圆形红斑，如红色珍珠串联成环，极为艳丽。体内含有从马兜铃植物中积累的毒素，以警戒色宣告其不可食用。",
  },
  {
    butterflyId: "14",
    butterflyName: "箭环蝶",
    baseColor: "黄褐色",
    dominantColors: ["棕褐"],
    eyespots: [
      {
        id: "14-eyespot-1",
        position: "前后翅",
        location: "外缘",
        shape: "圆形",
        size: "大",
        rings: ["黄色", "深褐色", "黄褐色"],
        centerColor: "白色",
        description: "前后翅外缘有一排大型箭环状纹，由黄、褐、白三色组成，形似箭头。",
        count: 10,
      },
    ],
    stripes: [],
    gradients: [
      {
        id: "14-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深黄褐色", "黄褐色", "浅黄褐色"],
        transition: "柔和过渡",
        description: "翅膀由基部向外缘颜色逐渐变浅，与竹林环境完美融合。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "波浪状",
    hasMetallicSheen: false,
    patternStyle: ["眼斑型", "保护色"],
    identificationTips: [
      "体型硕大，翅膀黄褐色",
      "外缘一排箭头状环纹是重要识别点",
      "栖息于竹林中，幼虫以竹叶为食",
      "飞行缓慢而优雅",
    ],
    overallDescription: "箭环蝶是环蝶科的大型种类，翅膀呈黄褐色，与竹林环境完美融合。前后翅外缘有一排醒目的箭头状环纹，由黄、褐、白三色组成，形似箭尾，故名箭环蝶。",
  },
  {
    butterflyId: "15",
    butterflyName: "巴黎翠凤蝶",
    baseColor: "翠绿色",
    dominantColors: ["翠绿", "蓝黑"],
    eyespots: [
      {
        id: "15-eyespot-1",
        position: "后翅",
        location: "中后部",
        shape: "椭圆形",
        size: "极大",
        rings: ["翠绿色", "蓝紫色", "黑色"],
        centerColor: "深蓝色",
        description: "后翅有一个巨大的蓝紫色椭圆形眼斑，外围翠绿色晕染，极为华丽。",
        count: 2,
      },
    ],
    stripes: [
      {
        id: "15-stripe-1",
        position: "前翅",
        pattern: "纵条纹",
        color: "黑色",
        backgroundColor: "翠绿色",
        width: "细线",
        count: 6,
        description: "前翅有清晰的黑色翅脉，将翠绿色底色分割成细长条纹。",
      },
    ],
    gradients: [
      {
        id: "15-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深墨绿色", "亮翠绿色", "金绿色"],
        transition: "柔和过渡",
        description: "翅膀呈现华丽的翠绿色金属光泽，由内向外颜色逐渐明亮如宝石。",
      },
    ],
    tailShape: "燕尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: true,
    metallicDescription: "翅膀闪烁着华丽的翠绿色金属光泽，在阳光下如翡翠般璀璨，后翅的蓝紫色眼斑更添华贵气质。",
    patternStyle: ["结构色", "虹彩型", "眼斑型", "尾突型"],
    identificationTips: [
      "翠绿色金属光泽极为华丽",
      "后翅巨大的蓝紫色眼斑是标志性特征",
      "燕尾突飘逸优雅",
      "飞行时如绿色宝石在林间闪耀",
    ],
    overallDescription: "巴黎翠凤蝶虽名中有巴黎，实际分布于亚洲热带地区。翅膀闪烁着如翡翠般华丽的翠绿色金属光泽，后翅有两个巨大的蓝紫色椭圆形眼斑，外围以翠绿色晕染，整体如华贵的珠宝般璀璨夺目。",
  },
  {
    butterflyId: "16",
    butterflyName: "苎麻珍蝶",
    baseColor: "半透明橙黄色",
    dominantColors: ["金黄", "棕褐"],
    eyespots: [],
    stripes: [
      {
        id: "16-stripe-1",
        position: "前后翅",
        pattern: "网状纹",
        color: "深褐色",
        backgroundColor: "橙黄色",
        width: "细线",
        count: 30,
        description: "翅脉呈深褐色，将半透明的橙黄色翅面分割成细密的网状图案。",
      },
    ],
    gradients: [
      {
        id: "16-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["深橙黄色", "浅橙黄色", "近透明"],
        transition: "柔和过渡",
        description: "翅膀半透明，由基部向外缘透明度逐渐增加，如薄纱般轻盈。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "波浪状",
    hasMetallicSheen: false,
    patternStyle: ["网状型", "朴素型", "半透明型"],
    identificationTips: [
      "翅膀半透明，橙黄色如薄纱",
      "翅脉深褐色形成网状图案",
      "飞行轻盈飘逸，如薄纱飘动",
      "幼虫以苎麻为食",
    ],
    overallDescription: "苎麻珍蝶翅膀呈半透明的温暖橙黄色，如薄纱般轻盈。深褐色的翅脉清晰可见，在翅面上交织成细密的网状图案。飞行时如一片飘动的金色薄纱，在阳光下显得格外梦幻。",
  },
  {
    butterflyId: "17",
    butterflyName: "美凤蝶",
    baseColor: "蓝黑色",
    dominantColors: ["蓝黑"],
    eyespots: [
      {
        id: "17-eyespot-1",
        position: "后翅",
        location: "外缘",
        shape: "新月形",
        size: "小",
        rings: ["红色", "粉红色"],
        centerColor: "白色",
        description: "雌蝶后翅外缘有一排新月形红斑，雄蝶不明显。",
        count: 5,
      },
    ],
    stripes: [],
    gradients: [
      {
        id: "17-gradient-1",
        position: "前后翅",
        direction: "由外向内",
        colors: ["纯黑色", "蓝黑色", "深蓝金属色"],
        transition: "柔和过渡",
        description: "雄蝶翅膀基部泛着神秘的蓝黑色金属光泽，向外逐渐过渡为纯黑。",
      },
    ],
    tailShape: "短尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: true,
    metallicDescription: "雄蝶翅膀通体蓝黑色，在特定光线下会泛出神秘的深蓝色金属光泽，如黑曜石般深邃。",
    patternStyle: ["结构色", "单色型", "尾突型"],
    identificationTips: [
      "雄蝶通体蓝黑色，泛有金属光泽",
      "雌蝶多型，色彩变化丰富",
      "体型硕大，飞行强劲有力",
      "后翅有短小的尾突",
    ],
    overallDescription: "美凤蝶雄蝶通体呈深邃的蓝黑色，在阳光下会泛出神秘的深蓝色金属光泽，如黑曜石般高贵。雌蝶具有多型现象，色彩变化极为丰富。体型硕大，飞行强劲有力，在凤蝶中独具魅力。",
  },
  {
    butterflyId: "18",
    butterflyName: "文蛱蝶",
    baseColor: "橙黄色",
    dominantColors: ["橙黑"],
    eyespots: [],
    stripes: [
      {
        id: "18-stripe-1",
        position: "前后翅",
        pattern: "锯齿纹",
        color: "深褐色",
        backgroundColor: "橙黄色",
        width: "中等",
        count: 10,
        description: "翅膀上布满深褐色的豹纹状斑点，如锯齿般分布在橙黄色底色上。",
      },
    ],
    gradients: [],
    tailShape: "长尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: false,
    patternStyle: ["斑点型", "尾突型"],
    identificationTips: [
      "橙黄色底色配深褐色豹纹斑点",
      "雄蝶有一对优雅的长尾突",
      "飞行如巡航般悠然缓慢",
      "常在河边吸水获取矿物质",
    ],
    overallDescription: "文蛱蝶翅膀呈温暖的橙黄色，布满深褐色的豹纹状斑点，如华丽的豹皮。雄蝶后翅有一对优雅的长尾突，飞行时长尾随风飘动，姿态悠然如巡航，故又称巡航蛱蝶。",
  },
  {
    butterflyId: "19",
    butterflyName: "豆粉蝶",
    baseColor: "淡黄绿色",
    dominantColors: ["乳白", "黄黑"],
    eyespots: [
      {
        id: "19-eyespot-1",
        position: "前翅",
        location: "中部",
        shape: "圆形",
        size: "小",
        rings: ["黑色"],
        centerColor: "黄色",
        description: "前翅中部有一个小型黑色圆斑，中心黄色。",
        count: 2,
      },
    ],
    stripes: [
      {
        id: "19-stripe-1",
        position: "前后翅",
        pattern: "横条纹",
        color: "深褐色",
        backgroundColor: "淡黄绿色",
        width: "细线",
        count: 1,
        description: "前后翅外缘有一条细窄的深褐色横带。",
      },
    ],
    gradients: [
      {
        id: "19-gradient-1",
        position: "前后翅",
        direction: "由内向外",
        colors: ["淡黄绿色", "柠檬黄色", "近白色"],
        transition: "柔和过渡",
        description: "雄蝶翅膀呈现柔和的淡黄绿色渐变，向外缘逐渐变浅。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "平滑",
    hasMetallicSheen: false,
    patternStyle: ["朴素型", "单色型"],
    identificationTips: [
      "柔和的淡黄绿色是主要特征",
      "前翅有一个小型黑色圆斑",
      "外缘有细窄的深褐色边",
      "常见于草甸田野，飞行敏捷",
    ],
    overallDescription: "豆粉蝶翅膀呈柔和的淡黄绿色或柠檬黄色，如春日新芽般清新。前翅中部有一个小型黑色圆斑，外缘镶有细窄的深褐色边。整体配色淡雅，是田野中常见的小精灵。",
  },
  {
    butterflyId: "20",
    butterflyName: "燕凤蝶",
    baseColor: "黑褐色",
    dominantColors: ["绿黑"],
    eyespots: [],
    stripes: [
      {
        id: "20-stripe-1",
        position: "前后翅",
        pattern: "横条纹",
        color: "透明",
        backgroundColor: "黑褐色",
        width: "宽带",
        count: 2,
        description: "翅膀有大面积的透明区域，形成独特的黑白透明相间图案。",
      },
    ],
    gradients: [
      {
        id: "20-gradient-1",
        position: "前翅",
        direction: "由基向外",
        colors: ["翠绿色", "淡绿色", "透明"],
        transition: "清晰分界",
        description: "前翅基部有翠绿色金属光泽，向外逐渐过渡为透明区域。",
      },
    ],
    tailShape: "双尾突",
    wingEdge: "尾突状",
    hasMetallicSheen: true,
    metallicDescription: "前翅基部有翠绿色的金属光泽斑块，与透明的翅面形成鲜明对比。",
    patternStyle: ["半透明型", "结构色", "尾突型"],
    identificationTips: [
      "两条极长的尾突如燕子剪刀尾",
      "翅膀大面积透明如纱",
      "前翅基部有翠绿色金属光泽",
      "飞行如燕子般灵动飘逸",
    ],
    overallDescription: "燕凤蝶是凤蝶中最具特色的种类，后翅有两条极长的尾突，如燕子的剪刀尾般飘逸。翅膀有大面积的透明区域，如薄纱般轻盈。前翅基部的翠绿色金属光泽与透明翅面形成鲜明对比，飞行时宛若仙子。",
  },
  {
    butterflyId: "21",
    butterflyName: "枯叶蛱蝶",
    baseColor: "枯褐色",
    dominantColors: ["棕褐"],
    eyespots: [],
    stripes: [
      {
        id: "21-stripe-1",
        position: "后翅反面",
        pattern: "纵条纹",
        color: "深褐色",
        backgroundColor: "枯褐色",
        width: "细线",
        count: 1,
        description: "翅膀反面有一条深褐色纵纹，酷似叶脉，是拟态枯叶的关键。",
      },
      {
        id: "21-stripe-2",
        position: "前后翅反面",
        pattern: "网状纹",
        color: "深浅不一的褐色",
        backgroundColor: "枯褐色",
        width: "细线",
        count: 50,
        description: "翅膀反面布满深浅不一的褐色斑纹，模拟枯叶的自然纹理和霉斑。",
      },
    ],
    gradients: [
      {
        id: "21-gradient-1",
        position: "前后翅反面",
        direction: "由内向外",
        colors: ["深褐色", "枯褐色", "黄褐色"],
        transition: "斑驳渐变",
        description: "翅膀反面呈现斑驳的枯褐色渐变，模拟枯叶的自然色彩变化。",
      },
      {
        id: "21-gradient-2",
        position: "前翅正面",
        direction: "由内向外",
        colors: ["深蓝紫色", "靛蓝色", "橙棕色"],
        transition: "柔和过渡",
        description: "翅膀正面极为艳丽，由深蓝紫色渐变至橙棕色，与反面的枯叶色形成巨大反差。",
      },
    ],
    tailShape: "无尾突",
    wingEdge: "锯齿状",
    hasMetallicSheen: true,
    metallicDescription: "翅膀正面有神秘的蓝紫色金属光泽，飞行时闪现艳丽色彩，停歇时立刻合拢翅膀展现枯叶保护色。",
    patternStyle: ["拟态型", "保护色", "网状型", "结构色"],
    identificationTips: [
      "双翅合拢时与枯叶一模一样，是拟态的最佳典范",
      "有清晰的\"叶脉\"纵纹和\"霉斑\"纹理",
      "翅膀顶端有类似叶柄的小突起",
      "飞行时正面闪现蓝紫色光泽，停歇瞬间消失",
    ],
    overallDescription: "枯叶蛱蝶是自然界拟态的巅峰之作。双翅合拢时，无论形状、颜色、叶脉纹理甚至霉斑都与一片干枯的树叶完美无异，连叶柄的小突起都惟妙惟肖。翅膀正面却极为艳丽，飞行时闪现神秘的蓝紫色光泽，停歇瞬间便消失在环境中。",
  },
];

export function getWingPatternByButterflyId(butterflyId: string): WingPattern | undefined {
  return wingPatterns.find((wp) => wp.butterflyId === butterflyId);
}

export function searchByPatternFeatures(params: {
  colors?: string[];
  hasEyespots?: boolean;
  eyespotSize?: string;
  hasStripes?: boolean;
  stripePattern?: string;
  hasGradients?: boolean;
  hasMetallicSheen?: boolean;
  tailShape?: string;
  wingEdge?: string;
}): WingPattern[] {
  return wingPatterns.filter((wp) => {
    if (params.colors && params.colors.length > 0) {
      const hasColor = params.colors.some((c) =>
        (wp.dominantColors as string[]).includes(c) || wp.baseColor.includes(c)
      );
      if (!hasColor) return false;
    }
    if (params.hasEyespots !== undefined && params.hasEyespots !== (wp.eyespots.length > 0)) return false;
    if (params.eyespotSize && wp.eyespots.length > 0) {
      const hasMatchingSize = wp.eyespots.some((e) => e.size === params.eyespotSize);
      if (!hasMatchingSize) return false;
    }
    if (params.hasStripes !== undefined && params.hasStripes !== (wp.stripes.length > 0)) return false;
    if (params.stripePattern && wp.stripes.length > 0) {
      const hasMatchingPattern = wp.stripes.some((s) => s.pattern === params.stripePattern);
      if (!hasMatchingPattern) return false;
    }
    if (params.hasGradients !== undefined && params.hasGradients !== (wp.gradients.length > 0)) return false;
    if (params.hasMetallicSheen !== undefined && params.hasMetallicSheen !== wp.hasMetallicSheen) return false;
    if (params.tailShape && wp.tailShape !== params.tailShape) return false;
    if (params.wingEdge && wp.wingEdge !== params.wingEdge) return false;
    return true;
  });
}

export function calculatePatternSimilarity(pattern1: WingPattern, pattern2: WingPattern): number {
  let score = 0;
  let maxScore = 0;

  maxScore += 3;
  const commonColors = pattern1.dominantColors.filter((c) => pattern2.dominantColors.includes(c));
  if (commonColors.length > 0) {
    score += (commonColors.length / Math.max(pattern1.dominantColors.length, pattern2.dominantColors.length)) * 3;
  }

  maxScore += 2;
  if (pattern1.eyespots.length > 0 && pattern2.eyespots.length > 0) {
    score += 1;
    const p1Shapes = new Set(pattern1.eyespots.map((e) => e.shape));
    const p2Shapes = new Set(pattern2.eyespots.map((e) => e.shape));
    const commonShapes = [...p1Shapes].filter((s) => p2Shapes.has(s));
    if (commonShapes.length > 0) score += 1;
  } else if (pattern1.eyespots.length === 0 && pattern2.eyespots.length === 0) {
    score += 2;
  }

  maxScore += 2;
  if (pattern1.stripes.length > 0 && pattern2.stripes.length > 0) {
    score += 1;
    const p1Patterns = new Set(pattern1.stripes.map((s) => s.pattern));
    const p2Patterns = new Set(pattern2.stripes.map((s) => s.pattern));
    const commonPatterns = [...p1Patterns].filter((p) => p2Patterns.has(p));
    if (commonPatterns.length > 0) score += 1;
  } else if (pattern1.stripes.length === 0 && pattern2.stripes.length === 0) {
    score += 2;
  }

  maxScore += 1;
  if ((pattern1.gradients.length > 0) === (pattern2.gradients.length > 0)) score += 1;

  maxScore += 2;
  if (pattern1.hasMetallicSheen === pattern2.hasMetallicSheen) score += 2;

  maxScore += 1;
  if (pattern1.tailShape === pattern2.tailShape) score += 1;

  maxScore += 1;
  if (pattern1.wingEdge === pattern2.wingEdge) score += 1;

  return Math.round((score / maxScore) * 100);
}

export function getSimilarPatterns(butterflyId: string, limit: number = 5): Array<{ pattern: WingPattern; similarity: number }> {
  const basePattern = getWingPatternByButterflyId(butterflyId);
  if (!basePattern) return [];

  return wingPatterns
    .filter((wp) => wp.butterflyId !== butterflyId)
    .map((wp) => ({
      pattern: wp,
      similarity: calculatePatternSimilarity(basePattern, wp),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

export const allPatternColors = [
  "橙黑", "蓝黑", "黄黑", "绿黑", "红黑",
  "纯白", "乳白", "金黄", "银白", "翠绿",
  "粉红", "紫红", "棕褐", "灰白", "多彩虹彩",
];

export const allStripePatterns = ["横条纹", "纵条纹", "放射纹", "锯齿纹", "网状纹", "波浪纹"];
export const allTailShapes = ["无尾突", "短尾突", "长尾突", "双尾突", "燕尾突"];
export const allWingEdges = ["平滑", "波浪状", "锯齿状", "尾突状"];
export const allEyespotSizes = ["极小", "小", "中", "大", "极大"];
