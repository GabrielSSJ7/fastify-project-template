#!/bin/sh
set -a
source .env
echo CONNECTION $AGENDA_MONGO_URL
echo JOBS COLLECTION $AGENDA_COLLECTION
npx agendash --db=$AGENDA_MONGO_URL --collection=${AGENDA_COLLECTION} --port=$PORT
