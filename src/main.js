import {createLoanForm} from './components/form.js';
import {createResultsView,renderResults} from './components/results.js';
import {calculateLoan} from './services/calculator.js';

const app=document.getElementById('app');
const layout=document.createElement('div');
layout.className='layout';
app.appendChild(layout);

const onFormChange=data=>{
  const result=calculateLoan(data);
  renderResults(resultsView,result,data);
};

const formView=createLoanForm(onFormChange);
const resultsView=createResultsView();
layout.appendChild(formView);
layout.appendChild(resultsView);
