import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function emptyInputs() {
  $('#moneyValue').val('');
  $('.showConvertedAmount').text('');
  $('select').val($('option:disabled'));
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

function getMoneyConversion(response) {
  if (response.result === 'success') {
    $('.showConvertedAmount').text(`Your money is equal to ${roundToTwo(response.conversion_result)} ${response.target_code}.`);
  } else {
    $('.showConvertedAmount').text(`There was an error in your request: ${response}`);
  }
}

async function callExchangeApi(initialCurrency, finalCurrency, moneyValue) {
  let response = null;

  if (['USD', 'BRL', 'EGP', 'CAD', 'ETB', 'ISK', 'JPY'].includes(finalCurrency)) {
    response = await CurrencyService.convertCurrency(initialCurrency, finalCurrency, moneyValue);
  }
  else {
    response = "Currency unavail";
  }
  
  getMoneyConversion(response);
}

$(document).ready(function() {
  $('#convertMoney').click(function() {
    const initialCurrency = $('#currencyBegin').val();
    const finalCurrency = $('#currencyEnd').val();
    const moneyValue = $('#moneyValue').val();
    emptyInputs();
    callExchangeApi(initialCurrency, finalCurrency, moneyValue);
  });
});

