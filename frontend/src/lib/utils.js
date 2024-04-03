export function profileEditValidation(name) {
  const validationRules = {
    required: {
      value: true,
      message: "This field is required",
    },
  };
  if (name === "Name") {
    validationRules.pattern = {
      value: /^[a-zA-Z\s]+$/,
      message: "Invalid name: Only letters and spaces allowed.",
    };
  } else if (name === "Birthday") {
    validationRules.pattern = {
      value:
        /^(January|February|March|April|May|June|July|August|September|October|November|December)\s([1-9]|[1-2][0-9]|3[01]),\s\d{4}$/,
      message: 'Invalid birthday, please use format: "July 5, 2001"',
    };
  } else if (name === "Gender") {
    validationRules.pattern = {
      value: /^[a-zA-Z\s]+$/,
      message: "Invalid gender: Only letters and spaces allowed.",
    };
  } else if (name === "Email") {
    validationRules.pattern = {
      value: /^\S+@\S+\.\S+$/,
      message: "Invalid email: Please provide a valid email.",
    };
  } else if (name === "Address") {
    validationRules.pattern = {
      value: /^[A-Za-z-\s]+,\s[A-Za-z-\s]+,\s[A-Za-z-\s]+$/,
      message: 'Invalid address, please use format: "City, Province, Country"',
    };
  } else if (name === "Phone Number") {
    validationRules.pattern = {
      value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
      message: 'Invalid number, please use format: "(555) 555-5555"',
    };
  }
  return validationRules;
}

export function loginValidation() {
  const validationRules = {
    email: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Invalid email address.",
      },
    },
    password: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        message: "Invalid password.",
      },
    },
  };
  return validationRules;
}

export function registrationValidation(watch) {
  const validationRules = {
    fname: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: "Invalid name: Only letters and spaces allowed.",
      },
    },
    lname: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: "Invalid name: Only letters and spaces allowed.",
      },
    },
    email: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Invalid email address.",
      },
    },
    password: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        message:
          "Invalid password: Must have 8-16 characters, a number, uppercase, lowercase, and special character.",
      },
    },
    confirmPassword: {
      required: {
        value: true,
        message: "This field is required",
      },
      validate: (val) => {
        if (watch("password") != val) {
          return "Your passwords do no match";
        }
      },
    },
  };
  return validationRules;
}
