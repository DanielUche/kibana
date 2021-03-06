/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { UsersRt } from '../../../../../common/api';
import { RouteDeps } from '../../types';
import { wrapError } from '../../utils';

export function initGetReportersApi({ caseService, router }: RouteDeps) {
  router.get(
    {
      path: '/api/cases/reporters',
      validate: {},
    },
    async (context, request, response) => {
      try {
        const reporters = await caseService.getReporters({
          client: context.core.savedObjects.client,
        });
        return response.ok({ body: UsersRt.encode(reporters) });
      } catch (error) {
        return response.customError(wrapError(error));
      }
    }
  );
}
