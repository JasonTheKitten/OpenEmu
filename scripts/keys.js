// Taken from Mimic an modified

/*
Copyright (c) 2016 Jason Chu (1lann) and Bennett Anderson (GravityScore).

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

let keyCodeMap = {
	// ' 
	"222": 40,

	// , 
	"188": 51,

	// - 
	"189": 12,

	// . 
	"190": 52,

	// / 
	"191": 53,

	// 0 
	"48": 11,

	// 1 
	"49": 2,

	// 2 
	"50": 3,

	// 3 
	"51": 4,

	// 4 
	"52": 5,

	// 5 
	"53": 6,

	// 6 
	"54": 7,

	// 7 
	"55": 8,

	// 8 
	"56": 9,

	// 9 
	"57": 10,

	// ; 
	"186": 39,

	// = 
	"187": 13,

	// [ 
	"219": 26,

	// \ 
	"220": 43,

	// ] 
	"221": 27,

	// ` 
	"192": 41,

	// a 
	"65": 30,

	// alt 
	"18": 56,

	// b 
	"66": 48,

	// backspace 
	"8": 14,

	// c 
	"67": 46,

	// capslock 
	"20": 58,

	// ctrl 
	"17": 29,

	// d 
	"68": 32,

	// delete 
	"46": 211,

	// down 
	"40": 208,

	// e 
	"69": 18,

	// end 
	"35": 207,

	// enter 
	"13": 28,

	// escape 
	"27": 1,

	// f 
	"70": 33,

	// f1 
	"112": 59,

	// f10 
	"121": 68,

	// f11 
	"122": 87,

	// f12 
	"123": 88,

	// f2 
	"113": 60,

	// f3 
	"114": 61,

	// f4 
	"115": 62,

	// f5 
	"116": 63,

	// f6 
	"117": 64,

	// f7 
	"118": 65,

	// f8 
	"119": 66,

	// f9 
	"120": 67,

	// g 
	"71": 34,

	// h 
	"72": 35,

	// home 
	"36": 199,

	// i 
	"73": 23,

	// insert 
	"45": 210,

	// j 
	"74": 36,

	// k 
	"75": 37,

	// l 
	"76": 38,

	// left 
	"37": 203,

	// lwin 
	"91": 219,

	// m 
	"77": 50,

	// n 
	"78": 49,

	// numlock 
	"12": 69,

	// numpad* 
	"106": 55,

	// numpad+ 
	"107": 78,

	// numpad- 
	"109": 74,

	// numpad. 
	"110": 83,

	// numpad/ 
	"111": 181,

	// numpad0 
	"96": 82,

	// numpad1 
	"97": 79,

	// numpad2 
	"98": 80,

	// numpad3 
	"99": 81,

	// numpad4 
	"100": 75,

	// numpad5 
	"101": 76,

	// numpad6 
	"102": 77,

	// numpad7 
	"103": 71,

	// numpad8 
	"104": 72,

	// numpad9 
	"105": 73,

	// o 
	"79": 24,

	// p 
	"80": 25,

	// pagedown 
	"34": 209,

	// pageup 
	"33": 201,

	// q 
	"81": 16,

	// r 
	"82": 19,

	// right 
	"39": 205,

	// rwin 
	"92": 220,

	// s 
	"83": 31,

	// shift 
	"16": 42,

	// space 
	"32": 57,

	// t 
	"84": 20,

	// tab 
	"9": 15,

	// u 
	"85": 22,

	// up 
	"38": 200,

	// v 
	"86": 47,

	// w 
	"87": 17,

	// x 
	"88": 45,

	// y 
	"89": 21,

	// z 
	"90": 44,
};