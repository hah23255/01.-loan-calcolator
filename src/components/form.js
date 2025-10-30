import {createEl} from '../utils/dom.js';

const loanOptions=[
  {value:'mortgage',label:'Ипотечен кредит'},
  {value:'consumer',label:'Потребителски кредит'},
  {value:'auto',label:'Автокредит'},
  {value:'other',label:'Друг тип'}
];
const planOptions=[
  {value:'annuity',label:'Анюитетен план'},
  {value:'decreasing',label:'Намаляващ план'},
  {value:'both',label:'Сравнение на двата'}
];
const feeOptions=[
  {value:'none',label:'Без допълнителни такси'},
  {value:'fixed1',label:'Фиксирана такса 1%'},
  {value:'custom',label:'Потребителски процент'}
];
const infoOptions=[
  {value:'short',label:'Кратко пояснение/FAQ'},
  {value:'extended',label:'Разширено съдържание'},
  {value:'none',label:'Без допълнително съдържание'}
];
const ctaOptions=[
  {value:'form',label:'CTA с контактна форма'},
  {value:'link',label:'CTA с външен линк'},
  {value:'none',label:'Без CTA'}
];

export const createLoanForm=(onSubmit)=>{
  const customFeeField=createEl('input',{type:'number',name:'customFee',step:'0.01',min:'0',placeholder:'Процент',style:'display:none'});
  const form=createEl('form',{className:'field-group'},[
    createEl('label',{},['Сума на кредита (лв.)',createEl('input',{type:'number',name:'amount',min:'0',required:true,value:'200000',step:'1000'})]),
    createEl('label',{},['Годишен лихвен процент',createEl('input',{type:'number',name:'rate',min:'0',required:true,value:'3.2',step:'0.1'})]),
    createEl('label',{},['Срок (месеци)',createEl('input',{type:'number',name:'months',min:'1',required:true,value:'240'})]),
    createEl('label',{},['Тип кредит',selectFrom('loanType',loanOptions)]),
    createEl('label',{},['Погасителен план',selectFrom('plan',planOptions,'both')]),
    createEl('label',{},['Допълнителни такси',selectFrom('feeMode',feeOptions,'none')]),
    createEl('label',{},['Процент на таксите',customFeeField]),
    createEl('label',{},['FAQ/Обяснения',selectFrom('infoLevel',infoOptions,'short')]),
    createEl('label',{},['CTA',selectFrom('ctaType',ctaOptions,'link')]),
    createEl('div',{className:'form-actions'},[
      createEl('button',{type:'submit'},['Изчисли']),
      createEl('button',{type:'reset'},['Изчисти'])
    ])
  ]);

  form.addEventListener('submit',evt=>{
    evt.preventDefault();
    onSubmit(readForm(form));
  });

  form.addEventListener('reset',()=>{
    window.requestAnimationFrame(()=>{
      customFeeField.style.display='none';
      customFeeField.value='';
      onSubmit(readForm(form));
    });
  });

  form.elements.feeMode.addEventListener('change',evt=>{
    const mode=evt.target.value;
    customFeeField.style.display=mode==='custom'?'block':'none';
    if(mode==='fixed1')customFeeField.value='';
  });

  const section=createEl('section',{},[
    createEl('h1',{},['Кредитен калкулатор']),
    createEl('p',{},['Попълнете данните и настройките, за да получите най-подходящия план.']),
    form
  ]);

  onSubmit(readForm(form));
  return section;
};

const selectFrom=(name,options,selected)=>createEl('select',{name,required:true},options.map(({value,label})=>{
  const option=createEl('option',{value},[label]);
  if(value===selected)option.selected=true;
  return option;
}));

const readForm=form=>({
  amount:form.elements.amount.value,
  rate:form.elements.rate.value,
  months:form.elements.months.value,
  loanType:form.elements.loanType.value,
  plan:form.elements.plan.value,
  feeMode:form.elements.feeMode.value,
  customFee:form.elements.customFee.value,
  infoLevel:form.elements.infoLevel.value,
  ctaType:form.elements.ctaType.value
});
