export interface IPerPersonData<T extends any = never> {
  matt: T;
  cat: T;
}


export interface IScrapedDataJSON {
  emojiCounts: IPerPersonData<Record<string, number>>;
  hashtagCounts: IPerPersonData<Record<string, number>>;
  interestingWordCounts: IPerPersonData<Record<string, number>>;
  wordCounts: IPerPersonData<Record<string, number>>;
  numMessages: IPerPersonData<number>;
  numWords: IPerPersonData<number>;
  numNewLines: IPerPersonData<number>;
  numEmoji: IPerPersonData<number>;
  numHashtags: IPerPersonData<number>;
  numHulu: number;
  hingeMatchDate: string;
  firstMessageDate: string;
}