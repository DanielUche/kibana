/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

// This should be an enumerated list
export type Context = string;

export interface RequestPayloadConfig {
  code?: string;
  context?: string;
  parameters?: string;
  index?: string;
  document?: string;
}

export enum PayloadFormat {
  UGLY = 'ugly',
  PRETTY = 'pretty',
}

export interface Response {
  error?: ExecutionError | Error;
  result?: string;
}

export type ExecutionErrorScriptStack = string[];

export interface ExecutionErrorPosition {
  start: number;
  end: number;
  offset: number;
}

export interface ExecutionError {
  script_stack?: ExecutionErrorScriptStack;
  caused_by?: {
    type: string;
    reason: string;
  };
  message?: string;
  position: ExecutionErrorPosition;
  script: string;
}
