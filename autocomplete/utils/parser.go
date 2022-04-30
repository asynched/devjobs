package jsonParser

import (
	"encoding/json"
)

func ParseString[T any](data string) (T, error) {
	var t T
	err := json.Unmarshal([]byte(data), &t)
	return t, err
}

func ToString[T any](data T) (string, error) {
	dataBytes, err := json.Marshal(data)
	return string(dataBytes), err
}
