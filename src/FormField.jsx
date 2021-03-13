import React from 'react';
import isEqual from 'lodash/isEqual';
import has from 'lodash/has';
import { withStyles } from '@material-ui/core/styles';
import FieldSet, { shouldHideTitle } from './FieldSet';
import Field from './fields';
import styles from './form-field-styles';

// exported for unit testing
export const RawFormField = React.memo(({
  schema, 
  data, 
  uiSchema = {},
  xhrSchema = {},
  onChange,
  onXHRSchemaEvent,
  dynamicKeyField,
  onUpdateKeyProperty,
  onKeyDown,
  path,
  id,
  ...rest 
}) => {
  const classes = styles();
  const { type, component: backwardsCompatibleComponent } = schema;
  const newComponent = uiSchema['ui:component'];
  const component = backwardsCompatibleComponent || newComponent;

  // Todo: condition for array should change
  if ((type === 'object' || type === 'array') && !component) {
    return (
        <FieldSet
          path={path}
          schema={schema}
          data={data}
          uiSchema={uiSchema}
          xhrSchema={xhrSchema}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onXHRSchemaEvent={onXHRSchemaEvent}
          hideTitle={shouldHideTitle(uiSchema, schema, path)}
          onUpdateKeyProperty={onUpdateKeyProperty}
          dynamicKeyField={dynamicKeyField}
          prefixId={id}
          {...rest} 
        />
    );
  }
  const onGivenChange = dynamicKeyField === 'key' ? onUpdateKeyProperty : onChange;
  return (
      <Field
        className={classes.field}
        path={path}
        schema={schema}
        data={data}
        uiSchema={uiSchema}
        xhrSchema={xhrSchema}
        onChange={onGivenChange && onGivenChange(path)}
        onXHRSchemaEvent={onXHRSchemaEvent(path)}
        onKeyDown={onKeyDown}
        dynamicKeyField={dynamicKeyField}
        prefixId={id}
        {...rest}
      />
  );
}, (prevProps, nextProps) => (
  isEqual(prevProps.data, nextProps.data) 
  && isEqual(prevProps.schema, nextProps.schema)
  && isEqual(prevProps.uiData, nextProps.uiData)
  && isEqual(prevProps.uiSchema, nextProps.uiSchema)
  && (
    (
      has(prevProps.schema, 'ui:component') 
      || has(prevProps.schema, 'component')
    ) ? prevProps.prefixId === nextProps.prefixId : true
  )
),
);

export default RawFormField;
