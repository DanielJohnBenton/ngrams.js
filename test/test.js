"use strict";

let __ngrams = require("ngrams");

let words = __ngrams.SanitiseToWords("   Turning and turning in the widening gyre\r\n    The falcon cannot hear the falconer;\r\n    Things fall apart; the centre cannot hold;\r\n    Mere anarchy is loosed upon the world   ");

let output = "";

function Output(text)
{
	console.log(text);
	
	output += text +"\n";
}

Output("");
Output("################################ N GRAMS ################################");
Output("");

for(let i = 1; i <= 5; i++)
{
	Output("---");
	Output("N-gram size: "+ i);
	Output(__ngrams.Ngrams(words, i).join(" / "));
}

Output("---");
Output("N-gram size: "+ words.length);
Output(__ngrams.Ngrams(words, words.length));

Output("---");
Output("N-gram size: "+ Number(words.length + 1));
Output(__ngrams.Ngrams(words, Number(words.length + 1)));

Output("");
Output("############################## SKIP GRAMS ###############################");
Output("");

let pieces = [ [1, 1], [1, 5], [2, 5], [3, 5] ];

for(let rip in pieces)
{
	Output("---");
	Output("N: "+ pieces[rip][0] +" Skip: "+ pieces[rip][1] +" (with sorting)");
	
	let skipGrams = __ngrams.SkipGrams(words, pieces[rip][0], pieces[rip][1], __ngrams.SORT_NGRAMS);
	
	for(let i in skipGrams)
	{
		Output("--> "+ skipGrams[i][0] +" / "+ skipGrams[i][1]);
	}
}

Output("---");
Output("N: "+ pieces[0][0] +" Skip: "+ pieces[0][1] +" (WITHOUT sorting)");

let skipGrams = __ngrams.SkipGrams(words, pieces[0][0], pieces[0][1], __ngrams.DONT_SORT_NGRAMS);

for(let i in skipGrams)
{
	Output("--> "+ skipGrams[i][0] +" / "+ skipGrams[i][1]);
}

Output("");
Output("############################## BAG OF NGRAMS ###############################");
Output("");

let settings = [ [1, __ngrams.CASE_SENSITIVE], [1, __ngrams.CASE_INSENSITIVE], [2, __ngrams.CASE_INSENSITIVE] ];

for(let i in settings)
{
	Output("---");
	Output("N: "+ settings[i][0]		+" Case sensitive: "+ ((settings[i][1] == __ngrams.CASE_SENSITIVE) ? "YES" : "NO"));
	Output(__ngrams.BagOfNgrams(words, settings[i][0], settings[i][1]).join(" / "));
}

Output("");
Output("############################## BAG OF SKIPGRAMS ###############################");
Output("");

let words2 = "this and That are that and this".split(" ");

settings = [ [1, 5, __ngrams.SORT_NGRAMS, __ngrams.CASE_INSENSITIVE], [1, 5, __ngrams.DONT_SORT_NGRAMS, __ngrams.CASE_INSENSITIVE], [1, 5, __ngrams.SORT_NGRAMS, __ngrams.CASE_SENSITIVE] ];

for(let i in settings)
{
	Output("---");
	Output("N: "+ settings[i][0] +" Skip: "+ settings[i][1] +" Sort ngrams: "+ ((settings[i][2] == __ngrams.CASE_SENSITIVE) ? "YES" : "NO") +" Case sensitive: "+ ((settings[i][3] == __ngrams.SORT_NGRAMS) ? "YES" : "NO"));
	
	let bag = __ngrams.BagOfSkipGrams(words2, settings[i][0], settings[i][1], settings[i][2], settings[i][3]);
	
	for(let i in bag)
	{
		Output("--> "+ bag[i][0] +" / "+ bag[i][1]);
	}
}

Output("");
Output("############################## BAG OF WORDS ###############################");
Output("");

Output("---")
Output("Case sensitive: NO");
Output(__ngrams.BagOfWords(words, __ngrams.CASE_INSENSITIVE).join(" / "));

Output("---")
Output("Case sensitive: YES");
Output(__ngrams.BagOfWords(words, __ngrams.CASE_SENSITIVE).join(" / "));

require("fs").writeFileSync("ngrams_test_output.log", output, "utf8");







