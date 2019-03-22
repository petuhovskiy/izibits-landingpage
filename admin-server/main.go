package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
)

var (
	authToken = generateToken()
	trMapFile = "tr.map.js"
)

func generateToken() string {
	b := make([]byte, 32)
	rand.Read(b)

	return hex.EncodeToString(b)
}

type TrMap struct {
	Entries []map[string]string
}

func seekSymbol(f *os.File, c byte) (int, error) {
	f.Seek(0, 0)
	shift := 0
	for {
		b := make([]byte, 1)
		n, err := f.Read(b)
		if err != nil {
			return 0, err
		}
		if n <= 0 {
			return 0, errors.New("not found")
		}

		if b[0] == c {
			f.Seek(-1, 1)
			break
		}
	}

	return shift, nil
}

func readTrMap() (TrMap, error) {
	res := TrMap{}

	f, err := os.Open(trMapFile)
	defer f.Close()
	if err != nil {
		return res, err
	}

	_, err = seekSymbol(f, '[')
	if err != nil {
		return res, err
	}

	err = json.NewDecoder(f).Decode(&res.Entries)

	return res, err
}

func saveTrMap(tm TrMap) error {
	f, err := os.OpenFile(trMapFile, os.O_RDWR, os.ModePerm)
	defer f.Close()
	if err != nil {
		return err
	}

	_, err = seekSymbol(f, '[')
	if err != nil {
		return err
	}

	err = json.NewEncoder(f).Encode(tm.Entries)
	if err != nil {
		return err
	}

	pos, _ := f.Seek(0, 1)

	return f.Truncate(pos)
}

func renderAdmin(w http.ResponseWriter, r *http.Request) {
	if r.URL.Query().Get("token") != authToken {
		w.WriteHeader(http.StatusForbidden)
		return
	}

	tr, err := readTrMap()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "can't open tr.map: %v", err)
		return
	}

	w.Write([]byte(htmlHead))

	fmt.Fprintf(w, "<div>")

	globalID := 0

	for num, v := range tr.Entries {
		w.Write([]byte(htmlSeparator))
		fmt.Fprintf(w, "<div id=\"num-%d\">", num)

		keys := make([]string, 0)
		for k := range v {
			if k == "key" {
				continue
			}
			keys = append(keys, k)
		}
		sort.Strings(keys)

		keys = append([]string{"key"}, keys...)

		for _, k := range keys {
			val := v[k]
			globalID++
			fmt.Fprintf(w, htmlKeyValue, k, val, num, fmt.Sprintf("area-%d", globalID))
		}

		globalID++
		fmt.Fprintf(w, htmlAddKV, num, fmt.Sprintf("input-%d", globalID))

		fmt.Fprintf(w, "</div>")
	}

	fmt.Fprintf(w, "</div>")

	w.Write([]byte(htmlSeparator))

	fmt.Fprintf(w, htmlAddEntry)

	w.Write([]byte(htmlBottom))
}

type Resp struct {
	Text string
	Num  int
}

func sendResp(w http.ResponseWriter, r Resp) {
	json.NewEncoder(w).Encode(r)
}

func trMapProcessor(w http.ResponseWriter, r *http.Request, f func(TrMap, *Resp) TrMap) {
	if r.URL.Query().Get("token") != authToken {
		w.WriteHeader(http.StatusForbidden)
		return
	}

	resp := &Resp{
		Num:  -1,
		Text: "ok",
	}

	trMap, err := readTrMap()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		resp.Text = fmt.Sprintf("read error: %v", err)
		sendResp(w, *resp)
		return
	}

	trMap = f(trMap, resp)

	err = saveTrMap(trMap)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		resp.Text = fmt.Sprintf("save error: %v", err)
		sendResp(w, *resp)
		return
	}

	sendResp(w, *resp)
}

func queryNewEntry(w http.ResponseWriter, r *http.Request) {
	trMapProcessor(w, r, func(tm TrMap, resp *Resp) TrMap {
		resp.Num = len(tm.Entries)
		tm.Entries = append(tm.Entries, make(map[string]string))
		return tm
	})
}

func queryAddKey(w http.ResponseWriter, r *http.Request) {
	trMapProcessor(w, r, func(tm TrMap, resp *Resp) TrMap {
		num, _ := strconv.Atoi(r.URL.Query().Get("num"))
		key := r.URL.Query().Get("key")

		resp.Num = num
		if _, ok := tm.Entries[num][key]; !ok {
			tm.Entries[num][key] = ""
		}

		return tm
	})
}

func queryUpdValue(w http.ResponseWriter, r *http.Request) {
	trMapProcessor(w, r, func(tm TrMap, resp *Resp) TrMap {
		num, _ := strconv.Atoi(r.URL.Query().Get("num"))
		key := r.URL.Query().Get("key")
		text := r.URL.Query().Get("text")

		resp.Num = num
		tm.Entries[num][key] = text

		return tm
	})
}

func queryDelValue(w http.ResponseWriter, r *http.Request) {
	trMapProcessor(w, r, func(tm TrMap, resp *Resp) TrMap {
		num, _ := strconv.Atoi(r.URL.Query().Get("num"))
		key := r.URL.Query().Get("key")

		resp.Num = num
		delete(tm.Entries[num], key)

		return tm
	})
}

func main() {
	http.HandleFunc("/", renderAdmin)
	http.HandleFunc("/newEntry", queryNewEntry)
	http.HandleFunc("/addKey", queryAddKey)
	http.HandleFunc("/updValue", queryUpdValue)
	http.HandleFunc("/delValue", queryDelValue)

	fmt.Printf("Access admin page at address: http://localhost:8080/?token=%s\n", authToken)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
