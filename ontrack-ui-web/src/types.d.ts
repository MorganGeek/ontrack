export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Custom JSON value */
  JSON: any;
  /** Local Date Time */
  LocalDateTime: any;
};

export type Account = {
  __typename?: 'Account';
  /** Source of authentication (builtin, ldap, etc.) */
  authenticationSource?: Maybe<AuthenticationSource>;
  /** List of authorized projects */
  authorizedProjects: Array<AuthorizedProject>;
  /** Email of the account */
  email?: Maybe<Scalars['String']>;
  /** Full name of the account */
  fullName?: Maybe<Scalars['String']>;
  /** Global role for the account */
  globalRole?: Maybe<GlobalRole>;
  /** List of groups the account belongs to */
  groups: Array<AccountGroup>;
  id: Scalars['Int'];
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<AccountLinks>;
  /** Unique name for the account */
  name?: Maybe<Scalars['String']>;
  /** Security role (admin or none) */
  role?: Maybe<Scalars['String']>;
  /** Authentication token, if any, linked to this account. */
  token?: Maybe<Token>;
};

export type AccountGroup = {
  __typename?: 'AccountGroup';
  /** List of associated accounts */
  accounts: Array<Account>;
  /** List of authorized projects */
  authorizedProjects: Array<AuthorizedProject>;
  description?: Maybe<Scalars['String']>;
  /** Global role for the account group */
  globalRole?: Maybe<GlobalRole>;
  id: Scalars['Int'];
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<AccountGroupLinks>;
  /** Mappings for this group */
  mappings: Array<AccountGroupMapping>;
  name?: Maybe<Scalars['String']>;
};

/** AccountGroup links */
export type AccountGroupLinks = {
  __typename?: 'AccountGroupLinks';
  _delete?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

export type AccountGroupMapping = {
  __typename?: 'AccountGroupMapping';
  /** Associated authentication source */
  authenticationSource?: Maybe<AuthenticationSource>;
  /** Associated group */
  group?: Maybe<AccountGroup>;
  id: Scalars['Int'];
  /** Name of the mapping */
  name?: Maybe<Scalars['String']>;
};

/** Account links */
export type AccountLinks = {
  __typename?: 'AccountLinks';
  _delete?: Maybe<Scalars['String']>;
  _generateToken?: Maybe<Scalars['String']>;
  _revokeToken?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _token?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

export type Action = {
  __typename?: 'Action';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

/** Authentication source for an account or group. */
export type AuthenticationSource = {
  __typename?: 'AuthenticationSource';
  /** Is this authentication source allowing to change a password? */
  allowingPasswordChange: Scalars['Boolean'];
  /** Is this authentication source enabled? */
  enabled: Scalars['Boolean'];
  /** Does this authentication source support external groups? */
  groupMappingSupported: Scalars['Boolean'];
  /** Key for this source */
  key: Scalars['String'];
  /** Display name for this source */
  name: Scalars['String'];
  /** Name of the provider for this authentication source */
  provider: Scalars['String'];
};

export type AuthorizedProject = {
  __typename?: 'AuthorizedProject';
  /** Authorized project */
  project: Project;
  /** Role for the project */
  role: ProjectRole;
};

export type Branch = ProjectEntity & {
  __typename?: 'Branch';
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** Synchronisation of the promotions with Artifactory build statuses */
  artifactoryPromotionSyncProperty?: Maybe<Property>;
  /** Actions to get a diff on builds of the branch */
  buildDiffActions: Array<Action>;
  builds: Array<Build>;
  creation?: Maybe<Signature>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  /** Git branch */
  gitBranchConfigurationProperty?: Maybe<Property>;
  gitChangeLog?: Maybe<GitChangeLog>;
  id: Scalars['Int'];
  /** Link to a Jenkins Job */
  jenkinsJobProperty?: Maybe<Property>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<BranchLinks>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** List of other branches in the same project */
  otherBranches: Array<Branch>;
  /** Makes a promotion conditional based on the fact that a previous promotion has been granted. */
  previousPromotionConditionProperty?: Maybe<Property>;
  /** Reference to project */
  project?: Maybe<Project>;
  promotionLevels: Array<PromotionLevel>;
  /** List of properties */
  properties: Array<Property>;
  /** List of issues reported into the validation run statuses */
  validationIssues: Array<ValidationIssue>;
  validationStamps: Array<ValidationStamp>;
};


export type BranchBuildsArgs = {
  count?: Maybe<Scalars['Int']>;
  filter?: Maybe<StandardBuildFilter>;
  generic?: Maybe<GenericBuildFilter>;
  lastPromotions?: Maybe<Scalars['Boolean']>;
};


export type BranchDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type BranchGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type BranchPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};


export type BranchValidationIssuesArgs = {
  count?: Maybe<Scalars['Int']>;
  passed?: Maybe<Scalars['Boolean']>;
  stamp?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type BranchValidationStampsArgs = {
  name?: Maybe<Scalars['String']>;
};

/** Branch and associated information */
export type BranchInfo = {
  __typename?: 'BranchInfo';
  /** Associated branch */
  branch?: Maybe<Branch>;
  /** First build which contains the commit */
  firstBuild?: Maybe<Build>;
  /** First promotion for every promotion level */
  promotions: Array<PromotionRun>;
};

/** Type of branch associated with information about the corresponding branches. */
export type BranchInfos = {
  __typename?: 'BranchInfos';
  /** List of branches and their associated information */
  branchInfoList: Array<BranchInfo>;
  /** Type of branch */
  type?: Maybe<Scalars['String']>;
};

/** Branch links */
export type BranchLinks = {
  __typename?: 'BranchLinks';
  _actions?: Maybe<Scalars['String']>;
  _allValidationStampFilters?: Maybe<Scalars['String']>;
  _branches?: Maybe<Scalars['String']>;
  _buildFilterForms?: Maybe<Scalars['String']>;
  _buildFilterResources?: Maybe<Scalars['String']>;
  _buildFilterSave?: Maybe<Scalars['String']>;
  _buildFilterShare?: Maybe<Scalars['String']>;
  _bulkUpdate?: Maybe<Scalars['String']>;
  _clone?: Maybe<Scalars['String']>;
  _copy?: Maybe<Scalars['String']>;
  _createBuild?: Maybe<Scalars['String']>;
  _createPromotionLevel?: Maybe<Scalars['String']>;
  _createValidationStamp?: Maybe<Scalars['String']>;
  _decorations?: Maybe<Scalars['String']>;
  _delete?: Maybe<Scalars['String']>;
  _disable?: Maybe<Scalars['String']>;
  _download?: Maybe<Scalars['String']>;
  _enable?: Maybe<Scalars['String']>;
  _events?: Maybe<Scalars['String']>;
  _favourite?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _project?: Maybe<Scalars['String']>;
  _promotionLevels?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _reorderPromotionLevels?: Maybe<Scalars['String']>;
  _reorderValidationStamps?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _status?: Maybe<Scalars['String']>;
  _unfavourite?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
  _validationStampFilterCreate?: Maybe<Scalars['String']>;
  _validationStampViews?: Maybe<Scalars['String']>;
  _validationStamps?: Maybe<Scalars['String']>;
  _view?: Maybe<Scalars['String']>;
};

export type Build = ProjectEntity & {
  __typename?: 'Build';
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** Reference to branch */
  branch?: Maybe<Branch>;
  creation?: Maybe<Signature>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  gitChangeLog?: Maybe<GitChangeLog>;
  /** Git commit */
  gitCommitProperty?: Maybe<Property>;
  id: Scalars['Int'];
  /** Link to a Jenkins Build */
  jenkinsBuildProperty?: Maybe<Property>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<BuildLinks>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** Promotions for this build */
  promotionRuns: Array<PromotionRun>;
  /** List of properties */
  properties: Array<Property>;
  /** Release indicator on the build. */
  releaseProperty?: Maybe<Property>;
  /** Run info associated with this build */
  runInfo?: Maybe<RunInfo>;
  /** List of builds using this one. */
  usedBy?: Maybe<BuildPaginated>;
  /** List of builds being used by this one. */
  using?: Maybe<BuildPaginated>;
  /** Validations for this build */
  validationRuns: Array<ValidationRun>;
  /** Paginated list of validation runs */
  validationRunsPaginated?: Maybe<ValidationRunPaginated>;
  /** Validations per validation stamp */
  validations: Array<Validation>;
};


export type BuildDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type BuildGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type BuildPromotionRunsArgs = {
  lastPerLevel?: Maybe<Scalars['Boolean']>;
  promotion?: Maybe<Scalars['String']>;
};


export type BuildPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};


export type BuildUsedByArgs = {
  branch?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  project?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
};


export type BuildUsingArgs = {
  branch?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  project?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
};


export type BuildValidationRunsArgs = {
  count?: Maybe<Scalars['Int']>;
  validationStamp?: Maybe<Scalars['String']>;
};


export type BuildValidationRunsPaginatedArgs = {
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type BuildValidationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  validationStamp?: Maybe<Scalars['String']>;
};

/** Build filter validation result. */
export type BuildFilterValidation = {
  __typename?: 'BuildFilterValidation';
  /** Validation message or null if valid. */
  error?: Maybe<Scalars['String']>;
};

/** Build links */
export type BuildLinks = {
  __typename?: 'BuildLinks';
  _actions?: Maybe<Scalars['String']>;
  _buildLinksFrom?: Maybe<Scalars['String']>;
  _changeLog?: Maybe<Scalars['String']>;
  _changeLogPage?: Maybe<Scalars['String']>;
  _collectSonarQube?: Maybe<Scalars['String']>;
  _decorations?: Maybe<Scalars['String']>;
  _delete?: Maybe<Scalars['String']>;
  _events?: Maybe<Scalars['String']>;
  _extra?: Maybe<Scalars['String']>;
  _lastPromotionRuns?: Maybe<Scalars['String']>;
  _next?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _previous?: Maybe<Scalars['String']>;
  _promote?: Maybe<Scalars['String']>;
  _promotionRuns?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _runInfo?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _signature?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
  _validate?: Maybe<Scalars['String']>;
  _validationRuns?: Maybe<Scalars['String']>;
  _validationStampRunViews?: Maybe<Scalars['String']>;
};

export type BuildPaginated = {
  __typename?: 'BuildPaginated';
  /** Information about the current page */
  pageInfo?: Maybe<PageInfo>;
  /** Items in the current page */
  pageItems: Array<Build>;
};

export type BuildSearchForm = {
  /** Regular expression to match against the branch name. */
  branchName?: Maybe<Scalars['String']>;
  /** When `buildName` is set, considers an exact match on the build name. */
  buildExactMatch?: Maybe<Scalars['Boolean']>;
  /** Regular expression to match against the build name, unless `buildExactMatch` is set to `true`. */
  buildName?: Maybe<Scalars['String']>;
  /** `project:build` expression, matches against builds being linked from the build to match. */
  linkedFrom?: Maybe<Scalars['String']>;
  /** `project:build` expression, matches against builds being linked to the build to match. */
  linkedTo?: Maybe<Scalars['String']>;
  /** Maximum number of builds to return. */
  maximumCount?: Maybe<Scalars['Int']>;
  /** Matches a build having at least this promotion. */
  promotionName?: Maybe<Scalars['String']>;
  /** Matches a build having this property. */
  property?: Maybe<Scalars['String']>;
  /** When `property` is set, matches against the property value. */
  propertyValue?: Maybe<Scalars['String']>;
  /** Matches a build having at least this validation with PASSED as a status. */
  validationStampName?: Maybe<Scalars['String']>;
};

/** Input type for the createProject mutation. */
export type CreateProjectInput = {
  /** description field */
  description?: Maybe<Scalars['String']>;
  /** disabled field */
  disabled?: Maybe<Scalars['Boolean']>;
  /** name field */
  name: Scalars['String'];
};

/** Output type for the createProject mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /** List of errors */
  errors?: Maybe<Array<Maybe<UserError>>>;
  /** Created project */
  project?: Maybe<Project>;
};

export type Decoration = {
  __typename?: 'Decoration';
  /** JSON representation of the decoration data */
  data?: Maybe<Scalars['JSON']>;
  /** Decoration type */
  decorationType?: Maybe<Scalars['String']>;
  /** Any error message associated with the decoration */
  error?: Maybe<Scalars['String']>;
  /** Extension feature */
  feature?: Maybe<ExtensionFeatureDescription>;
};

/** Input type for the deleteProject mutation. */
export type DeleteProjectInput = {
  /** Project ID */
  id: Scalars['Int'];
};

/** Output type for the deleteProject mutation. */
export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  /** List of errors */
  errors?: Maybe<Array<Maybe<UserError>>>;
};

/** Input type for the disableProject mutation. */
export type DisableProjectInput = {
  /** Project ID */
  id: Scalars['Int'];
};

/** Output type for the disableProject mutation. */
export type DisableProjectPayload = {
  __typename?: 'DisableProjectPayload';
  /** List of errors */
  errors?: Maybe<Array<Maybe<UserError>>>;
  /** Updated project */
  project?: Maybe<Project>;
};

/** Input type for the enableProject mutation. */
export type EnableProjectInput = {
  /** Project ID */
  id: Scalars['Int'];
};

/** Output type for the enableProject mutation. */
export type EnableProjectPayload = {
  __typename?: 'EnableProjectPayload';
  /** List of errors */
  errors?: Maybe<Array<Maybe<UserError>>>;
  /** Updated project */
  project?: Maybe<Project>;
};

export type ExtensionFeatureDescription = {
  __typename?: 'ExtensionFeatureDescription';
  /** Feature description */
  description?: Maybe<Scalars['String']>;
  /** Feature ID */
  id?: Maybe<Scalars['String']>;
  /** Feature name */
  name?: Maybe<Scalars['String']>;
  /** Feature version */
  version?: Maybe<Scalars['String']>;
};

export type GenericBuildFilter = {
  /** Filter data as JSON */
  data?: Maybe<Scalars['String']>;
  /** FQCN of the filter type, null if no filter is to be applied */
  type?: Maybe<Scalars['String']>;
};

export type GitChangeLog = {
  __typename?: 'GitChangeLog';
  /** List of commits in the change log */
  commits: Array<GitUiCommit>;
};

export type GitCommit = {
  __typename?: 'GitCommit';
  /** author */
  author?: Maybe<GitPerson>;
  /** commitTime */
  commitTime?: Maybe<Scalars['LocalDateTime']>;
  /** committer */
  committer?: Maybe<GitPerson>;
  /** fullMessage */
  fullMessage?: Maybe<Scalars['String']>;
  /** id */
  id?: Maybe<Scalars['String']>;
  /** shortId */
  shortId?: Maybe<Scalars['String']>;
  /** shortMessage */
  shortMessage?: Maybe<Scalars['String']>;
};

export type GitPerson = {
  __typename?: 'GitPerson';
  /** email */
  email?: Maybe<Scalars['String']>;
  /** name */
  name?: Maybe<Scalars['String']>;
};

export type GitUiCommit = {
  __typename?: 'GitUICommit';
  /** annotatedMessage */
  annotatedMessage?: Maybe<Scalars['String']>;
  /** author */
  author?: Maybe<Scalars['String']>;
  /** authorEmail */
  authorEmail?: Maybe<Scalars['String']>;
  /** commit */
  commit?: Maybe<GitCommit>;
  /** formattedMessage */
  formattedMessage?: Maybe<Scalars['String']>;
  /** fullAnnotatedMessage */
  fullAnnotatedMessage?: Maybe<Scalars['String']>;
  /** id */
  id?: Maybe<Scalars['String']>;
  /** link */
  link?: Maybe<Scalars['String']>;
  /** message */
  message?: Maybe<Scalars['String']>;
  /** shortId */
  shortId?: Maybe<Scalars['String']>;
  /** timestamp */
  timestamp?: Maybe<Scalars['LocalDateTime']>;
};

export type GlobalRole = {
  __typename?: 'GlobalRole';
  /** List of accounts having this role */
  accounts: Array<Account>;
  /** Description of the role */
  description?: Maybe<Scalars['String']>;
  /** List of groups having this role */
  groups: Array<AccountGroup>;
  /** ID of the role */
  id?: Maybe<Scalars['String']>;
  /** Unique name for the role */
  name?: Maybe<Scalars['String']>;
};

/** Aggregator of indicator categories */
export type IndicatorCategories = {
  __typename?: 'IndicatorCategories';
  /** List of indicator categories */
  categories: Array<IndicatorCategory>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<IndicatorCategoriesLinks>;
};


/** Aggregator of indicator categories */
export type IndicatorCategoriesCategoriesArgs = {
  id?: Maybe<Scalars['String']>;
};

/** IndicatorCategories links */
export type IndicatorCategoriesLinks = {
  __typename?: 'IndicatorCategoriesLinks';
  _create?: Maybe<Scalars['String']>;
};

/** Indicator category */
export type IndicatorCategory = {
  __typename?: 'IndicatorCategory';
  /** Indicator category ID */
  id?: Maybe<Scalars['String']>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<IndicatorCategoryLinks>;
  /** Indicator category name */
  name?: Maybe<Scalars['String']>;
  /** Source for this category */
  source?: Maybe<IndicatorSource>;
  /** List of indicator types belonging to this category. */
  types: Array<ProjectIndicatorType>;
};

/** IndicatorCategory links */
export type IndicatorCategoryLinks = {
  __typename?: 'IndicatorCategoryLinks';
  _delete?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

/** Association of a category and statistics over several items */
export type IndicatorCategoryStats = {
  __typename?: 'IndicatorCategoryStats';
  /** Associated indicator category */
  category?: Maybe<IndicatorCategory>;
  /** previousStats field */
  previousStats?: Maybe<IndicatorPreviousStats>;
  /** Statistics */
  stats?: Maybe<IndicatorStats>;
};

/** Grouping indicators for a group of projects identified by labels. */
export type IndicatorPortfolio = {
  __typename?: 'IndicatorPortfolio';
  /** Indicator categories being shown for this portfolio */
  categories: Array<IndicatorCategory>;
  /** Stats per category */
  categoryStats: Array<IndicatorCategoryStats>;
  /** Global indicator stats */
  globalStats: Array<IndicatorCategoryStats>;
  /** ID of the portfolio */
  id?: Maybe<Scalars['String']>;
  /** Label for this portfolio */
  label?: Maybe<Label>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<IndicatorPortfolioLinks>;
  /** Name of the portfolio */
  name?: Maybe<Scalars['String']>;
  /** List of projects associated with this portfolio */
  projects: Array<Project>;
};


/** Grouping indicators for a group of projects identified by labels. */
export type IndicatorPortfolioCategoryStatsArgs = {
  duration?: Maybe<Scalars['Int']>;
};


/** Grouping indicators for a group of projects identified by labels. */
export type IndicatorPortfolioGlobalStatsArgs = {
  duration?: Maybe<Scalars['Int']>;
};

/** IndicatorPortfolio links */
export type IndicatorPortfolioLinks = {
  __typename?: 'IndicatorPortfolioLinks';
  _delete?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

/** List of portfolios */
export type IndicatorPortfolioOfPortfolios = {
  __typename?: 'IndicatorPortfolioOfPortfolios';
  /** Global indicator categories */
  categories: Array<IndicatorCategory>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<IndicatorPortfolioOfPortfoliosLinks>;
  /** List of portfolios */
  portfolios: Array<IndicatorPortfolio>;
};

/** IndicatorPortfolioOfPortfolios links */
export type IndicatorPortfolioOfPortfoliosLinks = {
  __typename?: 'IndicatorPortfolioOfPortfoliosLinks';
  _create?: Maybe<Scalars['String']>;
  _globalIndicators?: Maybe<Scalars['String']>;
};

/** Indicator stats from the past */
export type IndicatorPreviousStats = {
  __typename?: 'IndicatorPreviousStats';
  /** avgTrend field */
  avgTrend?: Maybe<Scalars['String']>;
  /** Time (in seconds) since the indicator values were computed or entered. */
  durationSeconds?: Maybe<Scalars['Int']>;
  /** maxTrend field */
  maxTrend?: Maybe<Scalars['String']>;
  /** minTrend field */
  minTrend?: Maybe<Scalars['String']>;
  /** stats field */
  stats?: Maybe<IndicatorStats>;
};

/** Indicator source */
export type IndicatorSource = {
  __typename?: 'IndicatorSource';
  /** Indicator source name */
  name?: Maybe<Scalars['String']>;
  /** Indicator source provider */
  provider?: Maybe<IndicatorSourceProviderDescription>;
};

/** Indicator source provider description */
export type IndicatorSourceProviderDescription = {
  __typename?: 'IndicatorSourceProviderDescription';
  /** Indicator source provider ID */
  id?: Maybe<Scalars['String']>;
  /** Indicator source provider name */
  name?: Maybe<Scalars['String']>;
};

/** Aggregation of ratings over several items. */
export type IndicatorStats = {
  __typename?: 'IndicatorStats';
  /** Average value (undefined if no stat available) */
  avg?: Maybe<Scalars['Int']>;
  /** Rating for the min value */
  avgRating?: Maybe<Scalars['String']>;
  /** Number of items having an actual usable value for stat computation */
  count?: Maybe<Scalars['Int']>;
  /** Maximal value (undefined if no stat available) */
  max?: Maybe<Scalars['Int']>;
  /** Number of items having the maximum value */
  maxCount?: Maybe<Scalars['Int']>;
  /** Rating for the min value */
  maxRating?: Maybe<Scalars['String']>;
  /** Minimal value (undefined if no stat available) */
  min?: Maybe<Scalars['Int']>;
  /** Number of items having the minimum value */
  minCount?: Maybe<Scalars['Int']>;
  /** Rating for the min value */
  minRating?: Maybe<Scalars['String']>;
  /** Total number of items used for this stat */
  total?: Maybe<Scalars['Int']>;
};

/** Aggregator of indicator types */
export type IndicatorTypes = {
  __typename?: 'IndicatorTypes';
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<IndicatorTypesLinks>;
  /** List of indicator types */
  types: Array<ProjectIndicatorType>;
};


/** Aggregator of indicator types */
export type IndicatorTypesTypesArgs = {
  id?: Maybe<Scalars['String']>;
};

/** IndicatorTypes links */
export type IndicatorTypesLinks = {
  __typename?: 'IndicatorTypesLinks';
  _create?: Maybe<Scalars['String']>;
};

/** Association of a type and statistics over several items */
export type IndicatorTypeStats = {
  __typename?: 'IndicatorTypeStats';
  /** Statistics */
  stats?: Maybe<IndicatorStats>;
  /** Associated indicator type */
  type?: Maybe<ProjectIndicatorType>;
};

/** Indicator value type */
export type IndicatorValueType = {
  __typename?: 'IndicatorValueType';
  /** Extension feature */
  feature?: Maybe<ExtensionFeatureDescription>;
  /** FQCN of the value type */
  id?: Maybe<Scalars['String']>;
  /** Display name of the value type */
  name?: Maybe<Scalars['String']>;
};

/** Representation of an Issue. */
export type Issue = {
  __typename?: 'Issue';
  /** Display name for the issue */
  displayKey?: Maybe<Scalars['String']>;
  /** Key of the issue */
  key?: Maybe<Scalars['String']>;
  /** Status of the issue */
  status?: Maybe<IssueStatus>;
  /** Title / summary for the issue */
  summary?: Maybe<Scalars['String']>;
  /** Last update time */
  updateTime?: Maybe<Scalars['String']>;
  /** URL to the issue */
  url?: Maybe<Scalars['String']>;
};

/** Technical representation of an issue service and its configuration */
export type IssueServiceConfigurationRepresentation = {
  __typename?: 'IssueServiceConfigurationRepresentation';
  /** ID of the issue service */
  id?: Maybe<Scalars['String']>;
  /** Name of the issue service */
  name?: Maybe<Scalars['String']>;
  /** Link to the issue service configuration */
  serviceId?: Maybe<Scalars['String']>;
};

/** Abstraction for the status of an issue */
export type IssueStatus = {
  __typename?: 'IssueStatus';
  /** Name of the status */
  name?: Maybe<Scalars['String']>;
};


export type Label = {
  __typename?: 'Label';
  /** category */
  category?: Maybe<Scalars['String']>;
  /** color */
  color?: Maybe<Scalars['String']>;
  /** computedBy */
  computedBy?: Maybe<LabelProviderDescription>;
  /** description */
  description?: Maybe<Scalars['String']>;
  /** display */
  display?: Maybe<Scalars['String']>;
  /** foregroundColor */
  foregroundColor?: Maybe<Scalars['String']>;
  /** id */
  id?: Maybe<Scalars['Int']>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<LabelLinks>;
  /** name */
  name?: Maybe<Scalars['String']>;
  /** List of associated projects */
  projects: Array<Project>;
};

/** Label links */
export type LabelLinks = {
  __typename?: 'LabelLinks';
  _delete?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

export type LabelProviderDescription = {
  __typename?: 'LabelProviderDescription';
  /** id */
  id?: Maybe<Scalars['String']>;
  /** name */
  name?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new project */
  createProject?: Maybe<CreateProjectPayload>;
  /** Deletes an existing project */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Disables an existing project */
  disableProject?: Maybe<DisableProjectPayload>;
  /** Enables an existing project */
  enableProject?: Maybe<EnableProjectPayload>;
  /** Updates an existing project */
  updateProject?: Maybe<UpdateProjectPayload>;
};


export type MutationCreateProjectArgs = {
  input?: Maybe<CreateProjectInput>;
};


export type MutationDeleteProjectArgs = {
  input?: Maybe<DeleteProjectInput>;
};


export type MutationDisableProjectArgs = {
  input?: Maybe<DisableProjectInput>;
};


export type MutationEnableProjectArgs = {
  input?: Maybe<EnableProjectInput>;
};


export type MutationUpdateProjectArgs = {
  input?: Maybe<UpdateProjectInput>;
};

/** Information about a commit */
export type OntrackGitCommitInfo = {
  __typename?: 'OntrackGitCommitInfo';
  /** Associated branch info per types of branches */
  branchInfosList: Array<BranchInfos>;
  /** Information about the commit itself */
  uiCommit?: Maybe<GitUiCommit>;
};

/** Information about an issue */
export type OntrackGitIssueInfo = {
  __typename?: 'OntrackGitIssueInfo';
  /** Information about the last commit associated with this issue */
  commitInfo?: Maybe<OntrackGitCommitInfo>;
  /** JSON representation of the issue */
  issue?: Maybe<Scalars['JSON']>;
  /** Issue service associated with the issue */
  issueServiceConfigurationRepresentation?: Maybe<IssueServiceConfigurationRepresentation>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** Offset for the current page */
  currentOffset?: Maybe<Scalars['Int']>;
  /** Size for the current page */
  currentSize?: Maybe<Scalars['Int']>;
  /** Next page offset and size */
  nextPage?: Maybe<PageRequest>;
  /** Index of the page in the total number of pages (starting from 0) */
  pageIndex?: Maybe<Scalars['Int']>;
  /** Total number of pages */
  pageTotal?: Maybe<Scalars['Int']>;
  /** Previous page offset and size */
  previousPage?: Maybe<PageRequest>;
  /** Total known size of the list */
  totalSize?: Maybe<Scalars['Int']>;
};

export type PageRequest = {
  __typename?: 'PageRequest';
  /** Offset for the page */
  offset?: Maybe<Scalars['Int']>;
  /** Size for the page */
  size?: Maybe<Scalars['Int']>;
};

export type Project = ProjectEntity & {
  __typename?: 'Project';
  /** Actions for a Project */
  actions?: Maybe<ProjectActions>;
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** If set, this property allows promotion levels to be created automatically from predefined promotion levels */
  autoPromotionLevelProperty?: Maybe<Property>;
  /** If set, this property allows validation stamps to be created automatically from predefined validation stamps */
  autoValidationStampProperty?: Maybe<Property>;
  branches: Array<Branch>;
  /** Defines the branching model used by a project */
  branchingModelProperty?: Maybe<Property>;
  /** Configuration of display options for the build links towards this project. */
  buildLinkDisplayProperty?: Maybe<Property>;
  creation?: Maybe<Signature>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  gitChangeLog?: Maybe<GitChangeLog>;
  /** Information about a Git commit in the project */
  gitCommitInfo?: Maybe<OntrackGitCommitInfo>;
  /** Associates the project with a GitHub repository */
  gitHubProjectConfigurationProperty?: Maybe<Property>;
  /** Information about an issue in the project */
  gitIssueInfo?: Maybe<OntrackGitIssueInfo>;
  /** Associates the project with a GitLab repository */
  gitLabProjectConfigurationProperty?: Maybe<Property>;
  /** Associates the project with a Git repository */
  gitProjectConfigurationProperty?: Maybe<Property>;
  id: Scalars['Int'];
  /** List of links to follow when displaying information about an issue. */
  jIRAFollowLinksProperty?: Maybe<Property>;
  /** Link to a Jenkins Job */
  jenkinsJobProperty?: Maybe<Property>;
  /** Labels for this project */
  labels: Array<Label>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<ProjectLinks>;
  /**
   * List of project labels which describes the list of build links
   * to display in a build links decoration.
   */
  mainBuildLinksProjectProperty?: Maybe<Property>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** Makes a promotion conditional based on the fact that a previous promotion has been granted. */
  previousPromotionConditionProperty?: Maybe<Property>;
  /** List of project indicators */
  projectIndicators?: Maybe<ProjectIndicators>;
  /** Authorisations for the project */
  projectRoles: Array<ProjectAuthorization>;
  /** List of properties */
  properties: Array<Property>;
  /** SCM catalog entry the project is linked with, if any */
  scmCatalogEntry?: Maybe<ScmCatalogEntry>;
  /** Association with a SonarQube project. */
  sonarQubeProperty?: Maybe<Property>;
  /** Allows to disable or delete stale branches */
  staleProperty?: Maybe<Property>;
  /** Associates the project with a BitBucket repository */
  stashProjectConfigurationProperty?: Maybe<Property>;
  /** Searching for validation runs in the project */
  validationRuns?: Maybe<ValidationRunPaginated>;
};


export type ProjectBranchesArgs = {
  favourite?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  useModel?: Maybe<Scalars['Boolean']>;
};


export type ProjectDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type ProjectGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type ProjectGitCommitInfoArgs = {
  commit: Scalars['String'];
  first?: Maybe<Scalars['Boolean']>;
};


export type ProjectGitIssueInfoArgs = {
  first?: Maybe<Scalars['Boolean']>;
  token: Scalars['String'];
};


export type ProjectProjectRolesArgs = {
  role?: Maybe<Scalars['String']>;
};


export type ProjectPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};


export type ProjectValidationRunsArgs = {
  branch?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  statuses?: Maybe<Scalars['String']>;
  validationStamp?: Maybe<Scalars['String']>;
};

/** Deleting the project */
export type ProjectActionDeleteProject = {
  __typename?: 'ProjectActionDeleteProject';
  /** Description of the action */
  description: Scalars['String'];
  /** Mutation associated with this action */
  mutation?: Maybe<Scalars['String']>;
};

/** Disabling the project */
export type ProjectActionDisableProject = {
  __typename?: 'ProjectActionDisableProject';
  /** Description of the action */
  description: Scalars['String'];
  /** Mutation associated with this action */
  mutation?: Maybe<Scalars['String']>;
};

/** Enabling the project */
export type ProjectActionEnableProject = {
  __typename?: 'ProjectActionEnableProject';
  /** Description of the action */
  description: Scalars['String'];
  /** Mutation associated with this action */
  mutation?: Maybe<Scalars['String']>;
};

/** Actions for a Project */
export type ProjectActions = {
  __typename?: 'ProjectActions';
  /** Deleting the project */
  deleteProject?: Maybe<ProjectActionDeleteProject>;
  /** Disabling the project */
  disableProject?: Maybe<ProjectActionDisableProject>;
  /** Enabling the project */
  enableProject?: Maybe<ProjectActionEnableProject>;
  /** Updating the project */
  updateProject?: Maybe<ProjectActionUpdateProject>;
};

/** Updating the project */
export type ProjectActionUpdateProject = {
  __typename?: 'ProjectActionUpdateProject';
  /** Description of the action */
  description: Scalars['String'];
  /** Links attached to this action */
  links?: Maybe<ProjectActionUpdateProjectLinks>;
  /** Mutation associated with this action */
  mutation?: Maybe<Scalars['String']>;
};

/** Links attached to the updateProject action on the Project type. */
export type ProjectActionUpdateProjectLinks = {
  __typename?: 'ProjectActionUpdateProjectLinks';
  /** Updating the project */
  form?: Maybe<UiActionLink>;
};

export type ProjectAuthorization = {
  __typename?: 'ProjectAuthorization';
  /** List of accounts having this role */
  accounts: Array<Account>;
  /** Description of the role */
  description?: Maybe<Scalars['String']>;
  /** List of groups having this role */
  groups: Array<AccountGroup>;
  /** ID of the role */
  id?: Maybe<Scalars['String']>;
  /** Unique name for the role */
  name?: Maybe<Scalars['String']>;
};

/** Association of an indicator category and a list of associated indicators. */
export type ProjectCategoryIndicators = {
  __typename?: 'ProjectCategoryIndicators';
  /** Indicator category */
  category?: Maybe<IndicatorCategory>;
  /** Indicator stats for this project and category */
  categoryStats?: Maybe<IndicatorCategoryStats>;
  /** List of indicators */
  indicators: Array<ProjectIndicator>;
};


/** Association of an indicator category and a list of associated indicators. */
export type ProjectCategoryIndicatorsCategoryStatsArgs = {
  duration?: Maybe<Scalars['Int']>;
};

export type ProjectEntity = {
  creation?: Maybe<Signature>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

/** Project indicator */
export type ProjectIndicator = {
  __typename?: 'ProjectIndicator';
  /** Comment with links. */
  annotatedComment?: Maybe<Scalars['String']>;
  /** Comment for the indicator */
  comment?: Maybe<Scalars['String']>;
  /** Compliance for the indicator */
  compliance?: Maybe<Scalars['Int']>;
  /** Time elapsed (in seconds) since the indicator value was set. */
  durationSecondsSince?: Maybe<Scalars['Int']>;
  /** History of this indicator */
  history?: Maybe<ProjectIndicatorHistoryItemPaginated>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<ProjectIndicatorLinks>;
  /** Previous value for this indicator */
  previousValue?: Maybe<ProjectIndicator>;
  /** Rating for this indicator */
  rating?: Maybe<Scalars['String']>;
  /** Signature for the indicator */
  signature?: Maybe<Signature>;
  /** Trend since the previous value (if any) */
  trendSincePrevious?: Maybe<Scalars['String']>;
  /** Type of indicator */
  type?: Maybe<ProjectIndicatorType>;
  /** Value for the indicator */
  value?: Maybe<Scalars['JSON']>;
};


/** Project indicator */
export type ProjectIndicatorHistoryArgs = {
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};

/** Project indicator */
export type ProjectIndicatorHistoryItem = {
  __typename?: 'ProjectIndicatorHistoryItem';
  /** Comment with links. */
  annotatedComment?: Maybe<Scalars['String']>;
  /** Comment for the indicator */
  comment?: Maybe<Scalars['String']>;
  /** Compliance for the indicator */
  compliance?: Maybe<Scalars['Int']>;
  /** Time elapsed (in seconds) since the indicator value was set. */
  durationSecondsSince?: Maybe<Scalars['Int']>;
  /** Rating for this indicator */
  rating?: Maybe<Scalars['String']>;
  /** Signature for the indicator */
  signature?: Maybe<Signature>;
  /** Type of indicator */
  type?: Maybe<ProjectIndicatorType>;
  /** Value for the indicator */
  value?: Maybe<Scalars['JSON']>;
};

export type ProjectIndicatorHistoryItemPaginated = {
  __typename?: 'ProjectIndicatorHistoryItemPaginated';
  /** Information about the current page */
  pageInfo?: Maybe<PageInfo>;
  /** Items in the current page */
  pageItems: Array<ProjectIndicatorHistoryItem>;
};

/** ProjectIndicator links */
export type ProjectIndicatorLinks = {
  __typename?: 'ProjectIndicatorLinks';
  _delete?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

/** List of indicators for a project */
export type ProjectIndicators = {
  __typename?: 'ProjectIndicators';
  /** List of indicator categories */
  categories: Array<ProjectCategoryIndicators>;
  /** List of indicators */
  indicators: Array<ProjectIndicator>;
  /** Associated project */
  project?: Maybe<Project>;
};


/** List of indicators for a project */
export type ProjectIndicatorsIndicatorsArgs = {
  category?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** Type of indicator */
export type ProjectIndicatorType = {
  __typename?: 'ProjectIndicatorType';
  /** Associated category */
  category?: Maybe<IndicatorCategory>;
  /** Flag which indicates if the associated project indicators are computed or not */
  computed?: Maybe<Scalars['Boolean']>;
  /** Unique ID for the type */
  id?: Maybe<Scalars['String']>;
  /** Link to the definition of the indicator */
  link?: Maybe<Scalars['String']>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<ProjectIndicatorTypeLinks>;
  /** Name for the indicator type */
  name?: Maybe<Scalars['String']>;
  /** Source for this type */
  source?: Maybe<IndicatorSource>;
  /** Configuration for the value type */
  valueConfig?: Maybe<Scalars['JSON']>;
  /** Value type */
  valueType?: Maybe<IndicatorValueType>;
};

/** ProjectIndicatorType links */
export type ProjectIndicatorTypeLinks = {
  __typename?: 'ProjectIndicatorTypeLinks';
  _delete?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

/** Project links */
export type ProjectLinks = {
  __typename?: 'ProjectLinks';
  _actions?: Maybe<Scalars['String']>;
  _branchStatusViews?: Maybe<Scalars['String']>;
  _branches?: Maybe<Scalars['String']>;
  _buildDiffActions?: Maybe<Scalars['String']>;
  _buildSearch?: Maybe<Scalars['String']>;
  _clone?: Maybe<Scalars['String']>;
  _createBranch?: Maybe<Scalars['String']>;
  _decorations?: Maybe<Scalars['String']>;
  _delete?: Maybe<Scalars['String']>;
  _disable?: Maybe<Scalars['String']>;
  _enable?: Maybe<Scalars['String']>;
  _events?: Maybe<Scalars['String']>;
  _extra?: Maybe<Scalars['String']>;
  _favourite?: Maybe<Scalars['String']>;
  _gitSync?: Maybe<Scalars['String']>;
  _labelFromToken?: Maybe<Scalars['String']>;
  _labels?: Maybe<Scalars['String']>;
  _labelsCreate?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _permissions?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _unfavourite?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

export type ProjectRole = {
  __typename?: 'ProjectRole';
  /** Description of the role */
  description?: Maybe<Scalars['String']>;
  /** ID of the role */
  id?: Maybe<Scalars['String']>;
  /** Unique name for the role */
  name?: Maybe<Scalars['String']>;
};

export type PromotionLevel = ProjectEntity & {
  __typename?: 'PromotionLevel';
  /** Link to the image */
  _image?: Maybe<Scalars['String']>;
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** Allows a promotion level to be granted on a build as soon as a list of validation stamps has been passed */
  autoPromotionProperty?: Maybe<Property>;
  /** Reference to branch */
  branch?: Maybe<Branch>;
  creation?: Maybe<Signature>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  gitChangeLog?: Maybe<GitChangeLog>;
  id: Scalars['Int'];
  /** Flag to indicate if an image is associated */
  image?: Maybe<Scalars['Boolean']>;
  /** Link to a Jenkins Job */
  jenkinsJobProperty?: Maybe<Property>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<PromotionLevelLinks>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** Makes a promotion conditional based on the fact that a previous promotion has been granted. */
  previousPromotionConditionProperty?: Maybe<Property>;
  /** List of promotions a promotion depends on before being applied. */
  promotionDependenciesProperty?: Maybe<Property>;
  /**
   * List of runs for this promotion
   * @deprecated Use the paginated promotion runs with the `promotionRunsPaginated` field.
   */
  promotionRuns: Array<PromotionRun>;
  /** Paginated list of promotion runs */
  promotionRunsPaginated?: Maybe<PromotionRunPaginated>;
  /** List of properties */
  properties: Array<Property>;
};


export type PromotionLevelDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type PromotionLevelGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type PromotionLevelPromotionRunsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PromotionLevelPromotionRunsPaginatedArgs = {
  afterDate?: Maybe<Scalars['LocalDateTime']>;
  beforeDate?: Maybe<Scalars['LocalDateTime']>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
};


export type PromotionLevelPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

/** PromotionLevel links */
export type PromotionLevelLinks = {
  __typename?: 'PromotionLevelLinks';
  _branch?: Maybe<Scalars['String']>;
  _bulkUpdate?: Maybe<Scalars['String']>;
  _decorations?: Maybe<Scalars['String']>;
  _delete?: Maybe<Scalars['String']>;
  _events?: Maybe<Scalars['String']>;
  _image?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _project?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _runs?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};

export type PromotionRun = ProjectEntity & {
  __typename?: 'PromotionRun';
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** Associated build */
  build: Build;
  creation?: Maybe<Signature>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  gitChangeLog?: Maybe<GitChangeLog>;
  id: Scalars['Int'];
  /** Link to a Jenkins Build */
  jenkinsBuildProperty?: Maybe<Property>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<PromotionRunLinks>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** Associated promotion level */
  promotionLevel: PromotionLevel;
  /** List of properties */
  properties: Array<Property>;
};


export type PromotionRunDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type PromotionRunGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type PromotionRunPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

/** PromotionRun links */
export type PromotionRunLinks = {
  __typename?: 'PromotionRunLinks';
  _all?: Maybe<Scalars['String']>;
  _delete?: Maybe<Scalars['String']>;
  _image?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
};

export type PromotionRunPaginated = {
  __typename?: 'PromotionRunPaginated';
  /** Information about the current page */
  pageInfo?: Maybe<PageInfo>;
  /** Items in the current page */
  pageItems: Array<PromotionRun>;
};

export type Property = {
  __typename?: 'Property';
  /** True is the field is editable */
  editable?: Maybe<Scalars['Boolean']>;
  /** Property type */
  type?: Maybe<PropertyType>;
  /** JSON representation of the value */
  value?: Maybe<Scalars['JSON']>;
};

export type PropertyFilter = {
  /** type */
  type?: Maybe<Scalars['String']>;
  /** value */
  value?: Maybe<Scalars['String']>;
};

export type PropertyType = {
  __typename?: 'PropertyType';
  /** Short description for the type */
  description?: Maybe<Scalars['String']>;
  /** Display type name */
  name?: Maybe<Scalars['String']>;
  /** Qualified type name */
  typeName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accountGroupMappings: Array<AccountGroupMapping>;
  accountGroups: Array<AccountGroup>;
  accounts: Array<Account>;
  /** List of all authentication sources. */
  authenticationSources: Array<AuthenticationSource>;
  branches: Array<Branch>;
  buildFilterValidation?: Maybe<BuildFilterValidation>;
  builds: Array<Build>;
  gitChangeLog?: Maybe<GitChangeLog>;
  /** Getting Ontrack information about a Git commit and a project. */
  gitCommitInfo?: Maybe<OntrackGitCommitInfo>;
  /** Getting Ontrack information about a Git issue and a project. */
  gitIssueInfo?: Maybe<OntrackGitIssueInfo>;
  /** List of global security roles */
  globalRoles: Array<GlobalRole>;
  /** List of indicator categories */
  indicatorCategories?: Maybe<IndicatorCategories>;
  /** List of all portfolios */
  indicatorPortfolioOfPortfolios?: Maybe<IndicatorPortfolioOfPortfolios>;
  /** List of indicator portfolios */
  indicatorPortfolios: Array<IndicatorPortfolio>;
  /** List of indicator types */
  indicatorTypes?: Maybe<IndicatorTypes>;
  /** List of all labels */
  labels: Array<Label>;
  projects: Array<Project>;
  promotionLevel?: Maybe<PromotionLevel>;
  promotionRuns: Array<PromotionRun>;
  /** List of SCM catalog entries and/or orphan projects */
  scmCatalog?: Maybe<ScmCatalogEntryOrProjectPaginated>;
  /** Performs a search in Ontrack */
  search?: Maybe<SearchResultPaginated>;
  /** List of types of search results */
  searchResultTypes: Array<SearchResultType>;
  /** Gets the current user */
  user?: Maybe<User>;
  /**
   * List of actions authorized to the user
   * @deprecated Use the `authorizations` field in the `User` type accessible through the `user` root query.
   */
  userRootActions?: Maybe<UserRootActions>;
  validationRuns: Array<ValidationRun>;
  validationStamp?: Maybe<ValidationStamp>;
};


export type QueryAccountGroupMappingsArgs = {
  group?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};


export type QueryAccountGroupsArgs = {
  id?: Maybe<Scalars['Int']>;
  mapping?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryAccountsArgs = {
  group?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryAuthenticationSourcesArgs = {
  allowingPasswordChange?: Maybe<Scalars['Boolean']>;
  enabled?: Maybe<Scalars['Boolean']>;
  groupMappingSupported?: Maybe<Scalars['Boolean']>;
};


export type QueryBranchesArgs = {
  favourite?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  withProperty?: Maybe<PropertyFilter>;
};


export type QueryBuildFilterValidationArgs = {
  branchId: Scalars['Int'];
  filter: GenericBuildFilter;
};


export type QueryBuildsArgs = {
  branch?: Maybe<Scalars['String']>;
  buildBranchFilter?: Maybe<StandardBuildFilter>;
  buildProjectFilter?: Maybe<BuildSearchForm>;
  id?: Maybe<Scalars['Int']>;
  project?: Maybe<Scalars['String']>;
};


export type QueryGitChangeLogArgs = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};


export type QueryGitCommitInfoArgs = {
  commit: Scalars['String'];
};


export type QueryGitIssueInfoArgs = {
  issue: Scalars['String'];
};


export type QueryGlobalRolesArgs = {
  role?: Maybe<Scalars['String']>;
};


export type QueryIndicatorPortfoliosArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryLabelsArgs = {
  category?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryProjectsArgs = {
  favourites?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  withProperty?: Maybe<PropertyFilter>;
};


export type QueryPromotionLevelArgs = {
  id: Scalars['Int'];
};


export type QueryPromotionRunsArgs = {
  id: Scalars['Int'];
};


export type QueryScmCatalogArgs = {
  config?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  project?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  scm?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  token: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};


export type QueryValidationRunsArgs = {
  id: Scalars['Int'];
};


export type QueryValidationStampArgs = {
  id: Scalars['Int'];
};

/** Creating a project */
export type RootUserActionCreateProject = {
  __typename?: 'RootUserActionCreateProject';
  /** Description of the action */
  description: Scalars['String'];
  /** Links attached to this action */
  links?: Maybe<RootUserActionCreateProjectLinks>;
  /** Mutation associated with this action */
  mutation?: Maybe<Scalars['String']>;
};

/** Links attached to the createProject action on the RootUser type. */
export type RootUserActionCreateProjectLinks = {
  __typename?: 'RootUserActionCreateProjectLinks';
  /** Creating a project */
  form?: Maybe<UiActionLink>;
};

/** Actions for a RootUser */
export type RootUserActions = {
  __typename?: 'RootUserActions';
  /** Creating a project */
  createProject?: Maybe<RootUserActionCreateProject>;
};

export type RunInfo = {
  __typename?: 'RunInfo';
  creation?: Maybe<Signature>;
  /** Unique ID of the run info */
  id?: Maybe<Scalars['Int']>;
  /** Time of the run (in seconds) */
  runTime?: Maybe<Scalars['Int']>;
  /** Type of source (like "jenkins") */
  sourceType?: Maybe<Scalars['String']>;
  /** URI to the source of the run (like the URL to a Jenkins job) */
  sourceUri?: Maybe<Scalars['String']>;
  /** Data associated with the trigger (like a user ID or a commit) */
  triggerData?: Maybe<Scalars['String']>;
  /** Type of trigger (like "scm" or "user") */
  triggerType?: Maybe<Scalars['String']>;
};

/** SCM Catalog entry */
export type ScmCatalogEntry = {
  __typename?: 'SCMCatalogEntry';
  /** SCM Config name */
  config?: Maybe<Scalars['String']>;
  /** Flag to indicate if this SCM catalog entry is linked to a project */
  linked?: Maybe<Scalars['Boolean']>;
  /** Project linked to this SCM catalog entry. Might be null */
  project?: Maybe<Project>;
  /** SCM repository location */
  repository?: Maybe<Scalars['String']>;
  /** URL to browse the repository */
  repositoryPage?: Maybe<Scalars['String']>;
  /** Type of SCM */
  scm?: Maybe<Scalars['String']>;
  /** Collection timestamp */
  timestamp?: Maybe<Scalars['LocalDateTime']>;
};

/** SCM Catalog entry or/and project */
export type ScmCatalogEntryOrProject = {
  __typename?: 'SCMCatalogEntryOrProject';
  /** SCM Catalog entry */
  entry?: Maybe<ScmCatalogEntry>;
  /** Associated project or orphan project */
  project?: Maybe<Project>;
};

export type ScmCatalogEntryOrProjectPaginated = {
  __typename?: 'SCMCatalogEntryOrProjectPaginated';
  /** Information about the current page */
  pageInfo?: Maybe<PageInfo>;
  /** Items in the current page */
  pageItems: Array<ScmCatalogEntryOrProject>;
};

/** Search result */
export type SearchResult = {
  __typename?: 'SearchResult';
  /** Score for the search */
  accuracy?: Maybe<Scalars['Float']>;
  /** Description linked to the item being found */
  description?: Maybe<Scalars['String']>;
  /** Web access point */
  page?: Maybe<Scalars['String']>;
  /** Short title */
  title?: Maybe<Scalars['String']>;
  /** Type of result */
  type?: Maybe<SearchResultType>;
  /** Web access point (used for Next Gen UI) */
  uiPage: UiPage;
  /** API access point */
  uri?: Maybe<Scalars['String']>;
};

export type SearchResultPaginated = {
  __typename?: 'SearchResultPaginated';
  /** Information about the current page */
  pageInfo?: Maybe<PageInfo>;
  /** Items in the current page */
  pageItems: Array<SearchResult>;
};

/** Type of search result */
export type SearchResultType = {
  __typename?: 'SearchResultType';
  /** Short help text explaining the format of the token */
  description?: Maybe<Scalars['String']>;
  /** Associated feature */
  feature?: Maybe<ExtensionFeatureDescription>;
  /** ID for the type of search result */
  id?: Maybe<Scalars['String']>;
  /** Display name for the search result */
  name?: Maybe<Scalars['String']>;
};

/** Service configuration or data associated with an ID */
export type ServiceConfiguration = {
  __typename?: 'ServiceConfiguration';
  /** Data for the service configuration */
  data?: Maybe<Scalars['JSON']>;
  /** ID of the service configuration */
  id?: Maybe<Scalars['String']>;
};

export type Signature = {
  __typename?: 'Signature';
  /** ISO timestamp */
  time?: Maybe<Scalars['String']>;
  /** User name */
  user?: Maybe<Scalars['String']>;
};

export type StandardBuildFilter = {
  /** Build created after or on this date */
  afterDate?: Maybe<Scalars['String']>;
  /** Build created before or on this date */
  beforeDate?: Maybe<Scalars['String']>;
  /** Maximum number of builds to display */
  count?: Maybe<Scalars['Int']>;
  /**
   * The build must be linked FROM the builds selected by the pattern.
   * Syntax: PRJ:BLD where PRJ is a project name and BLD a build expression - with * as placeholder
   */
  linkedFrom?: Maybe<Scalars['String']>;
  /** The build must be linked FROM a build having this promotion (requires "linkedFrom") */
  linkedFromPromotion?: Maybe<Scalars['String']>;
  /**
   * The build must be linked TO the builds selected by the pattern.
   * Syntax: PRJ:BLD where PRJ is a project name and BLD a build expression - with * as placeholder
   */
  linkedTo?: Maybe<Scalars['String']>;
  /** The build must be linked TO a build having this promotion (requires "linkedTo") */
  linkedToPromotion?: Maybe<Scalars['String']>;
  /** Builds since the last one which was promoted to this level */
  sincePromotionLevel?: Maybe<Scalars['String']>;
  /** Since property */
  sinceProperty?: Maybe<Scalars['String']>;
  /** ...with value */
  sincePropertyValue?: Maybe<Scalars['String']>;
  /** Builds since the last one which had this validation stamp */
  sinceValidationStamp?: Maybe<Scalars['String']>;
  /** ... with status */
  sinceValidationStampStatus?: Maybe<Scalars['String']>;
  /** Builds with this promotion level */
  withPromotionLevel?: Maybe<Scalars['String']>;
  /** With property */
  withProperty?: Maybe<Scalars['String']>;
  /** ...with value */
  withPropertyValue?: Maybe<Scalars['String']>;
  /** Builds with this validation stamp */
  withValidationStamp?: Maybe<Scalars['String']>;
  /** ... with status */
  withValidationStampStatus?: Maybe<Scalars['String']>;
};

/** Authentication token */
export type Token = {
  __typename?: 'Token';
  /** Token creation date. */
  creation?: Maybe<Scalars['LocalDateTime']>;
  /** Validity flag, computed in regard to current time. */
  valid?: Maybe<Scalars['Boolean']>;
  /** Date until the end of validity. */
  validUntil?: Maybe<Scalars['LocalDateTime']>;
};

/**
 * An `ActionLink` refers to a HTTP end point,
 * having an uri, a HTTP method (like `PUT`
 * or `POST`) and a type.
 * The  type identifies the type of action,
 * like "download", "form", "upload", etc.
 */
export type UiActionLink = {
  __typename?: 'UIActionLink';
  /** Link description */
  description: Scalars['String'];
  /** Is this end point enabled, according to authorizations and state. */
  enabled: Scalars['Boolean'];
  /** HTTP method to use */
  method: Scalars['String'];
  /** End point URI */
  uri?: Maybe<Scalars['String']>;
};

/** UIMenuAction */
export type UiMenuAction = {
  /** will be used as a tooltip */
  description: Scalars['String'];
  /** ID of a FontAwesome icon to associate with this menu entry */
  icon: Scalars['String'];
  /** will be used as a HTML ID */
  id: Scalars['String'];
  /** will be used as a link name */
  name: Scalars['String'];
};

/** Action to move the user to another page */
export type UiMenuPageAction = UiMenuAction & {
  __typename?: 'UIMenuPageAction';
  /** will be used as a tooltip */
  description: Scalars['String'];
  /** ID of a FontAwesome icon to associate with this menu entry */
  icon: Scalars['String'];
  /** will be used as a HTML ID */
  id: Scalars['String'];
  /** will be used as a link name */
  name: Scalars['String'];
  /** Page to display */
  page: UiPage;
};

/** Action to redirect the user to another URI */
export type UiMenuUriAction = UiMenuAction & {
  __typename?: 'UIMenuURIAction';
  /** will be used as a tooltip */
  description: Scalars['String'];
  /** ID of a FontAwesome icon to associate with this menu entry */
  icon: Scalars['String'];
  /** will be used as a HTML ID */
  id: Scalars['String'];
  /** will be used as a link name */
  name: Scalars['String'];
  /** URI to redirect to */
  uri: Scalars['String'];
};

/** Defines a page at the front-end. */
export type UiPage = {
  __typename?: 'UIPage';
  /** feature field */
  feature?: Maybe<ExtensionFeatureDescription>;
  /** params field */
  params: Array<UiPageParam>;
  /** type field */
  type: Scalars['String'];
};

/** UIPageParam */
export type UiPageParam = {
  __typename?: 'UIPageParam';
  /** Parameter name */
  name: Scalars['String'];
  /** Parameter value */
  value: Scalars['String'];
};

/** Input type for the updateProject mutation. */
export type UpdateProjectInput = {
  /** Project description (leave null to not change) */
  description?: Maybe<Scalars['String']>;
  /** Project state (leave null to not change) */
  disabled?: Maybe<Scalars['Boolean']>;
  /** Project ID */
  id: Scalars['Int'];
  /** Project name (leave null to not change) */
  name?: Maybe<Scalars['String']>;
};

/** Output type for the updateProject mutation. */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /** List of errors */
  errors?: Maybe<Array<Maybe<UserError>>>;
  /** Updated project */
  project?: Maybe<Project>;
};

/** Representation of the current user */
export type User = {
  __typename?: 'User';
  /** Account associated to the user */
  account?: Maybe<Account>;
  /** Actions for a RootUser */
  actions?: Maybe<RootUserActions>;
  /** List of actions in the user menu */
  uiMenuActions: Array<UiMenuAction>;
};

/** Representation of an error. */
export type UserError = {
  __typename?: 'UserError';
  /** Programmatic code to be used by client. Usually the FQCN of the corresponding exception. */
  exception?: Maybe<Scalars['String']>;
  /** Additional information about the location of this error. */
  location?: Maybe<Scalars['String']>;
  /** The error message */
  message?: Maybe<Scalars['String']>;
};

/** List of actions authorized to the user */
export type UserRootActions = {
  __typename?: 'UserRootActions';
  projectCreate?: Maybe<Scalars['String']>;
};

export type Validation = {
  __typename?: 'Validation';
  /** Associated validation runs */
  validationRuns: Array<ValidationRun>;
  /** Associated validation stamp */
  validationStamp?: Maybe<ValidationStamp>;
};


export type ValidationValidationRunsArgs = {
  count?: Maybe<Scalars['Int']>;
};

/** Configuration for the data type associated with a validation stamp */
export type ValidationDataTypeConfig = {
  __typename?: 'ValidationDataTypeConfig';
  /** Configuration object */
  config?: Maybe<Scalars['JSON']>;
  /** Descriptor for the validation data type */
  descriptor?: Maybe<ValidationDataTypeDescriptor>;
};

/** Descriptor for a validation data type */
export type ValidationDataTypeDescriptor = {
  __typename?: 'ValidationDataTypeDescriptor';
  /** Display name of the validation data type */
  displayName?: Maybe<Scalars['String']>;
  /** Associated extension feature */
  feature?: Maybe<ExtensionFeatureDescription>;
  /** ID (FQDN) of the validation data type */
  id?: Maybe<Scalars['String']>;
};

/** Association between an issue and some validation runs. */
export type ValidationIssue = {
  __typename?: 'ValidationIssue';
  /** Associated issue */
  issue?: Maybe<Issue>;
  /** List of validation runs where this issue was reported */
  validationRuns: Array<ValidationRun>;
};

export type ValidationRun = ProjectEntity & {
  __typename?: 'ValidationRun';
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** Associated build */
  build: Build;
  creation?: Maybe<Signature>;
  /** Data associated with the validation run */
  data?: Maybe<ValidationRunData>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  gitChangeLog?: Maybe<GitChangeLog>;
  id: Scalars['Int'];
  /** Link to a Jenkins Build */
  jenkinsBuildProperty?: Maybe<Property>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<ValidationRunLinks>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** List of properties */
  properties: Array<Property>;
  /** Run info associated with this validation run */
  runInfo?: Maybe<RunInfo>;
  /** Run order */
  runOrder?: Maybe<Scalars['Int']>;
  /** List of validation statuses */
  validationRunStatuses: Array<ValidationRunStatus>;
  /** Associated validation stamp */
  validationStamp: ValidationStamp;
};


export type ValidationRunDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type ValidationRunGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type ValidationRunPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

/** Data associated with a validation run */
export type ValidationRunData = {
  __typename?: 'ValidationRunData';
  /** Data object */
  data?: Maybe<Scalars['JSON']>;
  /** Descriptor for the validation data type */
  descriptor?: Maybe<ValidationDataTypeDescriptor>;
};

/** ValidationRun links */
export type ValidationRunLinks = {
  __typename?: 'ValidationRunLinks';
  _decorations?: Maybe<Scalars['String']>;
  _extra?: Maybe<Scalars['String']>;
  _image?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _runInfo?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _validationRunStatusChange?: Maybe<Scalars['String']>;
  _validationStampLink?: Maybe<Scalars['String']>;
};

export type ValidationRunPaginated = {
  __typename?: 'ValidationRunPaginated';
  /** Information about the current page */
  pageInfo?: Maybe<PageInfo>;
  /** Items in the current page */
  pageItems: Array<ValidationRun>;
};

export type ValidationRunStatus = {
  __typename?: 'ValidationRunStatus';
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  creation?: Maybe<Signature>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** List of issues attached to this status */
  issues: Array<Issue>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<ValidationRunStatusLinks>;
  /** Status ID */
  statusID?: Maybe<ValidationRunStatusId>;
};


export type ValidationRunStatusIssuesArgs = {
  status?: Maybe<Scalars['String']>;
};

export type ValidationRunStatusId = {
  __typename?: 'ValidationRunStatusID';
  /** List of following statuses */
  followingStatuses: Array<Scalars['String']>;
  /** Status ID */
  id?: Maybe<Scalars['String']>;
  /** Status display name */
  name?: Maybe<Scalars['String']>;
  /** Passing status? */
  passed?: Maybe<Scalars['Boolean']>;
  /** Root status? */
  root?: Maybe<Scalars['Boolean']>;
};

/** ValidationRunStatus links */
export type ValidationRunStatusLinks = {
  __typename?: 'ValidationRunStatusLinks';
  _comment?: Maybe<Scalars['String']>;
};

export type ValidationStamp = ProjectEntity & {
  __typename?: 'ValidationStamp';
  /** Link to the image */
  _image?: Maybe<Scalars['String']>;
  /** Description with links. */
  annotatedDescription?: Maybe<Scalars['String']>;
  /** Reference to branch */
  branch?: Maybe<Branch>;
  creation?: Maybe<Signature>;
  /** Data definition associated with the validation stamp */
  dataType?: Maybe<ValidationDataTypeConfig>;
  /** List of decorations */
  decorations: Array<Decoration>;
  description?: Maybe<Scalars['String']>;
  gitChangeLog?: Maybe<GitChangeLog>;
  id: Scalars['Int'];
  /** Flag to indicate if an image is associated */
  image?: Maybe<Scalars['Boolean']>;
  /** Link to a Jenkins Job */
  jenkinsJobProperty?: Maybe<Property>;
  /** List of links. */
  linkProperty?: Maybe<Property>;
  /**
   * Links
   * @deprecated Use the `actions` field instead.
   */
  links?: Maybe<ValidationStampLinks>;
  /** Message. */
  messageProperty?: Maybe<Property>;
  /** List of meta information properties */
  metaInfoProperty?: Maybe<Property>;
  name?: Maybe<Scalars['String']>;
  /** List of properties */
  properties: Array<Property>;
  /** List of runs for this validation stamp */
  validationRuns: Array<ValidationRun>;
  /** Paginated list of validation runs */
  validationRunsPaginated?: Maybe<ValidationRunPaginated>;
};


export type ValidationStampDecorationsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type ValidationStampGitChangeLogArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type ValidationStampPropertiesArgs = {
  hasValue?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};


export type ValidationStampValidationRunsArgs = {
  count?: Maybe<Scalars['Int']>;
};


export type ValidationStampValidationRunsPaginatedArgs = {
  buildId?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  passed?: Maybe<Scalars['Boolean']>;
  size?: Maybe<Scalars['Int']>;
};

/** ValidationStamp links */
export type ValidationStampLinks = {
  __typename?: 'ValidationStampLinks';
  _branch?: Maybe<Scalars['String']>;
  _bulkUpdate?: Maybe<Scalars['String']>;
  _decorations?: Maybe<Scalars['String']>;
  _delete?: Maybe<Scalars['String']>;
  _events?: Maybe<Scalars['String']>;
  _image?: Maybe<Scalars['String']>;
  _page?: Maybe<Scalars['String']>;
  _project?: Maybe<Scalars['String']>;
  _properties?: Maybe<Scalars['String']>;
  _runs?: Maybe<Scalars['String']>;
  _self?: Maybe<Scalars['String']>;
  _update?: Maybe<Scalars['String']>;
};
