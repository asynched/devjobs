package main

import (
	"log"
	"net/http"
	"time"

	handlers "github.com/asynched/devjobs/server"
)

func main() {
	logger := log.Default()
	logger.SetFlags(log.LstdFlags | log.LUTC | log.Lshortfile)

	logger.Println("Starting server...")
	http.HandleFunc("/autocomplete", func(writer http.ResponseWriter, request *http.Request) {
		start := time.Now()
		logger.Printf("Received autocomplete request for '%s'", request.URL.Query().Get("q"))
		handlers.HandleAutocomplete(writer, request)
		end := time.Since(start)
		logger.Printf("Autocomplete request completed, finished in %s", end)
	})

	logger.Fatal(http.ListenAndServe(":8080", nil))
}
