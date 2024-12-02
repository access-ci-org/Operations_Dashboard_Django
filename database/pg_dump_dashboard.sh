#!/bin/bash

DATE=`date +'%s'`
FILE=dump/dashboard.dump.${DATE}
echo "pg_dump to: ${FILE}"

pg_dump -a -p 5434 -U dashboard_django \
    -n dashboard1 \
    dashboard1 >${FILE}

echo "Manually execute:"
echo "DROP OWNED BY dashboard_django;"
echo "CREATE SCHEMA dashboard AUTHORIZATION dashboard_django;"
