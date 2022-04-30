type CamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<K>]: T[K]
}

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

type Either<L, R> = L | R

namespace API {
  export type RawCompany = {
    id: string
    name: string
    country: string
    image: string
    website: string
  }

  export type RawJob = {
    id: string
    title: string
    description: string
    application_url: string
    full_time: boolean
    remote: boolean
    company: Company
  }

  export type Job = {
    id: string
    title: string
    description: string
    applicationUrl: string
    fullTime: boolean
    remote: boolean
    company: Company
  }

  export type Company = {
    id: string
    name: string
    country: string
    image: string
    website: string
  }
}
