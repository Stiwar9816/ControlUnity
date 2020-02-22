const exceptions = require('./exceptions');

const resolveResponse = payload => {
  const { res, error = {} } = payload;
  const invalidTypes =
    error && error.hasOwnProperty("code") && error.code === "invalidTypes";
  const invalidField =
    error && error.hasOwnProperty("code") && error.code === "invalidField";
    const invalidDateCross =
    error && error.hasOwnProperty("code") && error.code === "invalidDateCross";
  const notFound =
    error && error.hasOwnProperty("code") && error.code === "notFound";
  const notAllow =
    error && error.hasOwnProperty("code") && error.code === "notAllow";
  const MissingArgument =
    error && error.hasOwnProperty("code") && error.code === "missingArgument";

  if (MissingArgument)
    return res.status(400).json({
      ...exceptions.MISSING_ARGUMENT,
      ...error
    });

  if (notFound) {
    return res.status(400).json({
      ...exceptions.NOT_FOUND,
      ...error
    });
  }

  if (notAllow) {
    return res.status(405).json({
      ...exceptions.NOT_ALLOW,
      ...error
    });
  }

  if (invalidTypes) {
    return res.status(400).json({
      ...exceptions.INVALID_TYPE,
      ...error
    });
  }

  if (invalidField) {
    return res.status(400).json({
      ...exceptions.INVALID_FIELD,
      ...error
    });
  }
  if (invalidDateCross) {
    return res.status(400).json({
      ...exceptions.DATE_CROSS,
      ...error
    });
  }

  return res.status(500).json(...exceptions.SERVER_ERROR);
};

module.exports = resolveResponse;
