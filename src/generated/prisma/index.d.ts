
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model SearchConfig
 * 
 */
export type SearchConfig = $Result.DefaultSelection<Prisma.$SearchConfigPayload>
/**
 * Model ScrapeLog
 * 
 */
export type ScrapeLog = $Result.DefaultSelection<Prisma.$ScrapeLogPayload>
/**
 * Model SiteConfig
 * 
 */
export type SiteConfig = $Result.DefaultSelection<Prisma.$SiteConfigPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model GeneratedEmail
 * 
 */
export type GeneratedEmail = $Result.DefaultSelection<Prisma.$GeneratedEmailPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Jobs
 * const jobs = await prisma.job.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Jobs
   * const jobs = await prisma.job.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.searchConfig`: Exposes CRUD operations for the **SearchConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchConfigs
    * const searchConfigs = await prisma.searchConfig.findMany()
    * ```
    */
  get searchConfig(): Prisma.SearchConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scrapeLog`: Exposes CRUD operations for the **ScrapeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScrapeLogs
    * const scrapeLogs = await prisma.scrapeLog.findMany()
    * ```
    */
  get scrapeLog(): Prisma.ScrapeLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteConfig`: Exposes CRUD operations for the **SiteConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteConfigs
    * const siteConfigs = await prisma.siteConfig.findMany()
    * ```
    */
  get siteConfig(): Prisma.SiteConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.generatedEmail`: Exposes CRUD operations for the **GeneratedEmail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneratedEmails
    * const generatedEmails = await prisma.generatedEmail.findMany()
    * ```
    */
  get generatedEmail(): Prisma.GeneratedEmailDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Job: 'Job',
    SearchConfig: 'SearchConfig',
    ScrapeLog: 'ScrapeLog',
    SiteConfig: 'SiteConfig',
    UserProfile: 'UserProfile',
    GeneratedEmail: 'GeneratedEmail'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "job" | "searchConfig" | "scrapeLog" | "siteConfig" | "userProfile" | "generatedEmail"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      SearchConfig: {
        payload: Prisma.$SearchConfigPayload<ExtArgs>
        fields: Prisma.SearchConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>
          }
          findFirst: {
            args: Prisma.SearchConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>
          }
          findMany: {
            args: Prisma.SearchConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>[]
          }
          create: {
            args: Prisma.SearchConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>
          }
          createMany: {
            args: Prisma.SearchConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>[]
          }
          delete: {
            args: Prisma.SearchConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>
          }
          update: {
            args: Prisma.SearchConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>
          }
          deleteMany: {
            args: Prisma.SearchConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>[]
          }
          upsert: {
            args: Prisma.SearchConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchConfigPayload>
          }
          aggregate: {
            args: Prisma.SearchConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchConfig>
          }
          groupBy: {
            args: Prisma.SearchConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SearchConfigCountAggregateOutputType> | number
          }
        }
      }
      ScrapeLog: {
        payload: Prisma.$ScrapeLogPayload<ExtArgs>
        fields: Prisma.ScrapeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScrapeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScrapeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>
          }
          findFirst: {
            args: Prisma.ScrapeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScrapeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>
          }
          findMany: {
            args: Prisma.ScrapeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>[]
          }
          create: {
            args: Prisma.ScrapeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>
          }
          createMany: {
            args: Prisma.ScrapeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScrapeLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>[]
          }
          delete: {
            args: Prisma.ScrapeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>
          }
          update: {
            args: Prisma.ScrapeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>
          }
          deleteMany: {
            args: Prisma.ScrapeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScrapeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScrapeLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>[]
          }
          upsert: {
            args: Prisma.ScrapeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeLogPayload>
          }
          aggregate: {
            args: Prisma.ScrapeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScrapeLog>
          }
          groupBy: {
            args: Prisma.ScrapeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScrapeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScrapeLogCountArgs<ExtArgs>
            result: $Utils.Optional<ScrapeLogCountAggregateOutputType> | number
          }
        }
      }
      SiteConfig: {
        payload: Prisma.$SiteConfigPayload<ExtArgs>
        fields: Prisma.SiteConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>
          }
          findFirst: {
            args: Prisma.SiteConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>
          }
          findMany: {
            args: Prisma.SiteConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>[]
          }
          create: {
            args: Prisma.SiteConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>
          }
          createMany: {
            args: Prisma.SiteConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>[]
          }
          delete: {
            args: Prisma.SiteConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>
          }
          update: {
            args: Prisma.SiteConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>
          }
          deleteMany: {
            args: Prisma.SiteConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>[]
          }
          upsert: {
            args: Prisma.SiteConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteConfigPayload>
          }
          aggregate: {
            args: Prisma.SiteConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteConfig>
          }
          groupBy: {
            args: Prisma.SiteConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SiteConfigCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      GeneratedEmail: {
        payload: Prisma.$GeneratedEmailPayload<ExtArgs>
        fields: Prisma.GeneratedEmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneratedEmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneratedEmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          findFirst: {
            args: Prisma.GeneratedEmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneratedEmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          findMany: {
            args: Prisma.GeneratedEmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>[]
          }
          create: {
            args: Prisma.GeneratedEmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          createMany: {
            args: Prisma.GeneratedEmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneratedEmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>[]
          }
          delete: {
            args: Prisma.GeneratedEmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          update: {
            args: Prisma.GeneratedEmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          deleteMany: {
            args: Prisma.GeneratedEmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneratedEmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeneratedEmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>[]
          }
          upsert: {
            args: Prisma.GeneratedEmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedEmailPayload>
          }
          aggregate: {
            args: Prisma.GeneratedEmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneratedEmail>
          }
          groupBy: {
            args: Prisma.GeneratedEmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneratedEmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneratedEmailCountArgs<ExtArgs>
            result: $Utils.Optional<GeneratedEmailCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    job?: JobOmit
    searchConfig?: SearchConfigOmit
    scrapeLog?: ScrapeLogOmit
    siteConfig?: SiteConfigOmit
    userProfile?: UserProfileOmit
    generatedEmail?: GeneratedEmailOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    generatedEmails: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    generatedEmails?: boolean | JobCountOutputTypeCountGeneratedEmailsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountGeneratedEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedEmailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    salaryMin: number | null
    salaryMax: number | null
    aiScore: number | null
  }

  export type JobSumAggregateOutputType = {
    salaryMin: number | null
    salaryMax: number | null
    aiScore: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    externalId: string | null
    site: string | null
    title: string | null
    company: string | null
    salary: string | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    description: string | null
    url: string | null
    jobType: string | null
    experienceLevel: string | null
    workArrangement: string | null
    skills: string | null
    location: string | null
    postedAt: Date | null
    scrapedAt: Date | null
    status: string | null
    aiScore: number | null
    aiSummary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    externalId: string | null
    site: string | null
    title: string | null
    company: string | null
    salary: string | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    description: string | null
    url: string | null
    jobType: string | null
    experienceLevel: string | null
    workArrangement: string | null
    skills: string | null
    location: string | null
    postedAt: Date | null
    scrapedAt: Date | null
    status: string | null
    aiScore: number | null
    aiSummary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    externalId: number
    site: number
    title: number
    company: number
    salary: number
    salaryMin: number
    salaryMax: number
    salaryCurrency: number
    description: number
    url: number
    jobType: number
    experienceLevel: number
    workArrangement: number
    skills: number
    location: number
    postedAt: number
    scrapedAt: number
    status: number
    aiScore: number
    aiSummary: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    salaryMin?: true
    salaryMax?: true
    aiScore?: true
  }

  export type JobSumAggregateInputType = {
    salaryMin?: true
    salaryMax?: true
    aiScore?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    externalId?: true
    site?: true
    title?: true
    company?: true
    salary?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    description?: true
    url?: true
    jobType?: true
    experienceLevel?: true
    workArrangement?: true
    skills?: true
    location?: true
    postedAt?: true
    scrapedAt?: true
    status?: true
    aiScore?: true
    aiSummary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    externalId?: true
    site?: true
    title?: true
    company?: true
    salary?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    description?: true
    url?: true
    jobType?: true
    experienceLevel?: true
    workArrangement?: true
    skills?: true
    location?: true
    postedAt?: true
    scrapedAt?: true
    status?: true
    aiScore?: true
    aiSummary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    externalId?: true
    site?: true
    title?: true
    company?: true
    salary?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    description?: true
    url?: true
    jobType?: true
    experienceLevel?: true
    workArrangement?: true
    skills?: true
    location?: true
    postedAt?: true
    scrapedAt?: true
    status?: true
    aiScore?: true
    aiSummary?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    externalId: string
    site: string
    title: string
    company: string
    salary: string | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    description: string
    url: string
    jobType: string | null
    experienceLevel: string | null
    workArrangement: string | null
    skills: string | null
    location: string | null
    postedAt: Date | null
    scrapedAt: Date
    status: string
    aiScore: number | null
    aiSummary: string | null
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    site?: boolean
    title?: boolean
    company?: boolean
    salary?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    description?: boolean
    url?: boolean
    jobType?: boolean
    experienceLevel?: boolean
    workArrangement?: boolean
    skills?: boolean
    location?: boolean
    postedAt?: boolean
    scrapedAt?: boolean
    status?: boolean
    aiScore?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    generatedEmails?: boolean | Job$generatedEmailsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    site?: boolean
    title?: boolean
    company?: boolean
    salary?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    description?: boolean
    url?: boolean
    jobType?: boolean
    experienceLevel?: boolean
    workArrangement?: boolean
    skills?: boolean
    location?: boolean
    postedAt?: boolean
    scrapedAt?: boolean
    status?: boolean
    aiScore?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    site?: boolean
    title?: boolean
    company?: boolean
    salary?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    description?: boolean
    url?: boolean
    jobType?: boolean
    experienceLevel?: boolean
    workArrangement?: boolean
    skills?: boolean
    location?: boolean
    postedAt?: boolean
    scrapedAt?: boolean
    status?: boolean
    aiScore?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    externalId?: boolean
    site?: boolean
    title?: boolean
    company?: boolean
    salary?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    description?: boolean
    url?: boolean
    jobType?: boolean
    experienceLevel?: boolean
    workArrangement?: boolean
    skills?: boolean
    location?: boolean
    postedAt?: boolean
    scrapedAt?: boolean
    status?: boolean
    aiScore?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "site" | "title" | "company" | "salary" | "salaryMin" | "salaryMax" | "salaryCurrency" | "description" | "url" | "jobType" | "experienceLevel" | "workArrangement" | "skills" | "location" | "postedAt" | "scrapedAt" | "status" | "aiScore" | "aiSummary" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    generatedEmails?: boolean | Job$generatedEmailsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      generatedEmails: Prisma.$GeneratedEmailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalId: string
      site: string
      title: string
      company: string
      salary: string | null
      salaryMin: number | null
      salaryMax: number | null
      salaryCurrency: string | null
      description: string
      url: string
      jobType: string | null
      experienceLevel: string | null
      workArrangement: string | null
      skills: string | null
      location: string | null
      postedAt: Date | null
      scrapedAt: Date
      status: string
      aiScore: number | null
      aiSummary: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    generatedEmails<T extends Job$generatedEmailsArgs<ExtArgs> = {}>(args?: Subset<T, Job$generatedEmailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly externalId: FieldRef<"Job", 'String'>
    readonly site: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly company: FieldRef<"Job", 'String'>
    readonly salary: FieldRef<"Job", 'String'>
    readonly salaryMin: FieldRef<"Job", 'Int'>
    readonly salaryMax: FieldRef<"Job", 'Int'>
    readonly salaryCurrency: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly url: FieldRef<"Job", 'String'>
    readonly jobType: FieldRef<"Job", 'String'>
    readonly experienceLevel: FieldRef<"Job", 'String'>
    readonly workArrangement: FieldRef<"Job", 'String'>
    readonly skills: FieldRef<"Job", 'String'>
    readonly location: FieldRef<"Job", 'String'>
    readonly postedAt: FieldRef<"Job", 'DateTime'>
    readonly scrapedAt: FieldRef<"Job", 'DateTime'>
    readonly status: FieldRef<"Job", 'String'>
    readonly aiScore: FieldRef<"Job", 'Float'>
    readonly aiSummary: FieldRef<"Job", 'String'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job.generatedEmails
   */
  export type Job$generatedEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    where?: GeneratedEmailWhereInput
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    cursor?: GeneratedEmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model SearchConfig
   */

  export type AggregateSearchConfig = {
    _count: SearchConfigCountAggregateOutputType | null
    _avg: SearchConfigAvgAggregateOutputType | null
    _sum: SearchConfigSumAggregateOutputType | null
    _min: SearchConfigMinAggregateOutputType | null
    _max: SearchConfigMaxAggregateOutputType | null
  }

  export type SearchConfigAvgAggregateOutputType = {
    daysPosted: number | null
    salaryMin: number | null
    salaryMax: number | null
    aiThreshold: number | null
    maxEmailsPerRun: number | null
  }

  export type SearchConfigSumAggregateOutputType = {
    daysPosted: number | null
    salaryMin: number | null
    salaryMax: number | null
    aiThreshold: number | null
    maxEmailsPerRun: number | null
  }

  export type SearchConfigMinAggregateOutputType = {
    id: string | null
    keywords: string | null
    excludeKeywords: string | null
    enabledSites: string | null
    daysPosted: number | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    jobTypes: string | null
    experienceLevels: string | null
    workArrangements: string | null
    excludeCompanies: string | null
    requiredSkills: string | null
    preferredSkills: string | null
    useAIMatching: boolean | null
    aiThreshold: number | null
    digestMode: boolean | null
    maxEmailsPerRun: number | null
    updatedAt: Date | null
  }

  export type SearchConfigMaxAggregateOutputType = {
    id: string | null
    keywords: string | null
    excludeKeywords: string | null
    enabledSites: string | null
    daysPosted: number | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    jobTypes: string | null
    experienceLevels: string | null
    workArrangements: string | null
    excludeCompanies: string | null
    requiredSkills: string | null
    preferredSkills: string | null
    useAIMatching: boolean | null
    aiThreshold: number | null
    digestMode: boolean | null
    maxEmailsPerRun: number | null
    updatedAt: Date | null
  }

  export type SearchConfigCountAggregateOutputType = {
    id: number
    keywords: number
    excludeKeywords: number
    enabledSites: number
    daysPosted: number
    salaryMin: number
    salaryMax: number
    salaryCurrency: number
    jobTypes: number
    experienceLevels: number
    workArrangements: number
    excludeCompanies: number
    requiredSkills: number
    preferredSkills: number
    useAIMatching: number
    aiThreshold: number
    digestMode: number
    maxEmailsPerRun: number
    updatedAt: number
    _all: number
  }


  export type SearchConfigAvgAggregateInputType = {
    daysPosted?: true
    salaryMin?: true
    salaryMax?: true
    aiThreshold?: true
    maxEmailsPerRun?: true
  }

  export type SearchConfigSumAggregateInputType = {
    daysPosted?: true
    salaryMin?: true
    salaryMax?: true
    aiThreshold?: true
    maxEmailsPerRun?: true
  }

  export type SearchConfigMinAggregateInputType = {
    id?: true
    keywords?: true
    excludeKeywords?: true
    enabledSites?: true
    daysPosted?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    jobTypes?: true
    experienceLevels?: true
    workArrangements?: true
    excludeCompanies?: true
    requiredSkills?: true
    preferredSkills?: true
    useAIMatching?: true
    aiThreshold?: true
    digestMode?: true
    maxEmailsPerRun?: true
    updatedAt?: true
  }

  export type SearchConfigMaxAggregateInputType = {
    id?: true
    keywords?: true
    excludeKeywords?: true
    enabledSites?: true
    daysPosted?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    jobTypes?: true
    experienceLevels?: true
    workArrangements?: true
    excludeCompanies?: true
    requiredSkills?: true
    preferredSkills?: true
    useAIMatching?: true
    aiThreshold?: true
    digestMode?: true
    maxEmailsPerRun?: true
    updatedAt?: true
  }

  export type SearchConfigCountAggregateInputType = {
    id?: true
    keywords?: true
    excludeKeywords?: true
    enabledSites?: true
    daysPosted?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    jobTypes?: true
    experienceLevels?: true
    workArrangements?: true
    excludeCompanies?: true
    requiredSkills?: true
    preferredSkills?: true
    useAIMatching?: true
    aiThreshold?: true
    digestMode?: true
    maxEmailsPerRun?: true
    updatedAt?: true
    _all?: true
  }

  export type SearchConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchConfig to aggregate.
     */
    where?: SearchConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchConfigs to fetch.
     */
    orderBy?: SearchConfigOrderByWithRelationInput | SearchConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchConfigs
    **/
    _count?: true | SearchConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchConfigMaxAggregateInputType
  }

  export type GetSearchConfigAggregateType<T extends SearchConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchConfig[P]>
      : GetScalarType<T[P], AggregateSearchConfig[P]>
  }




  export type SearchConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchConfigWhereInput
    orderBy?: SearchConfigOrderByWithAggregationInput | SearchConfigOrderByWithAggregationInput[]
    by: SearchConfigScalarFieldEnum[] | SearchConfigScalarFieldEnum
    having?: SearchConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchConfigCountAggregateInputType | true
    _avg?: SearchConfigAvgAggregateInputType
    _sum?: SearchConfigSumAggregateInputType
    _min?: SearchConfigMinAggregateInputType
    _max?: SearchConfigMaxAggregateInputType
  }

  export type SearchConfigGroupByOutputType = {
    id: string
    keywords: string
    excludeKeywords: string
    enabledSites: string
    daysPosted: number | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string
    jobTypes: string
    experienceLevels: string
    workArrangements: string
    excludeCompanies: string
    requiredSkills: string
    preferredSkills: string
    useAIMatching: boolean
    aiThreshold: number
    digestMode: boolean
    maxEmailsPerRun: number
    updatedAt: Date
    _count: SearchConfigCountAggregateOutputType | null
    _avg: SearchConfigAvgAggregateOutputType | null
    _sum: SearchConfigSumAggregateOutputType | null
    _min: SearchConfigMinAggregateOutputType | null
    _max: SearchConfigMaxAggregateOutputType | null
  }

  type GetSearchConfigGroupByPayload<T extends SearchConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SearchConfigGroupByOutputType[P]>
        }
      >
    >


  export type SearchConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keywords?: boolean
    excludeKeywords?: boolean
    enabledSites?: boolean
    daysPosted?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    jobTypes?: boolean
    experienceLevels?: boolean
    workArrangements?: boolean
    excludeCompanies?: boolean
    requiredSkills?: boolean
    preferredSkills?: boolean
    useAIMatching?: boolean
    aiThreshold?: boolean
    digestMode?: boolean
    maxEmailsPerRun?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchConfig"]>

  export type SearchConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keywords?: boolean
    excludeKeywords?: boolean
    enabledSites?: boolean
    daysPosted?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    jobTypes?: boolean
    experienceLevels?: boolean
    workArrangements?: boolean
    excludeCompanies?: boolean
    requiredSkills?: boolean
    preferredSkills?: boolean
    useAIMatching?: boolean
    aiThreshold?: boolean
    digestMode?: boolean
    maxEmailsPerRun?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchConfig"]>

  export type SearchConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keywords?: boolean
    excludeKeywords?: boolean
    enabledSites?: boolean
    daysPosted?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    jobTypes?: boolean
    experienceLevels?: boolean
    workArrangements?: boolean
    excludeCompanies?: boolean
    requiredSkills?: boolean
    preferredSkills?: boolean
    useAIMatching?: boolean
    aiThreshold?: boolean
    digestMode?: boolean
    maxEmailsPerRun?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchConfig"]>

  export type SearchConfigSelectScalar = {
    id?: boolean
    keywords?: boolean
    excludeKeywords?: boolean
    enabledSites?: boolean
    daysPosted?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    jobTypes?: boolean
    experienceLevels?: boolean
    workArrangements?: boolean
    excludeCompanies?: boolean
    requiredSkills?: boolean
    preferredSkills?: boolean
    useAIMatching?: boolean
    aiThreshold?: boolean
    digestMode?: boolean
    maxEmailsPerRun?: boolean
    updatedAt?: boolean
  }

  export type SearchConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "keywords" | "excludeKeywords" | "enabledSites" | "daysPosted" | "salaryMin" | "salaryMax" | "salaryCurrency" | "jobTypes" | "experienceLevels" | "workArrangements" | "excludeCompanies" | "requiredSkills" | "preferredSkills" | "useAIMatching" | "aiThreshold" | "digestMode" | "maxEmailsPerRun" | "updatedAt", ExtArgs["result"]["searchConfig"]>

  export type $SearchConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      keywords: string
      excludeKeywords: string
      enabledSites: string
      daysPosted: number | null
      salaryMin: number | null
      salaryMax: number | null
      salaryCurrency: string
      jobTypes: string
      experienceLevels: string
      workArrangements: string
      excludeCompanies: string
      requiredSkills: string
      preferredSkills: string
      useAIMatching: boolean
      aiThreshold: number
      digestMode: boolean
      maxEmailsPerRun: number
      updatedAt: Date
    }, ExtArgs["result"]["searchConfig"]>
    composites: {}
  }

  type SearchConfigGetPayload<S extends boolean | null | undefined | SearchConfigDefaultArgs> = $Result.GetResult<Prisma.$SearchConfigPayload, S>

  type SearchConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchConfigCountAggregateInputType | true
    }

  export interface SearchConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchConfig'], meta: { name: 'SearchConfig' } }
    /**
     * Find zero or one SearchConfig that matches the filter.
     * @param {SearchConfigFindUniqueArgs} args - Arguments to find a SearchConfig
     * @example
     * // Get one SearchConfig
     * const searchConfig = await prisma.searchConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchConfigFindUniqueArgs>(args: SelectSubset<T, SearchConfigFindUniqueArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchConfigFindUniqueOrThrowArgs} args - Arguments to find a SearchConfig
     * @example
     * // Get one SearchConfig
     * const searchConfig = await prisma.searchConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigFindFirstArgs} args - Arguments to find a SearchConfig
     * @example
     * // Get one SearchConfig
     * const searchConfig = await prisma.searchConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchConfigFindFirstArgs>(args?: SelectSubset<T, SearchConfigFindFirstArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigFindFirstOrThrowArgs} args - Arguments to find a SearchConfig
     * @example
     * // Get one SearchConfig
     * const searchConfig = await prisma.searchConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchConfigs
     * const searchConfigs = await prisma.searchConfig.findMany()
     * 
     * // Get first 10 SearchConfigs
     * const searchConfigs = await prisma.searchConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchConfigWithIdOnly = await prisma.searchConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchConfigFindManyArgs>(args?: SelectSubset<T, SearchConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchConfig.
     * @param {SearchConfigCreateArgs} args - Arguments to create a SearchConfig.
     * @example
     * // Create one SearchConfig
     * const SearchConfig = await prisma.searchConfig.create({
     *   data: {
     *     // ... data to create a SearchConfig
     *   }
     * })
     * 
     */
    create<T extends SearchConfigCreateArgs>(args: SelectSubset<T, SearchConfigCreateArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchConfigs.
     * @param {SearchConfigCreateManyArgs} args - Arguments to create many SearchConfigs.
     * @example
     * // Create many SearchConfigs
     * const searchConfig = await prisma.searchConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchConfigCreateManyArgs>(args?: SelectSubset<T, SearchConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchConfigs and returns the data saved in the database.
     * @param {SearchConfigCreateManyAndReturnArgs} args - Arguments to create many SearchConfigs.
     * @example
     * // Create many SearchConfigs
     * const searchConfig = await prisma.searchConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchConfigs and only return the `id`
     * const searchConfigWithIdOnly = await prisma.searchConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SearchConfig.
     * @param {SearchConfigDeleteArgs} args - Arguments to delete one SearchConfig.
     * @example
     * // Delete one SearchConfig
     * const SearchConfig = await prisma.searchConfig.delete({
     *   where: {
     *     // ... filter to delete one SearchConfig
     *   }
     * })
     * 
     */
    delete<T extends SearchConfigDeleteArgs>(args: SelectSubset<T, SearchConfigDeleteArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchConfig.
     * @param {SearchConfigUpdateArgs} args - Arguments to update one SearchConfig.
     * @example
     * // Update one SearchConfig
     * const searchConfig = await prisma.searchConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchConfigUpdateArgs>(args: SelectSubset<T, SearchConfigUpdateArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchConfigs.
     * @param {SearchConfigDeleteManyArgs} args - Arguments to filter SearchConfigs to delete.
     * @example
     * // Delete a few SearchConfigs
     * const { count } = await prisma.searchConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchConfigDeleteManyArgs>(args?: SelectSubset<T, SearchConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchConfigs
     * const searchConfig = await prisma.searchConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchConfigUpdateManyArgs>(args: SelectSubset<T, SearchConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchConfigs and returns the data updated in the database.
     * @param {SearchConfigUpdateManyAndReturnArgs} args - Arguments to update many SearchConfigs.
     * @example
     * // Update many SearchConfigs
     * const searchConfig = await prisma.searchConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchConfigs and only return the `id`
     * const searchConfigWithIdOnly = await prisma.searchConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SearchConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SearchConfig.
     * @param {SearchConfigUpsertArgs} args - Arguments to update or create a SearchConfig.
     * @example
     * // Update or create a SearchConfig
     * const searchConfig = await prisma.searchConfig.upsert({
     *   create: {
     *     // ... data to create a SearchConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchConfig we want to update
     *   }
     * })
     */
    upsert<T extends SearchConfigUpsertArgs>(args: SelectSubset<T, SearchConfigUpsertArgs<ExtArgs>>): Prisma__SearchConfigClient<$Result.GetResult<Prisma.$SearchConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SearchConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigCountArgs} args - Arguments to filter SearchConfigs to count.
     * @example
     * // Count the number of SearchConfigs
     * const count = await prisma.searchConfig.count({
     *   where: {
     *     // ... the filter for the SearchConfigs we want to count
     *   }
     * })
    **/
    count<T extends SearchConfigCountArgs>(
      args?: Subset<T, SearchConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SearchConfigAggregateArgs>(args: Subset<T, SearchConfigAggregateArgs>): Prisma.PrismaPromise<GetSearchConfigAggregateType<T>>

    /**
     * Group by SearchConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SearchConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchConfigGroupByArgs['orderBy'] }
        : { orderBy?: SearchConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SearchConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchConfig model
   */
  readonly fields: SearchConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SearchConfig model
   */
  interface SearchConfigFieldRefs {
    readonly id: FieldRef<"SearchConfig", 'String'>
    readonly keywords: FieldRef<"SearchConfig", 'String'>
    readonly excludeKeywords: FieldRef<"SearchConfig", 'String'>
    readonly enabledSites: FieldRef<"SearchConfig", 'String'>
    readonly daysPosted: FieldRef<"SearchConfig", 'Int'>
    readonly salaryMin: FieldRef<"SearchConfig", 'Int'>
    readonly salaryMax: FieldRef<"SearchConfig", 'Int'>
    readonly salaryCurrency: FieldRef<"SearchConfig", 'String'>
    readonly jobTypes: FieldRef<"SearchConfig", 'String'>
    readonly experienceLevels: FieldRef<"SearchConfig", 'String'>
    readonly workArrangements: FieldRef<"SearchConfig", 'String'>
    readonly excludeCompanies: FieldRef<"SearchConfig", 'String'>
    readonly requiredSkills: FieldRef<"SearchConfig", 'String'>
    readonly preferredSkills: FieldRef<"SearchConfig", 'String'>
    readonly useAIMatching: FieldRef<"SearchConfig", 'Boolean'>
    readonly aiThreshold: FieldRef<"SearchConfig", 'Float'>
    readonly digestMode: FieldRef<"SearchConfig", 'Boolean'>
    readonly maxEmailsPerRun: FieldRef<"SearchConfig", 'Int'>
    readonly updatedAt: FieldRef<"SearchConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchConfig findUnique
   */
  export type SearchConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchConfig to fetch.
     */
    where: SearchConfigWhereUniqueInput
  }

  /**
   * SearchConfig findUniqueOrThrow
   */
  export type SearchConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchConfig to fetch.
     */
    where: SearchConfigWhereUniqueInput
  }

  /**
   * SearchConfig findFirst
   */
  export type SearchConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchConfig to fetch.
     */
    where?: SearchConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchConfigs to fetch.
     */
    orderBy?: SearchConfigOrderByWithRelationInput | SearchConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchConfigs.
     */
    cursor?: SearchConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchConfigs.
     */
    distinct?: SearchConfigScalarFieldEnum | SearchConfigScalarFieldEnum[]
  }

  /**
   * SearchConfig findFirstOrThrow
   */
  export type SearchConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchConfig to fetch.
     */
    where?: SearchConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchConfigs to fetch.
     */
    orderBy?: SearchConfigOrderByWithRelationInput | SearchConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchConfigs.
     */
    cursor?: SearchConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchConfigs.
     */
    distinct?: SearchConfigScalarFieldEnum | SearchConfigScalarFieldEnum[]
  }

  /**
   * SearchConfig findMany
   */
  export type SearchConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchConfigs to fetch.
     */
    where?: SearchConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchConfigs to fetch.
     */
    orderBy?: SearchConfigOrderByWithRelationInput | SearchConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchConfigs.
     */
    cursor?: SearchConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchConfigs.
     */
    skip?: number
    distinct?: SearchConfigScalarFieldEnum | SearchConfigScalarFieldEnum[]
  }

  /**
   * SearchConfig create
   */
  export type SearchConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SearchConfig.
     */
    data: XOR<SearchConfigCreateInput, SearchConfigUncheckedCreateInput>
  }

  /**
   * SearchConfig createMany
   */
  export type SearchConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchConfigs.
     */
    data: SearchConfigCreateManyInput | SearchConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchConfig createManyAndReturn
   */
  export type SearchConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SearchConfigs.
     */
    data: SearchConfigCreateManyInput | SearchConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchConfig update
   */
  export type SearchConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SearchConfig.
     */
    data: XOR<SearchConfigUpdateInput, SearchConfigUncheckedUpdateInput>
    /**
     * Choose, which SearchConfig to update.
     */
    where: SearchConfigWhereUniqueInput
  }

  /**
   * SearchConfig updateMany
   */
  export type SearchConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchConfigs.
     */
    data: XOR<SearchConfigUpdateManyMutationInput, SearchConfigUncheckedUpdateManyInput>
    /**
     * Filter which SearchConfigs to update
     */
    where?: SearchConfigWhereInput
    /**
     * Limit how many SearchConfigs to update.
     */
    limit?: number
  }

  /**
   * SearchConfig updateManyAndReturn
   */
  export type SearchConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * The data used to update SearchConfigs.
     */
    data: XOR<SearchConfigUpdateManyMutationInput, SearchConfigUncheckedUpdateManyInput>
    /**
     * Filter which SearchConfigs to update
     */
    where?: SearchConfigWhereInput
    /**
     * Limit how many SearchConfigs to update.
     */
    limit?: number
  }

  /**
   * SearchConfig upsert
   */
  export type SearchConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SearchConfig to update in case it exists.
     */
    where: SearchConfigWhereUniqueInput
    /**
     * In case the SearchConfig found by the `where` argument doesn't exist, create a new SearchConfig with this data.
     */
    create: XOR<SearchConfigCreateInput, SearchConfigUncheckedCreateInput>
    /**
     * In case the SearchConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchConfigUpdateInput, SearchConfigUncheckedUpdateInput>
  }

  /**
   * SearchConfig delete
   */
  export type SearchConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
    /**
     * Filter which SearchConfig to delete.
     */
    where: SearchConfigWhereUniqueInput
  }

  /**
   * SearchConfig deleteMany
   */
  export type SearchConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchConfigs to delete
     */
    where?: SearchConfigWhereInput
    /**
     * Limit how many SearchConfigs to delete.
     */
    limit?: number
  }

  /**
   * SearchConfig without action
   */
  export type SearchConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchConfig
     */
    select?: SearchConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchConfig
     */
    omit?: SearchConfigOmit<ExtArgs> | null
  }


  /**
   * Model ScrapeLog
   */

  export type AggregateScrapeLog = {
    _count: ScrapeLogCountAggregateOutputType | null
    _avg: ScrapeLogAvgAggregateOutputType | null
    _sum: ScrapeLogSumAggregateOutputType | null
    _min: ScrapeLogMinAggregateOutputType | null
    _max: ScrapeLogMaxAggregateOutputType | null
  }

  export type ScrapeLogAvgAggregateOutputType = {
    jobsFound: number | null
    newJobs: number | null
    filtered: number | null
    duration: number | null
  }

  export type ScrapeLogSumAggregateOutputType = {
    jobsFound: number | null
    newJobs: number | null
    filtered: number | null
    duration: number | null
  }

  export type ScrapeLogMinAggregateOutputType = {
    id: string | null
    site: string | null
    startedAt: Date | null
    endedAt: Date | null
    jobsFound: number | null
    newJobs: number | null
    filtered: number | null
    status: string | null
    error: string | null
    duration: number | null
  }

  export type ScrapeLogMaxAggregateOutputType = {
    id: string | null
    site: string | null
    startedAt: Date | null
    endedAt: Date | null
    jobsFound: number | null
    newJobs: number | null
    filtered: number | null
    status: string | null
    error: string | null
    duration: number | null
  }

  export type ScrapeLogCountAggregateOutputType = {
    id: number
    site: number
    startedAt: number
    endedAt: number
    jobsFound: number
    newJobs: number
    filtered: number
    status: number
    error: number
    duration: number
    _all: number
  }


  export type ScrapeLogAvgAggregateInputType = {
    jobsFound?: true
    newJobs?: true
    filtered?: true
    duration?: true
  }

  export type ScrapeLogSumAggregateInputType = {
    jobsFound?: true
    newJobs?: true
    filtered?: true
    duration?: true
  }

  export type ScrapeLogMinAggregateInputType = {
    id?: true
    site?: true
    startedAt?: true
    endedAt?: true
    jobsFound?: true
    newJobs?: true
    filtered?: true
    status?: true
    error?: true
    duration?: true
  }

  export type ScrapeLogMaxAggregateInputType = {
    id?: true
    site?: true
    startedAt?: true
    endedAt?: true
    jobsFound?: true
    newJobs?: true
    filtered?: true
    status?: true
    error?: true
    duration?: true
  }

  export type ScrapeLogCountAggregateInputType = {
    id?: true
    site?: true
    startedAt?: true
    endedAt?: true
    jobsFound?: true
    newJobs?: true
    filtered?: true
    status?: true
    error?: true
    duration?: true
    _all?: true
  }

  export type ScrapeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScrapeLog to aggregate.
     */
    where?: ScrapeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeLogs to fetch.
     */
    orderBy?: ScrapeLogOrderByWithRelationInput | ScrapeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScrapeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScrapeLogs
    **/
    _count?: true | ScrapeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScrapeLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScrapeLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScrapeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScrapeLogMaxAggregateInputType
  }

  export type GetScrapeLogAggregateType<T extends ScrapeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateScrapeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScrapeLog[P]>
      : GetScalarType<T[P], AggregateScrapeLog[P]>
  }




  export type ScrapeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScrapeLogWhereInput
    orderBy?: ScrapeLogOrderByWithAggregationInput | ScrapeLogOrderByWithAggregationInput[]
    by: ScrapeLogScalarFieldEnum[] | ScrapeLogScalarFieldEnum
    having?: ScrapeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScrapeLogCountAggregateInputType | true
    _avg?: ScrapeLogAvgAggregateInputType
    _sum?: ScrapeLogSumAggregateInputType
    _min?: ScrapeLogMinAggregateInputType
    _max?: ScrapeLogMaxAggregateInputType
  }

  export type ScrapeLogGroupByOutputType = {
    id: string
    site: string
    startedAt: Date
    endedAt: Date | null
    jobsFound: number
    newJobs: number
    filtered: number
    status: string
    error: string | null
    duration: number | null
    _count: ScrapeLogCountAggregateOutputType | null
    _avg: ScrapeLogAvgAggregateOutputType | null
    _sum: ScrapeLogSumAggregateOutputType | null
    _min: ScrapeLogMinAggregateOutputType | null
    _max: ScrapeLogMaxAggregateOutputType | null
  }

  type GetScrapeLogGroupByPayload<T extends ScrapeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScrapeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScrapeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScrapeLogGroupByOutputType[P]>
            : GetScalarType<T[P], ScrapeLogGroupByOutputType[P]>
        }
      >
    >


  export type ScrapeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    startedAt?: boolean
    endedAt?: boolean
    jobsFound?: boolean
    newJobs?: boolean
    filtered?: boolean
    status?: boolean
    error?: boolean
    duration?: boolean
  }, ExtArgs["result"]["scrapeLog"]>

  export type ScrapeLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    startedAt?: boolean
    endedAt?: boolean
    jobsFound?: boolean
    newJobs?: boolean
    filtered?: boolean
    status?: boolean
    error?: boolean
    duration?: boolean
  }, ExtArgs["result"]["scrapeLog"]>

  export type ScrapeLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    startedAt?: boolean
    endedAt?: boolean
    jobsFound?: boolean
    newJobs?: boolean
    filtered?: boolean
    status?: boolean
    error?: boolean
    duration?: boolean
  }, ExtArgs["result"]["scrapeLog"]>

  export type ScrapeLogSelectScalar = {
    id?: boolean
    site?: boolean
    startedAt?: boolean
    endedAt?: boolean
    jobsFound?: boolean
    newJobs?: boolean
    filtered?: boolean
    status?: boolean
    error?: boolean
    duration?: boolean
  }

  export type ScrapeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "site" | "startedAt" | "endedAt" | "jobsFound" | "newJobs" | "filtered" | "status" | "error" | "duration", ExtArgs["result"]["scrapeLog"]>

  export type $ScrapeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScrapeLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      site: string
      startedAt: Date
      endedAt: Date | null
      jobsFound: number
      newJobs: number
      filtered: number
      status: string
      error: string | null
      duration: number | null
    }, ExtArgs["result"]["scrapeLog"]>
    composites: {}
  }

  type ScrapeLogGetPayload<S extends boolean | null | undefined | ScrapeLogDefaultArgs> = $Result.GetResult<Prisma.$ScrapeLogPayload, S>

  type ScrapeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScrapeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScrapeLogCountAggregateInputType | true
    }

  export interface ScrapeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScrapeLog'], meta: { name: 'ScrapeLog' } }
    /**
     * Find zero or one ScrapeLog that matches the filter.
     * @param {ScrapeLogFindUniqueArgs} args - Arguments to find a ScrapeLog
     * @example
     * // Get one ScrapeLog
     * const scrapeLog = await prisma.scrapeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScrapeLogFindUniqueArgs>(args: SelectSubset<T, ScrapeLogFindUniqueArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScrapeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScrapeLogFindUniqueOrThrowArgs} args - Arguments to find a ScrapeLog
     * @example
     * // Get one ScrapeLog
     * const scrapeLog = await prisma.scrapeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScrapeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ScrapeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScrapeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogFindFirstArgs} args - Arguments to find a ScrapeLog
     * @example
     * // Get one ScrapeLog
     * const scrapeLog = await prisma.scrapeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScrapeLogFindFirstArgs>(args?: SelectSubset<T, ScrapeLogFindFirstArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScrapeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogFindFirstOrThrowArgs} args - Arguments to find a ScrapeLog
     * @example
     * // Get one ScrapeLog
     * const scrapeLog = await prisma.scrapeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScrapeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ScrapeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScrapeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScrapeLogs
     * const scrapeLogs = await prisma.scrapeLog.findMany()
     * 
     * // Get first 10 ScrapeLogs
     * const scrapeLogs = await prisma.scrapeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scrapeLogWithIdOnly = await prisma.scrapeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScrapeLogFindManyArgs>(args?: SelectSubset<T, ScrapeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScrapeLog.
     * @param {ScrapeLogCreateArgs} args - Arguments to create a ScrapeLog.
     * @example
     * // Create one ScrapeLog
     * const ScrapeLog = await prisma.scrapeLog.create({
     *   data: {
     *     // ... data to create a ScrapeLog
     *   }
     * })
     * 
     */
    create<T extends ScrapeLogCreateArgs>(args: SelectSubset<T, ScrapeLogCreateArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScrapeLogs.
     * @param {ScrapeLogCreateManyArgs} args - Arguments to create many ScrapeLogs.
     * @example
     * // Create many ScrapeLogs
     * const scrapeLog = await prisma.scrapeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScrapeLogCreateManyArgs>(args?: SelectSubset<T, ScrapeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScrapeLogs and returns the data saved in the database.
     * @param {ScrapeLogCreateManyAndReturnArgs} args - Arguments to create many ScrapeLogs.
     * @example
     * // Create many ScrapeLogs
     * const scrapeLog = await prisma.scrapeLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScrapeLogs and only return the `id`
     * const scrapeLogWithIdOnly = await prisma.scrapeLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScrapeLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ScrapeLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScrapeLog.
     * @param {ScrapeLogDeleteArgs} args - Arguments to delete one ScrapeLog.
     * @example
     * // Delete one ScrapeLog
     * const ScrapeLog = await prisma.scrapeLog.delete({
     *   where: {
     *     // ... filter to delete one ScrapeLog
     *   }
     * })
     * 
     */
    delete<T extends ScrapeLogDeleteArgs>(args: SelectSubset<T, ScrapeLogDeleteArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScrapeLog.
     * @param {ScrapeLogUpdateArgs} args - Arguments to update one ScrapeLog.
     * @example
     * // Update one ScrapeLog
     * const scrapeLog = await prisma.scrapeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScrapeLogUpdateArgs>(args: SelectSubset<T, ScrapeLogUpdateArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScrapeLogs.
     * @param {ScrapeLogDeleteManyArgs} args - Arguments to filter ScrapeLogs to delete.
     * @example
     * // Delete a few ScrapeLogs
     * const { count } = await prisma.scrapeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScrapeLogDeleteManyArgs>(args?: SelectSubset<T, ScrapeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScrapeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScrapeLogs
     * const scrapeLog = await prisma.scrapeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScrapeLogUpdateManyArgs>(args: SelectSubset<T, ScrapeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScrapeLogs and returns the data updated in the database.
     * @param {ScrapeLogUpdateManyAndReturnArgs} args - Arguments to update many ScrapeLogs.
     * @example
     * // Update many ScrapeLogs
     * const scrapeLog = await prisma.scrapeLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScrapeLogs and only return the `id`
     * const scrapeLogWithIdOnly = await prisma.scrapeLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScrapeLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ScrapeLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScrapeLog.
     * @param {ScrapeLogUpsertArgs} args - Arguments to update or create a ScrapeLog.
     * @example
     * // Update or create a ScrapeLog
     * const scrapeLog = await prisma.scrapeLog.upsert({
     *   create: {
     *     // ... data to create a ScrapeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScrapeLog we want to update
     *   }
     * })
     */
    upsert<T extends ScrapeLogUpsertArgs>(args: SelectSubset<T, ScrapeLogUpsertArgs<ExtArgs>>): Prisma__ScrapeLogClient<$Result.GetResult<Prisma.$ScrapeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScrapeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogCountArgs} args - Arguments to filter ScrapeLogs to count.
     * @example
     * // Count the number of ScrapeLogs
     * const count = await prisma.scrapeLog.count({
     *   where: {
     *     // ... the filter for the ScrapeLogs we want to count
     *   }
     * })
    **/
    count<T extends ScrapeLogCountArgs>(
      args?: Subset<T, ScrapeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScrapeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScrapeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScrapeLogAggregateArgs>(args: Subset<T, ScrapeLogAggregateArgs>): Prisma.PrismaPromise<GetScrapeLogAggregateType<T>>

    /**
     * Group by ScrapeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScrapeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScrapeLogGroupByArgs['orderBy'] }
        : { orderBy?: ScrapeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScrapeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScrapeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScrapeLog model
   */
  readonly fields: ScrapeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScrapeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScrapeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScrapeLog model
   */
  interface ScrapeLogFieldRefs {
    readonly id: FieldRef<"ScrapeLog", 'String'>
    readonly site: FieldRef<"ScrapeLog", 'String'>
    readonly startedAt: FieldRef<"ScrapeLog", 'DateTime'>
    readonly endedAt: FieldRef<"ScrapeLog", 'DateTime'>
    readonly jobsFound: FieldRef<"ScrapeLog", 'Int'>
    readonly newJobs: FieldRef<"ScrapeLog", 'Int'>
    readonly filtered: FieldRef<"ScrapeLog", 'Int'>
    readonly status: FieldRef<"ScrapeLog", 'String'>
    readonly error: FieldRef<"ScrapeLog", 'String'>
    readonly duration: FieldRef<"ScrapeLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ScrapeLog findUnique
   */
  export type ScrapeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeLog to fetch.
     */
    where: ScrapeLogWhereUniqueInput
  }

  /**
   * ScrapeLog findUniqueOrThrow
   */
  export type ScrapeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeLog to fetch.
     */
    where: ScrapeLogWhereUniqueInput
  }

  /**
   * ScrapeLog findFirst
   */
  export type ScrapeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeLog to fetch.
     */
    where?: ScrapeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeLogs to fetch.
     */
    orderBy?: ScrapeLogOrderByWithRelationInput | ScrapeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScrapeLogs.
     */
    cursor?: ScrapeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScrapeLogs.
     */
    distinct?: ScrapeLogScalarFieldEnum | ScrapeLogScalarFieldEnum[]
  }

  /**
   * ScrapeLog findFirstOrThrow
   */
  export type ScrapeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeLog to fetch.
     */
    where?: ScrapeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeLogs to fetch.
     */
    orderBy?: ScrapeLogOrderByWithRelationInput | ScrapeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScrapeLogs.
     */
    cursor?: ScrapeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScrapeLogs.
     */
    distinct?: ScrapeLogScalarFieldEnum | ScrapeLogScalarFieldEnum[]
  }

  /**
   * ScrapeLog findMany
   */
  export type ScrapeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeLogs to fetch.
     */
    where?: ScrapeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeLogs to fetch.
     */
    orderBy?: ScrapeLogOrderByWithRelationInput | ScrapeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScrapeLogs.
     */
    cursor?: ScrapeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeLogs.
     */
    skip?: number
    distinct?: ScrapeLogScalarFieldEnum | ScrapeLogScalarFieldEnum[]
  }

  /**
   * ScrapeLog create
   */
  export type ScrapeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ScrapeLog.
     */
    data: XOR<ScrapeLogCreateInput, ScrapeLogUncheckedCreateInput>
  }

  /**
   * ScrapeLog createMany
   */
  export type ScrapeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScrapeLogs.
     */
    data: ScrapeLogCreateManyInput | ScrapeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScrapeLog createManyAndReturn
   */
  export type ScrapeLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * The data used to create many ScrapeLogs.
     */
    data: ScrapeLogCreateManyInput | ScrapeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScrapeLog update
   */
  export type ScrapeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ScrapeLog.
     */
    data: XOR<ScrapeLogUpdateInput, ScrapeLogUncheckedUpdateInput>
    /**
     * Choose, which ScrapeLog to update.
     */
    where: ScrapeLogWhereUniqueInput
  }

  /**
   * ScrapeLog updateMany
   */
  export type ScrapeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScrapeLogs.
     */
    data: XOR<ScrapeLogUpdateManyMutationInput, ScrapeLogUncheckedUpdateManyInput>
    /**
     * Filter which ScrapeLogs to update
     */
    where?: ScrapeLogWhereInput
    /**
     * Limit how many ScrapeLogs to update.
     */
    limit?: number
  }

  /**
   * ScrapeLog updateManyAndReturn
   */
  export type ScrapeLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * The data used to update ScrapeLogs.
     */
    data: XOR<ScrapeLogUpdateManyMutationInput, ScrapeLogUncheckedUpdateManyInput>
    /**
     * Filter which ScrapeLogs to update
     */
    where?: ScrapeLogWhereInput
    /**
     * Limit how many ScrapeLogs to update.
     */
    limit?: number
  }

  /**
   * ScrapeLog upsert
   */
  export type ScrapeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ScrapeLog to update in case it exists.
     */
    where: ScrapeLogWhereUniqueInput
    /**
     * In case the ScrapeLog found by the `where` argument doesn't exist, create a new ScrapeLog with this data.
     */
    create: XOR<ScrapeLogCreateInput, ScrapeLogUncheckedCreateInput>
    /**
     * In case the ScrapeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScrapeLogUpdateInput, ScrapeLogUncheckedUpdateInput>
  }

  /**
   * ScrapeLog delete
   */
  export type ScrapeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
    /**
     * Filter which ScrapeLog to delete.
     */
    where: ScrapeLogWhereUniqueInput
  }

  /**
   * ScrapeLog deleteMany
   */
  export type ScrapeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScrapeLogs to delete
     */
    where?: ScrapeLogWhereInput
    /**
     * Limit how many ScrapeLogs to delete.
     */
    limit?: number
  }

  /**
   * ScrapeLog without action
   */
  export type ScrapeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeLog
     */
    select?: ScrapeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeLog
     */
    omit?: ScrapeLogOmit<ExtArgs> | null
  }


  /**
   * Model SiteConfig
   */

  export type AggregateSiteConfig = {
    _count: SiteConfigCountAggregateOutputType | null
    _avg: SiteConfigAvgAggregateOutputType | null
    _sum: SiteConfigSumAggregateOutputType | null
    _min: SiteConfigMinAggregateOutputType | null
    _max: SiteConfigMaxAggregateOutputType | null
  }

  export type SiteConfigAvgAggregateOutputType = {
    rateLimit: number | null
    maxPages: number | null
  }

  export type SiteConfigSumAggregateOutputType = {
    rateLimit: number | null
    maxPages: number | null
  }

  export type SiteConfigMinAggregateOutputType = {
    id: string | null
    enabled: boolean | null
    rateLimit: number | null
    maxPages: number | null
    lastScraped: Date | null
    settings: string | null
    updatedAt: Date | null
  }

  export type SiteConfigMaxAggregateOutputType = {
    id: string | null
    enabled: boolean | null
    rateLimit: number | null
    maxPages: number | null
    lastScraped: Date | null
    settings: string | null
    updatedAt: Date | null
  }

  export type SiteConfigCountAggregateOutputType = {
    id: number
    enabled: number
    rateLimit: number
    maxPages: number
    lastScraped: number
    settings: number
    updatedAt: number
    _all: number
  }


  export type SiteConfigAvgAggregateInputType = {
    rateLimit?: true
    maxPages?: true
  }

  export type SiteConfigSumAggregateInputType = {
    rateLimit?: true
    maxPages?: true
  }

  export type SiteConfigMinAggregateInputType = {
    id?: true
    enabled?: true
    rateLimit?: true
    maxPages?: true
    lastScraped?: true
    settings?: true
    updatedAt?: true
  }

  export type SiteConfigMaxAggregateInputType = {
    id?: true
    enabled?: true
    rateLimit?: true
    maxPages?: true
    lastScraped?: true
    settings?: true
    updatedAt?: true
  }

  export type SiteConfigCountAggregateInputType = {
    id?: true
    enabled?: true
    rateLimit?: true
    maxPages?: true
    lastScraped?: true
    settings?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteConfig to aggregate.
     */
    where?: SiteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteConfigs to fetch.
     */
    orderBy?: SiteConfigOrderByWithRelationInput | SiteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteConfigs
    **/
    _count?: true | SiteConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteConfigMaxAggregateInputType
  }

  export type GetSiteConfigAggregateType<T extends SiteConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteConfig[P]>
      : GetScalarType<T[P], AggregateSiteConfig[P]>
  }




  export type SiteConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteConfigWhereInput
    orderBy?: SiteConfigOrderByWithAggregationInput | SiteConfigOrderByWithAggregationInput[]
    by: SiteConfigScalarFieldEnum[] | SiteConfigScalarFieldEnum
    having?: SiteConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteConfigCountAggregateInputType | true
    _avg?: SiteConfigAvgAggregateInputType
    _sum?: SiteConfigSumAggregateInputType
    _min?: SiteConfigMinAggregateInputType
    _max?: SiteConfigMaxAggregateInputType
  }

  export type SiteConfigGroupByOutputType = {
    id: string
    enabled: boolean
    rateLimit: number
    maxPages: number
    lastScraped: Date | null
    settings: string | null
    updatedAt: Date
    _count: SiteConfigCountAggregateOutputType | null
    _avg: SiteConfigAvgAggregateOutputType | null
    _sum: SiteConfigSumAggregateOutputType | null
    _min: SiteConfigMinAggregateOutputType | null
    _max: SiteConfigMaxAggregateOutputType | null
  }

  type GetSiteConfigGroupByPayload<T extends SiteConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SiteConfigGroupByOutputType[P]>
        }
      >
    >


  export type SiteConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enabled?: boolean
    rateLimit?: boolean
    maxPages?: boolean
    lastScraped?: boolean
    settings?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteConfig"]>

  export type SiteConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enabled?: boolean
    rateLimit?: boolean
    maxPages?: boolean
    lastScraped?: boolean
    settings?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteConfig"]>

  export type SiteConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enabled?: boolean
    rateLimit?: boolean
    maxPages?: boolean
    lastScraped?: boolean
    settings?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteConfig"]>

  export type SiteConfigSelectScalar = {
    id?: boolean
    enabled?: boolean
    rateLimit?: boolean
    maxPages?: boolean
    lastScraped?: boolean
    settings?: boolean
    updatedAt?: boolean
  }

  export type SiteConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "enabled" | "rateLimit" | "maxPages" | "lastScraped" | "settings" | "updatedAt", ExtArgs["result"]["siteConfig"]>

  export type $SiteConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      enabled: boolean
      rateLimit: number
      maxPages: number
      lastScraped: Date | null
      settings: string | null
      updatedAt: Date
    }, ExtArgs["result"]["siteConfig"]>
    composites: {}
  }

  type SiteConfigGetPayload<S extends boolean | null | undefined | SiteConfigDefaultArgs> = $Result.GetResult<Prisma.$SiteConfigPayload, S>

  type SiteConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteConfigCountAggregateInputType | true
    }

  export interface SiteConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteConfig'], meta: { name: 'SiteConfig' } }
    /**
     * Find zero or one SiteConfig that matches the filter.
     * @param {SiteConfigFindUniqueArgs} args - Arguments to find a SiteConfig
     * @example
     * // Get one SiteConfig
     * const siteConfig = await prisma.siteConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteConfigFindUniqueArgs>(args: SelectSubset<T, SiteConfigFindUniqueArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteConfigFindUniqueOrThrowArgs} args - Arguments to find a SiteConfig
     * @example
     * // Get one SiteConfig
     * const siteConfig = await prisma.siteConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigFindFirstArgs} args - Arguments to find a SiteConfig
     * @example
     * // Get one SiteConfig
     * const siteConfig = await prisma.siteConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteConfigFindFirstArgs>(args?: SelectSubset<T, SiteConfigFindFirstArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigFindFirstOrThrowArgs} args - Arguments to find a SiteConfig
     * @example
     * // Get one SiteConfig
     * const siteConfig = await prisma.siteConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteConfigs
     * const siteConfigs = await prisma.siteConfig.findMany()
     * 
     * // Get first 10 SiteConfigs
     * const siteConfigs = await prisma.siteConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteConfigWithIdOnly = await prisma.siteConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteConfigFindManyArgs>(args?: SelectSubset<T, SiteConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteConfig.
     * @param {SiteConfigCreateArgs} args - Arguments to create a SiteConfig.
     * @example
     * // Create one SiteConfig
     * const SiteConfig = await prisma.siteConfig.create({
     *   data: {
     *     // ... data to create a SiteConfig
     *   }
     * })
     * 
     */
    create<T extends SiteConfigCreateArgs>(args: SelectSubset<T, SiteConfigCreateArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteConfigs.
     * @param {SiteConfigCreateManyArgs} args - Arguments to create many SiteConfigs.
     * @example
     * // Create many SiteConfigs
     * const siteConfig = await prisma.siteConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteConfigCreateManyArgs>(args?: SelectSubset<T, SiteConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteConfigs and returns the data saved in the database.
     * @param {SiteConfigCreateManyAndReturnArgs} args - Arguments to create many SiteConfigs.
     * @example
     * // Create many SiteConfigs
     * const siteConfig = await prisma.siteConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteConfigs and only return the `id`
     * const siteConfigWithIdOnly = await prisma.siteConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteConfig.
     * @param {SiteConfigDeleteArgs} args - Arguments to delete one SiteConfig.
     * @example
     * // Delete one SiteConfig
     * const SiteConfig = await prisma.siteConfig.delete({
     *   where: {
     *     // ... filter to delete one SiteConfig
     *   }
     * })
     * 
     */
    delete<T extends SiteConfigDeleteArgs>(args: SelectSubset<T, SiteConfigDeleteArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteConfig.
     * @param {SiteConfigUpdateArgs} args - Arguments to update one SiteConfig.
     * @example
     * // Update one SiteConfig
     * const siteConfig = await prisma.siteConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteConfigUpdateArgs>(args: SelectSubset<T, SiteConfigUpdateArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteConfigs.
     * @param {SiteConfigDeleteManyArgs} args - Arguments to filter SiteConfigs to delete.
     * @example
     * // Delete a few SiteConfigs
     * const { count } = await prisma.siteConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteConfigDeleteManyArgs>(args?: SelectSubset<T, SiteConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteConfigs
     * const siteConfig = await prisma.siteConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteConfigUpdateManyArgs>(args: SelectSubset<T, SiteConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteConfigs and returns the data updated in the database.
     * @param {SiteConfigUpdateManyAndReturnArgs} args - Arguments to update many SiteConfigs.
     * @example
     * // Update many SiteConfigs
     * const siteConfig = await prisma.siteConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteConfigs and only return the `id`
     * const siteConfigWithIdOnly = await prisma.siteConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteConfig.
     * @param {SiteConfigUpsertArgs} args - Arguments to update or create a SiteConfig.
     * @example
     * // Update or create a SiteConfig
     * const siteConfig = await prisma.siteConfig.upsert({
     *   create: {
     *     // ... data to create a SiteConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteConfig we want to update
     *   }
     * })
     */
    upsert<T extends SiteConfigUpsertArgs>(args: SelectSubset<T, SiteConfigUpsertArgs<ExtArgs>>): Prisma__SiteConfigClient<$Result.GetResult<Prisma.$SiteConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigCountArgs} args - Arguments to filter SiteConfigs to count.
     * @example
     * // Count the number of SiteConfigs
     * const count = await prisma.siteConfig.count({
     *   where: {
     *     // ... the filter for the SiteConfigs we want to count
     *   }
     * })
    **/
    count<T extends SiteConfigCountArgs>(
      args?: Subset<T, SiteConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteConfigAggregateArgs>(args: Subset<T, SiteConfigAggregateArgs>): Prisma.PrismaPromise<GetSiteConfigAggregateType<T>>

    /**
     * Group by SiteConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteConfigGroupByArgs['orderBy'] }
        : { orderBy?: SiteConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteConfig model
   */
  readonly fields: SiteConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteConfig model
   */
  interface SiteConfigFieldRefs {
    readonly id: FieldRef<"SiteConfig", 'String'>
    readonly enabled: FieldRef<"SiteConfig", 'Boolean'>
    readonly rateLimit: FieldRef<"SiteConfig", 'Int'>
    readonly maxPages: FieldRef<"SiteConfig", 'Int'>
    readonly lastScraped: FieldRef<"SiteConfig", 'DateTime'>
    readonly settings: FieldRef<"SiteConfig", 'String'>
    readonly updatedAt: FieldRef<"SiteConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteConfig findUnique
   */
  export type SiteConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * Filter, which SiteConfig to fetch.
     */
    where: SiteConfigWhereUniqueInput
  }

  /**
   * SiteConfig findUniqueOrThrow
   */
  export type SiteConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * Filter, which SiteConfig to fetch.
     */
    where: SiteConfigWhereUniqueInput
  }

  /**
   * SiteConfig findFirst
   */
  export type SiteConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * Filter, which SiteConfig to fetch.
     */
    where?: SiteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteConfigs to fetch.
     */
    orderBy?: SiteConfigOrderByWithRelationInput | SiteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteConfigs.
     */
    cursor?: SiteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteConfigs.
     */
    distinct?: SiteConfigScalarFieldEnum | SiteConfigScalarFieldEnum[]
  }

  /**
   * SiteConfig findFirstOrThrow
   */
  export type SiteConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * Filter, which SiteConfig to fetch.
     */
    where?: SiteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteConfigs to fetch.
     */
    orderBy?: SiteConfigOrderByWithRelationInput | SiteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteConfigs.
     */
    cursor?: SiteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteConfigs.
     */
    distinct?: SiteConfigScalarFieldEnum | SiteConfigScalarFieldEnum[]
  }

  /**
   * SiteConfig findMany
   */
  export type SiteConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * Filter, which SiteConfigs to fetch.
     */
    where?: SiteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteConfigs to fetch.
     */
    orderBy?: SiteConfigOrderByWithRelationInput | SiteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteConfigs.
     */
    cursor?: SiteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteConfigs.
     */
    skip?: number
    distinct?: SiteConfigScalarFieldEnum | SiteConfigScalarFieldEnum[]
  }

  /**
   * SiteConfig create
   */
  export type SiteConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SiteConfig.
     */
    data: XOR<SiteConfigCreateInput, SiteConfigUncheckedCreateInput>
  }

  /**
   * SiteConfig createMany
   */
  export type SiteConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteConfigs.
     */
    data: SiteConfigCreateManyInput | SiteConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteConfig createManyAndReturn
   */
  export type SiteConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SiteConfigs.
     */
    data: SiteConfigCreateManyInput | SiteConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteConfig update
   */
  export type SiteConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SiteConfig.
     */
    data: XOR<SiteConfigUpdateInput, SiteConfigUncheckedUpdateInput>
    /**
     * Choose, which SiteConfig to update.
     */
    where: SiteConfigWhereUniqueInput
  }

  /**
   * SiteConfig updateMany
   */
  export type SiteConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteConfigs.
     */
    data: XOR<SiteConfigUpdateManyMutationInput, SiteConfigUncheckedUpdateManyInput>
    /**
     * Filter which SiteConfigs to update
     */
    where?: SiteConfigWhereInput
    /**
     * Limit how many SiteConfigs to update.
     */
    limit?: number
  }

  /**
   * SiteConfig updateManyAndReturn
   */
  export type SiteConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * The data used to update SiteConfigs.
     */
    data: XOR<SiteConfigUpdateManyMutationInput, SiteConfigUncheckedUpdateManyInput>
    /**
     * Filter which SiteConfigs to update
     */
    where?: SiteConfigWhereInput
    /**
     * Limit how many SiteConfigs to update.
     */
    limit?: number
  }

  /**
   * SiteConfig upsert
   */
  export type SiteConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SiteConfig to update in case it exists.
     */
    where: SiteConfigWhereUniqueInput
    /**
     * In case the SiteConfig found by the `where` argument doesn't exist, create a new SiteConfig with this data.
     */
    create: XOR<SiteConfigCreateInput, SiteConfigUncheckedCreateInput>
    /**
     * In case the SiteConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteConfigUpdateInput, SiteConfigUncheckedUpdateInput>
  }

  /**
   * SiteConfig delete
   */
  export type SiteConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
    /**
     * Filter which SiteConfig to delete.
     */
    where: SiteConfigWhereUniqueInput
  }

  /**
   * SiteConfig deleteMany
   */
  export type SiteConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteConfigs to delete
     */
    where?: SiteConfigWhereInput
    /**
     * Limit how many SiteConfigs to delete.
     */
    limit?: number
  }

  /**
   * SiteConfig without action
   */
  export type SiteConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteConfig
     */
    select?: SiteConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteConfig
     */
    omit?: SiteConfigOmit<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    name: string | null
    title: string | null
    summary: string | null
    skills: string | null
    experience: string | null
    education: string | null
    portfolioUrl: string | null
    linkedinUrl: string | null
    preferences: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    title: string | null
    summary: string | null
    skills: string | null
    experience: string | null
    education: string | null
    portfolioUrl: string | null
    linkedinUrl: string | null
    preferences: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    name: number
    title: number
    summary: number
    skills: number
    experience: number
    education: number
    portfolioUrl: number
    linkedinUrl: number
    preferences: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserProfileMinAggregateInputType = {
    id?: true
    name?: true
    title?: true
    summary?: true
    skills?: true
    experience?: true
    education?: true
    portfolioUrl?: true
    linkedinUrl?: true
    preferences?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    name?: true
    title?: true
    summary?: true
    skills?: true
    experience?: true
    education?: true
    portfolioUrl?: true
    linkedinUrl?: true
    preferences?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    name?: true
    title?: true
    summary?: true
    skills?: true
    experience?: true
    education?: true
    portfolioUrl?: true
    linkedinUrl?: true
    preferences?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    name: string
    title: string | null
    summary: string | null
    skills: string
    experience: string
    education: string | null
    portfolioUrl: string | null
    linkedinUrl: string | null
    preferences: string
    createdAt: Date
    updatedAt: Date
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    summary?: boolean
    skills?: boolean
    experience?: boolean
    education?: boolean
    portfolioUrl?: boolean
    linkedinUrl?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    summary?: boolean
    skills?: boolean
    experience?: boolean
    education?: boolean
    portfolioUrl?: boolean
    linkedinUrl?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    summary?: boolean
    skills?: boolean
    experience?: boolean
    education?: boolean
    portfolioUrl?: boolean
    linkedinUrl?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    name?: boolean
    title?: boolean
    summary?: boolean
    skills?: boolean
    experience?: boolean
    education?: boolean
    portfolioUrl?: boolean
    linkedinUrl?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "title" | "summary" | "skills" | "experience" | "education" | "portfolioUrl" | "linkedinUrl" | "preferences" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      title: string | null
      summary: string | null
      skills: string
      experience: string
      education: string | null
      portfolioUrl: string | null
      linkedinUrl: string | null
      preferences: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly name: FieldRef<"UserProfile", 'String'>
    readonly title: FieldRef<"UserProfile", 'String'>
    readonly summary: FieldRef<"UserProfile", 'String'>
    readonly skills: FieldRef<"UserProfile", 'String'>
    readonly experience: FieldRef<"UserProfile", 'String'>
    readonly education: FieldRef<"UserProfile", 'String'>
    readonly portfolioUrl: FieldRef<"UserProfile", 'String'>
    readonly linkedinUrl: FieldRef<"UserProfile", 'String'>
    readonly preferences: FieldRef<"UserProfile", 'String'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
  }


  /**
   * Model GeneratedEmail
   */

  export type AggregateGeneratedEmail = {
    _count: GeneratedEmailCountAggregateOutputType | null
    _avg: GeneratedEmailAvgAggregateOutputType | null
    _sum: GeneratedEmailSumAggregateOutputType | null
    _min: GeneratedEmailMinAggregateOutputType | null
    _max: GeneratedEmailMaxAggregateOutputType | null
  }

  export type GeneratedEmailAvgAggregateOutputType = {
    version: number | null
  }

  export type GeneratedEmailSumAggregateOutputType = {
    version: number | null
  }

  export type GeneratedEmailMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    content: string | null
    version: number | null
    createdAt: Date | null
  }

  export type GeneratedEmailMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    content: string | null
    version: number | null
    createdAt: Date | null
  }

  export type GeneratedEmailCountAggregateOutputType = {
    id: number
    jobId: number
    content: number
    version: number
    createdAt: number
    _all: number
  }


  export type GeneratedEmailAvgAggregateInputType = {
    version?: true
  }

  export type GeneratedEmailSumAggregateInputType = {
    version?: true
  }

  export type GeneratedEmailMinAggregateInputType = {
    id?: true
    jobId?: true
    content?: true
    version?: true
    createdAt?: true
  }

  export type GeneratedEmailMaxAggregateInputType = {
    id?: true
    jobId?: true
    content?: true
    version?: true
    createdAt?: true
  }

  export type GeneratedEmailCountAggregateInputType = {
    id?: true
    jobId?: true
    content?: true
    version?: true
    createdAt?: true
    _all?: true
  }

  export type GeneratedEmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedEmail to aggregate.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneratedEmails
    **/
    _count?: true | GeneratedEmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeneratedEmailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeneratedEmailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneratedEmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneratedEmailMaxAggregateInputType
  }

  export type GetGeneratedEmailAggregateType<T extends GeneratedEmailAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneratedEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneratedEmail[P]>
      : GetScalarType<T[P], AggregateGeneratedEmail[P]>
  }




  export type GeneratedEmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedEmailWhereInput
    orderBy?: GeneratedEmailOrderByWithAggregationInput | GeneratedEmailOrderByWithAggregationInput[]
    by: GeneratedEmailScalarFieldEnum[] | GeneratedEmailScalarFieldEnum
    having?: GeneratedEmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneratedEmailCountAggregateInputType | true
    _avg?: GeneratedEmailAvgAggregateInputType
    _sum?: GeneratedEmailSumAggregateInputType
    _min?: GeneratedEmailMinAggregateInputType
    _max?: GeneratedEmailMaxAggregateInputType
  }

  export type GeneratedEmailGroupByOutputType = {
    id: string
    jobId: string
    content: string
    version: number
    createdAt: Date
    _count: GeneratedEmailCountAggregateOutputType | null
    _avg: GeneratedEmailAvgAggregateOutputType | null
    _sum: GeneratedEmailSumAggregateOutputType | null
    _min: GeneratedEmailMinAggregateOutputType | null
    _max: GeneratedEmailMaxAggregateOutputType | null
  }

  type GetGeneratedEmailGroupByPayload<T extends GeneratedEmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneratedEmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneratedEmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneratedEmailGroupByOutputType[P]>
            : GetScalarType<T[P], GeneratedEmailGroupByOutputType[P]>
        }
      >
    >


  export type GeneratedEmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    content?: boolean
    version?: boolean
    createdAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedEmail"]>

  export type GeneratedEmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    content?: boolean
    version?: boolean
    createdAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedEmail"]>

  export type GeneratedEmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    content?: boolean
    version?: boolean
    createdAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedEmail"]>

  export type GeneratedEmailSelectScalar = {
    id?: boolean
    jobId?: boolean
    content?: boolean
    version?: boolean
    createdAt?: boolean
  }

  export type GeneratedEmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "content" | "version" | "createdAt", ExtArgs["result"]["generatedEmail"]>
  export type GeneratedEmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
  }
  export type GeneratedEmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
  }
  export type GeneratedEmailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
  }

  export type $GeneratedEmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneratedEmail"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      content: string
      version: number
      createdAt: Date
    }, ExtArgs["result"]["generatedEmail"]>
    composites: {}
  }

  type GeneratedEmailGetPayload<S extends boolean | null | undefined | GeneratedEmailDefaultArgs> = $Result.GetResult<Prisma.$GeneratedEmailPayload, S>

  type GeneratedEmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneratedEmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneratedEmailCountAggregateInputType | true
    }

  export interface GeneratedEmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneratedEmail'], meta: { name: 'GeneratedEmail' } }
    /**
     * Find zero or one GeneratedEmail that matches the filter.
     * @param {GeneratedEmailFindUniqueArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneratedEmailFindUniqueArgs>(args: SelectSubset<T, GeneratedEmailFindUniqueArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneratedEmail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneratedEmailFindUniqueOrThrowArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneratedEmailFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneratedEmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedEmail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailFindFirstArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneratedEmailFindFirstArgs>(args?: SelectSubset<T, GeneratedEmailFindFirstArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedEmail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailFindFirstOrThrowArgs} args - Arguments to find a GeneratedEmail
     * @example
     * // Get one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneratedEmailFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneratedEmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneratedEmails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneratedEmails
     * const generatedEmails = await prisma.generatedEmail.findMany()
     * 
     * // Get first 10 GeneratedEmails
     * const generatedEmails = await prisma.generatedEmail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generatedEmailWithIdOnly = await prisma.generatedEmail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneratedEmailFindManyArgs>(args?: SelectSubset<T, GeneratedEmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneratedEmail.
     * @param {GeneratedEmailCreateArgs} args - Arguments to create a GeneratedEmail.
     * @example
     * // Create one GeneratedEmail
     * const GeneratedEmail = await prisma.generatedEmail.create({
     *   data: {
     *     // ... data to create a GeneratedEmail
     *   }
     * })
     * 
     */
    create<T extends GeneratedEmailCreateArgs>(args: SelectSubset<T, GeneratedEmailCreateArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneratedEmails.
     * @param {GeneratedEmailCreateManyArgs} args - Arguments to create many GeneratedEmails.
     * @example
     * // Create many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneratedEmailCreateManyArgs>(args?: SelectSubset<T, GeneratedEmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneratedEmails and returns the data saved in the database.
     * @param {GeneratedEmailCreateManyAndReturnArgs} args - Arguments to create many GeneratedEmails.
     * @example
     * // Create many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneratedEmails and only return the `id`
     * const generatedEmailWithIdOnly = await prisma.generatedEmail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneratedEmailCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneratedEmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneratedEmail.
     * @param {GeneratedEmailDeleteArgs} args - Arguments to delete one GeneratedEmail.
     * @example
     * // Delete one GeneratedEmail
     * const GeneratedEmail = await prisma.generatedEmail.delete({
     *   where: {
     *     // ... filter to delete one GeneratedEmail
     *   }
     * })
     * 
     */
    delete<T extends GeneratedEmailDeleteArgs>(args: SelectSubset<T, GeneratedEmailDeleteArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneratedEmail.
     * @param {GeneratedEmailUpdateArgs} args - Arguments to update one GeneratedEmail.
     * @example
     * // Update one GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneratedEmailUpdateArgs>(args: SelectSubset<T, GeneratedEmailUpdateArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneratedEmails.
     * @param {GeneratedEmailDeleteManyArgs} args - Arguments to filter GeneratedEmails to delete.
     * @example
     * // Delete a few GeneratedEmails
     * const { count } = await prisma.generatedEmail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneratedEmailDeleteManyArgs>(args?: SelectSubset<T, GeneratedEmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneratedEmailUpdateManyArgs>(args: SelectSubset<T, GeneratedEmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedEmails and returns the data updated in the database.
     * @param {GeneratedEmailUpdateManyAndReturnArgs} args - Arguments to update many GeneratedEmails.
     * @example
     * // Update many GeneratedEmails
     * const generatedEmail = await prisma.generatedEmail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeneratedEmails and only return the `id`
     * const generatedEmailWithIdOnly = await prisma.generatedEmail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GeneratedEmailUpdateManyAndReturnArgs>(args: SelectSubset<T, GeneratedEmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeneratedEmail.
     * @param {GeneratedEmailUpsertArgs} args - Arguments to update or create a GeneratedEmail.
     * @example
     * // Update or create a GeneratedEmail
     * const generatedEmail = await prisma.generatedEmail.upsert({
     *   create: {
     *     // ... data to create a GeneratedEmail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneratedEmail we want to update
     *   }
     * })
     */
    upsert<T extends GeneratedEmailUpsertArgs>(args: SelectSubset<T, GeneratedEmailUpsertArgs<ExtArgs>>): Prisma__GeneratedEmailClient<$Result.GetResult<Prisma.$GeneratedEmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneratedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailCountArgs} args - Arguments to filter GeneratedEmails to count.
     * @example
     * // Count the number of GeneratedEmails
     * const count = await prisma.generatedEmail.count({
     *   where: {
     *     // ... the filter for the GeneratedEmails we want to count
     *   }
     * })
    **/
    count<T extends GeneratedEmailCountArgs>(
      args?: Subset<T, GeneratedEmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneratedEmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneratedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeneratedEmailAggregateArgs>(args: Subset<T, GeneratedEmailAggregateArgs>): Prisma.PrismaPromise<GetGeneratedEmailAggregateType<T>>

    /**
     * Group by GeneratedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedEmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeneratedEmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneratedEmailGroupByArgs['orderBy'] }
        : { orderBy?: GeneratedEmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeneratedEmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneratedEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneratedEmail model
   */
  readonly fields: GeneratedEmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneratedEmail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneratedEmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeneratedEmail model
   */
  interface GeneratedEmailFieldRefs {
    readonly id: FieldRef<"GeneratedEmail", 'String'>
    readonly jobId: FieldRef<"GeneratedEmail", 'String'>
    readonly content: FieldRef<"GeneratedEmail", 'String'>
    readonly version: FieldRef<"GeneratedEmail", 'Int'>
    readonly createdAt: FieldRef<"GeneratedEmail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneratedEmail findUnique
   */
  export type GeneratedEmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail findUniqueOrThrow
   */
  export type GeneratedEmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail findFirst
   */
  export type GeneratedEmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedEmails.
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedEmails.
     */
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * GeneratedEmail findFirstOrThrow
   */
  export type GeneratedEmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedEmail to fetch.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedEmails.
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedEmails.
     */
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * GeneratedEmail findMany
   */
  export type GeneratedEmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedEmails to fetch.
     */
    where?: GeneratedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedEmails to fetch.
     */
    orderBy?: GeneratedEmailOrderByWithRelationInput | GeneratedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneratedEmails.
     */
    cursor?: GeneratedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedEmails.
     */
    skip?: number
    distinct?: GeneratedEmailScalarFieldEnum | GeneratedEmailScalarFieldEnum[]
  }

  /**
   * GeneratedEmail create
   */
  export type GeneratedEmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * The data needed to create a GeneratedEmail.
     */
    data: XOR<GeneratedEmailCreateInput, GeneratedEmailUncheckedCreateInput>
  }

  /**
   * GeneratedEmail createMany
   */
  export type GeneratedEmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneratedEmails.
     */
    data: GeneratedEmailCreateManyInput | GeneratedEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneratedEmail createManyAndReturn
   */
  export type GeneratedEmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The data used to create many GeneratedEmails.
     */
    data: GeneratedEmailCreateManyInput | GeneratedEmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GeneratedEmail update
   */
  export type GeneratedEmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * The data needed to update a GeneratedEmail.
     */
    data: XOR<GeneratedEmailUpdateInput, GeneratedEmailUncheckedUpdateInput>
    /**
     * Choose, which GeneratedEmail to update.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail updateMany
   */
  export type GeneratedEmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneratedEmails.
     */
    data: XOR<GeneratedEmailUpdateManyMutationInput, GeneratedEmailUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedEmails to update
     */
    where?: GeneratedEmailWhereInput
    /**
     * Limit how many GeneratedEmails to update.
     */
    limit?: number
  }

  /**
   * GeneratedEmail updateManyAndReturn
   */
  export type GeneratedEmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * The data used to update GeneratedEmails.
     */
    data: XOR<GeneratedEmailUpdateManyMutationInput, GeneratedEmailUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedEmails to update
     */
    where?: GeneratedEmailWhereInput
    /**
     * Limit how many GeneratedEmails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GeneratedEmail upsert
   */
  export type GeneratedEmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * The filter to search for the GeneratedEmail to update in case it exists.
     */
    where: GeneratedEmailWhereUniqueInput
    /**
     * In case the GeneratedEmail found by the `where` argument doesn't exist, create a new GeneratedEmail with this data.
     */
    create: XOR<GeneratedEmailCreateInput, GeneratedEmailUncheckedCreateInput>
    /**
     * In case the GeneratedEmail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneratedEmailUpdateInput, GeneratedEmailUncheckedUpdateInput>
  }

  /**
   * GeneratedEmail delete
   */
  export type GeneratedEmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
    /**
     * Filter which GeneratedEmail to delete.
     */
    where: GeneratedEmailWhereUniqueInput
  }

  /**
   * GeneratedEmail deleteMany
   */
  export type GeneratedEmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedEmails to delete
     */
    where?: GeneratedEmailWhereInput
    /**
     * Limit how many GeneratedEmails to delete.
     */
    limit?: number
  }

  /**
   * GeneratedEmail without action
   */
  export type GeneratedEmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedEmail
     */
    select?: GeneratedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedEmail
     */
    omit?: GeneratedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedEmailInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const JobScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    site: 'site',
    title: 'title',
    company: 'company',
    salary: 'salary',
    salaryMin: 'salaryMin',
    salaryMax: 'salaryMax',
    salaryCurrency: 'salaryCurrency',
    description: 'description',
    url: 'url',
    jobType: 'jobType',
    experienceLevel: 'experienceLevel',
    workArrangement: 'workArrangement',
    skills: 'skills',
    location: 'location',
    postedAt: 'postedAt',
    scrapedAt: 'scrapedAt',
    status: 'status',
    aiScore: 'aiScore',
    aiSummary: 'aiSummary',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const SearchConfigScalarFieldEnum: {
    id: 'id',
    keywords: 'keywords',
    excludeKeywords: 'excludeKeywords',
    enabledSites: 'enabledSites',
    daysPosted: 'daysPosted',
    salaryMin: 'salaryMin',
    salaryMax: 'salaryMax',
    salaryCurrency: 'salaryCurrency',
    jobTypes: 'jobTypes',
    experienceLevels: 'experienceLevels',
    workArrangements: 'workArrangements',
    excludeCompanies: 'excludeCompanies',
    requiredSkills: 'requiredSkills',
    preferredSkills: 'preferredSkills',
    useAIMatching: 'useAIMatching',
    aiThreshold: 'aiThreshold',
    digestMode: 'digestMode',
    maxEmailsPerRun: 'maxEmailsPerRun',
    updatedAt: 'updatedAt'
  };

  export type SearchConfigScalarFieldEnum = (typeof SearchConfigScalarFieldEnum)[keyof typeof SearchConfigScalarFieldEnum]


  export const ScrapeLogScalarFieldEnum: {
    id: 'id',
    site: 'site',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    jobsFound: 'jobsFound',
    newJobs: 'newJobs',
    filtered: 'filtered',
    status: 'status',
    error: 'error',
    duration: 'duration'
  };

  export type ScrapeLogScalarFieldEnum = (typeof ScrapeLogScalarFieldEnum)[keyof typeof ScrapeLogScalarFieldEnum]


  export const SiteConfigScalarFieldEnum: {
    id: 'id',
    enabled: 'enabled',
    rateLimit: 'rateLimit',
    maxPages: 'maxPages',
    lastScraped: 'lastScraped',
    settings: 'settings',
    updatedAt: 'updatedAt'
  };

  export type SiteConfigScalarFieldEnum = (typeof SiteConfigScalarFieldEnum)[keyof typeof SiteConfigScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    title: 'title',
    summary: 'summary',
    skills: 'skills',
    experience: 'experience',
    education: 'education',
    portfolioUrl: 'portfolioUrl',
    linkedinUrl: 'linkedinUrl',
    preferences: 'preferences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const GeneratedEmailScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    content: 'content',
    version: 'version',
    createdAt: 'createdAt'
  };

  export type GeneratedEmailScalarFieldEnum = (typeof GeneratedEmailScalarFieldEnum)[keyof typeof GeneratedEmailScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    externalId?: StringFilter<"Job"> | string
    site?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    company?: StringFilter<"Job"> | string
    salary?: StringNullableFilter<"Job"> | string | null
    salaryMin?: IntNullableFilter<"Job"> | number | null
    salaryMax?: IntNullableFilter<"Job"> | number | null
    salaryCurrency?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    url?: StringFilter<"Job"> | string
    jobType?: StringNullableFilter<"Job"> | string | null
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    workArrangement?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableFilter<"Job"> | string | null
    location?: StringNullableFilter<"Job"> | string | null
    postedAt?: DateTimeNullableFilter<"Job"> | Date | string | null
    scrapedAt?: DateTimeFilter<"Job"> | Date | string
    status?: StringFilter<"Job"> | string
    aiScore?: FloatNullableFilter<"Job"> | number | null
    aiSummary?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    generatedEmails?: GeneratedEmailListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    site?: SortOrder
    title?: SortOrder
    company?: SortOrder
    salary?: SortOrderInput | SortOrder
    salaryMin?: SortOrderInput | SortOrder
    salaryMax?: SortOrderInput | SortOrder
    salaryCurrency?: SortOrderInput | SortOrder
    description?: SortOrder
    url?: SortOrder
    jobType?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    workArrangement?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    postedAt?: SortOrderInput | SortOrder
    scrapedAt?: SortOrder
    status?: SortOrder
    aiScore?: SortOrderInput | SortOrder
    aiSummary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    generatedEmails?: GeneratedEmailOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    site_externalId?: JobSiteExternalIdCompoundUniqueInput
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    externalId?: StringFilter<"Job"> | string
    site?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    company?: StringFilter<"Job"> | string
    salary?: StringNullableFilter<"Job"> | string | null
    salaryMin?: IntNullableFilter<"Job"> | number | null
    salaryMax?: IntNullableFilter<"Job"> | number | null
    salaryCurrency?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    url?: StringFilter<"Job"> | string
    jobType?: StringNullableFilter<"Job"> | string | null
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    workArrangement?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableFilter<"Job"> | string | null
    location?: StringNullableFilter<"Job"> | string | null
    postedAt?: DateTimeNullableFilter<"Job"> | Date | string | null
    scrapedAt?: DateTimeFilter<"Job"> | Date | string
    status?: StringFilter<"Job"> | string
    aiScore?: FloatNullableFilter<"Job"> | number | null
    aiSummary?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    generatedEmails?: GeneratedEmailListRelationFilter
  }, "id" | "site_externalId">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    site?: SortOrder
    title?: SortOrder
    company?: SortOrder
    salary?: SortOrderInput | SortOrder
    salaryMin?: SortOrderInput | SortOrder
    salaryMax?: SortOrderInput | SortOrder
    salaryCurrency?: SortOrderInput | SortOrder
    description?: SortOrder
    url?: SortOrder
    jobType?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    workArrangement?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    postedAt?: SortOrderInput | SortOrder
    scrapedAt?: SortOrder
    status?: SortOrder
    aiScore?: SortOrderInput | SortOrder
    aiSummary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    externalId?: StringWithAggregatesFilter<"Job"> | string
    site?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    company?: StringWithAggregatesFilter<"Job"> | string
    salary?: StringNullableWithAggregatesFilter<"Job"> | string | null
    salaryMin?: IntNullableWithAggregatesFilter<"Job"> | number | null
    salaryMax?: IntNullableWithAggregatesFilter<"Job"> | number | null
    salaryCurrency?: StringNullableWithAggregatesFilter<"Job"> | string | null
    description?: StringWithAggregatesFilter<"Job"> | string
    url?: StringWithAggregatesFilter<"Job"> | string
    jobType?: StringNullableWithAggregatesFilter<"Job"> | string | null
    experienceLevel?: StringNullableWithAggregatesFilter<"Job"> | string | null
    workArrangement?: StringNullableWithAggregatesFilter<"Job"> | string | null
    skills?: StringNullableWithAggregatesFilter<"Job"> | string | null
    location?: StringNullableWithAggregatesFilter<"Job"> | string | null
    postedAt?: DateTimeNullableWithAggregatesFilter<"Job"> | Date | string | null
    scrapedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    status?: StringWithAggregatesFilter<"Job"> | string
    aiScore?: FloatNullableWithAggregatesFilter<"Job"> | number | null
    aiSummary?: StringNullableWithAggregatesFilter<"Job"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type SearchConfigWhereInput = {
    AND?: SearchConfigWhereInput | SearchConfigWhereInput[]
    OR?: SearchConfigWhereInput[]
    NOT?: SearchConfigWhereInput | SearchConfigWhereInput[]
    id?: StringFilter<"SearchConfig"> | string
    keywords?: StringFilter<"SearchConfig"> | string
    excludeKeywords?: StringFilter<"SearchConfig"> | string
    enabledSites?: StringFilter<"SearchConfig"> | string
    daysPosted?: IntNullableFilter<"SearchConfig"> | number | null
    salaryMin?: IntNullableFilter<"SearchConfig"> | number | null
    salaryMax?: IntNullableFilter<"SearchConfig"> | number | null
    salaryCurrency?: StringFilter<"SearchConfig"> | string
    jobTypes?: StringFilter<"SearchConfig"> | string
    experienceLevels?: StringFilter<"SearchConfig"> | string
    workArrangements?: StringFilter<"SearchConfig"> | string
    excludeCompanies?: StringFilter<"SearchConfig"> | string
    requiredSkills?: StringFilter<"SearchConfig"> | string
    preferredSkills?: StringFilter<"SearchConfig"> | string
    useAIMatching?: BoolFilter<"SearchConfig"> | boolean
    aiThreshold?: FloatFilter<"SearchConfig"> | number
    digestMode?: BoolFilter<"SearchConfig"> | boolean
    maxEmailsPerRun?: IntFilter<"SearchConfig"> | number
    updatedAt?: DateTimeFilter<"SearchConfig"> | Date | string
  }

  export type SearchConfigOrderByWithRelationInput = {
    id?: SortOrder
    keywords?: SortOrder
    excludeKeywords?: SortOrder
    enabledSites?: SortOrder
    daysPosted?: SortOrderInput | SortOrder
    salaryMin?: SortOrderInput | SortOrder
    salaryMax?: SortOrderInput | SortOrder
    salaryCurrency?: SortOrder
    jobTypes?: SortOrder
    experienceLevels?: SortOrder
    workArrangements?: SortOrder
    excludeCompanies?: SortOrder
    requiredSkills?: SortOrder
    preferredSkills?: SortOrder
    useAIMatching?: SortOrder
    aiThreshold?: SortOrder
    digestMode?: SortOrder
    maxEmailsPerRun?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SearchConfigWhereInput | SearchConfigWhereInput[]
    OR?: SearchConfigWhereInput[]
    NOT?: SearchConfigWhereInput | SearchConfigWhereInput[]
    keywords?: StringFilter<"SearchConfig"> | string
    excludeKeywords?: StringFilter<"SearchConfig"> | string
    enabledSites?: StringFilter<"SearchConfig"> | string
    daysPosted?: IntNullableFilter<"SearchConfig"> | number | null
    salaryMin?: IntNullableFilter<"SearchConfig"> | number | null
    salaryMax?: IntNullableFilter<"SearchConfig"> | number | null
    salaryCurrency?: StringFilter<"SearchConfig"> | string
    jobTypes?: StringFilter<"SearchConfig"> | string
    experienceLevels?: StringFilter<"SearchConfig"> | string
    workArrangements?: StringFilter<"SearchConfig"> | string
    excludeCompanies?: StringFilter<"SearchConfig"> | string
    requiredSkills?: StringFilter<"SearchConfig"> | string
    preferredSkills?: StringFilter<"SearchConfig"> | string
    useAIMatching?: BoolFilter<"SearchConfig"> | boolean
    aiThreshold?: FloatFilter<"SearchConfig"> | number
    digestMode?: BoolFilter<"SearchConfig"> | boolean
    maxEmailsPerRun?: IntFilter<"SearchConfig"> | number
    updatedAt?: DateTimeFilter<"SearchConfig"> | Date | string
  }, "id">

  export type SearchConfigOrderByWithAggregationInput = {
    id?: SortOrder
    keywords?: SortOrder
    excludeKeywords?: SortOrder
    enabledSites?: SortOrder
    daysPosted?: SortOrderInput | SortOrder
    salaryMin?: SortOrderInput | SortOrder
    salaryMax?: SortOrderInput | SortOrder
    salaryCurrency?: SortOrder
    jobTypes?: SortOrder
    experienceLevels?: SortOrder
    workArrangements?: SortOrder
    excludeCompanies?: SortOrder
    requiredSkills?: SortOrder
    preferredSkills?: SortOrder
    useAIMatching?: SortOrder
    aiThreshold?: SortOrder
    digestMode?: SortOrder
    maxEmailsPerRun?: SortOrder
    updatedAt?: SortOrder
    _count?: SearchConfigCountOrderByAggregateInput
    _avg?: SearchConfigAvgOrderByAggregateInput
    _max?: SearchConfigMaxOrderByAggregateInput
    _min?: SearchConfigMinOrderByAggregateInput
    _sum?: SearchConfigSumOrderByAggregateInput
  }

  export type SearchConfigScalarWhereWithAggregatesInput = {
    AND?: SearchConfigScalarWhereWithAggregatesInput | SearchConfigScalarWhereWithAggregatesInput[]
    OR?: SearchConfigScalarWhereWithAggregatesInput[]
    NOT?: SearchConfigScalarWhereWithAggregatesInput | SearchConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchConfig"> | string
    keywords?: StringWithAggregatesFilter<"SearchConfig"> | string
    excludeKeywords?: StringWithAggregatesFilter<"SearchConfig"> | string
    enabledSites?: StringWithAggregatesFilter<"SearchConfig"> | string
    daysPosted?: IntNullableWithAggregatesFilter<"SearchConfig"> | number | null
    salaryMin?: IntNullableWithAggregatesFilter<"SearchConfig"> | number | null
    salaryMax?: IntNullableWithAggregatesFilter<"SearchConfig"> | number | null
    salaryCurrency?: StringWithAggregatesFilter<"SearchConfig"> | string
    jobTypes?: StringWithAggregatesFilter<"SearchConfig"> | string
    experienceLevels?: StringWithAggregatesFilter<"SearchConfig"> | string
    workArrangements?: StringWithAggregatesFilter<"SearchConfig"> | string
    excludeCompanies?: StringWithAggregatesFilter<"SearchConfig"> | string
    requiredSkills?: StringWithAggregatesFilter<"SearchConfig"> | string
    preferredSkills?: StringWithAggregatesFilter<"SearchConfig"> | string
    useAIMatching?: BoolWithAggregatesFilter<"SearchConfig"> | boolean
    aiThreshold?: FloatWithAggregatesFilter<"SearchConfig"> | number
    digestMode?: BoolWithAggregatesFilter<"SearchConfig"> | boolean
    maxEmailsPerRun?: IntWithAggregatesFilter<"SearchConfig"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"SearchConfig"> | Date | string
  }

  export type ScrapeLogWhereInput = {
    AND?: ScrapeLogWhereInput | ScrapeLogWhereInput[]
    OR?: ScrapeLogWhereInput[]
    NOT?: ScrapeLogWhereInput | ScrapeLogWhereInput[]
    id?: StringFilter<"ScrapeLog"> | string
    site?: StringFilter<"ScrapeLog"> | string
    startedAt?: DateTimeFilter<"ScrapeLog"> | Date | string
    endedAt?: DateTimeNullableFilter<"ScrapeLog"> | Date | string | null
    jobsFound?: IntFilter<"ScrapeLog"> | number
    newJobs?: IntFilter<"ScrapeLog"> | number
    filtered?: IntFilter<"ScrapeLog"> | number
    status?: StringFilter<"ScrapeLog"> | string
    error?: StringNullableFilter<"ScrapeLog"> | string | null
    duration?: IntNullableFilter<"ScrapeLog"> | number | null
  }

  export type ScrapeLogOrderByWithRelationInput = {
    id?: SortOrder
    site?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
  }

  export type ScrapeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScrapeLogWhereInput | ScrapeLogWhereInput[]
    OR?: ScrapeLogWhereInput[]
    NOT?: ScrapeLogWhereInput | ScrapeLogWhereInput[]
    site?: StringFilter<"ScrapeLog"> | string
    startedAt?: DateTimeFilter<"ScrapeLog"> | Date | string
    endedAt?: DateTimeNullableFilter<"ScrapeLog"> | Date | string | null
    jobsFound?: IntFilter<"ScrapeLog"> | number
    newJobs?: IntFilter<"ScrapeLog"> | number
    filtered?: IntFilter<"ScrapeLog"> | number
    status?: StringFilter<"ScrapeLog"> | string
    error?: StringNullableFilter<"ScrapeLog"> | string | null
    duration?: IntNullableFilter<"ScrapeLog"> | number | null
  }, "id">

  export type ScrapeLogOrderByWithAggregationInput = {
    id?: SortOrder
    site?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    _count?: ScrapeLogCountOrderByAggregateInput
    _avg?: ScrapeLogAvgOrderByAggregateInput
    _max?: ScrapeLogMaxOrderByAggregateInput
    _min?: ScrapeLogMinOrderByAggregateInput
    _sum?: ScrapeLogSumOrderByAggregateInput
  }

  export type ScrapeLogScalarWhereWithAggregatesInput = {
    AND?: ScrapeLogScalarWhereWithAggregatesInput | ScrapeLogScalarWhereWithAggregatesInput[]
    OR?: ScrapeLogScalarWhereWithAggregatesInput[]
    NOT?: ScrapeLogScalarWhereWithAggregatesInput | ScrapeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScrapeLog"> | string
    site?: StringWithAggregatesFilter<"ScrapeLog"> | string
    startedAt?: DateTimeWithAggregatesFilter<"ScrapeLog"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"ScrapeLog"> | Date | string | null
    jobsFound?: IntWithAggregatesFilter<"ScrapeLog"> | number
    newJobs?: IntWithAggregatesFilter<"ScrapeLog"> | number
    filtered?: IntWithAggregatesFilter<"ScrapeLog"> | number
    status?: StringWithAggregatesFilter<"ScrapeLog"> | string
    error?: StringNullableWithAggregatesFilter<"ScrapeLog"> | string | null
    duration?: IntNullableWithAggregatesFilter<"ScrapeLog"> | number | null
  }

  export type SiteConfigWhereInput = {
    AND?: SiteConfigWhereInput | SiteConfigWhereInput[]
    OR?: SiteConfigWhereInput[]
    NOT?: SiteConfigWhereInput | SiteConfigWhereInput[]
    id?: StringFilter<"SiteConfig"> | string
    enabled?: BoolFilter<"SiteConfig"> | boolean
    rateLimit?: IntFilter<"SiteConfig"> | number
    maxPages?: IntFilter<"SiteConfig"> | number
    lastScraped?: DateTimeNullableFilter<"SiteConfig"> | Date | string | null
    settings?: StringNullableFilter<"SiteConfig"> | string | null
    updatedAt?: DateTimeFilter<"SiteConfig"> | Date | string
  }

  export type SiteConfigOrderByWithRelationInput = {
    id?: SortOrder
    enabled?: SortOrder
    rateLimit?: SortOrder
    maxPages?: SortOrder
    lastScraped?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type SiteConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SiteConfigWhereInput | SiteConfigWhereInput[]
    OR?: SiteConfigWhereInput[]
    NOT?: SiteConfigWhereInput | SiteConfigWhereInput[]
    enabled?: BoolFilter<"SiteConfig"> | boolean
    rateLimit?: IntFilter<"SiteConfig"> | number
    maxPages?: IntFilter<"SiteConfig"> | number
    lastScraped?: DateTimeNullableFilter<"SiteConfig"> | Date | string | null
    settings?: StringNullableFilter<"SiteConfig"> | string | null
    updatedAt?: DateTimeFilter<"SiteConfig"> | Date | string
  }, "id">

  export type SiteConfigOrderByWithAggregationInput = {
    id?: SortOrder
    enabled?: SortOrder
    rateLimit?: SortOrder
    maxPages?: SortOrder
    lastScraped?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: SiteConfigCountOrderByAggregateInput
    _avg?: SiteConfigAvgOrderByAggregateInput
    _max?: SiteConfigMaxOrderByAggregateInput
    _min?: SiteConfigMinOrderByAggregateInput
    _sum?: SiteConfigSumOrderByAggregateInput
  }

  export type SiteConfigScalarWhereWithAggregatesInput = {
    AND?: SiteConfigScalarWhereWithAggregatesInput | SiteConfigScalarWhereWithAggregatesInput[]
    OR?: SiteConfigScalarWhereWithAggregatesInput[]
    NOT?: SiteConfigScalarWhereWithAggregatesInput | SiteConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SiteConfig"> | string
    enabled?: BoolWithAggregatesFilter<"SiteConfig"> | boolean
    rateLimit?: IntWithAggregatesFilter<"SiteConfig"> | number
    maxPages?: IntWithAggregatesFilter<"SiteConfig"> | number
    lastScraped?: DateTimeNullableWithAggregatesFilter<"SiteConfig"> | Date | string | null
    settings?: StringNullableWithAggregatesFilter<"SiteConfig"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"SiteConfig"> | Date | string
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    name?: StringFilter<"UserProfile"> | string
    title?: StringNullableFilter<"UserProfile"> | string | null
    summary?: StringNullableFilter<"UserProfile"> | string | null
    skills?: StringFilter<"UserProfile"> | string
    experience?: StringFilter<"UserProfile"> | string
    education?: StringNullableFilter<"UserProfile"> | string | null
    portfolioUrl?: StringNullableFilter<"UserProfile"> | string | null
    linkedinUrl?: StringNullableFilter<"UserProfile"> | string | null
    preferences?: StringFilter<"UserProfile"> | string
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    skills?: SortOrder
    experience?: SortOrder
    education?: SortOrderInput | SortOrder
    portfolioUrl?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    name?: StringFilter<"UserProfile"> | string
    title?: StringNullableFilter<"UserProfile"> | string | null
    summary?: StringNullableFilter<"UserProfile"> | string | null
    skills?: StringFilter<"UserProfile"> | string
    experience?: StringFilter<"UserProfile"> | string
    education?: StringNullableFilter<"UserProfile"> | string | null
    portfolioUrl?: StringNullableFilter<"UserProfile"> | string | null
    linkedinUrl?: StringNullableFilter<"UserProfile"> | string | null
    preferences?: StringFilter<"UserProfile"> | string
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
  }, "id">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    skills?: SortOrder
    experience?: SortOrder
    education?: SortOrderInput | SortOrder
    portfolioUrl?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    name?: StringWithAggregatesFilter<"UserProfile"> | string
    title?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    summary?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    skills?: StringWithAggregatesFilter<"UserProfile"> | string
    experience?: StringWithAggregatesFilter<"UserProfile"> | string
    education?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    portfolioUrl?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    preferences?: StringWithAggregatesFilter<"UserProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
  }

  export type GeneratedEmailWhereInput = {
    AND?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    OR?: GeneratedEmailWhereInput[]
    NOT?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    id?: StringFilter<"GeneratedEmail"> | string
    jobId?: StringFilter<"GeneratedEmail"> | string
    content?: StringFilter<"GeneratedEmail"> | string
    version?: IntFilter<"GeneratedEmail"> | number
    createdAt?: DateTimeFilter<"GeneratedEmail"> | Date | string
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
  }

  export type GeneratedEmailOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    job?: JobOrderByWithRelationInput
  }

  export type GeneratedEmailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    OR?: GeneratedEmailWhereInput[]
    NOT?: GeneratedEmailWhereInput | GeneratedEmailWhereInput[]
    jobId?: StringFilter<"GeneratedEmail"> | string
    content?: StringFilter<"GeneratedEmail"> | string
    version?: IntFilter<"GeneratedEmail"> | number
    createdAt?: DateTimeFilter<"GeneratedEmail"> | Date | string
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
  }, "id">

  export type GeneratedEmailOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    _count?: GeneratedEmailCountOrderByAggregateInput
    _avg?: GeneratedEmailAvgOrderByAggregateInput
    _max?: GeneratedEmailMaxOrderByAggregateInput
    _min?: GeneratedEmailMinOrderByAggregateInput
    _sum?: GeneratedEmailSumOrderByAggregateInput
  }

  export type GeneratedEmailScalarWhereWithAggregatesInput = {
    AND?: GeneratedEmailScalarWhereWithAggregatesInput | GeneratedEmailScalarWhereWithAggregatesInput[]
    OR?: GeneratedEmailScalarWhereWithAggregatesInput[]
    NOT?: GeneratedEmailScalarWhereWithAggregatesInput | GeneratedEmailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeneratedEmail"> | string
    jobId?: StringWithAggregatesFilter<"GeneratedEmail"> | string
    content?: StringWithAggregatesFilter<"GeneratedEmail"> | string
    version?: IntWithAggregatesFilter<"GeneratedEmail"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GeneratedEmail"> | Date | string
  }

  export type JobCreateInput = {
    id?: string
    externalId: string
    site: string
    title: string
    company: string
    salary?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    description: string
    url: string
    jobType?: string | null
    experienceLevel?: string | null
    workArrangement?: string | null
    skills?: string | null
    location?: string | null
    postedAt?: Date | string | null
    scrapedAt?: Date | string
    status?: string
    aiScore?: number | null
    aiSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    generatedEmails?: GeneratedEmailCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    externalId: string
    site: string
    title: string
    company: string
    salary?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    description: string
    url: string
    jobType?: string | null
    experienceLevel?: string | null
    workArrangement?: string | null
    skills?: string | null
    location?: string | null
    postedAt?: Date | string | null
    scrapedAt?: Date | string
    status?: string
    aiScore?: number | null
    aiSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    generatedEmails?: GeneratedEmailUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workArrangement?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scrapedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedEmails?: GeneratedEmailUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workArrangement?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scrapedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedEmails?: GeneratedEmailUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    externalId: string
    site: string
    title: string
    company: string
    salary?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    description: string
    url: string
    jobType?: string | null
    experienceLevel?: string | null
    workArrangement?: string | null
    skills?: string | null
    location?: string | null
    postedAt?: Date | string | null
    scrapedAt?: Date | string
    status?: string
    aiScore?: number | null
    aiSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workArrangement?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scrapedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workArrangement?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scrapedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchConfigCreateInput = {
    id?: string
    keywords: string
    excludeKeywords: string
    enabledSites: string
    daysPosted?: number | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string
    jobTypes: string
    experienceLevels: string
    workArrangements: string
    excludeCompanies: string
    requiredSkills: string
    preferredSkills: string
    useAIMatching?: boolean
    aiThreshold?: number
    digestMode?: boolean
    maxEmailsPerRun?: number
    updatedAt?: Date | string
  }

  export type SearchConfigUncheckedCreateInput = {
    id?: string
    keywords: string
    excludeKeywords: string
    enabledSites: string
    daysPosted?: number | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string
    jobTypes: string
    experienceLevels: string
    workArrangements: string
    excludeCompanies: string
    requiredSkills: string
    preferredSkills: string
    useAIMatching?: boolean
    aiThreshold?: number
    digestMode?: boolean
    maxEmailsPerRun?: number
    updatedAt?: Date | string
  }

  export type SearchConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keywords?: StringFieldUpdateOperationsInput | string
    excludeKeywords?: StringFieldUpdateOperationsInput | string
    enabledSites?: StringFieldUpdateOperationsInput | string
    daysPosted?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    jobTypes?: StringFieldUpdateOperationsInput | string
    experienceLevels?: StringFieldUpdateOperationsInput | string
    workArrangements?: StringFieldUpdateOperationsInput | string
    excludeCompanies?: StringFieldUpdateOperationsInput | string
    requiredSkills?: StringFieldUpdateOperationsInput | string
    preferredSkills?: StringFieldUpdateOperationsInput | string
    useAIMatching?: BoolFieldUpdateOperationsInput | boolean
    aiThreshold?: FloatFieldUpdateOperationsInput | number
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    maxEmailsPerRun?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keywords?: StringFieldUpdateOperationsInput | string
    excludeKeywords?: StringFieldUpdateOperationsInput | string
    enabledSites?: StringFieldUpdateOperationsInput | string
    daysPosted?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    jobTypes?: StringFieldUpdateOperationsInput | string
    experienceLevels?: StringFieldUpdateOperationsInput | string
    workArrangements?: StringFieldUpdateOperationsInput | string
    excludeCompanies?: StringFieldUpdateOperationsInput | string
    requiredSkills?: StringFieldUpdateOperationsInput | string
    preferredSkills?: StringFieldUpdateOperationsInput | string
    useAIMatching?: BoolFieldUpdateOperationsInput | boolean
    aiThreshold?: FloatFieldUpdateOperationsInput | number
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    maxEmailsPerRun?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchConfigCreateManyInput = {
    id?: string
    keywords: string
    excludeKeywords: string
    enabledSites: string
    daysPosted?: number | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string
    jobTypes: string
    experienceLevels: string
    workArrangements: string
    excludeCompanies: string
    requiredSkills: string
    preferredSkills: string
    useAIMatching?: boolean
    aiThreshold?: number
    digestMode?: boolean
    maxEmailsPerRun?: number
    updatedAt?: Date | string
  }

  export type SearchConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    keywords?: StringFieldUpdateOperationsInput | string
    excludeKeywords?: StringFieldUpdateOperationsInput | string
    enabledSites?: StringFieldUpdateOperationsInput | string
    daysPosted?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    jobTypes?: StringFieldUpdateOperationsInput | string
    experienceLevels?: StringFieldUpdateOperationsInput | string
    workArrangements?: StringFieldUpdateOperationsInput | string
    excludeCompanies?: StringFieldUpdateOperationsInput | string
    requiredSkills?: StringFieldUpdateOperationsInput | string
    preferredSkills?: StringFieldUpdateOperationsInput | string
    useAIMatching?: BoolFieldUpdateOperationsInput | boolean
    aiThreshold?: FloatFieldUpdateOperationsInput | number
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    maxEmailsPerRun?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    keywords?: StringFieldUpdateOperationsInput | string
    excludeKeywords?: StringFieldUpdateOperationsInput | string
    enabledSites?: StringFieldUpdateOperationsInput | string
    daysPosted?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: StringFieldUpdateOperationsInput | string
    jobTypes?: StringFieldUpdateOperationsInput | string
    experienceLevels?: StringFieldUpdateOperationsInput | string
    workArrangements?: StringFieldUpdateOperationsInput | string
    excludeCompanies?: StringFieldUpdateOperationsInput | string
    requiredSkills?: StringFieldUpdateOperationsInput | string
    preferredSkills?: StringFieldUpdateOperationsInput | string
    useAIMatching?: BoolFieldUpdateOperationsInput | boolean
    aiThreshold?: FloatFieldUpdateOperationsInput | number
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    maxEmailsPerRun?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapeLogCreateInput = {
    id?: string
    site: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    jobsFound?: number
    newJobs?: number
    filtered?: number
    status: string
    error?: string | null
    duration?: number | null
  }

  export type ScrapeLogUncheckedCreateInput = {
    id?: string
    site: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    jobsFound?: number
    newJobs?: number
    filtered?: number
    status: string
    error?: string | null
    duration?: number | null
  }

  export type ScrapeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobsFound?: IntFieldUpdateOperationsInput | number
    newJobs?: IntFieldUpdateOperationsInput | number
    filtered?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ScrapeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobsFound?: IntFieldUpdateOperationsInput | number
    newJobs?: IntFieldUpdateOperationsInput | number
    filtered?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ScrapeLogCreateManyInput = {
    id?: string
    site: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    jobsFound?: number
    newJobs?: number
    filtered?: number
    status: string
    error?: string | null
    duration?: number | null
  }

  export type ScrapeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobsFound?: IntFieldUpdateOperationsInput | number
    newJobs?: IntFieldUpdateOperationsInput | number
    filtered?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ScrapeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobsFound?: IntFieldUpdateOperationsInput | number
    newJobs?: IntFieldUpdateOperationsInput | number
    filtered?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SiteConfigCreateInput = {
    id: string
    enabled?: boolean
    rateLimit?: number
    maxPages?: number
    lastScraped?: Date | string | null
    settings?: string | null
    updatedAt?: Date | string
  }

  export type SiteConfigUncheckedCreateInput = {
    id: string
    enabled?: boolean
    rateLimit?: number
    maxPages?: number
    lastScraped?: Date | string | null
    settings?: string | null
    updatedAt?: Date | string
  }

  export type SiteConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimit?: IntFieldUpdateOperationsInput | number
    maxPages?: IntFieldUpdateOperationsInput | number
    lastScraped?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimit?: IntFieldUpdateOperationsInput | number
    maxPages?: IntFieldUpdateOperationsInput | number
    lastScraped?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteConfigCreateManyInput = {
    id: string
    enabled?: boolean
    rateLimit?: number
    maxPages?: number
    lastScraped?: Date | string | null
    settings?: string | null
    updatedAt?: Date | string
  }

  export type SiteConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimit?: IntFieldUpdateOperationsInput | number
    maxPages?: IntFieldUpdateOperationsInput | number
    lastScraped?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimit?: IntFieldUpdateOperationsInput | number
    maxPages?: IntFieldUpdateOperationsInput | number
    lastScraped?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateInput = {
    id?: string
    name: string
    title?: string | null
    summary?: string | null
    skills: string
    experience: string
    education?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    preferences: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUncheckedCreateInput = {
    id?: string
    name: string
    title?: string | null
    summary?: string | null
    skills: string
    experience: string
    education?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    preferences: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    experience?: StringFieldUpdateOperationsInput | string
    education?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    experience?: StringFieldUpdateOperationsInput | string
    education?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateManyInput = {
    id?: string
    name: string
    title?: string | null
    summary?: string | null
    skills: string
    experience: string
    education?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    preferences: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    experience?: StringFieldUpdateOperationsInput | string
    education?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    experience?: StringFieldUpdateOperationsInput | string
    education?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailCreateInput = {
    id?: string
    content: string
    version?: number
    createdAt?: Date | string
    job: JobCreateNestedOneWithoutGeneratedEmailsInput
  }

  export type GeneratedEmailUncheckedCreateInput = {
    id?: string
    jobId: string
    content: string
    version?: number
    createdAt?: Date | string
  }

  export type GeneratedEmailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutGeneratedEmailsNestedInput
  }

  export type GeneratedEmailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailCreateManyInput = {
    id?: string
    jobId: string
    content: string
    version?: number
    createdAt?: Date | string
  }

  export type GeneratedEmailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type GeneratedEmailListRelationFilter = {
    every?: GeneratedEmailWhereInput
    some?: GeneratedEmailWhereInput
    none?: GeneratedEmailWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GeneratedEmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobSiteExternalIdCompoundUniqueInput = {
    site: string
    externalId: string
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    site?: SortOrder
    title?: SortOrder
    company?: SortOrder
    salary?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    description?: SortOrder
    url?: SortOrder
    jobType?: SortOrder
    experienceLevel?: SortOrder
    workArrangement?: SortOrder
    skills?: SortOrder
    location?: SortOrder
    postedAt?: SortOrder
    scrapedAt?: SortOrder
    status?: SortOrder
    aiScore?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    aiScore?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    site?: SortOrder
    title?: SortOrder
    company?: SortOrder
    salary?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    description?: SortOrder
    url?: SortOrder
    jobType?: SortOrder
    experienceLevel?: SortOrder
    workArrangement?: SortOrder
    skills?: SortOrder
    location?: SortOrder
    postedAt?: SortOrder
    scrapedAt?: SortOrder
    status?: SortOrder
    aiScore?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    site?: SortOrder
    title?: SortOrder
    company?: SortOrder
    salary?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    description?: SortOrder
    url?: SortOrder
    jobType?: SortOrder
    experienceLevel?: SortOrder
    workArrangement?: SortOrder
    skills?: SortOrder
    location?: SortOrder
    postedAt?: SortOrder
    scrapedAt?: SortOrder
    status?: SortOrder
    aiScore?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    aiScore?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SearchConfigCountOrderByAggregateInput = {
    id?: SortOrder
    keywords?: SortOrder
    excludeKeywords?: SortOrder
    enabledSites?: SortOrder
    daysPosted?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    jobTypes?: SortOrder
    experienceLevels?: SortOrder
    workArrangements?: SortOrder
    excludeCompanies?: SortOrder
    requiredSkills?: SortOrder
    preferredSkills?: SortOrder
    useAIMatching?: SortOrder
    aiThreshold?: SortOrder
    digestMode?: SortOrder
    maxEmailsPerRun?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchConfigAvgOrderByAggregateInput = {
    daysPosted?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    aiThreshold?: SortOrder
    maxEmailsPerRun?: SortOrder
  }

  export type SearchConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    keywords?: SortOrder
    excludeKeywords?: SortOrder
    enabledSites?: SortOrder
    daysPosted?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    jobTypes?: SortOrder
    experienceLevels?: SortOrder
    workArrangements?: SortOrder
    excludeCompanies?: SortOrder
    requiredSkills?: SortOrder
    preferredSkills?: SortOrder
    useAIMatching?: SortOrder
    aiThreshold?: SortOrder
    digestMode?: SortOrder
    maxEmailsPerRun?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchConfigMinOrderByAggregateInput = {
    id?: SortOrder
    keywords?: SortOrder
    excludeKeywords?: SortOrder
    enabledSites?: SortOrder
    daysPosted?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    jobTypes?: SortOrder
    experienceLevels?: SortOrder
    workArrangements?: SortOrder
    excludeCompanies?: SortOrder
    requiredSkills?: SortOrder
    preferredSkills?: SortOrder
    useAIMatching?: SortOrder
    aiThreshold?: SortOrder
    digestMode?: SortOrder
    maxEmailsPerRun?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchConfigSumOrderByAggregateInput = {
    daysPosted?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    aiThreshold?: SortOrder
    maxEmailsPerRun?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ScrapeLogCountOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    status?: SortOrder
    error?: SortOrder
    duration?: SortOrder
  }

  export type ScrapeLogAvgOrderByAggregateInput = {
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    duration?: SortOrder
  }

  export type ScrapeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    status?: SortOrder
    error?: SortOrder
    duration?: SortOrder
  }

  export type ScrapeLogMinOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    status?: SortOrder
    error?: SortOrder
    duration?: SortOrder
  }

  export type ScrapeLogSumOrderByAggregateInput = {
    jobsFound?: SortOrder
    newJobs?: SortOrder
    filtered?: SortOrder
    duration?: SortOrder
  }

  export type SiteConfigCountOrderByAggregateInput = {
    id?: SortOrder
    enabled?: SortOrder
    rateLimit?: SortOrder
    maxPages?: SortOrder
    lastScraped?: SortOrder
    settings?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteConfigAvgOrderByAggregateInput = {
    rateLimit?: SortOrder
    maxPages?: SortOrder
  }

  export type SiteConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    enabled?: SortOrder
    rateLimit?: SortOrder
    maxPages?: SortOrder
    lastScraped?: SortOrder
    settings?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteConfigMinOrderByAggregateInput = {
    id?: SortOrder
    enabled?: SortOrder
    rateLimit?: SortOrder
    maxPages?: SortOrder
    lastScraped?: SortOrder
    settings?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteConfigSumOrderByAggregateInput = {
    rateLimit?: SortOrder
    maxPages?: SortOrder
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    skills?: SortOrder
    experience?: SortOrder
    education?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    skills?: SortOrder
    experience?: SortOrder
    education?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    skills?: SortOrder
    experience?: SortOrder
    education?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobScalarRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type GeneratedEmailCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedEmailAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type GeneratedEmailMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedEmailMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedEmailSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type GeneratedEmailCreateNestedManyWithoutJobInput = {
    create?: XOR<GeneratedEmailCreateWithoutJobInput, GeneratedEmailUncheckedCreateWithoutJobInput> | GeneratedEmailCreateWithoutJobInput[] | GeneratedEmailUncheckedCreateWithoutJobInput[]
    connectOrCreate?: GeneratedEmailCreateOrConnectWithoutJobInput | GeneratedEmailCreateOrConnectWithoutJobInput[]
    createMany?: GeneratedEmailCreateManyJobInputEnvelope
    connect?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
  }

  export type GeneratedEmailUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<GeneratedEmailCreateWithoutJobInput, GeneratedEmailUncheckedCreateWithoutJobInput> | GeneratedEmailCreateWithoutJobInput[] | GeneratedEmailUncheckedCreateWithoutJobInput[]
    connectOrCreate?: GeneratedEmailCreateOrConnectWithoutJobInput | GeneratedEmailCreateOrConnectWithoutJobInput[]
    createMany?: GeneratedEmailCreateManyJobInputEnvelope
    connect?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GeneratedEmailUpdateManyWithoutJobNestedInput = {
    create?: XOR<GeneratedEmailCreateWithoutJobInput, GeneratedEmailUncheckedCreateWithoutJobInput> | GeneratedEmailCreateWithoutJobInput[] | GeneratedEmailUncheckedCreateWithoutJobInput[]
    connectOrCreate?: GeneratedEmailCreateOrConnectWithoutJobInput | GeneratedEmailCreateOrConnectWithoutJobInput[]
    upsert?: GeneratedEmailUpsertWithWhereUniqueWithoutJobInput | GeneratedEmailUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: GeneratedEmailCreateManyJobInputEnvelope
    set?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    disconnect?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    delete?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    connect?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    update?: GeneratedEmailUpdateWithWhereUniqueWithoutJobInput | GeneratedEmailUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: GeneratedEmailUpdateManyWithWhereWithoutJobInput | GeneratedEmailUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: GeneratedEmailScalarWhereInput | GeneratedEmailScalarWhereInput[]
  }

  export type GeneratedEmailUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<GeneratedEmailCreateWithoutJobInput, GeneratedEmailUncheckedCreateWithoutJobInput> | GeneratedEmailCreateWithoutJobInput[] | GeneratedEmailUncheckedCreateWithoutJobInput[]
    connectOrCreate?: GeneratedEmailCreateOrConnectWithoutJobInput | GeneratedEmailCreateOrConnectWithoutJobInput[]
    upsert?: GeneratedEmailUpsertWithWhereUniqueWithoutJobInput | GeneratedEmailUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: GeneratedEmailCreateManyJobInputEnvelope
    set?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    disconnect?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    delete?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    connect?: GeneratedEmailWhereUniqueInput | GeneratedEmailWhereUniqueInput[]
    update?: GeneratedEmailUpdateWithWhereUniqueWithoutJobInput | GeneratedEmailUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: GeneratedEmailUpdateManyWithWhereWithoutJobInput | GeneratedEmailUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: GeneratedEmailScalarWhereInput | GeneratedEmailScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobCreateNestedOneWithoutGeneratedEmailsInput = {
    create?: XOR<JobCreateWithoutGeneratedEmailsInput, JobUncheckedCreateWithoutGeneratedEmailsInput>
    connectOrCreate?: JobCreateOrConnectWithoutGeneratedEmailsInput
    connect?: JobWhereUniqueInput
  }

  export type JobUpdateOneRequiredWithoutGeneratedEmailsNestedInput = {
    create?: XOR<JobCreateWithoutGeneratedEmailsInput, JobUncheckedCreateWithoutGeneratedEmailsInput>
    connectOrCreate?: JobCreateOrConnectWithoutGeneratedEmailsInput
    upsert?: JobUpsertWithoutGeneratedEmailsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutGeneratedEmailsInput, JobUpdateWithoutGeneratedEmailsInput>, JobUncheckedUpdateWithoutGeneratedEmailsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type GeneratedEmailCreateWithoutJobInput = {
    id?: string
    content: string
    version?: number
    createdAt?: Date | string
  }

  export type GeneratedEmailUncheckedCreateWithoutJobInput = {
    id?: string
    content: string
    version?: number
    createdAt?: Date | string
  }

  export type GeneratedEmailCreateOrConnectWithoutJobInput = {
    where: GeneratedEmailWhereUniqueInput
    create: XOR<GeneratedEmailCreateWithoutJobInput, GeneratedEmailUncheckedCreateWithoutJobInput>
  }

  export type GeneratedEmailCreateManyJobInputEnvelope = {
    data: GeneratedEmailCreateManyJobInput | GeneratedEmailCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type GeneratedEmailUpsertWithWhereUniqueWithoutJobInput = {
    where: GeneratedEmailWhereUniqueInput
    update: XOR<GeneratedEmailUpdateWithoutJobInput, GeneratedEmailUncheckedUpdateWithoutJobInput>
    create: XOR<GeneratedEmailCreateWithoutJobInput, GeneratedEmailUncheckedCreateWithoutJobInput>
  }

  export type GeneratedEmailUpdateWithWhereUniqueWithoutJobInput = {
    where: GeneratedEmailWhereUniqueInput
    data: XOR<GeneratedEmailUpdateWithoutJobInput, GeneratedEmailUncheckedUpdateWithoutJobInput>
  }

  export type GeneratedEmailUpdateManyWithWhereWithoutJobInput = {
    where: GeneratedEmailScalarWhereInput
    data: XOR<GeneratedEmailUpdateManyMutationInput, GeneratedEmailUncheckedUpdateManyWithoutJobInput>
  }

  export type GeneratedEmailScalarWhereInput = {
    AND?: GeneratedEmailScalarWhereInput | GeneratedEmailScalarWhereInput[]
    OR?: GeneratedEmailScalarWhereInput[]
    NOT?: GeneratedEmailScalarWhereInput | GeneratedEmailScalarWhereInput[]
    id?: StringFilter<"GeneratedEmail"> | string
    jobId?: StringFilter<"GeneratedEmail"> | string
    content?: StringFilter<"GeneratedEmail"> | string
    version?: IntFilter<"GeneratedEmail"> | number
    createdAt?: DateTimeFilter<"GeneratedEmail"> | Date | string
  }

  export type JobCreateWithoutGeneratedEmailsInput = {
    id?: string
    externalId: string
    site: string
    title: string
    company: string
    salary?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    description: string
    url: string
    jobType?: string | null
    experienceLevel?: string | null
    workArrangement?: string | null
    skills?: string | null
    location?: string | null
    postedAt?: Date | string | null
    scrapedAt?: Date | string
    status?: string
    aiScore?: number | null
    aiSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUncheckedCreateWithoutGeneratedEmailsInput = {
    id?: string
    externalId: string
    site: string
    title: string
    company: string
    salary?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    description: string
    url: string
    jobType?: string | null
    experienceLevel?: string | null
    workArrangement?: string | null
    skills?: string | null
    location?: string | null
    postedAt?: Date | string | null
    scrapedAt?: Date | string
    status?: string
    aiScore?: number | null
    aiSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateOrConnectWithoutGeneratedEmailsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutGeneratedEmailsInput, JobUncheckedCreateWithoutGeneratedEmailsInput>
  }

  export type JobUpsertWithoutGeneratedEmailsInput = {
    update: XOR<JobUpdateWithoutGeneratedEmailsInput, JobUncheckedUpdateWithoutGeneratedEmailsInput>
    create: XOR<JobCreateWithoutGeneratedEmailsInput, JobUncheckedCreateWithoutGeneratedEmailsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutGeneratedEmailsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutGeneratedEmailsInput, JobUncheckedUpdateWithoutGeneratedEmailsInput>
  }

  export type JobUpdateWithoutGeneratedEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workArrangement?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scrapedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateWithoutGeneratedEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    site?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workArrangement?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scrapedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailCreateManyJobInput = {
    id?: string
    content: string
    version?: number
    createdAt?: Date | string
  }

  export type GeneratedEmailUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedEmailUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}