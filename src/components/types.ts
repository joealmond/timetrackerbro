
export interface DatePartsRules {
  hours?: DatePartsRule;
  minutes?: DatePartsRule;
  seconds?: DatePartsRule;
  milliseconds?: DatePartsRule;
}

export type DatePartsRule =
  | number
  | Array<number>
  | NumberRuleConfig
  | DateParts;

export interface NumberRuleConfig {
  min?: number;
  max?: number;
  interval?: number;
}

export interface DateParts {
  dayIndex: number;
  day: number;
  dayFromEnd: number;
  weekday: number;
  weekdayOrdinal: number;
  weekdayOrdinalFromEnd: number;
  week: number;
  weekFromEnd: number;
  weeknumber: number;
  month: number;
  year: number;
  date: Date;
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  time: number;
  dateTime: number;
  isValid: boolean;
  timezoneOffset: number;
  isPm?: boolean;
}

export interface Emits {
  (e: 'show-message', msg: string): void;
  (e: 'update-date-to-present'): void;
}
