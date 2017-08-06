"use strict";

/*
	Ngrams (
		ARRAY words [INTEGER] = STRING,
		INTEGER n
	): ARRAY [INTEGER] = STRING
*/
exports.Ngrams = function(words, n)
{
	if(n <= 1)
	{
		return words;
	}
	
	let ngrams = [];
	
	for(let i = 0, c = words.length; i < c; i++)
	{
		if((i + n - 1) < c)
		{
			ngrams.push(words.slice(i, i + n).join(" "));
		}
	}
	
	return ngrams;
}

exports.SORT_NGRAMS = 1;
exports.DONT_SORT_NGRAMS = 2;

/*
	SkipGrams (
		ARRAY words [INTEGER] = STRING,
		INTEGER size,
		INTEGER distance,
		INTEGER sortForDuplicates
	): ARRAY [INTEGER][INTEGER] = STRING
*/
exports.SkipGrams = function(words, size, distance, sortForDuplicates)
{
	let ngrams = this.Ngrams(words, size);
	
	let skipGrams = [];
	
	for(let i = 0, n = ngrams.length; i < n; i++)
	{
		let end = i + 1 + distance;
		
		for(let pos = i + 1; pos < end; pos++)
		{
			if(pos < n)
			{
				if(sortForDuplicates == exports.SORT_NGRAMS)
				{
					skipGrams.push(
						[ngrams[i], ngrams[pos]].sort(
							function(a, b)
							{
								return a.localeCompare(b);
							}
						)
					);
				}
				else
				{
					skipGrams.push(
						[ngrams[i], ngrams[pos]]
					);
				}
			}
			else
			{
				break;
			}
		}
	}
	
	return skipGrams;
}

exports.CASE_SENSITIVE = 1;
exports.CASE_INSENSITIVE = 2;

/*
	BagOfNgrams (
		ARRAY words [INTEGER] = STRING,
		INTEGER n,
		INTEGER caseSensitivity
	): ARRAY [INTEGER] = STRING
*/
exports.BagOfNgrams = function(words, n, caseSensitivity)
{
	let ngrams = this.Ngrams(words, n);
	
	let bag = [];
	let lookup = [];
	
	for(let i in ngrams)
	{
		let id = "_"+ ngrams[i];
		
		if(caseSensitivity == this.CASE_INSENSITIVE)
		{
			id = id.toLowerCase();
		}
		
		if(typeof(lookup[id]) == "undefined")
		{
			bag.push(ngrams[i]);
			
			lookup[id] = true;
		}
	}
	
	return bag;
}

/*
	BagOfWords (
		ARRAY words [INTEGER] = STRING
		INTEGER caseSensitivity
	): ARRAY [INTEGER] = STRING
*/
exports.BagOfWords = function(words, caseSensitivity)
{
	return this.BagOfNgrams(words, 1, caseSensitivity);
}

/*
	BagOfSkipGrams (
		ARRAY words [INTEGER] = STRING,
		INTEGER size,
		INTEGER distance,
		INTEGER sortForDuplicates,
		INTEGER caseSensitivity
	): ARRAY [INTEGER][INTEGER] = STRING
*/
exports.BagOfSkipGrams = function(words, size, distance, sortForDuplicates, caseSensitivity)
{
	let skipGrams = this.SkipGrams(words, size, distance, sortForDuplicates);
	
	if(caseSensitivity == this.CASE_INSENSITIVE)
	{
		for(let i in skipGrams)
		{
			if(sortForDuplicates == this.SORT_NGRAMS)
			{
				skipGrams[i].sort(
					function(a, b)
					{
						return a.toLowerCase().localeCompare(b.toLowerCase());
					}
				);
			}
		}
	}
	
	let bag = [];
	let lookup = [];
	
	for(let i in skipGrams)
	{
		let id = "_"+ JSON.stringify(skipGrams[i]);
		
		if(caseSensitivity == this.CASE_INSENSITIVE)
		{
			id = id.toLowerCase();
		}
		
		if(typeof(lookup[id]) == "undefined")
		{
			bag.push(skipGrams[i]);
			
			lookup[id] = true;
		}
	}
	
	return bag;
}

/*
	SanitiseToWords (
		STRING text
	): ARRAY [INTEGER] = STRING
*/
exports.SanitiseToWords = function(text)
{
	text = text.split("");
	
	let sanitised = "";
	
	let onSpace = true;
	
	for(let i = 0, xLastCharacter = text.length - 1; i <= xLastCharacter; i++)
	{
		if(/^[a-zA-Z0-9\$\£\%]$/.test(text[i]))
		{
			sanitised += text[i];
			onSpace = false;
		}
		else if(text[i] == "'" && i > 0 && i < xLastCharacter)
		{
			if(/^[A-Za-z]{2}$/.test(text[i - 1] + text[i + 1]))
			{
				sanitised +="'";
				onSpace = false;
			}
		}
		else if(!onSpace)
		{
			sanitised +=" ";
			onSpace = true;
		}
	}
	
	return sanitised.trim().split(" ");
}










