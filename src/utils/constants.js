
export const drawerWidth = 240;

export const formTypes = {

    newVehicle: 'NEW_VEHICLE',
    newUser: 'NEW_USER',
    newPenalty: 'NEW_PENALTY',
    login: 'LOGIN',
    signUp: 'SIGN_UP',
    forgotPassword: 'FORGOT_PASSWORD',
    newPassword: 'NEW_PASSWORD',
    newAutoGeneratedForm: 'NEW_AUTO_GENERATED_FORM',
    autoGenerateForm: 'AUTO_GENERATE_FORM',
}

export const pageType = {
    vehicle: {
        type: 'VEHICLE',
        sortByOptions: [
            "Plate Number",
            "creation date"
        ],
    },
    penalty: {
        type: 'PENALTY',
        sortByOptions: [
            "Plate Number", "receipt no", "owner name", "penalty date"
        ],
    },
    users: {
        type: 'USERS',
        sortByOptions: [
            "Name",
            "creation date"
        ],
    },
}

export const paymentStatus = ['Pending','Settled',]

export const signUpTextfields  = [
    {
        placeholder: "Name",
        name: "name",
        type: "text"

    },
    {
        placeholder: "Surname",
        name: "surname",
        type: "text"

    },
    {
        placeholder: "Email",
        name: "email",
        type: "email"

    },
    {
        placeholder: "password",
        name: "password",
        type: "password"

    },
]

export const forgotPasswordPageType = ["check-mail", "password"]