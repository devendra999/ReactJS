import React from 'react';
import classNames from 'classnames';
import invariant from 'invariant';

import { FORMUP_FORM_CLASS_NAME } from '../../constants/identifiers';
import FormContainer from '../../contexts/FormContext/FormContainer';
import { FormProps } from '../../interfaces';

/**
 * Form component that will make use of Formik to validate all inputs declared as its children.
 * The inputs should be enclosed by the FormInput component.
 */
const Form = ({
  renderAsForm = false,
  formikForm,
  className,
  children,
  onSubmit,
}: FormProps) => {
  invariant(!!formikForm, 'You need to provide the "formikForm" prop.');

  const formClassName = classNames(FORMUP_FORM_CLASS_NAME, className);

  return (
    <FormContainer form={formikForm}>
      {
        renderAsForm
          ? (
            <form onSubmit={onSubmit} className={formClassName}>
              {children}
            </form>
          )
          : (
            <div className={formClassName}>
              {children}
            </div>
          )
      }
    </FormContainer>
  );
};

export default Form;
