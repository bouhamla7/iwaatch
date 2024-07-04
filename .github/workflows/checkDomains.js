const fs = require("fs");
const axios = require("axios");

const filePath = "Domains.md";
const fileContent = fs.readFileSync(filePath, "utf8");

const parseTable = (markdown) => {
  const rows = markdown.split("\n").filter((row) => row.startsWith("|"));
  // console.log({ rows });
  return rows.slice(2).map((row) => {
    const cells = row.split("|").map((cell) => cell.trim());
    return { Domain: cells[1], Status: cells[2] };
  });
};

const generateTable = (rows) => {
  const header = "| Domain | Status |\n| ------ | ------ |\n";
  const body = rows
    .map((row) => `| ${row.Domain} | ${row.Status} |`)
    .join("\n");
  return header + body + "\n";
};

const table = parseTable(fileContent);

async function checkDomainStatus() {
  for (const row of table) {
    try {
      const response = await axios.get(row.Domain);
      console.log({ response });
      row.Status = response.status === 200 ? "✅" : "❌";
    } catch (error) {
      row.Status = "❌";
    }
  }

  const updatedTable = generateTable(table);
  const newFileContent = fileContent.replace(
    /\| Domain \| Status \|\n\| ------ \| ------ \|\n[\s\S]*?\n(?=\*\*Legends\*\*)/,
    updatedTable,
  );
  fs.writeFileSync(filePath, newFileContent);
}

checkDomainStatus();
