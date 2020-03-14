#!/bin/bash

echo "### Ingesting Code Coverage"
echo ""


BUILD_ID=$1
export BUILD_ID

CI_RUN_URL=$2
export CI_RUN_URL
echo "### debug CI_RUN_URL: ${CI_RUN_URL}"

VAULT_TOKEN=$(cat ~/.vault-token)
export VAULT_TOKEN

VAULT_ADDR=https://secrets.elastic.co:8200
export VAULT_ADDR


#ES_HOST=https://super:changeme@142fea2d3047486e925eb8b223559cae.europe-west1.gcp.cloud.es.io:9243
PATH_TO_SECRET='secret/kibana-issues/prod/coverage/elasticsearch'
HOST_FROM_VAULT=$(vault read -field=host ${PATH_TO_SECRET})
USER_FROM_VAULT=$(vault read -field=username ${PATH_TO_SECRET})
PASS_FROM_VAULT=$(vault read -field=password ${PATH_TO_SECRET})
ES_HOST="https://${USER_FROM_VAULT}:${PASS_FROM_VAULT}/${HOST_FROM_VAULT}"
export ES_HOST

STATIC_SITE_URL_BASE='https://kibana-coverage.elastic.dev'
export STATIC_SITE_URL_BASE

for x in jest functional mocha; do
  echo "### Ingesting coverage for ${x}"

  COVERAGE_SUMMARY_FILE=target/kibana-coverage/${x}-combined/coverage-summary.json

  node scripts/ingest_coverage.js --verbose --path ${COVERAGE_SUMMARY_FILE}
done

echo "###  Ingesting Code Coverage - Complete"
echo ""
