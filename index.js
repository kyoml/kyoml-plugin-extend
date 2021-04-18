module.exports = {
  directives: {
    extend: ({ value, get, path }, source) => {

      if (!source || typeof source !== 'string') {
        throw new Error(`[kyoml-extend-plugin] @extend should be called with a path`);
      }

      const fullSource = `document.${source}`;
      const sourceObj = get(fullSource);
      const sourceType = typeof sourceObj;
      const destType = typeof value;

      if (sourceType !== 'object') {
        throw new Error(`[kyoml-extend-plugin] Cannot read from source '${fullSource}', expected an object, found ${sourceType} instead`);
      }

      if (destType !== 'object') {
        throw new Error(`[kyoml-extend-plugin] Failed to extend '${path}', expected an object, found ${destType} instead`);
      }

      if (path.indexOf(fullSource) === 0) {
        throw new Error(`[kyoml-extend-plugin] Extending a parent would cause circular reference`);
      }

      for (const key in sourceObj) {
        if (!value.hasOwnProperty(key)) {
          value[key] = sourceObj[key];
        }
      }
    }
  }
}
