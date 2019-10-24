import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export let UserInfoRules = {
        login : { required, minLength: minLength(4) },
        first_name : { required, minLength: minLength(4) },
        last_name : { required, minLength: minLength(4) },
        middle_name : { required, minLength: minLength (4) },
}

export let UserEmailRules = {
    required,
    maxLength: maxLength(3),
    $each: {
        required,
        email
    }
}

export let UserPhoneRules = {
    required,
    maxLength: maxLength(3),
    $each: {
        required,
    }
}

export default function() {
    return {
        user: UserInfoRules,
        emails: UserEmailRules,
        phones: UserPhoneRules
    }
} 