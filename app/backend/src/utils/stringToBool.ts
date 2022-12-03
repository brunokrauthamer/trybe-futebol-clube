const stringToBool = (string: string): boolean => {
  if (string === 'true') {
    return true;
  } if (string === 'false') {
    return false;
  }
  throw new Error();
};

export default stringToBool;
