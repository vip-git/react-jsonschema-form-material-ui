// Internal
import { coerceValue } from '@react-jsonschema-form-utils/parse-values';

// utils
import getInputType from './utils/get-input-type';
import getMuiProps from './utils/get-mui-props';
import getTextAreaProps from './utils/get-text-area-props';

type InputProps = {
  onChange: any;
  onBlur: any;
  type: any;
  options: any;
  uiSchema: any;
  htmlid?: any;
  schema?: any;
}

const onChangeHandler = (onChange, type, options) => (e) => {
  const valueUI = coerceValue(type, e.target.value, options);
  const valueForm = coerceValue(type, e.target.value, {
    ...options,
    isFormData: true,
  });
  if (valueForm !== undefined) onChange(valueForm, valueUI);
};

export default ({
  onChange,
  onBlur,
  type,
  options,
  uiSchema,
  htmlid,
  schema = {},
}: InputProps) => {
  const defaultOptions = ['useLocaleString'];
  const materialProps = {
    inputProps:
      typeof options.inputProps === 'object'
        ? {
          ...options.inputProps,
        }
        : {},
    ...Object.keys(options)
      .filter((key) => !defaultOptions.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
        }),
        {},
      ),
  };
  const props: any = {
    onChange: onChange && onChangeHandler(onChange, type, options),
    onBlur: onBlur && onChangeHandler(onBlur, type, options),
    label: schema.title || '',
    inputProps: {
      id: htmlid,
      ...materialProps.inputProps,
    },
    ...getTextAreaProps(uiSchema['ui:widget']),
    ...getMuiProps(uiSchema),
    ...materialProps,
  };
  if (!options.useLocaleString) {
    props.type = getInputType(type, uiSchema);
  }
  return props;
};
