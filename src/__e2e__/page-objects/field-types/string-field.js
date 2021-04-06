const FieldUtils = require('../field-utils');
const { getComponentSelector } = require('../component-types');

const compareCurrentValue = (
  fieldName,
  fieldUIValue,
  fieldUIType,
  callbackBeforeCompare
) => {
  if (fieldUIValue !== 'false') {
    callbackBeforeCompare(fieldUIType);
    const { path } = getComponentSelector(fieldName, fieldUIType, fieldUIValue);
    const fieldValue = fieldUIType !== 'checkboxes' ? $(path).getValue() || $(path).getText() : '';
    switch (fieldUIType) {
      case 'material-input':
      case 'updown':
      case 'password':
      case 'textarea':
      case 'material-date':
      case 'rich-text-editor':
      case 'upload':
        expect(fieldValue).toStrictEqual(fieldUIValue);
        return fieldValue;

      case 'checkboxes':
        const { singleSelector } = getComponentSelector(
          fieldName,
          fieldUIType,
          fieldUIValue
        );
        expect($(singleSelector)).toBeChecked();
        return fieldValue;

      case 'material-native-select':
        expect(fieldValue).toContain(fieldUIValue);
        return fieldValue;
    }
  }
};

const updateNewValue = (fieldName, newValue, fieldUIType) => {
  const { path, secondarySelector } = getComponentSelector(
    fieldName,
    fieldUIType,
    newValue
  );
  switch (fieldUIType) {
    case 'material-input':
    case 'password':
    case 'textarea':
    case 'updown':
      FieldUtils.clearValues(path);
      $(path).setValue(newValue);
      return newValue;

    case 'material-date':
      const { thirdSelector, fourthSelector } = getComponentSelector(
        fieldName,
        fieldUIType,
        newValue
      );
      $(secondarySelector).click();
      $(thirdSelector).click();
      $(fourthSelector).click();
      FieldUtils.clearValues(path);
      $(path).setValue(newValue);
      return newValue;

    case 'material-native-select':
      $(path).click();
      $(secondarySelector).click();
      return newValue;

    case 'material-select':
      $(path).click();
      $(secondarySelector).click();
      return newValue;

    case 'rich-text-editor':
      $(path).click();
      browser.keys(['Meta', 'a']);
      expect($(path)).toBeFocused();
      browser.keys(newValue.split(''));
      return newValue;

    case 'upload':
      FieldUtils.uploadFile(
        '/Users/vipinwork/htdocs/react-jsonschema-form-material-ui/docs/checkbox.md',
        '//input[@id="button-file"]'
      );
      return newValue;

    case 'checkboxes':
       const { singleSelector } = getComponentSelector(
         fieldName,
         fieldUIType,
         newValue
       );
      $(singleSelector).click();
      return newValue;
    default:
      return newValue;
  }
};

/**
 * String Field
 */
module.exports = {
  compareCurrentValue,
  updateNewValue,
};
