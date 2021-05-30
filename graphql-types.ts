export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents untyped JSON */
  JSON: any;
};

export type AffiliationInput = {
  id: Scalars['Int'];
  tenantName: Scalars['String'];
};

/** Autogenerated return type of CreateUserMutation */
export type CreateUserMutationPayload = {
  __typename?: 'CreateUserMutationPayload';
  user: User;
};

export type Credential = {
  __typename?: 'Credential';
  accessToken: Scalars['String'];
  client: Scalars['String'];
  expiry: Scalars['Int'];
  tokenType: Scalars['String'];
  uid: Scalars['String'];
};

export type DossierInput = {
  affiliation: AffiliationInput;
  candidate: PersonInput;
  primaryExpert?: Maybe<PersonInput>;
  secondaryExpert?: Maybe<PersonInput>;
  companyContact?: Maybe<PersonInput>;
  companyPointsA?: Maybe<Scalars['String']>;
  companyPointsB?: Maybe<Scalars['String']>;
  companyMarkA?: Maybe<Scalars['String']>;
  companyMarkB?: Maybe<Scalars['String']>;
  expertPointsA?: Maybe<Scalars['String']>;
  expertPointsB?: Maybe<Scalars['String']>;
  expertPointsC?: Maybe<Scalars['String']>;
  expertMarkA?: Maybe<Scalars['String']>;
  expertMarkB?: Maybe<Scalars['String']>;
  expertMarkC?: Maybe<Scalars['String']>;
  markDeduction?: Maybe<Scalars['Boolean']>;
  finalMark?: Maybe<Scalars['String']>;
  submittedMark?: Maybe<Scalars['String']>;
  dossierPath?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ImportMutation */
export type ImportMutationPayload = {
  __typename?: 'ImportMutationPayload';
  importCount: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  pkorg?: Maybe<PkorgMutation>;
  userLogin?: Maybe<UserLoginPayload>;
  userLogout?: Maybe<UserLogoutPayload>;
  users?: Maybe<UserMutation>;
};


export type MutationPkorgArgs = {
  sessionToken: Scalars['String'];
  baseUrl: Scalars['String'];
  userAgent?: Maybe<Scalars['String']>;
};


export type MutationUserLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PersonInput = {
  id: Scalars['Int'];
  forename: Scalars['String'];
  surname: Scalars['String'];
};

export type PkorgAffiliation = {
  __typename?: 'PkorgAffiliation';
  role: Scalars['String'];
  tenantId: Scalars['ID'];
  tenantName: Scalars['String'];
};

export type PkorgEvaluation = {
  __typename?: 'PkorgEvaluation';
  result: Scalars['JSON'];
};

export type PkorgMutation = {
  __typename?: 'PkorgMutation';
  importDossiers?: Maybe<ImportMutationPayload>;
};


export type PkorgMutationImportDossiersArgs = {
  dossiers: Array<DossierInput>;
};

export type PkorgQuery = {
  __typename?: 'PkorgQuery';
  evaluation?: Maybe<PkorgEvaluation>;
  sessionUser?: Maybe<PkorgSessionUser>;
};


export type PkorgQueryEvaluationArgs = {
  evaluationPath: Scalars['String'];
};

export type PkorgSessionUser = {
  __typename?: 'PkorgSessionUser';
  affiliations: Array<PkorgAffiliation>;
  email: Scalars['String'];
  forename: Scalars['String'];
  surname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  pkorg?: Maybe<PkorgQuery>;
  users?: Maybe<Array<User>>;
};


export type QueryPkorgArgs = {
  sessionToken: Scalars['String'];
  baseUrl: Scalars['String'];
  userAgent?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

export type UserInput = {
  id?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UserLogin */
export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  authenticatable: User;
  credentials: Credential;
};

/** Autogenerated return type of UserLogout */
export type UserLogoutPayload = {
  __typename?: 'UserLogoutPayload';
  authenticatable: User;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  createUser?: Maybe<CreateUserMutationPayload>;
};


export type UserMutationCreateUserArgs = {
  user: UserInput;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { userLogin?: Maybe<(
    { __typename?: 'UserLoginPayload' }
    & { authenticatable: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ), credentials: (
      { __typename?: 'Credential' }
      & Pick<Credential, 'accessToken' | 'client' | 'expiry' | 'tokenType' | 'uid'>
    ) }
  )> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'name' | 'nickname'>
  )>> }
);

export type CheckConnectionQueryVariables = Exact<{
  baseUrl: Scalars['String'];
  sessionToken: Scalars['String'];
  userAgent: Scalars['String'];
}>;


export type CheckConnectionQuery = (
  { __typename?: 'Query' }
  & { pkorg?: Maybe<(
    { __typename?: 'PkorgQuery' }
    & { sessionUser?: Maybe<(
      { __typename?: 'PkorgSessionUser' }
      & Pick<PkorgSessionUser, 'email' | 'forename' | 'surname'>
      & { affiliations: Array<(
        { __typename?: 'PkorgAffiliation' }
        & Pick<PkorgAffiliation, 'tenantName' | 'tenantId' | 'role'>
      )> }
    )> }
  )> }
);

export type ImportDossiersMutationVariables = Exact<{
  baseUrl: Scalars['String'];
  sessionToken: Scalars['String'];
  userAgent: Scalars['String'];
  dossiers: Array<DossierInput> | DossierInput;
}>;


export type ImportDossiersMutation = (
  { __typename?: 'Mutation' }
  & { pkorg?: Maybe<(
    { __typename?: 'PkorgMutation' }
    & { importDossiers?: Maybe<(
      { __typename?: 'ImportMutationPayload' }
      & Pick<ImportMutationPayload, 'importCount'>
    )> }
  )> }
);

export type RetrieveEvaluationQueryVariables = Exact<{
  baseUrl: Scalars['String'];
  sessionToken: Scalars['String'];
  userAgent: Scalars['String'];
  evaluationPath: Scalars['String'];
}>;


export type RetrieveEvaluationQuery = (
  { __typename?: 'Query' }
  & { pkorg?: Maybe<(
    { __typename?: 'PkorgQuery' }
    & { evaluation?: Maybe<(
      { __typename?: 'PkorgEvaluation' }
      & Pick<PkorgEvaluation, 'result'>
    )> }
  )> }
);

export type CreateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { users?: Maybe<(
    { __typename?: 'UserMutation' }
    & { createUser?: Maybe<(
      { __typename?: 'CreateUserMutationPayload' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
      ) }
    )> }
  )> }
);
