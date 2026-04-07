#!/bin/bash

DATE=`date +'%s'`
FILE=dump/dashboard1.dump.${DATE}
echo "pg_dump to: ${FILE}"

pg_dump -a -p 5434 -U dashboard_django \
    -n dashboard_django \
    dashboard1 >${FILE}

echo "Manually execute:"
echo "DROP OWNED BY dashboard_django;"
