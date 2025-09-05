// ES6 or Vanilla JavaScript

//search-person-results-js.html
console.log('running this');



document.addEventListener('DOMContentLoaded',function(){

  // Nasty fix, BUT...add a class if there's a hero banner...
  const heroBanner = document.querySelector('.nhsuk-hero');
  if( heroBanner ){
    document.body.classList.add('is-fullwidth','has-hero');
  }

  // Even nastier fix... swap the breadcrumb and phase banner if they're in the wrong order
  const phaseBanner = document.querySelector('.app-phase-banner');
  if( phaseBanner && phaseBanner.previousElementSibling.matches('.nhsuk-breadcrumb') ){
    const breadcrumb = document.querySelector('.nhsuk-breadcrumb');
    phaseBanner.parentElement.insertBefore(phaseBanner, breadcrumb);
  }

});



// Variables
const showTableFilter = document.querySelector('.nhsuk-search__submit');
const wrapTable = document.querySelector('.new-filtered-table');
const table = document.querySelector('.new-table tbody');
let entitlementFilter = document.getElementById('select-1');
let statusFilter = document.getElementById('select-2');


// Functions
const filter = () => {

    let statusOption = statusFilter.value;
    // let entitlementOption = entitlementFilter.value;

    for (let i = 0, row; row = table.rows[i]; i++) {

        if (statusOption === 'status') {

            row.style.display = "table-row";

        } else if (row.classList.contains(statusOption)) {

            row.style.display = "table-row";
            
        } else {

            row.style.display = "none";

        }

    }
}


// Event Listeners
showTableFilter.addEventListener('click', () => {
    wrapTable.style.display = 'block'; 
});

entitlementFilter.addEventListener('click', filter);
statusFilter.addEventListener('change', filter);

//found-two-ehic.html
function show1(){
    document.getElementById('div1').style.display ='block';
    document.getElementById('div2').style.display = 'none';
  }
function show2(){
    document.getElementById('div2').style.display = 'block';
    document.getElementById('div1').style.display = 'none';
  }
function show3(){
    document.getElementById('div1').style.display = 'none';
    document.getElementById('div2').style.display = 'none';
  }

//found-one-prc.html
function display1(){
    document.getElementById('div1').style.display ='block';
  }
function display2(){
    document.getElementById('div1').style.display = 'none';
  }
