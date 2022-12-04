export interface Datetime {
  year(): number;
  month(): number;
}

export class Clock {
  public readonly date: Date;

  constructor(date?: Date) {
    this.date = date || new Date();
  }
}

export function ensureError(error: any): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error(error);
}
