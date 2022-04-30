package handlers

import (
	"bufio"
	"net/http"
	"os"
	"strings"

	models "github.com/asynched/devjobs/models"
	jsonParser "github.com/asynched/devjobs/utils"
)

func compare(source, target string) bool {
	return strings.Contains(strings.ToLower(source), strings.ToLower(target))
}

func queryDumpFile(filename string, query string) ([]models.Job, error) {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	jobs := make([]models.Job, 0)

	for scanner.Scan() {
		line := scanner.Text()
		data, err := jsonParser.ParseString[models.Job](line)

		if err != nil {
			return nil, err
		}

		if compare(data.Title, query) {
			jobs = append(jobs, data)
			continue
		}

		if compare(data.Description, query) {
			jobs = append(jobs, data)
			continue
		}

		if compare(data.Company.Name, query) {
			jobs = append(jobs, data)
			continue
		}

		if compare(data.Company.Country, query) {
			jobs = append(jobs, data)
			continue
		}
	}

	return jobs, nil
}

func HandleAutocomplete(writer http.ResponseWriter, request *http.Request) {
	queryString := request.URL.Query().Get("q")

	writer.Header().Set("Access-Control-Allow-Origin", "*")

	if queryString == "" {
		writer.Write([]byte("[]"))
		return
	}

	jobs, err := queryDumpFile("data/dump.json", queryString)

	if err != nil {
		writer.WriteHeader(http.StatusInternalServerError)
		writer.Write([]byte("The server couldn't process your request"))
		return
	}

	data, _ := jsonParser.ToString(jobs)

	writer.WriteHeader(http.StatusOK)
	writer.Write([]byte(data))
}
