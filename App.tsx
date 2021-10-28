import React, { useEffect } from "react";
import Routes from "../mobile/navigation/Routes";
import { registerRootComponent } from "expo";
import * as SQLite from "expo-sqlite";

export default function App() {
  const db = SQLite.openDatabase("dbProperty");
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT type FROM sqlite_master WHERE type='table' AND type='Property_Table'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS Property_Table", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS Property_Table(property_id INTEGER PRIMARY KEY AUTOINCREMENT, property_type VARCHAR(255) NOT NULL, bedrooms VARCHAR(255) NOT NULL, date TEXT NOT NULL, price VARCHAR(255) NOT NULL, furniture_type VARCHAR(255) NULL, notes VARCHAR(255) NULL, reporter VARCHAR(255) NOT NULL)",
              []
            );
          }
        }
      );
    });
  }, []);
  return <Routes />;
}

registerRootComponent(App);
