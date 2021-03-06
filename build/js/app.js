(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Numerals() {
  this.numerals = ["I", "V", "X", "L", "C", "D", "M"];
  this.numeralValues = [1, 5, 10, 50, 100, 500, 1000];
}

// We do not want empty inputs or negative numbers being converted
Numerals.prototype.error = function(decimalNumber) {
  if (!Number.isInteger(decimalNumber)) {
    return "error: empty field";
  } else if (decimalNumber < 0){
    return "error: negative";
  }
}

Numerals.prototype.makeColumnRoman = function(decimalNumber) {
  var numeralTotal = 0; // Keep track of total value of our Roman Numeral string so far.
  var result = "";
  for (var index = this.numeralValues.length - 1; index >= 0; index--) {
    // Go through our possible numeral values, starting with the biggest.
    var numeralCount = 0; // We want to keep track of how many of a numeral we've added
    while (numeralTotal + this.numeralValues[index] <= decimalNumber) {
      // If a numeral is small enough to add to the numeral string without going over our decimal ammount, we add it as many times as we can without going over the decimal ammount.
      numeralCount += 1;
      if (numeralCount > 3) {
        // If we already have three numerals in a row we want to replace with the next greater numeral minus this numeral
        var greaterVal = numeralTotal + 2 * this.numeralValues[index];
        numeralTotal += (greaterVal - this.numeralValues[index]);
        var resultIndex = result.length - 1;
        while (numeralTotal > decimalNumber && resultIndex >= 0) {
          // Remove all the numerals we'd already put in the string making the total too large, so we can add the new pair of numerals
          var thisNumeral = result.charAt(resultIndex);
          numeralTotal -= this.numeralValues[this.numerals.indexOf(thisNumeral)];
          resultIndex -= 1;
        }
        // Make the new string now that we've removed the extra numerals
        result = result.substring(0, resultIndex) + this.numerals[index] + this.numerals[this.numeralValues.indexOf(greaterVal)];
      } else {
        // Keep track of our total and add to string
        numeralTotal += this.numeralValues[index];
        result += this.numerals[index];
      }
    }
  }
  return result;
}

Numerals.prototype.makeRoman = function(decimalNumber) {
  var numberError = this.error(decimalNumber);
  if (numberError) { // Find out if we have an illegal input
    return numberError;
  } else if (decimalNumber === 0) { // 0 doesn't need to be converted by column
    return "nulla";
  } else { // We need to convert each column (10s, etc) individually
    var result = "";
    var place = 10; // What place (10s, 100s, etc) we're converting
    while (decimalNumber > 0) {
      result = this.makeColumnRoman(decimalNumber % place) + result;
      // Since we go from smallest place to largest, add result to front of Roman Numeral string
      decimalNumber -= decimalNumber % place;
      place *= 10;
    }
    return result;
  }
}

exports.numeralsModule = Numerals;

},{}],2:[function(require,module,exports){
Numerals = require('./../js/scripts.js').numeralsModule;


// User Interface logic

$(document).ready(function() {
  $("#number").submit(function(event) {
    event.preventDefault();
    var decimalNumber = parseInt($("input#decimal-number").val());
    var romanNumeral = new Numerals();
    $("#result").text(romanNumeral.makeRoman(decimalNumber));
  });
});

},{"./../js/scripts.js":1}]},{},[2]);
