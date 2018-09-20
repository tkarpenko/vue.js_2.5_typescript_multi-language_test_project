export const validationErrors: any = {
    'first-name': {
        required: 'Please complete this mandatory field.',
        maxLength: 'Name should contain less than 255 symbols',
        pattern: 'Symbols \'<\' and \'>\' are not allowed',
    },
    'last-name': {
        required: 'Please complete this mandatory field.',
        maxLength: 'Name should contain less than 255 symbols',
        pattern: 'Symbols \'<\' and \'>\' are not allowed',
    },
    'email': {
        required: 'Please complete this mandatory field.',
        pattern: 'Email is not valid.',
    },
    'id-code': {
        required: 'Please complete this mandatory field.',
        pattern: 'Please provide 7 digits',
    },
};

export const PATTERNS = {
    notCode: /^[^<>]+$/,
    validName: /^([a-zA-Z\ ]{1,250})$/,
    id: /^([0-9]{7})$/,
    email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
};
