// Library
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import isEqual from 'lodash/isEqual';
import setWith from 'lodash/setWith';
import { generate } from 'shortid';
import Paper from '@material-ui/core/Paper';
import each from 'lodash/each';

// Internal
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, { addListItem, removeListItem, moveListItem } from './helpers/update-form-data';
import getValidationResult from './helpers/validation';
import ValidationMessages from './ValidationMessages';
import FormButtons from './FormButtons';

// Initial Contexts
export const EventContext = React.createContext('fieldEvent');
let data = {};
const setData = (givenData, onChange) => {
  data = givenData;
  onChange({ formData: givenData });
};

const Form = ({
  formData,
  schema,
  uiSchema,
  validations,
  prefixId,
  submitOnEnter,
  onChange,
  onUpload,
  onSubmit, 
  formButtons,
  actionButtonPos,
  onCancel, 
  activityIndicatorEnabled,
  submitValue,
  cancelValue,
  inProgressValue,
  disabled, 
  cancelVariant,
  submitVariant,
  ...rest 
}) => {
  const classes = formStyles();
  const validation = getValidationResult(schema, uiSchema, formData, validations);
  const id = prefixId || generate();
  setData(formData, onChange);

  const onFormValuesChange = (field) => (givenValue) => {
    const newFormData = updateFormData(data, field, givenValue);
    setData(newFormData, onChange);
  };

  const onMoveItemUp = (path, idx) => () => setData(moveListItem(data, path, idx, -1), onChange);

  const onMoveItemDown = (path, idx) => () => setData(moveListItem(data, path, idx, 1), onChange);

  const onDeleteItem = (path, idx) => () => setData(removeListItem(data, path, idx), onChange);

  const onAddItem = (path, defaultValue) => () => setData(addListItem(data, path, defaultValue || ''), onChange);

  const onFormSubmit = (callback) => onSubmit({ formData: data }, () => callback && callback());

  const handleKeyEnter = (e) => {
    if (e.keyCode === 13 && submitOnEnter) {
      onSubmit();
      // put the login here
    }
  };

  // try {
  //   const transformedSchema = JSON.parse(JSON.stringify(schema));
  //   const notAllowedTypes = ['upload', 'material-date'];
  //   each(transformedSchema, (givenValue, key) => {
  //     // console.log('value is', value);
  //     // console.log('key us', key);
  //     if (key === 'properties') {
  //       each(value, (propVal, propKey) => {
  //         if (notAllowedTypes.includes(propVal.type)) {
  //           transformedSchema.properties[propKey].type = 'string';
  //         }
  //       });
  //     }
  //   });
  //   // console.log('transformedSchema is', transformedSchema);
  //   // eslint-disable-next-line global-require
  //   const { buildYup } = require('schema-to-yup');
  //   const yupSchema = buildYup(transformedSchema, {});
  //   const isValid = async (givenSchema, givenData) => {
  //     const valid = await givenSchema.isValid(givenData);
  //     // console.log(schema);
  //     // console.log('formData is', data);
  //     // console.log('valid is', valid);
  //     return valid;
  //   };
  //   const valid = isValid(yupSchema, formData);
  // }
  // catch (err) {
  //   // console.log('err' , err);
  // }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Paper className={classes.root}>
        {
          (actionButtonPos === 'top') 
            ? (
                <FormButtons 
                  onSubmit={(callback) => onSubmit(callback)}
                  submitValue={submitValue} 
                  inProgressValue={inProgressValue}
                  disabled={disabled} 
                  onCancel={onCancel}
                  cancelValue={cancelValue} 
                  cancelVariant={cancelVariant}
                  submitVariant={submitVariant}
                  classes={classes} 
                  activityIndicatorEnabled={activityIndicatorEnabled}
                />
            )
            : null
          
        }
        <ValidationMessages validation={validation} />
        <EventContext.Provider value={onUpload}>
          <FormField
              path={''}
              data={data}
              schemaVersion={schema.version}
              schema={schema}
              uiSchema={uiSchema}
              id={id}
              onChange={onFormValuesChange}
              onSubmit={onFormSubmit}
              validation={validation}
              onKeyDown={handleKeyEnter}
              onMoveItemUp={onMoveItemUp}
              onMoveItemDown={onMoveItemDown}
              onDeleteItem={onDeleteItem}
              onAddItem={onAddItem}
              {...rest}
          />
        </EventContext.Provider>
        {
          (!actionButtonPos) 
            ? (
                <FormButtons
                  onSubmit={(callback) => onSubmit(callback)}
                  disabled={disabled}
                  submitValue={submitValue}
                  cancelValue={cancelValue} 
                  onCancel={onCancel}
                  cancelVariant={cancelVariant}
                  submitVariant={submitVariant}
                  classes={classes} 
                  activityIndicatorEnabled={activityIndicatorEnabled}
                />
            )
            : null
          
        }
      </Paper>
    </MuiPickersUtilsProvider>
  );
};

export default Form;
