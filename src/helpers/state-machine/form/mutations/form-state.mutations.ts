// Library
import { assign, EventObject } from 'xstate';
import { isEqual, omit } from 'lodash';

// Helpers
import removeEmptyObjects, { isEmptyValues } from '../../../remove-empty-values';
import updateFormData, { setUISchemaData } from '../../../update-form-data'; 

// Types
import { FormContext } from '../../types/form-state-machine.type';

interface EventPayload {
    field: string;
    givenValue: string | object | Array<any>;
    givenUIValue: string | object | Array<any>;
    formData: any;
    uiData: any;
    forceDeleteUIData: boolean;
    effects: any;
    uiSchema?: any;
    formSchema?: any;
    schema?: any;
}

const HELPERS = {
  getValidUIData: (context: FormContext, event: EventObject & EventPayload) => {
    const { givenValue, givenUIValue, field, forceDeleteUIData } = event;
    const newUIData = isEmptyValues(givenUIValue) || forceDeleteUIData
      ? omit(context.uiData, field) 
      : updateFormData(context.uiData, field, givenUIValue);
    return (!isEqual(givenValue, givenUIValue) 
            || isEmptyValues(givenUIValue) 
            || forceDeleteUIData) ? newUIData : {
        ...context.uiData,
      };
  },
};

const FormMutations = {
  updateData: assign({
    formData: (context: FormContext, event: EventPayload) => removeEmptyObjects(
      updateFormData(
        context.formData, 
        event.field, 
        event.givenValue,
      ), 
      context.formSchema,
    ),
    lastField: (context: FormContext, event: EventObject & EventPayload) => event.field,
    formSchema: (context: FormContext, event: EventObject & EventPayload) => context.formSchema,
    uiData: (context: FormContext, event: EventObject & EventPayload) => HELPERS.getValidUIData(context, event),
    uiSchema: (context: FormContext, event: EventObject & EventPayload) => setUISchemaData(
      HELPERS.getValidUIData(context, event),
      context.uiSchema,
    ),
    effects: (context: FormContext, event: EventObject & EventPayload) => ({
      ...context.effects,
      ...event.effects,
    }),
  }),
  updateXHRData: assign({
    formData: (context: FormContext, event: EventObject & EventPayload) => ({
      ...context.formData,
      ...event.formData,
    }),
  }),
  updateXHRProgress: assign({
    xhrProgress: (context: FormContext, event: EventObject & { xhrProgress: boolean; }) => event.xhrProgress, 
  }),
  updateArrayData: assign({
    formData: (context: FormContext, event: EventObject & { 
      updateArrayFN: Function;
    }) => ({
      ...event.updateArrayFN(context.formData),
    }),
  }),
  updateActiveStep: assign({
    activeStep: (context: FormContext, event: EventObject & { stepName: string }) => Object.keys(
      context.formSchema.properties,
    ).indexOf(event.stepName),
  }),
};

export default FormMutations;