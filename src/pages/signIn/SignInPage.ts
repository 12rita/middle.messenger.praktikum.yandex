document.addEventListener('DOMContentLoaded', () => {
    const form: HTMLFormElement = document.forms[
        'signInForm' as TFormKey
    ] as HTMLFormElement;

    const handleSubmit = e => {
        e.preventDefault();
        Array.from(form.elements).forEach(el => {
            console.log((el as HTMLInputElement).value);
        });
        console.log({ form: form.elements });
    };

    if (form) form.onsubmit = handleSubmit;
});
