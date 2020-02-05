/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as readline from 'readline';
import * as fs from 'fs';
import { resolve } from 'path';
import { pretty } from './utils';
import * as rawData from '../../cc_app/public/initial_data_raw.js';

export const parseAndPopulate = buildNumber => srcFile => destFile => log => {
  const logV = verbose(log);
  logV({ 'buildNumber': buildNumber, 'srcFile': srcFile, 'destFile': destFile });
  const [resolvedSrcFile, resolvedDestFile] = resolvePaths(srcFile, destFile);
  logV({ 'resolvedSrcFile': resolvedSrcFile, 'resolvedDestFile': resolvedDestFile });

  const initialData = dedupe(rawData);

  const historicalItems = [];
  const mutateHistorical = onLineRead(historicalItems)
  const onErr = x => log.error(`!!! ${x}`);
  const mutateInital = onComplete(initialData);

  const rl = readline.createInterface({ input: fs.createReadStream(resolvedSrcFile) });
  fromEvent(rl, 'line')
    .pipe(takeUntil(fromEvent(rl, 'close')))
    .subscribe(mutateHistorical, onErr, () => mutateInital(historicalItems, log));

};

function onLineRead(xs) {
  return function pushOntoHistoricalItems(x) {
    xs.push(x);
  }
}

function onComplete(initData) {
  return function mutateInitalData(xs, log) {
    initData.historicalItems = xs;
    log.debug(pretty(initData));
    log.debug('### Completed');
  }
}

function dedupe(obj) {
  return obj.default.default;
}

function resolvePaths(...xs) {
  return xs.map(x => resolve(kibanaRoot(), x));
}

function kibanaRoot() {
  const KIBANA_ROOT_PATH = '../../../../..';
  return resolve(__dirname, KIBANA_ROOT_PATH);
}

function verbose(log) {
  return function verboseInner(obj) {
    return Object.entries(obj).forEach(xs => log.verbose(`### ${xs[0]} -> ${xs[1]}`));
  };
}