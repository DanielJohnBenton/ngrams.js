# ngrams.js

A Node.js library for creating n-grams, skip-grams, bag of words, bag of n-grams, bag of skip-grams.
Also has a simple function to sanitise input text and split it into words for use in these methods.

## Usage

Put ngrams.js in your `node_modules` folder and require it:

```
let __ngrams = require("ngrams");
```

## Input

These methods take an array of words to turn into n-grams, skip-grams, etc.

```
"use strict";
let __ngrams = require("ngrams");

// Create 2-grams
let ngrams = __ngrams.Ngrams(["these", "are", "some", "words"], 2);
console.log(ngrams);
```

Output:

```
[ 'these are', 'are some', 'some words' ]
```

`"these are some words".split(" ")`` is nice and simple, but often our source text is not so simple. You may choose to use some sort of NLP tokeniser.
This library provides a rudimentary method, SanitiseToWords, to get rid of things like double spaces, punctuation, and so on in a string before splitting it into words.

```
console.log(__ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   "));
```

Output:

```
[ 'Turning', 'and', 'turning', 'in', 'the', 'widening', 'gyre', 'The', 'falcon', 'cannot', 'hear', 'the', 'falconer', 'Things', 'fall', 'apart', 'the', 'centre', 'cannot', 'hold', 'Mere', 'anarchy', 'is', 'loosed', 'upon', 'the', 'world' ]
```

See documentation below for more information.