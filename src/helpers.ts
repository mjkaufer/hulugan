import * as _ from 'lodash';

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