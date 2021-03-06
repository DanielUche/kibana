/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import * as rt from 'io-ts';

export const UserRT = rt.type({
  full_name: rt.union([rt.undefined, rt.string]),
  username: rt.string,
});

export const UsersRt = rt.array(UserRT);

export type User = rt.TypeOf<typeof UserRT>;
