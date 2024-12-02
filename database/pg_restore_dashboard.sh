#!/bin/bash

DATE=`date +'%s'`
FILE=$1
if [[ ! -r ${FILE} ]]; then
    echo "File not readable: ${FILE}"
    exit 1
fi
echo "restore dump: ${FILE}"

psql -p 5434 -U dashboard_django dashboard1 <${FILE}
