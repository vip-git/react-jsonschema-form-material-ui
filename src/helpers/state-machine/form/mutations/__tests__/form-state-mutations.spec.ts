// Library
import { interpret } from 'xstate';
import { renderHook } from '@testing-library/react-hooks';

// Import
import FormMutations from '../form-state.mutations';

// Helpers
import createStateMachine from '../../../create-state-machine';
import useFormActions from '../../actions';

describe('FormMutations', () => {
    [
        'updateData',
        'updateXHRData',
        'updateXHRProgress',
        'updateErrorXHRProgress',
        'updateArrayData',
        'updateErrorData',
        'updateTabIndex'
    ].forEach((actionName) => {
        it(`Should be able to execute ${actionName}`, () => {
            const fieldStates = FormMutations[actionName];
            const expected = '{\"type\":\"xstate.assign\",\"assignment\":{}}';
            expect(JSON.stringify(fieldStates)).toBe(expected);
        });
    });

    describe('All form actions in the state machine', () => {
        const onChange = jest.fn();
        const onError = jest.fn();
        const params = {
            uiSchema: {
                "ui:page": {
                    "ui:layout": "tabs",
                    "props": {
                      "ui:schemaErrors": true
                    },
                    "style": {
                      "boxShadow": "none"
                    },
                    "tabs": {
                      "style": {
                        "width": "29vw",
                        "marginTop": 10
                      }
                    },
                    "tab": {
                      "style": {
                        "minWidth": 81
                      }
                    }
                }
            },
            xhrSchema: {
                "ui:errors": {
                    "offline": {
                        "title": "You are Offline !",
                        "message": "Please try again once you are online."
                    }
                }
            },
            formSchema: {},
            formData: {},
            uiData: {},
            validation: {},
            validations: {},
            hasError: false,
            effects: {
              onChange,
              onError,
            },
        };
        const formStateMachine = createStateMachine(params);
        const stateMachineService = interpret(
            formStateMachine, { devTools: process.env.NODE_ENV === 'development' },
        ).onTransition((state: any) => executeFormActionsByState({
            state,
            stateMachineService,
        }));
        const { 
            result: { current: { executeFormActionsByState } },
        } = renderHook(() => useFormActions({
            isPartialUI: () => false,
        }));
        stateMachineService.start();
        it('updateData', () => {
            const updateMutation = stateMachineService.send('update', {
                field: 'test',
                givenValue: 'test-2'
            });
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": params.uiSchema, "validation": {}, "validations": {}, "xhrProgress": {}, "xhrSchema": params.xhrSchema}
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(2);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateXHRData', () => {
            const updateFormOnXHRComplete = stateMachineService.send('updateFormOnXHRComplete', {
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateFormOnXHRComplete.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": params.uiSchema, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": params.xhrSchema};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(3);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateXHRData (edge case)', () => {
            const updateFormOnXHRComplete = stateMachineService.send('updateFormOnXHRComplete', {});
            const contextMutations = JSON.parse(JSON.stringify(updateFormOnXHRComplete.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": params.uiSchema, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": params.xhrSchema};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateTabIndex', () => {
            const updateMutation = stateMachineService.send('updateTabIndex', {
                tabIndex: 1,
            });
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 1, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {"ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"props": {"tabIndex": 1}, "style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}}, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {"ui:errors": {"offline": {"message": "Please try again once you are online.", "title": "You are Offline !"}}}}
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });


        it('updateArrayData', () => {
            const updateArrayFN = jest.fn();
            const updateMutation = stateMachineService.send('moveItemUp', {
                field: 'test',
                givenValue: 'test-2',
                updateArrayFN,
            });
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 1, "formData": {}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {"ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"props": {"tabIndex": 1}, "style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}}, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {"ui:errors": {"offline": {"message": "Please try again once you are online.", "title": "You are Offline !"}}}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
            expect(updateArrayFN).toHaveBeenCalledTimes(1);
        });

        it('updateErrorData', () => {
            const noErrors = stateMachineService.send('noErrors', {
                hasError: false,
            });
            const contextMutations = JSON.parse(JSON.stringify(noErrors.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 1, "formData": {}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {"ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"props": {"tabIndex": 1}, "style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {"ui:errors": {"offline": {"message": "Please try again once you are online.", "title": "You are Offline !"}}}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateErrorXHRProgress', () => {
            const updateErrorXHRProgress = stateMachineService.send('errorXHRProgress', {
                status: true,
                statusCode: 500,
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateErrorXHRProgress.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 1, "formData": {}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": true, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {"ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"props": {"tabIndex": 1}, "style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}}, "validation": {"xhr": []}, "validations": {}, "xhrProgress": {"undefined": true}, "xhrSchema": {"ui:errors": {"offline": {"message": "Please try again once you are online.", "title": "You are Offline !"}}}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "invalid"});
        });

        it('updateErrorXHRProgress (offline)', () => {
            const updateErrorXHRProgress = stateMachineService.send('errorXHRProgress', {
                status: true,
                statusCode: 999,
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateErrorXHRProgress.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 1, "formData": {}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": true, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {"ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"props": {"tabIndex": 1}, "style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}}, "validation": {"xhr": [{"message": "Please try again once you are online.", "rule": "offline", "title": "You are Offline !"}]}, "validations": {}, "xhrProgress": {"undefined": true}, "xhrSchema": {"ui:errors": {"offline": {"message": "Please try again once you are online.", "title": "You are Offline !"}}}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "invalid"});
        });
    });


    describe('All stepper actions in the state machine', () => {
        const onChange = jest.fn();
        const onError = jest.fn();
        const params = {
            uiSchema: {
                "ui:page": {
                    "ui:layout": "tabs",
                    "props": {
                      "ui:schemaErrors": true
                    },
                    "style": {
                      "boxShadow": "none"
                    },
                    "tabs": {
                      "style": {
                        "width": "29vw",
                        "marginTop": 10
                      }
                    },
                    "tab": {
                      "style": {
                        "minWidth": 81
                      }
                    }
                }
            },
            xhrSchema: {
                "ui:errors": {
                    "offline": {
                        "title": "You are Offline !",
                        "message": "Please try again once you are online."
                    }
                }
            },
            formSchema: {
                "properties": {
                    "SelectComponents": {
                      "title": "Select Components",
                      "$ref": "#/definitions/componentsList"
                    }
                }
            },
            formData: {},
            uiData: {},
            validation: {},
            validations: {},
            hasError: false,
            effects: {
              onChange,
              onError,
            },
        };
        const formStateMachine = createStateMachine(params);
        const stateMachineService = interpret(
            formStateMachine, { devTools: process.env.NODE_ENV === 'development' },
        ).onTransition((state: any) => executeFormActionsByState({
            state,
            stateMachineService,
        }));
        const { 
            result: { current: { executeFormActionsByState } },
        } = renderHook(() => useFormActions({
            isPartialUI: () => false,
        }));
        stateMachineService.start();
        it('stepChange', () => {
            const updateMutation = stateMachineService.send('stepChange', {
                stepName: '',
            });
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": -1, "formData": {}, "formSchema": {"properties": {"SelectComponents": {"$ref": "#/definitions/componentsList", "title": "Select Components"}}}, "formSchemaXHR": {}, "hasError": false, "hasXHRError": false, "lastField": "", "parsedFormSchema": {"properties": {"SelectComponents": {"$ref": "#/definitions/componentsList", "title": "Select Components"}}}, "uiData": {}, "uiSchema": {"ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}}, "validations": {}, "xhrProgress": {}, "xhrSchema": {"ui:errors": {"offline": {"message": "Please try again once you are online.", "title": "You are Offline !"}}}}
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalled();
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });
    });
});
