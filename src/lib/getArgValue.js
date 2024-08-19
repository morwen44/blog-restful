function getArg(arg) {
  const argString = process.argv.find((item) => item.includes(arg));
  const [_, value] = argString.split("=");
  console.log(value);
  return value;
}

module.exports = getArg;
