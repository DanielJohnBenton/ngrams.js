"use strict";

let __ngrams = require("ngrams");

let words = "Something and SOMETHING and something and something".split(" ");

let skipGrams = __ngrams.BagOfSkipGrams(words, 2, 2, __ngrams.SORT_NGRAMS , __ngrams.SORT_NGRAMS);
console.log(skipGrams);