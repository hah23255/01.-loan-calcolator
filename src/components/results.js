import {createEl,clearEl,formatCurrency,formatNumber} from '../utils/dom.js';

const planDescriptions={
  annuity:'Анюитетните вноски остават равни, което улеснява планирането на бюджета.',
  decreasing:'Намаляващите вноски започват по-високо, но общата лихва е по-ниска.'
};

export const createResultsView=()=>{
  const container=createEl('section',{className:'results'},[
    createEl('h2',{},['Резултати']),
    createEl('div',{className:'result-summary'}),
    createEl('div',{className:'result-details'})
  ]);
  return container;
};

export const renderResults=(root,{principal,fee,modes},options)=>{
  const summary=root.querySelector('.result-summary');
  const details=root.querySelector('.result-details');
  clearEl(summary);
  clearEl(details);

  summary.appendChild(createEl('div',{className:'result-card'},[
    createEl('h3',{},['Основни данни']),
    createEl('p',{},[`Главница: ${formatCurrency(principal)}`]),
    createEl('p',{},[`Такси: ${formatCurrency(fee)}`])
  ]));

  modes.forEach(({key,label,data})=>{
    details.appendChild(createPlanCard(label,data,key,options));
  });

  if(options.infoLevel!=='none'){
    details.appendChild(createInfoBlock(options));
  }

  if(options.ctaType!=='none'){
    details.appendChild(createCtaBlock(options.ctaType));
  }
};

const createPlanCard=(label,{payment,total,schedule},key,{infoLevel})=>{
  const items=schedule.slice(0,6).map(row=>createEl('li',{},[`Месец ${row.month}: ${formatCurrency(row.payment)} (лихва ${formatCurrency(row.interest)})`]));
  return createEl('article',{className:'result-card'},[
    createEl('h3',{},[label]),
    createEl('p',{},[`Първа вноска: ${formatCurrency(payment)}`]),
    createEl('p',{},[`Общо плащания: ${formatCurrency(total)}`]),
    createEl('p',{},[planDescriptions[key]]),
    createEl('p',{},[`Първите 6 месеца:`]),
    createEl('ul',{},items),
    infoLevel==='extended'?createEl('p',{},['Пълен график се изчислява локално. Разгледайте повече чрез експортиране (планирано разширение).']):null
  ]);
};

const createInfoBlock=({loanType,infoLevel})=>{
  const texts={
    mortgage:'Ипотечните кредити изискват допълнителни документи и по-дълъг срок. Планирайте буфер за непредвидени разходи.',
    consumer:'Потребителските кредити са гъвкави, но лихвата може да варира според дохода и историята.',
    auto:'Автокредитите често изискват каско; сравнете офертите на дилър и банка.',
    other:'За индивидуални кредити консултацията със специалист е задължителна.'
  };
  return createEl('article',{className:'result-card'},[
    createEl('h3',{},['Съвети']),
    createEl('p',{},[texts[loanType]]),
    infoLevel==='extended'?createEl('p',{},['Помнете: проверявайте ГПР и допълнителните такси преди подписване.']):null
  ]);
};

const createCtaBlock=type=>{
  if(type==='form'){
    return createEl('article',{className:'result-card'},[
      createEl('h3',{},['Свържете се с нас']),
      createEl('p',{},['Оставете контакт и ще ви предложим персонализирана консултация.']),
      createEl('form',{className:'field-group'},[
        createEl('label',{},['Име',createEl('input',{type:'text',name:'name',required:true})]),
        createEl('label',{},['Имейл',createEl('input',{type:'email',name:'email',required:true})]),
        createEl('button',{type:'submit'},['Изпрати'])
      ])
    ]);
  }
  return createEl('article',{className:'result-card'},[
    createEl('h3',{},['Допълнителна консултация']),
    createEl('a',{href:'#',target:'_blank',rel:'noopener'},['Научете повече за кредитните ни решения →'])
  ]);
};
