export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  let errorMsg = '';
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) {
      errorMsg = 'required';
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid && value.trim() == '') {
      errorMsg = 'required';
    } else if (!isValid && value.trim() != '') {
      errorMsg = 'must be at least 8 characters long';
    } else {
      errorMsg = '';
    }
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) {
      errorMsg = 'is invalid';
    }
    if (value.length <= 0) {
      errorMsg = 'is required';
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return {isValid, errorMsg};
};
