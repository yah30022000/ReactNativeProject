import gql from 'graphql-tag';

const clientSchemaExtensions = gql`
    ## basic graphql schema model
    directive @model(
        queries: ModelQueryMap
        mutations: ModelMutationMap
        subscriptions: ModelSubscriptionMap
        timestamps: TimestampConfiguration
    ) repeatable on OBJECT

    input ModelMutationMap {
        create: String
        update: String
        delete: String
    }

    input ModelQueryMap {
        get: String
        list: String
    }

    input ModelSubscriptionMap {
        onCreate: [String]
        onUpdate: [String]
        onDelete: [String]
        level: ModelSubscriptionLevel
    }

    enum ModelSubscriptionLevel {
        off
        public
        on
    }

    input TimestampConfiguration {
        createdAt: String
        updatedAt: String
    }
    
    ## relational modelling
    directive @hasOne(fields: [String!]) on FIELD_DEFINITION
    directive @hasMany(indexName: String, fields: [String!], limit: Int = 100) on FIELD_DEFINITION
    directive @belongsTo(fields: [String!]) on FIELD_DEFINITION
    directive @manyToMany(relationName: String!, limit: Int = 100) on FIELD_DEFINITION
    scalar AWSDateTime

    directive @key(fields: [String!]!, name: String, queryField: String) on OBJECT
    directive @index(name: String, sortKeyFields: [String!], queryField: String) on FIELD_DEFINITION
    
    directive @primaryKey(
        name: String
        fields: [String!]
        queryField: String
        sortKeyFields: String
    ) repeatable on FIELD_DEFINITION
    
    ## auth
    directive @auth(rules: [AuthRule!]!) repeatable on OBJECT | FIELD_DEFINITION
    input AuthRule {
        allow: AuthStrategy!
        provider: AuthProvider
        ownerField: String # defaults to "owner" when using owner auth
        identityClaim: String # defaults to "sub::username" when using owner auth
        groupClaim: String # defaults to "cognito:groups" when using Group auth
        groups: [String]  # Required when using Static Group auth
        groupsField: String # defaults to "groups" when using Dynamic Group auth
        operations: [ModelOperation] # Required for finer control
    }

    enum AuthStrategy { owner groups private public custom }
    enum AuthProvider { apiKey iam oidc userPools function }
    enum ModelOperation {
        create
        update
        delete
        read # Short-hand to allow "get", "list", "sync", "listen", and "search"

        get # Retrieves an individual item
        list # Retrieves a list of items
        sync # Enables ability to sync offline/online changes (including via DataStore)
        listen # Subscribes to real-time changes
        search # Enables ability to search using @searchable directive
    }

    ## lambda function
    directive @function(name: String!, region: String) on FIELD_DEFINITION

    ## api
    directive @http(method: HttpMethod, url: String!, headers: [HttpHeader]) on FIELD_DEFINITION
    enum HttpMethod { PUT POST GET DELETE PATCH }
    input HttpHeader {
        key: String
        value: String
    }

    # Streams data from DynamoDB to OpenSearch and exposes search capabilities.
    directive @searchable(queries: SearchableQueryMap) on OBJECT
    input SearchableQueryMap { search: String }

    ## AI machine learning
    directive @predictions(actions: [PredictionsActions!]!) on FIELD_DEFINITION
    enum PredictionsActions {
        identifyText # uses Amazon Rekognition to detect text
        identifyLabels # uses Amazon Rekognition to detect labels
        convertTextToSpeech # uses Amazon Polly in a lambda to output a presigned url to synthesized speech
        translateText # uses Amazon Translate to translate text from source to target language
    }
    
    
`;
