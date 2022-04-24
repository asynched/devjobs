namespace Utils {
  type CamelCase<T> = {
    [K in keyof T as SnakeToCamelCase<K>]: T[K]
  }

  type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S
}

namespace API {
  export type RawCompany = {
    id: string
    name: string
    country: string
    image: string
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

  export type Job = Utils.CamelCase<RawJob>
  export type Company = Utils.CamelCase<RawCompany>
}
