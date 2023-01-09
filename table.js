import snmp from "net-snmp";
import { printTable } from "console-table-printer"

const session = snmp.createSession("localhost", "ncnuim");

const hrProcessorTableOid = "1.3.6.1.2.1.25.3.3";
const hrStorageTableOid = "1.3.6.1.2.1.25.2.3";
const hrSWRunTableOid = "1.3.6.1.2.1.25.4.2";

const hrProcessorTableCols = ["hrProcessorFrwID", "hrProcessorLoad"];
const hrStorageTableCols = ["hrStorageIndex", "hrStorageType", "hrStorageDescr", "hrStorageAllocationUnits", "hrStorageSize", "hrStorageUsed", "hrStorageAllocationFailures"];
const hrSWRunTableCols = ["hrSWRunIndex", "hrSWRunName", "hrSWRunID", "hrSWRunPath", "hrSWRunParameters", "hrSWRunType", "hrSWRunStatus"];

function print(oid, cols) {
  session.table(oid, 20, (err, table) => {
    if (err) {
      console.error(err);
      return;
    }

    const idxs = Object.keys(table);
    const formatedTable = idxs.map((idx) => {
      const data = cols.reduce((acc, col, i) => {
        acc[col] = table[idx][i + 1]
        return acc;
      }, {});
      return { "index": idx, ...data }
    })

    printTable(formatedTable)
  });
}

print(hrProcessorTableOid, hrProcessorTableCols);
print(hrStorageTableOid, hrStorageTableCols);
print(hrSWRunTableOid, hrSWRunTableCols);