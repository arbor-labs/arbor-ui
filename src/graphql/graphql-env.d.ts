/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Account': { kind: 'OBJECT'; name: 'Account'; fields: { 'address': { name: 'address'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EthereumAddress'; ofType: null; }; } }; 'avatarUrl': { name: 'avatarUrl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'collaboratedProjects': { name: 'collaboratedProjects'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Project'; ofType: null; }; }; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'createdProjects': { name: 'createdProjects'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Project'; ofType: null; }; }; }; } }; 'displayName': { name: 'displayName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'onboardingSignature': { name: 'onboardingSignature'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EthereumSignature'; ofType: null; }; } }; 'stems': { name: 'stems'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Stem'; ofType: null; }; }; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'voterIdentities': { name: 'voterIdentities'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'SemaphoreIdentity'; ofType: null; }; }; }; } }; }; };
    'Boolean': unknown;
    'CreateAccountInput': { kind: 'INPUT_OBJECT'; name: 'CreateAccountInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EthereumAddress'; ofType: null; }; }; defaultValue: null }, { name: 'signature'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EthereumSignature'; ofType: null; }; }; defaultValue: null }]; };
    'CreateProjectInput': { kind: 'INPUT_OBJECT'; name: 'CreateProjectInput'; isOneOf: false; inputFields: [{ name: 'bpm'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }, { name: 'createdBy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EthereumAddress'; ofType: null; }; }; defaultValue: null }, { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'tags'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; }; defaultValue: "[]" }, { name: 'trackLimit'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }]; };
    'DateTime': unknown;
    'EthereumAddress': unknown;
    'EthereumSignature': unknown;
    'ID': unknown;
    'Int': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createAccount': { name: 'createAccount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; 'createProject': { name: 'createProject'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Project'; ofType: null; }; } }; 'findOrCreateAccount': { name: 'findOrCreateAccount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; }; };
    'PaginatedAccounts': { kind: 'OBJECT'; name: 'PaginatedAccounts'; fields: { 'items': { name: 'items'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; }; } }; 'meta': { name: 'meta'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PaginationMeta'; ofType: null; }; } }; }; };
    'PaginatedProjects': { kind: 'OBJECT'; name: 'PaginatedProjects'; fields: { 'items': { name: 'items'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Project'; ofType: null; }; }; } }; 'meta': { name: 'meta'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PaginationMeta'; ofType: null; }; } }; }; };
    'PaginationMeta': { kind: 'OBJECT'; name: 'PaginationMeta'; fields: { 'currentPage': { name: 'currentPage'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'itemCount': { name: 'itemCount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'itemType': { name: 'itemType'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'itemsPerPage': { name: 'itemsPerPage'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'totalItems': { name: 'totalItems'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'totalPages': { name: 'totalPages'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'Project': { kind: 'OBJECT'; name: 'Project'; fields: { 'bpm': { name: 'bpm'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'collaborators': { name: 'collaborators'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'createdBy': { name: 'createdBy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; 'description': { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'queue': { name: 'queue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'ProjectQueue'; ofType: null; }; } }; 'stems': { name: 'stems'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Stem'; ofType: null; }; }; } }; 'tags': { name: 'tags'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; }; } }; 'trackLimit': { name: 'trackLimit'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'votingGroup': { name: 'votingGroup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'VotingGroup'; ofType: null; }; } }; }; };
    'ProjectQueue': { kind: 'OBJECT'; name: 'ProjectQueue'; fields: { 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'stems': { name: 'stems'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'QueuedStem'; ofType: null; }; }; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'account': { name: 'account'; type: { kind: 'OBJECT'; name: 'Account'; ofType: null; } }; 'accounts': { name: 'accounts'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PaginatedAccounts'; ofType: null; }; } }; 'project': { name: 'project'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Project'; ofType: null; }; } }; 'projects': { name: 'projects'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PaginatedProjects'; ofType: null; }; } }; }; };
    'QueuedStem': { kind: 'OBJECT'; name: 'QueuedStem'; fields: { 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'queue': { name: 'queue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'ProjectQueue'; ofType: null; }; } }; 'stem': { name: 'stem'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Stem'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'votes': { name: 'votes'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'SemaphoreIdentity': { kind: 'OBJECT'; name: 'SemaphoreIdentity'; fields: { 'account': { name: 'account'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; 'commitment': { name: 'commitment'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'group': { name: 'group'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'VotingGroup'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'nullifier': { name: 'nullifier'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'trapdoor': { name: 'trapdoor'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; }; };
    'SortInput': { kind: 'INPUT_OBJECT'; name: 'SortInput'; isOneOf: false; inputFields: [{ name: 'asc'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; }; defaultValue: null }, { name: 'key'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'Stem': { kind: 'OBJECT'; name: 'Stem'; fields: { 'audioHref': { name: 'audioHref'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'audioUrl': { name: 'audioUrl'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'bpm': { name: 'bpm'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'createdBy': { name: 'createdBy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; 'description': { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'filename': { name: 'filename'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'filesize': { name: 'filesize'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'filetype': { name: 'filetype'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'metadataUrl': { name: 'metadataUrl'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'projectsAddedTo': { name: 'projectsAddedTo'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Project'; ofType: null; }; }; }; } }; 'tags': { name: 'tags'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; }; } }; 'type': { name: 'type'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; }; };
    'String': unknown;
    'VotingGroup': { kind: 'OBJECT'; name: 'VotingGroup'; fields: { 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'members': { name: 'members'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'SemaphoreIdentity'; ofType: null; }; }; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; }; };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}