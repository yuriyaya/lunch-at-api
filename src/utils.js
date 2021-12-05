exports.printLog = (log) => {
  if (process.env.log_level === "DEBUG") {
    console.log(log);
  }
};
