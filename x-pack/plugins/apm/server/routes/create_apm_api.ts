/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  staticIndexPatternRoute,
  dynamicIndexPatternRoute
} from './index_pattern';
import {
  errorDistributionRoute,
  errorGroupsRoute,
  errorsRoute
} from './errors';
import {
  serviceAgentNameRoute,
  serviceTransactionTypesRoute,
  servicesRoute,
  serviceNodeMetadataRoute,
  serviceAnnotationsRoute
} from './services';
import {
  agentConfigurationRoute,
  agentConfigurationSearchRoute,
  deleteAgentConfigurationRoute,
  listAgentConfigurationEnvironmentsRoute,
  listAgentConfigurationServicesRoute,
  createOrUpdateAgentConfigurationRoute,
  agentConfigurationAgentNameRoute
} from './settings/agent_configuration';
import {
  apmIndexSettingsRoute,
  apmIndicesRoute,
  saveApmIndicesRoute
} from './settings/apm_indices';
import { metricsChartsRoute } from './metrics';
import { serviceNodesRoute } from './service_nodes';
import { tracesRoute, tracesByIdRoute } from './traces';
import { transactionByTraceIdRoute } from './transaction';
import {
  transactionGroupsBreakdownRoute,
  transactionGroupsChartsRoute,
  transactionGroupsDistributionRoute,
  transactionGroupsRoute,
  transactionGroupsAvgDurationByCountry,
  transactionGroupsAvgDurationByBrowser
} from './transaction_groups';
import {
  errorGroupsLocalFiltersRoute,
  metricsLocalFiltersRoute,
  servicesLocalFiltersRoute,
  tracesLocalFiltersRoute,
  transactionGroupsLocalFiltersRoute,
  transactionsLocalFiltersRoute,
  serviceNodesLocalFiltersRoute,
  uiFiltersEnvironmentsRoute
} from './ui_filters';
import { createApi } from './create_api';
import { serviceMapRoute, serviceMapServiceNodeRoute } from './service_map';
import { indicesPrivilegesRoute } from './security';
import {
  createCustomLinkRoute,
  updateCustomLinkRoute,
  deleteCustomLinkRoute,
  listCustomLinksRoute
} from './settings/custom_link';

const createApmApi = () => {
  const api = createApi()
    // index pattern
    .add(staticIndexPatternRoute)
    .add(dynamicIndexPatternRoute)

    // Errors
    .add(errorDistributionRoute)
    .add(errorGroupsRoute)
    .add(errorsRoute)

    // Services
    .add(serviceAgentNameRoute)
    .add(serviceTransactionTypesRoute)
    .add(servicesRoute)
    .add(serviceNodeMetadataRoute)
    .add(serviceAnnotationsRoute)

    // Agent configuration
    .add(agentConfigurationAgentNameRoute)
    .add(agentConfigurationRoute)
    .add(agentConfigurationSearchRoute)
    .add(deleteAgentConfigurationRoute)
    .add(listAgentConfigurationEnvironmentsRoute)
    .add(listAgentConfigurationServicesRoute)
    .add(createOrUpdateAgentConfigurationRoute)

    // APM indices
    .add(apmIndexSettingsRoute)
    .add(apmIndicesRoute)
    .add(saveApmIndicesRoute)

    // Metrics
    .add(metricsChartsRoute)
    .add(serviceNodesRoute)

    // Traces
    .add(tracesRoute)
    .add(tracesByIdRoute)

    // Transaction groups
    .add(transactionGroupsBreakdownRoute)
    .add(transactionGroupsChartsRoute)
    .add(transactionGroupsDistributionRoute)
    .add(transactionGroupsRoute)
    .add(transactionGroupsAvgDurationByBrowser)
    .add(transactionGroupsAvgDurationByCountry)

    // UI filters
    .add(errorGroupsLocalFiltersRoute)
    .add(metricsLocalFiltersRoute)
    .add(servicesLocalFiltersRoute)
    .add(tracesLocalFiltersRoute)
    .add(transactionGroupsLocalFiltersRoute)
    .add(transactionsLocalFiltersRoute)
    .add(serviceNodesLocalFiltersRoute)
    .add(uiFiltersEnvironmentsRoute)

    // Transaction
    .add(transactionByTraceIdRoute)

    // Service map
    .add(serviceMapRoute)
    .add(serviceMapServiceNodeRoute)

    // security
    .add(indicesPrivilegesRoute)

    // Custom links
    .add(createCustomLinkRoute)
    .add(updateCustomLinkRoute)
    .add(deleteCustomLinkRoute)
    .add(listCustomLinksRoute);

  return api;
};

export type APMAPI = ReturnType<typeof createApmApi>;

export { createApmApi };
