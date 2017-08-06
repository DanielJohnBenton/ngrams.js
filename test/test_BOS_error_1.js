"use strict";

let __ngrams = require("ngrams");

let words = "Something and SOMETHING and something and something".split(" ");

let skipGrams = __ngrams.BagOfSkipGrams(words, 2, 2, __ngrams.CASE_INSENSITIVE , __ngrams.CASE_INSENSITIVE);
console.log(skipGrams);