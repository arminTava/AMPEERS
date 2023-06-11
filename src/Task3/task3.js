function transformObject(obj) {
    if (typeof obj === 'number') {
      return obj + 1;
    }
  
    if (typeof obj === 'string') {
      return obj + ' AE';
    }
  
    if (Array.isArray(obj)) {
      return obj.map(transformObject);
    }
  
    if (typeof obj === 'object') {
      const transformedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          transformedObj[key] = transformObject(obj[key]);
        }
      }
      return transformedObj;
    }
  
    return obj;
  }
  
  // Example usage:
  const initialObject = {
    a: 123,
    b: 'abc',
    c: [1, 2, 3]
  };
  
  const transformedObject = transformObject(initialObject);
  console.log(transformedObject);