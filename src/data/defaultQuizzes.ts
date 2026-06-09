import { Quiz } from '../types';

export const DEFAULT_QUIZZES: Quiz[] = [
  {
    id: 'q1',
    title: 'Science Basics',
    description: 'Biology, chemistry, and a bit of earth science — see what you remember from school.',
    category: 'Science',
    createdAt: '2026-06-01T08:00:00Z',
    authorId: 'system',
    authorName: 'QuizFlow',
    authorAvatar: 'https://picsum.photos/100',
    plays: 1200,
    isFeatured: true,
    image: 'https://www.makeblock.com/cdn/shop/articles/science_1200x1200.jpg?v=1690799592',
    questions: [
      { id:'q1_1', text:'What is the chemical symbol for Gold?', options:['Au','Ag','Fe','Pb'], correctAnswerIndex:0 },
      { id:'q1_2', text:'Which planet is called the Red Planet?', options:['Venus','Mars','Jupiter','Mercury'], correctAnswerIndex:1 },
      { id:'q1_3', text:'Plants prepare food by?', options:['Respiration','Photosynthesis','Digestion','Fermentation'], correctAnswerIndex:1 },
      { id:'q1_4', text:'Human blood is pumped by the?', options:['Brain','Lungs','Heart','Kidney'], correctAnswerIndex:2 },
      { id:'q1_5', text:'The largest organ of the human body is?', options:['Liver','Skin','Heart','Brain'], correctAnswerIndex:1 },
      { id:'q1_6', text:'Water boils at?', options:['90°C','100°C','110°C','80°C'], correctAnswerIndex:1 },
      { id:'q1_7', text:'Which gas is most abundant in Earth’s atmosphere?', options:['Oxygen','Hydrogen','Nitrogen','Carbon Dioxide'], correctAnswerIndex:2 },
      { id:'q1_8', text:'DNA stands for?', options:['Deoxyribonucleic Acid','Dynamic Nuclear Acid','Dual Nucleic Acid','None'], correctAnswerIndex:0 },
      { id:'q1_9', text:'Vitamin produced by sunlight?', options:['A','B12','C','D'], correctAnswerIndex:3 },
      { id:'q1_10', text:'SI unit of force?', options:['Newton','Joule','Pascal','Watt'], correctAnswerIndex:0 }
    ]
  },
  {
    id:'q2',
    title:'Physics 101',
    description:'Motion, energy, electricity, and waves — the stuff that actually shows up on tests.',
    category:'Science',
    createdAt:'2026-06-02T08:00:00Z',
    authorId:'system',
    authorName:'QuizFlow',
    authorAvatar:'https://picsum.photos/100',
    plays:980,
    isFeatured:true,
    image: 'https://www.makeblock.com/cdn/shop/articles/science_1200x1200.jpg?v=1690799592',
    questions:[
      {id:'q2_1',text:'SI unit of power?',options:['Joule','Watt','Volt','Newton'],correctAnswerIndex:1},
      {id:'q2_2',text:'Speed of light in vacuum?',options:['3×10^8 m/s','3×10^6 m/s','3×10^5 km/s','1.5×10^8 m/s'],correctAnswerIndex:0},
      {id:'q2_3',text:'Who gave the law of gravitation?',options:['Einstein','Newton','Galileo','Tesla'],correctAnswerIndex:1},
      {id:'q2_4',text:'Unit of electric current?',options:['Volt','Ohm','Ampere','Coulomb'],correctAnswerIndex:2},
      {id:'q2_5',text:'Energy stored in a stretched spring is?',options:['Kinetic','Potential','Thermal','Chemical'],correctAnswerIndex:1},
      {id:'q2_6',text:'Which mirror forms a real image?',options:['Plane','Convex','Concave','None'],correctAnswerIndex:2},
      {id:'q2_7',text:'Frequency is measured in?',options:['Hertz','Newton','Tesla','Pascal'],correctAnswerIndex:0},
      {id:'q2_8',text:'Acceleration due to gravity on Earth?',options:['8.9','9.8','10.8','7.8'],correctAnswerIndex:1},
      {id:'q2_9',text:'Instrument to measure current?',options:['Voltmeter','Ammeter','Barometer','Thermometer'],correctAnswerIndex:1},
      {id:'q2_10',text:'Ohm’s Law is?',options:['V=IR','P=VI','F=ma','E=mc²'],correctAnswerIndex:0}
    ]
  },
  {
    id:'q3',
    title:'Math Check',
    description:'Arithmetic, algebra, and geometry — no calculator needed (probably).',
    category:'Math',
    createdAt:'2026-06-03T08:00:00Z',
    authorId:'system',
    authorName:'QuizFlow',
    authorAvatar:'https://picsum.photos/100',
    plays:860,
    isFeatured:false,
   image: 'https://i.pinimg.com/1200x/74/d2/c8/74d2c812d2ed11db605a7208978933f6.jpg',
    questions:[
      {id:'q3_1',text:'12 × 8 = ?',options:['84','96','108','88'],correctAnswerIndex:1},
      {id:'q3_2',text:'Value of π (approx.)?',options:['2.14','3.14','4.13','3.41'],correctAnswerIndex:1},
      {id:'q3_3',text:'Square root of 144?',options:['11','12','13','14'],correctAnswerIndex:1},
      {id:'q3_4',text:'Derivative of x²?',options:['x','2x','x²','2'],correctAnswerIndex:1},
      {id:'q3_5',text:'Angles in a triangle sum to?',options:['90°','180°','270°','360°'],correctAnswerIndex:1},
      {id:'q3_6',text:'5! equals?',options:['20','60','120','240'],correctAnswerIndex:2},
      {id:'q3_7',text:'2³ = ?',options:['6','8','9','12'],correctAnswerIndex:1},
      {id:'q3_8',text:'Area of a circle?',options:['πr²','2πr','l×b','½bh'],correctAnswerIndex:0},
      {id:'q3_9',text:'15% of 200?',options:['25','30','35','40'],correctAnswerIndex:1},
      {id:'q3_10',text:'x+5=12, x=?',options:['5','6','7','8'],correctAnswerIndex:2}
    ]
  },
  {
    id:'q4',
    title:'Tech & Coding',
    description:'Computers, the internet, and a few things every dev should know.',
    category:'Tech',
    createdAt:'2026-06-04T08:00:00Z',
    authorId:'system',
    authorName:'QuizFlow',
    authorAvatar:'https://picsum.photos/100',
    plays:1500,
    isFeatured:true,
    image: 'https://i.pinimg.com/1200x/9d/9a/6b/9d9a6b8c7dcf47c88adb535a8e7535ed.jpg',
    questions:[
      {id:'q4_1',text:'CPU stands for?',options:['Central Processing Unit','Computer Primary Unit','Control Program Unit','Central Program Utility'],correctAnswerIndex:0},
      {id:'q4_2',text:'HTML is used for?',options:['Programming','Web Structure','Database','Operating System'],correctAnswerIndex:1},
      {id:'q4_3',text:'Which language is primarily used for styling webpages?',options:['Python','CSS','Java','C++'],correctAnswerIndex:1},
      {id:'q4_4',text:'Brain of the computer?',options:['RAM','CPU','SSD','GPU'],correctAnswerIndex:1},
      {id:'q4_5',text:'Binary number system uses?',options:['0-9','0 and 1','1-8','A-F'],correctAnswerIndex:1},
      {id:'q4_6',text:'Which company developed React?',options:['Google','Meta','Microsoft','Apple'],correctAnswerIndex:1},
      {id:'q4_7',text:'Which protocol is used for secure websites?',options:['HTTP','FTP','HTTPS','SMTP'],correctAnswerIndex:2},
      {id:'q4_8',text:'RAM is?',options:['Permanent','Volatile Memory','Storage Disk','Processor'],correctAnswerIndex:1},
      {id:'q4_9',text:'JavaScript runs primarily in the?',options:['Browser','Monitor','Printer','Scanner'],correctAnswerIndex:0},
      {id:'q4_10',text:'Git is mainly used for?',options:['Video Editing','Version Control','Database','Networking'],correctAnswerIndex:1}
    ]
  }
];
