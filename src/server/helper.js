function findContractComponent(obj, componentId) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const item = obj[key];
        if (item.contractMeter && item.contractMeter.contractComponents) {
          const components = item.contractMeter.contractComponents;
          for (const component of components) {
            if (component.id === componentId) {
              return component;
            }
          }
        }
        if (typeof item === 'object') {
          const result = findContractComponent(item, componentId);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }
module.exports = findContractComponent