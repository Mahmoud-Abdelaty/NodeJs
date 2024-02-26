const helpers = require("./helpers.js");

function main(args) {
  // console.log(args);

  const [, , op, ...data] = args;
  const prepareData = data.reduce((cum, elm) => {
    [key, value] = elm.split("=");
    cum[key] = value;
    return cum;
  }, {});
  console.log(prepareData);
  switch (op) {
    case "add":
      helpers.add(prepareData);
      break;
    case "remove":
      helpers.remove(prepareData);
      break;
    case "edit":
      helpers.edit(prepareData);
      break;
    case "list":
      helpers.list(prepareData);
      break;
    case "complete":
      helpers.completed(prepareData);
      break;
    case "uncomplete":
      helpers.uncompleted(prepareData);
      break;
    default:
      console.log("Invalid Op");
      break;
  }
}
helpers.createDBFile();
main(process.argv);
