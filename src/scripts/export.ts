import * as fs from 'fs';
import * as _ from 'lodash';
import { IPerPersonData, IScrapedDataJSON } from '../dataTypes';
import { buildMessages, IMessage, extractEmojiFromString, extractHashtagsFromString, extractNewLinesFromString, freqMap } from '../helpers';

import { CSVToArray } from './lib';


// Name,Phone,Content,Date,MMS Subject,MMS Link
// Dates are in time-zone they were exported from, so here, in EST
const contents = fs.readFileSync('data/Me_Caitlin.csv').toString();

const records = CSVToArray(contents, ",").slice(1);

const messages = buildMessages(records).filter(m => !!m.message);
const [mattMessages, catMessages] = _.partition(messages, m => m.from === 'matt');

const lastMessageDate = new Date(_.last(messages)!.parsedDate);

function getEmojiFromMessages(messages: IMessage[]): string[] {
  return _.flatten(messages.map(m => extractEmojiFromString(m.message)));
}

function getHashtagsFromMessages(messages: IMessage[]): string[] {
  return _.flatten(messages.map(m => extractHashtagsFromString(m.message)));
}


function getNewLinesFromMessages(messages: IMessage[]): number {
  return _.sum(messages.map(m => extractNewLinesFromString(m.message)));
}

function getNumWordsFromMessages(messages: IMessage[]): number {
  return _.sum(messages.map(m => m.message.split(' ').map(w => w.trim()).filter(w => w).length));
}

function catMattIterator<T>(iterator: (messages: IMessage[]) => T): IPerPersonData<T> {

  return {
    matt: iterator(mattMessages),
    cat: iterator(catMessages),
  }
}

const numHulu = _.uniqBy(catMessages.filter(c => c.message.includes('hulu.com') && c.message.includes('/coviewing')), m => m.parsedDate).length;
const numEmoji = getEmojiFromMessages(messages).length;

function createMetrics(): IScrapedDataJSON {
  return {
    emojiCounts: catMattIterator(messages => freqMap(getEmojiFromMessages(messages))),
    hashtagCounts: catMattIterator(messages => freqMap(getHashtagsFromMessages(messages), _.toLower)),
    numMessages: catMattIterator(messages => messages.length),
    numNewLines: catMattIterator(messages => getNewLinesFromMessages(messages)),
    numWords: catMattIterator(messages => getNumWordsFromMessages(messages)),
    numHulu,
    numEmoji,
    hingeMatchDate: '2021-07-30',
    firstMessageDate: messages[0].parsedDate,
  }
}

const metrics = createMetrics();
fs.writeFileSync('./src/data/_data.json', JSON.stringify(metrics, undefined, 2));