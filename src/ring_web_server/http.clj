(ns ring-web-server.http
  (:require [org.httpkit.server :as server]
            [compojure.core :refer [GET routes]]
            [compojure.route :refer [resources]]
            [ring.util.response :as resp]
            [cheshire.core :as json]))

(def first-names ["nitzan" "yodan" "niriya" "I Am" "Rocket"
                  "james" "yehuda" "rivka" "nirit"])
(def last-names ["doe" "jones" "groot" "cohen" "ben avi" "gavozye"
                "zichron" "dresden"])

(def data (atom []))

(defn init [_]
  (repeatedly 100 (fn []
                    {:age       (rand-int 90)
                     :firstName (rand-nth first-names)
                     :lastName  (rand-nth last-names)})))

(defn default-handler [_req]
  (resp/redirect "/index.html"))

(defn table-data-handler [req]
  (resp/response (json/generate-string @data)))

(def site-routes
  (routes
    (GET "/" [req] default-handler)
    (GET "/table-data" [req] table-data-handler)
    (resources "/")))

(defn create-server [routes port]
  (swap! data init)
  (server/run-server routes {:port port}))

(comment
 (def server (create-server site-routes 11666))
 (server :timeout 100))

