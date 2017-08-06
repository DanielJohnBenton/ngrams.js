"use strict";

let __ngrams = require("ngrams");

let skipGrams = __ngrams.SkipGrams(["these", "are", "some", "words"], 2, 2, __ngrams.DONT_SORT_NGRAMS);

skipGrams = __ngrams.ConcatSkipGrams(skipGrams);
console.log(skipGrams);