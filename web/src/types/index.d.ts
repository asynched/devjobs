namespace API {
  export type Company = {
    id: string
    name: string
    country: string
    image: string
  }

  export type Job = {
    id: string
    title: string
    description: string
    application_url: string
    full_time: boolean
    remote: boolean
    company: Company
  }
}
