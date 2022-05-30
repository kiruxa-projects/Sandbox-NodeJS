function parseChart(data) {
  const HEADER_REGEXP = /\s([^\:\n\r]*)\s*\:\s*([^\n\t]*)/gm;

  const BODY_REGEXP =
    /#\s*Data\s*\[\s*(Total\sNo).\s*\=\s*(\d*)[\s*\]\n\r]*(\<*[^\>]*\>)\s*(\<*[^\>]*\>)[\n\r]*(\s*[^\s]*\s*[^\s\n\r]*[\n]*)/gm;

  const HEADER = regexpFind(data, HEADER_REGEXP);
  const BODY = regexpFind(data, BODY_REGEXP)[0][0];
  const BODY_DATA = regexpFind(data, /^(\s*([\d\.]*))*$/gm)
    .filter((e) => {
      return e.every((k) => k !== undefined);
    })
    .filter((k, i) => {
      return i > 1;
    })[0][0];

  const parsedData = {
    header: {},
    body: {
      params: [],
      rows: [],
    },
  };

  for (let j = 0; j < HEADER.length; j++) {
    for (let i = 1; i < HEADER[j].length; i++) {
      if (i % 2 !== 0) {
        parsedData.header[HEADER[j][i].trim()] = HEADER[j][i + 1].trim();
      }
    }
  }

  parsedData.body.count = Number.parseInt(
    regexpFind(BODY, /(Total No.)\s*\s=\s*(\d*)/gm)[0][2]
  );
  for (let i of regexpFind(BODY, /\<([^\>]*)/gim)) {
    parsedData.body.params.push(i[1].trim());
  }

  parsedData.rows = BODY_DATA.split("\n")
    .filter((e) => !!e)
    .map((e) => {
      return e.split(/\s{1,}/gm).filter((m) => !!m);
    });

  return;
}

const fs = require("fs");
const data = fs.readFileSync("./47-Black(1).txt", "utf-8");
parseChart(data);

function regexpFind(str, pattern) {
  const regex = new RegExp(pattern, "gm");
  let m;
  let i = 0;
  let result = [];
  while ((m = regex.exec(str)) !== null) {
    result.push([]);
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
      result[i].push(match);
    });
    i++;
  }
  return result;
}
