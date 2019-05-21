echo "Creating $DB_USERNAME user on $MONGO_INITDB_DATABASE database"

mongo ${MONGO_INITDB_DATABASE} \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '$DB_USERNAME', pwd: '$DB_PASSWORD', roles:['readWrite']});"
