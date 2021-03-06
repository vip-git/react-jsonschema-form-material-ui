// Imports
import mapValues from 'lodash/mapValues';

// Types
import { JSONSchema7 } from 'json-schema';

const getDefaultValue = (schema = {} as JSONSchema7) => {
  if (schema.default) return schema.default;
  switch (schema.type) {
    case 'object':
      return mapValues(schema.properties, getDefaultValue);
    case 'array':
      return [];
    case 'boolean':
      return false;  
    case 'string':
    case 'number':
    default:
      return '';
  }
};

export default getDefaultValue;
