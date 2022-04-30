package models

type Job struct {
	Id             string  `json:"id"`
	Title          string  `json:"title"`
	Description    string  `json:"description"`
	ApplicationUrl string  `json:"application_url"`
	FullTime       bool    `json:"full_time"`
	Remote         bool    `json:"remote"`
	Company        Company `json:"company"`
}

type Company struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Country string `json:"country"`
	Image   string `json:"image"`
	Website string `json:"website"`
}
