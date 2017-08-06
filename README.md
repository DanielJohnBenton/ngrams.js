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

- [Ngrams](https://github.com/DanielJohnBenton/ngrams.js#shell-ngrams)
- [SkipGrams](https://github.com/DanielJohnBenton/ngrams.js#shell-skipgrams)
- [BagOfNgrams](https://github.com/DanielJohnBenton/ngrams.js#shell-bagofngrams)
- [BagOfWords](https://github.com/DanielJohnBenton/ngrams.js#shell-bagofwords)
- [BagOfSkipGrams](https://github.com/DanielJohnBenton/ngrams.js#shell-bagofskipgrams)
- [ConcatSkipGrams](https://github.com/DanielJohnBenton/ngrams.js#shell-concatskipgrams)
- [SanitiseToWords](https://github.com/DanielJohnBenton/ngrams.js#shell-sanitisetowords)

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

Generates n-grams and removes duplicates. Can be case sensitive or insensitive by passing `__ngrams.CASE_SENSITIVE` or `__ngrams.CASE_INSENSITIVE`.

| Parameter       | Type                       | Description                                                                                                                                                                                                                                              | 
|-----------------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| words           | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`.                                                                                                                                                                                                      | 
| n               | `INTEGER`                  | Size of the n-grams e.g. `2` creates bigrams `["these are", "are words"]`                                                                                                                                                                                | 
| caseSensitivity | `INTEGER`                  | Pass `__ngrams.CASE_SENSITIVE` or `__ngrams.CASE_INSENSITIVE`. Case insensitive calls will ignore differences in case when removing duplicates e.g. `"Turning"`, `"turning"`, `"TURNING"` will all be seen as identical and reduced to just `"Turning"`. | 

Returns an array of n-grams with duplicates removed (`ARRAY [INTEGER] = STRING`).

```
let words = __ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   ");

let bagOfWords = __ngrams.BagOfNgrams(words, 1, __ngrams.CASE_INSENSITIVE);
console.log(bagOfWords);
```

Output:

```
[ 'Turning',
  'and',
  'in',
  'the',
  'widening',
  'gyre',
  'falcon',
  'cannot',
  'hear',
  'falconer',
  'Things',
  'fall',
  'apart',
  'centre',
  'hold',
  'Mere',
  'anarchy',
  'is',
  'loosed',
  'upon',
  'world' ]
```

### :shell: BagOfWords

This is just a wrapper function for readability that calls BagOfNgrams with a n-gram size (`n`) of `1`.

| Parameter       | Type                       | Description                                                                                                                                                                                                                                              | 
|-----------------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| words           | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`.                                                                                                                                                                                                      | 
| caseSensitivity | `INTEGER`                  | Pass `__ngrams.CASE_SENSITIVE` or `__ngrams.CASE_INSENSITIVE`. Case insensitive calls will ignore differences in case when removing duplicates e.g. `"Turning"`, `"turning"`, `"TURNING"` will all be seen as identical and reduces to just `"Turning"`. | 

Returns an array of words with duplicates removed (`ARRAY [INTEGER] = STRING`).

```
let bagOfWords = __ngrams.BagOfWords(words, __ngrams.CASE_INSENSITIVE);
```

### :shell: BagOfSkipGrams

Generates skip-grams and removes duplicates. Can ignore direction by passing `__ngrams.SORT_NGRAMS`. Can be case insensitive by passing `__ngrams.CASE_INSENSITIVE`.

| Parameter         | Type                       | Description                                                                                                                                                                                                                                                                                                                                                        | 
|-------------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| words             | `ARRAY [INTEGER] = STRING` | An array of words e.g. `["these", "are", "words"]`                                                                                                                                                                                                                                                                                                                 | 
| size              | `INTEGER`                  | Size of the n-grams e.g. `2`: `"these are", "are words"`                                                                                                                                                                                                                                                                                                           | 
| distance          | `INTEGER`                  | Distance to skip to create skip-grams, e.g. `5` will create skip-grams using the base word (or n-gram) and n-grams from the 5 following words.                                                                                                                                                                                                                     | 
| sortForDuplicates | `INTEGER`                  | Pass `__ngrams.SORT_NGRAMS` or `__ngrams.DONT_SORT_NGRAMS`. Sorting n-grams alphabetically can help flag up duplicates e.g. when creating a [bag of words/n-grams/skip-grams](https://en.wikipedia.org/wiki/Bag-of-words_model#Example_implementation). If you only care about pairing n-grams by proximity but not by direction, use `__ngrams.DONT_SORT_NGRAMS`. | 
| caseSensitivity   | `INTEGER`                  | Pass `__ngrams.CASE_SENSITIVE` or `__ngrams.CASE_INSENSITIVE`. Case insensitive calls will ignore differences in case when removing duplicates e.g. `"Turning"`, `"turning"`, `"TURNING"` will all be seen as identical and reduces to just `"Turning"`.                                                                                                           | 

Returns an array of arrays of paired n-grams `ARRAY [INTEGER][INTEGER] = STRING`.

Case sensitive, direction sensitive:

```
let words = "Something and SOMETHING and something and something".split(" ");

let skipGrams = __ngrams.BagOfSkipGrams(words, 2, 2, __ngrams.DONT_SORT_NGRAMS, __ngrams.CASE_SENSITIVE);
console.log(skipGrams);
```

Output:

```
[ [ 'Something and', 'and SOMETHING' ],
  [ 'Something and', 'SOMETHING and' ],
  [ 'and SOMETHING', 'SOMETHING and' ],
  [ 'and SOMETHING', 'and something' ],
  [ 'SOMETHING and', 'and something' ],
  [ 'SOMETHING and', 'something and' ],
  [ 'and something', 'something and' ],
  [ 'and something', 'and something' ],
  [ 'something and', 'and something' ] ]
```

Case sensitive, direction insensitive `__ngrams.BagOfSkipGrams(words, 2, 2, __ngrams.SORT_NGRAMS, __ngrams.CASE_SENSITIVE)`:

```
[ [ 'and SOMETHING', 'Something and' ],
  [ 'Something and', 'SOMETHING and' ],
  [ 'and SOMETHING', 'SOMETHING and' ],
  [ 'and something', 'and SOMETHING' ],
  [ 'and something', 'SOMETHING and' ],
  [ 'something and', 'SOMETHING and' ],
  [ 'and something', 'something and' ],
  [ 'and something', 'and something' ] ]
```

Case insensitive, direction insensitive `__ngrams.BagOfSkipGrams(words, 2, 2, __ngrams.SORT_NGRAMS, __ngrams.CASE_INSENSITIVE)`:

```
[ [ 'and SOMETHING', 'Something and' ],
  [ 'Something and', 'SOMETHING and' ],
  [ 'and something', 'and SOMETHING' ] ]
```

Case insensitive, direction sensitive `__ngrams.BagOfSkipGrams(words, 2, 2, __ngrams.SORT_NGRAMS, __ngrams.CASE_SENSITIVE)`:

```
[ [ 'and SOMETHING', 'Something and' ],
  [ 'Something and', 'SOMETHING and' ],
  [ 'and SOMETHING', 'SOMETHING and' ],
  [ 'and something', 'and SOMETHING' ],
  [ 'and something', 'SOMETHING and' ],
  [ 'something and', 'SOMETHING and' ],
  [ 'and something', 'something and' ],
  [ 'and something', 'and something' ] ]
```

### :shell: ConcatSkipGrams

Pass skip-grams through this method if you would prefer a simpler array of strings where skip-grams have been concatenated into a single string.

| Parameter | Type                                | Description                                                                                                                                                                  | 
|-----------|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| skipGrams | `ARRAY [INTEGER][INTEGER] = STRING` | An array of skip-grams created using `SkipGrams` or `BagOfSkipGrams` which you want to simplify into `ARRAY [INTEGER] = STRING` by joining each n-gram pair into one string. | 

Example:

```
let skipGrams = __ngrams.SkipGrams(["these", "are", "some", "words"], 2, 2, __ngrams.DONT_SORT_NGRAMS);

skipGrams = __ngrams.ConcatSkipGrams(skipGrams);
console.log(skipGrams);
```

Output:

```
[ 'these are are some',
  'these are some words',
  'are some some words' ]
```

### :shell: SanitiseToWords

A rudimentary method that attempts to refine messy text into an array of words.

| Parameter | Type     | Description                                   | 
|-----------|----------|-----------------------------------------------| 
| text      | `STRING` | The source text you want to split into words. | 

Note that this is mainly only good for English-language text - it does not support accented characters etc.

Its approach is to replace anything outwith a small list of allowable characters with a space, avoiding any double spacing, and then split by those spaces.

This works quite well for many English-language texts - with the occasional mistake.

However, you may prefer to roll your own sanitisation/splitting/[tokenisation method](https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization) based more closely on your source text(s). You might like to use this '[natural](https://github.com/NaturalNode/natural#tokenizers)' library's tokenizers.

```
let words = __ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   ");
console.log(words);
```

Output:

```
[ 'Turning', 'and', 'turning', 'in', 'the', 'widening', 'gyre', 
	'The', 'falcon', 'cannot', 'hear', 'the', 'falconer', 
	'Things', 'fall', 'apart', 'the', 'centre', 'cannot', 'hold', 
	'Mere', 'anarchy', 'is', 'loosed', 'upon', 'the', 'world' ]
```

## Interesting/Useful Links
- [natural](https://github.com/NaturalNode/natural) - an NLP library for Node.js
- [n-gram](https://en.wikipedia.org/wiki/N-gram) - Wikipedia

## Acknowledgements
- [CSV to Markdown Table Generator](https://donatstudios.com/CsvToMarkdownTable) - Donat Studios
- [Emoji cheat sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/) - WebpageFX
