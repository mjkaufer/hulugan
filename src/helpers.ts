import * as _ from 'lodash';
import { IPerPersonData } from './dataTypes';

export function padLeft(input: string | number, paddingChar: string, minLength: number): string {
  let base = input.toString();

  while (base.length < minLength) {
    base = paddingChar + base
  }

  return base;
}

// day starts at 6am, otherwise round it back
// string in format YYYY-MM-DD
export function roundTimestampToStandardDateStr(date: Date): string {
  // Subtract 6 hrs
  const translatedDate = new Date(date.getTime() - 6 * 60 * 60 * 1000);

  return `${translatedDate.getFullYear()}-${padLeft(translatedDate.getMonth() + 1, '0', 2)}-${padLeft(translatedDate.getDate(), '0', 2)}`
}

export function extractEmojiFromString(c: string): string[] {

  // @ts-ignore TODO use later compiler version
  const iterator = c.matchAll(/\p{Emoji}/ugi)

  const out: string[] = [];

  let nextVal = iterator.next();
  while (!nextVal.done) {
    const value = nextVal.value[0];
    if (!/\d/.test(value) && value !== '#') {
      out.push(value)
    }
    nextVal = iterator.next();
  }

  return out;
}

export function extractHashtagsFromString(c: string): string[] {

  // @ts-ignore TODO use later compiler version
  const iterator = c.matchAll(/#[A-Za-z\d]*/ugi)

  const out: string[] = [];

  let nextVal = iterator.next();
  while (!nextVal.done) {
    const value = nextVal.value[0];
    if (value.length > 2) {
      out.push(value)
    }
    nextVal = iterator.next();
  }

  return out;
}

const BORING_WORDS: string[] = [
  'the',
  'you',
  'but',
  'for',
  'and',
  'that',
  'was',
  'are',
  'this',
  'can',
  'also',
  'your',
  'have',
  'what',
  'some',
  'get',
  'too',
  'there',
  'like',
  "i'm",
  "i'll",
  "it's",
  "its",
  "i've",
  'had',
  'did',
  'they',
  'in',
  'of',
  'to',
  'i',
  'a',
  'is',
];

const BANNED_WORDS: string[] = [
  'https',
]

export function extractWordsFromString(c: string, skipBoringWords: boolean = false, skipTwoLetters: boolean = true): string[] {
  // @ts-ignore TODO use later compiler version
  const iterator = c.matchAll(/[A-Za-z-']*/ugi)

  const out: string[] = [];

  let nextVal = iterator.next();
  while (!nextVal.done) {
    const value = nextVal.value[0].toLowerCase();
    if (value.length > (skipTwoLetters ? 2 : 0) && !BANNED_WORDS.includes(value) && (!skipBoringWords || !BORING_WORDS.includes(value))) {
      out.push(value)
    }
    nextVal = iterator.next();
  }

  return out;
}

const EXCLUDE_NGRAMS = [
  'spotify com',
  'open spotify com',
  'open spotify',
  'hulu com',
  'www hulu com',
  'www hulu',
  'hulu com',
  'spotify com track',
  'hulu com watch',
  'spotify com playlist'
]

export function extractNGrams(c: string, n: number): string[] {
  const words = extractWordsFromString(c, false, false);

  const out: string[] = [];

  /*
    hello world, n = 2
    hello, currIndex = 0, 0 < 1, return
    world, currIndex = 1, !1 < 1, continue

    i = -n = -2
  */

  words.forEach((w, currIndex) => {
    if (currIndex < n - 1) {
      return;
    }

    let word = '';
    let isSuperBoring = true;
    for (let i = -n + 1; i <= 0; i++) {
      word = word + words[i + currIndex] + ' '
      if (!BORING_WORDS.includes(words[i + currIndex])) {
        isSuperBoring = false;
      }
    }

    if (!isSuperBoring) {
      word = word.trim().toLowerCase();
  
      
      if (!EXCLUDE_NGRAMS.includes(word)) {
        out.push(word)
      }
    }
  })

  return out;
}

export function buildMessages(csv: string[][]): IMessage[] {
  const messages: IMessage[] = [];
  csv.forEach(row => {
    const rawDate = new Date(row[3]);
    messages.push({
      from: row[0] === "Me" ? 'matt' : 'cat',
      message: row[2],
      rawDate,
      parsedDate: roundTimestampToStandardDateStr(rawDate)
    })
  })
  return messages;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function numDayDiff(day1: Date, day2: Date) {
  return Math.round((day1.getTime() - day2.getTime()) / DAY_MS);
}

export interface IMessage {
  from: 'matt' | 'cat';
  message: string;
  rawDate: Date; // currently EST
  parsedDate: string; // YYYY-MM-DD
}

export function freqMap(arr: string[], transform: (s: string) => string = _.identity): Record<string, number> {
  const out: Record<string, number> = {};

  arr.forEach(_el => {
    const key = transform(_el);
    if (!out[key]) {
      out[key] = 0;
    }
    out[key]++;
  });

  return out;
}

export function extractNewLinesFromString(str: string): number {
  return str.replace(/(\n)+/gi, '\n').trim().split('\n').filter(m => m).length;
}

export function commaFormat(_num: number): string {
  let [num, dec] = _num.toString().split('.');
  let output = '';
  output = num.slice(-3);
  num = num.slice(0, -3);

  while (num) {
    output = num.slice(-3) + ',' + output;
    num = num.slice(0, -3);
  }

  if (dec) {
    output += '.' + dec;
  }

  return output;
}

interface IPersonResults {
  name: 'matt' | 'caitlin';
  value: number;
}

export interface ISortedPersonResults {greater: IPersonResults, lesser: IPersonResults}

export function sortPersonData(data: IPerPersonData<number>): ISortedPersonResults {
  const matt: IPersonResults = {
    name: 'matt',
    value: data.matt,
  };
  const cat: IPersonResults = {
    name: 'caitlin',
    value: data.cat,
  };

  if (data.matt > data.cat) {
    return {greater: matt, lesser: cat}
  } else {
    return {greater: cat, lesser: matt}
  }
}

interface IFreqCount {
  value: string;
  count: number;
}
export function getSortedFreqMap(freqMap: Record<string, number>, n: number = 10): IFreqCount[] {
  const countEmoji = _.map(freqMap, (count, value) => ({value, count}));

  const sortedEmoji = _.sortBy(countEmoji, e => -e.count);

  return n > 0 ? sortedEmoji.slice(0, n) : sortedEmoji;
}