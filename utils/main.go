package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type Range struct {
	Start int
	End   int
}

type Entity struct {
	Url    string
	Ranges []Range
	Text   string
}

// minify script, based on chrome coverage

func main() {
	f, err := os.Open("cov.json")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	arr := make([]Entity, 0)
	json.NewDecoder(f).Decode(&arr)

	for _, e := range arr {
		fmt.Println(e.Url)
		fmt.Printf("\n\n")

		res := ""
		for _, r := range e.Ranges {
			res += e.Text[r.Start:r.End]
		}

		fmt.Println(res)
		fmt.Println()
	}
}
