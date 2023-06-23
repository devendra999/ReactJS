import * as React from 'react';
import classNames from 'classnames';
import invariant from 'invariant';

import { FORMUP_INPUT_GROUP_CONTAINER_CLASS_NAME, FORMUP_INPUT_DANGER_CLASS_NAME } from '../../constants/identifiers';
import { useFormGroupContext } from '../../contexts/FormGroupContext/FormGroupContext';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { FormInputGroupContentProps } from '../../interfaces';

/**
 * Input group that supports multiple FormInputGroupItem children.
 * Each children should have a value and FormInputGroup will validate
 * all the options automatically.
 *
 * You need to pass in "name" (name of the field on the form)
 * in order to correctly render and use this component.
 *
 * You can pass "multi" prop if you want to be able to select multiple options.
 * Note that when selecting multi, the value in the form will be an array.
 * @param param0 Options.
 */
const FormInputGroupContent = ({
  className,
  children,
}: FormInputGroupContentProps) => {
  const form = useFormContext();

  const [,, {
    hasError,
  }] = useFormGroupContext();

  invariant(!!form, 'You need to provide a <Form /> component enclosing FormInputGroup.');

  const containerClasses = classNames(FORMUP_INPUT_GROUP_CONTAINER_CLASS_NAME, className, {
    [FORMUP_INPUT_DANGER_CLASS_NAME]: hasError,
  });

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default FormInputGroupContent;
