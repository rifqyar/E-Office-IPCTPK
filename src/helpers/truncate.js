export default truncate = (str, length) => {
    if (length) {
      if (str.length > length) {
        return str.slice(0, length) + '...';
      } else {
        return str;
      }
    } else {
      if (str.length > 60) {
        return str.slice(0, 60) + '...';
      } else {
        return str;
      }
    }
  };
  