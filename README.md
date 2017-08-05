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

`"these are some words".split(" ")` is nice and simple, but often our source text is not so simple. You may choose to use some sort of NLP tokeniser.
This library provides a rudimentary method, SanitiseToWords, to get rid of things like double spaces, punctuation, and so on in a string before splitting it into words.

```
console.log(__ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   "));
```

Output:

```
[ 'Turning', 'and', 'turning', 'in', 'the', 'widening', 'gyre', 'The', 'falcon', 'cannot', 'hear', 'the', 'falconer', 'Things', 'fall', 'apart', 'the', 'centre', 'cannot', 'hold', 'Mere', 'anarchy', 'is', 'loosed', 'upon', 'the', 'world' ]
```

See documentation below for more information.

## Methods

### Ngrams

Create n-grams from an array of words.

| Parameter | Type                     | Description                                                                    | 
|-----------|--------------------------|--------------------------------------------------------------------------------| 
| words     | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`                           | 
| n         | `INTEGER`                  | Size of the n-grams, e.g. `2` will create bigrams `["these are", "are words"]` | 

Returns an array of n-grams of size `n` (`ARRAY [INTEGER] = STRING`).

```
let words = __ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   ");
let ngrams = __ngrams.Ngrams(words, 5);
console.log(ngrams);
```

Output (truncated):

```
[ 'Turning and turning in the',
  'and turning in the widening',
  'turning in the widening gyre',
...
```

### SkipGrams

Create skip-grams from an array of words.

| Parameter         | Type                       | Description                                                                                                                                                                                                                                                                             | 
|-------------------|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| words             | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`                                                                                                                                                                                                                                      | 
| size              | `INTEGER`                  | Size of the n-grams e.g. `2`: `"these are", "are words"`                                                                                                                                                                                                                                | 
| distance          | `INTEGER`                  | Distance to skip to create skip-grams, e.g. `5` will create skip-grams using the base word (or n-gram) and n-grams from the 5 following words.                                                                                                                                          | 
| sortForDuplicates | `INTEGER`                  | Pass `__ngrams.SORT_NGRAMS` or `__ngrams.DONT_SORT_NGRAMS`. Sorting n-grams alphabetically can help flag up duplicates e.g. when creating a bag of words/n-grams/skip-grams. If you only care about pairing n-grams by proximity but not by direction, use `__ngrams.DONT_SORT_NGRAMS`. | 


### 

## Acknowledgements
- [CSV to Markdown Table Generator](https://donatstudios.com/CsvToMarkdownTable) - Donat Studios




















