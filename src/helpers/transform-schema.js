// Library
import { has } from 'lodash';
import each from 'lodash/each';

const transformEnums = (enums) => {
  const enumVals = [];
  const enumTitles = [];
  each(
    enums.filter((e) => !e.disabled),
    (enumVal) => {
      if (enumVal.key) {
        enumVals.push(enumVal.key);
        enumTitles.push(enumVal.key);
      }
      else {
        enumVals.push(enumVal);
        enumTitles.push(enumVal);
      }
    },
  );

  return {
    enumVals,
    enumTitles,
  };
};

const transformSchema = (schema) => {
  const transformedSchema = JSON.parse(JSON.stringify(schema));

  const notAllowedTypes = ['upload', 'material-date'];
  each(transformedSchema, (givenValue, key) => {
    if (key === 'properties') {
      each(givenValue, (propVal, propKey) => {
        if (notAllowedTypes.includes(propVal.type)) {
          transformedSchema.properties[propKey].type = 'string';
        }
        if (propVal.enum) {
          const { enumVals, enumTitles } = transformEnums(propVal.enum);
          transformedSchema.properties[propKey].enum = enumVals;
          transformedSchema.properties[propKey].enum_titles = enumTitles;
        }
        else if (has(propVal, 'items.enum')) {
          const { enumVals, enumTitles } = transformEnums(propVal.items.enum);
          transformedSchema.properties[propKey].items.enum = enumVals;
          transformedSchema.properties[propKey].items.enum_titles = enumTitles;
        }
      });
    }
  });

  return transformedSchema;
};

export default transformSchema;
