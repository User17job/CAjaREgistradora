/*
const currencyNameMap = {
  PENNY: 'Pennies',
  NICKEL: 'Nickels',
  DIME: 'Dimes',
  QUARTER: 'Quarters',
  ONE: 'Ones',
  FIVE: 'Fives',
  TEN: 'Tens',
  TWENTY: 'Twenties',
  'ONE HUNDRED': 'Hundreds'
};


*/
// en este proyecto se usa la moneda en su cantidad como centimos, por eso uno 1 sera igual a 100 y 5 a 500 mientras que 100 a 1000
//  pero todo eso pasa por el lado del desarrollador el costumer no ve nada de esto 
let Ganancias = 0;
console.log(Ganancias,"En ganancias");

const displayChangeDue = document.getElementById('change-due');
const cashInput = document.getElementById('cash');

const purchaseBtn = document.getElementById('purchase-btn');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');
const PriceC = document.querySelector(".priceContainer");
const product = document.querySelector('.uno')
const product1 = document.querySelector('.dos')
const product2 = document.querySelector('.tres')
const product3 = document.querySelector('.cuatro')
let price =0.5;
let total = 0;
PriceC.textContent=price;
// funcion para calcular el total del precio al elegir los items a comprar 
function calcularTotal() {
  const elementos = document.querySelectorAll('input[name="elemento"]:checked');
  total = 0;
  elementos.forEach((elemento) => {
    total += parseFloat(elemento.value) ;
  });

  if (elementos.length === 1) {
    const priceDB = total;
    console.log(`Total: ${total}, Price: ${priceDB}`);
    price=total+ 0.5
  

  } else {
    console.log(`Total: ${total}`);
    price=total+0.5    
  }
  PriceC.textContent=price ;
}

let Cash = parseFloat(cashInput.value);
// we declare all denomination as cents
const DENOMINATIONS = [
    ['PENNY',1],
    ['NICKEL', 5],
    ['DIME', 10],
    ['QUARTER', 25],
    ['ONE', 100],
    ['FIVE', 500],
    ['TEN', 1000],
    ['TWENTY', 2000],
    ['ONE HUNDRED', 10000]
];
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];
let totalSuma = 0;
for (const subarreglo of cid) {
    totalSuma += subarreglo[1];
}
let totalInDraw =totalSuma.toFixed(2);

// funcion principal para calcular el cambio a devolver 
function checkCashRegister(price, cash, cid){ 
let amountToReturn = Math.round(cash*100) - Math.round(price*100) ;
let cashOnHand = {};
let cashToGive = {};

cid.forEach(denomination => {
  cashOnHand[denomination[0]] = Math.round(denomination[1]*100);
  // console.log(cashOnHand[denomination[0]])
});

 let index = DENOMINATIONS.length - 1;
while(index >= 0 && amountToReturn > 0){
  let moneyName = DENOMINATIONS[index][0];
  let moneyValue = DENOMINATIONS[index][1];

if(amountToReturn - moneyValue > 0 && cashOnHand[moneyName], amountToReturn){
  cashToGive[moneyName] = 0;
  while(cashOnHand[moneyName] > 0 && amountToReturn - moneyValue >= 0){
      cashOnHand[moneyName] -= moneyValue;
      cashToGive[moneyName] += moneyValue;
      amountToReturn    -=     moneyValue;
    }
}
   index -= 1
}
// console.log(cashToGive);

  if(amountToReturn === 0){
    let isRegisterEmpty = true;

  Object.keys(cashOnHand).forEach(moneyType => {
  if(cashOnHand[moneyType] > 0){
    isRegisterEmpty = false
  }
 });

  if(isRegisterEmpty){
  return {
    status:"CLOSED",
    change: cid
  }
  }else{
   let toArr = [];
    Object.keys(cashToGive).map(moneyType =>{
      
      if(cashToGive[moneyType] > 0){
        toArr.push([moneyType, cashToGive[moneyType] / 100]);
        // console.log(cid)
      };
    });
    return {status:"OPEN", change: toArr};
  }
 }
  return {status:"INSUFFICIENT_FUNDS", change: []}
}      

// Validacion del valor del input  
purchaseBtn.addEventListener('click', validar)
function validar(){
  // cashInput.value="";
  let totalToGive = 0;
  displayChangeDue.innerHTML =``
  cashDrawerDisplay.innerHTML=`<h3>Cash InDrawer🤑🐱‍🏍</h3><br><div class="paragraph"><p>MONEY IN DRAWER: $${totalInDraw}</p></div>` 
let Cash = parseFloat(cashInput.value);
// PRIMER FILTRO
if( totalInDraw < Cash){
  alert('😓😢There is not enoght change in drawer')
}else{
  if(Cash > 0){
    // SEGUNDO FILTRO
   if (Cash ==price) {
    // TERCER FILTRO
     displayChangeDue.textContent="No change due - customer paid with exact cash";
   } else if (Cash > price) {

     if(totalInDraw > 1 ){
      // CUARTO FILTRO
     let res = checkCashRegister(price, Cash, cid);
     sumarMonto();

    //  console.log(res);
   //  console.log(res.change);
    displayChangeDue.innerHTML +=`
    <h3>Status: ${res.status}</h3><br>`;
    res.change.map(element => {
    //  console.log(element," iu3edsugvcefkbdkj")///
     displayChangeDue.innerHTML +=`  <div class="paragraph"><p>${element[0]}: $${element[1]}</p></div>`
     totalToGive+= element[1];

    })
     }else{
       alert("there is no enough money in the draw")
       return alert("😓")
     }

   } else {
   alert("Customer does not have enough money to purchase the item");
   displayChangeDue.textContent="Buyer haven't enough money";
   };   
 
//  console.log(totalToGive, "totalToGive");
//  console.log(totalInDraw, "totalInDraw"); 
//  console.log(totalInDraw-totalToGive);
 
 let resta = totalInDraw-totalToGive + 25;// los"25"son de comision por venta
 totalInDraw=resta.toFixed(2) ;

 Ganancias=price + Ganancias;
 console.log(Ganancias,"En ganancias");
 //  cashDrawerDisplay.innerHTML+=`<div class="paragraph"><p>MONEY IN DRAWER: $${totalInDraw}</p></div>`
   }    
   else{
     console.log("Ooops");
   }
}
}

// console.log(cid, "PRIMERCID")
// function para sumaral cid las ganancias
function sumarMonto(){
  if(price <= cid[0][1]){
    console.log("Penny");
    console.log(cid[0][1],"antes");
    cid[0][1]= cid[0][1]+price;
    console.log(cid[0][1],"espuess");
  }else if(price<=cid[1][1]){
    console.log('Nickel');
    console.log(cid[1][1],"antes");
    cid[1][1]= cid[1][1]+price;
    console.log(cid[1][1],"espuess");
  }else if(price <= cid[2][1]){
    console.log("Dime")
    console.log(cid[2][1],"antes");
    cid[2][1]= cid[2][1]+price;
    console.log(cid[2][1],"espuess");
  }else if(price <= cid[3][1]){
    console.log("Quarter")
    console.log(cid[3][1],"antes");
    cid[3][1]= cid[3][1]+price;
    console.log(cid[3][1],"espuess");
  }else if(price <= cid[4][1]){
    console.log("One")
    console.log(cid[4][1],"antes");
    cid[4][1]= cid[4][1]+price;
    console.log(cid[4][1],"espuess");
  }else if(price <= cid[5][1]){
    console.log("Five")
    console.log(cid[5][1],"antes");
    cid[5][1]= cid[5][1]+price;
    console.log(cid[5][1],"espuess");
  }else if(price <= cid[6][1]){
    console.log("ten")
    console.log(cid[6][1],"antes");
    cid[6][1]= cid[6][1]+price;
    console.log(cid[6][1],"espuess");
  }else if(price <= cid[7][1]){
    console.log("twenty")
    console.log(cid[7][1],"antes");
    cid[7][1]= cid[7][1]+price;
    console.log(cid[7][1],"espuess");
  }else if(price <= cid[8][1]){
    // console.log("One Hundred")
    // console.log(cid[8][1],"antes");
    cid[8][1]= cid[8][1]+price;
    console.log(cid[8][1],"espuess");
  }else if(price >= cid[8][1]){
    console.log("For One Hundred")
    console.log(cid[8][1],"antes");
    cid[8][1]= cid[8][1]+price;
    console.log(cid[8][1],"espuess");
  }

  console.log(cid)
}
PriceC.textContent=price;




