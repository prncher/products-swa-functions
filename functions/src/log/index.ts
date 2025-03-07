import { InvocationContext } from "@azure/functions";

export class Logger {
  private context: InvocationContext;

  constructor(context: InvocationContext) {
    this.context = context;
  }

  public error(...args: unknown[]) {
    this.context.error(...args);
  }

  public log(...args: unknown[]) {
    this.context.log(...args);
  }
}