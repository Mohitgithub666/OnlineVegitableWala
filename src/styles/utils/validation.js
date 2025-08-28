
const handleSubmitAndValidation = () => {



    // Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
        handleError('Please input name', 'name');
        isValid = false;
    }

    if (!inputs.email) {
        handleError('Please input email', 'email');
        isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        handleError('Please input a valid email', 'email');
        isValid = false;
    } else if (!inputs.email.includes("@gmail.com")) {
        handleError('Please input @gmail.com', 'email');
    }

    if (!inputs.password) {
        handleError('Please input password', 'password');
        isValid = false;
    } else if (inputs.password.length < 8) {
        handleError('Min password length of 8', 'password');
        isValid = false;
    }
    if (isValid) {
        // signinwithemailandpassword();
        //   dispatch(createUser(inputs.email, inputs.password))
        // console.log(">>>", inputs.name, inputs.email, inputs.password);
    }
}

export { handleSubmitAndValidation }