package main

import (
	"flag"
	"fmt"
	"net/http"
	"time"
)

var (
	idleTimeout      int64
	disableKeepAlive bool
)

func init() {
	flag.Int64Var(&idleTimeout, "i", 0, "server idle timeout")
	flag.BoolVar(&disableKeepAlive, "D", false, "disable server keep alive")
	flag.Parse()
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		r.Header.Write(w)
	})
	srv := http.Server{
		Addr: ":9876",
		// ReadTimeout:  5 * time.Second,
		// WriteTimeout: 5 * time.Second,
		// IdleTimeout:  5 * time.Second,
	}
	if disableKeepAlive {
		fmt.Println("disable server keep alive")
		srv.SetKeepAlivesEnabled(false)
	}
	if idleTimeout > 0 {
		fmt.Printf("set idle timeout to: %ds\n", idleTimeout)
		srv.IdleTimeout = time.Duration(idleTimeout) * time.Second
	} else {
		fmt.Println("use default idle timeout: 0")
	}
	srv.ListenAndServe()
}
