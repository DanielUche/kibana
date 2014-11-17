/**
 * ELASTICSEARCH CONFIDENTIAL
 * _____________________________
 *
 *  [2014] Elasticsearch Incorporated All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Elasticsearch Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Elasticsearch Incorporated
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Elasticsearch Incorporated.
 */



define(function () {
  'use strict';

  return function init(api) {
    api.addEndpointDescription('_cluster/nodes/stats');
    api.addEndpointDescription('_cluster/state', {
      patterns: [
        "_cluster/state",
        "_cluster/state/{metrics}",
        "_cluster/state/{metrics}/{indices}"
      ],
      url_components: {
        "metrics": [ "version", "master_node", "nodes", "routing_table", "metadata", "blocks" ]
      }
    });
    api.addEndpointDescription('_cluster/health');
    api.addEndpointDescription('_cluster/pending_tasks');
    api.addEndpointDescription('get_cluster/settings', {
      patterns: [
        '_cluster/settings'
      ]
    });

    api.addEndpointDescription('put_cluster/settings', {
      methods: ['PUT'],
      patterns: [
        '_cluster/settings'
      ],
      data_autocomplete_rules: {
        persistent: {
          'routing.allocation.same_shard.host': { __one_of: [ false, true ]},
          cluster: {
            routing: {
              'allocation.enable': { __one_of: [ "all", "primaries", "new_primaries", "none" ]},
              'allocation.disk.threshold_enabled': { __one_of: [ false, true ]},
              'allocation.disk.watermark.low': '85%',
              'allocation.disk.watermark.high': '90%',
              'allocation.disk.include_relocations': { __one_of: [ true, false]},
              'allocation.disk.reroute_interval': '60s',
              'allocation.exclude': {
                '_ip': "",
                '_name': "",
                '_host': "",
                '_id': ""
              },
              'allocation.include': {
                '_ip': "",
                '_name': "",
                '_host': "",
                '_id': ""
              },
              'allocation.require': {
                '_ip': "",
                '_name': "",
                '_host': "",
                '_id': ""
              },
              'allocation.awareness.attributes': [],
              'cluster.routing.allocation.awareness.force': {
                '*': {
                  'values': []
                }
              },
              'allocation.allow_rebalance': { __one_of: ['always', 'indices_primaries_active', 'indices_all_active']},
              'allocation.cluster_concurrent_rebalance': 2,
              'allocation.node_initial_primaries_recoveries': 4,
              'allocation.node_concurrent_recoveries': 2
            }
          }

        },
        transient: {
          __scope_link: '.persistent'
        }
      }
    });

    api.addEndpointDescription('_cluster/reroute', {
      methods: ['POST'],
      url_params: {
        explain: "__flag__",
        dry_run: "__flag__"
      },
      data_autocomplete_rules: {
        commands: [
          {
            move: {
              __template: {
                index: "",
                shard: 0,
                from_node: "",
                to_node: ""
              },
              index: "{index}",
              shard: 0,
              from_node: "{node}",
              to_node: "{node}"
            },
            cancel: {
              __template: {
                index: "",
                shard: 0,
                node: ""
              },
              index: "{index}",
              shard: 0,
              node: "{node}",
              allow_primary: { __one_of: [true, false]}
            },
            allocate: {
              __template: {
                index: "",
                shard: 0,
                node: ""
              },
              index: "{index}",
              shard: 0,
              node: "{node}",
              allow_primary: { __one_of: [true, false]}
            }
          }
        ],
        dry_run: { __one_of: [true, false]}
      }
    });
  };
});