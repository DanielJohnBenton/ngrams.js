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

### :shell: Ngrams

Create [n-grams](https://en.wikipedia.org/wiki/N-gram#Examples) from an array of words.

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

### :shell: SkipGrams

Create [skip-grams](https://en.wikipedia.org/wiki/N-gram#Skip-gram) from an array of words.

| Parameter         | Type                       | Description                                                                                                                                                                                                                                                                             | 
|-------------------|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| words             | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`                                                                                                                                                                                                                                      | 
| size              | `INTEGER`                  | Size of the n-grams e.g. `2`: `"these are", "are words"`                                                                                                                                                                                                                                | 
| distance          | `INTEGER`                  | Distance to skip to create skip-grams, e.g. `5` will create skip-grams using the base word (or n-gram) and n-grams from the 5 following words.                                                                                                                                          | 
| sortForDuplicates | `INTEGER`                  | Pass `__ngrams.SORT_NGRAMS` or `__ngrams.DONT_SORT_NGRAMS`. Sorting n-grams alphabetically can help flag up duplicates e.g. when creating a [bag of words/n-grams/skip-grams](https://en.wikipedia.org/wiki/Bag-of-words_model#Example_implementation). If you only care about pairing n-grams by proximity but not by direction, use `__ngrams.DONT_SORT_NGRAMS`. | 

Returns an array of n-grams found near one another within `distance` words (`ARRAY [INTEGER][INTEGER] = STRING`).

```
let words = __ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   ");

let skipGrams = __ngrams.SkipGrams(words, 1, 2, __ngrams.DONT_SORT_NGRAMS);
console.log(skipGrams);
```

Output (truncated):

```
[ [ 'Turning', 'and' ],
  [ 'Turning', 'turning' ],
  [ 'and', 'turning' ],
  [ 'and', 'in' ],
  [ 'turning', 'in' ],
  [ 'turning', 'the' ],
...
```

You can choose instead to pass `__ngrams.SORT_NGRAMS` and this will make direction irrelevant (e.g. it will be easier to sport `["Turning", "and"]` and `["and", "turning"]` as the same words because they are now sorted to `["Turning", "and"]` and `["turning", "and"]`. Using method `BagOfSkipGrams` (passing `__ngrams.CASE_INSENSITIVE`) would then remove one of these as a duplicate.

```
let skipGrams = __ngrams.SkipGrams(words, 1, 2, __ngrams.SORT_NGRAMS);
console.log(skipGrams);
```

Output (truncated):

```
[ [ 'and', 'Turning' ],
  [ 'turning', 'Turning' ],
  [ 'and', 'turning' ],
  [ 'and', 'in' ],
  [ 'in', 'turning' ],
  [ 'the', 'turning' ],
...
```

### :shell: BagOfNgrams

Remove duplicates from an array of words or n-grams. Can be case sensitive or insensitive by passing `__ngrams.CASE_SENSITIVE` or `__ngrams.CASE_INSENSITIVE`.

| Parameter       | Type                       | Description                                                                                                                                                                                                                                              | 
|-----------------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| words           | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`.                                                                                                                                                                                                      | 
| n               | `INTEGER`                  | Size of the n-grams e.g. `2` creates bigrams `["these are", "are words"]`                                                                                                                                                                                | 
| caseSensitivity | `INTEGER`                  | Pass `__ngrams.CASE_SENSITIVE` or `__ngrams.CASE_INSENSITIVE`. Case insensitive calls will ignore differences in case when removing duplicates e.g. `"Turning"`, `"turning"`, `"TURNING"` will all be seen as identical and reduces to just `"Turning"`. | 


## Acknowledgements
- [CSV to Markdown Table Generator](https://donatstudios.com/CsvToMarkdownTable) - Donat Studios




















