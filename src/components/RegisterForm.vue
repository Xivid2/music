<template>
    <div
    v-if="registrationShowAlert"
    :class="registrationAlertVariant"
    class="text-white text-center font-bold p-5 mb-4"
    >
    {{ registrationAlertMessage }}
    </div>

    <vee-form
        :validation-schema="validationSchema"
        @submit="register"
        :initial-values="userData"
    >
        <div class="mb-3">
            <label class="inline-block mb-2">
                Name
            </label>

            <vee-field
                type="text"
                name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
            />
            <ErrorMessage class="text-red-600" name="name" />
        </div>

        <div class="mb-3">
            <label class="inline-block mb-2">
                Email
            </label>

            <vee-field
                type="email"
                name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
            />
            <ErrorMessage class="text-red-600" name="email" />
        </div>

        <div class="mb-3">
            <label class="inline-block mb-2">
                Age
            </label>

            <vee-field
                type="number"
                name="age"
                class="
                    block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded
                "
            />
            <ErrorMessage class="text-red-600" name="age" />
        </div>

        <div class="mb-3">
            <label class="inline-block mb-2">
                Password
            </label>

            <vee-field
                name="password"
                :bails="false"
                v-slot="{ field, errors }"
                >
                <input
                    placeholder="Password"
                    type="password"
                    class="
                        block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                        duration-500 focus:outline-none focus:border-black rounded
                    "
                    v-bind="field"
                />
                <div
                    v-for="error in errors" :key="error"
                    class="text-red-600"
                >
                    {{ error }}
                </div>
            </vee-field>
        </div>

        <div class="mb-3">
            <label class="inline-block mb-2">
                Confirm Password
            </label>

            <vee-field
                type="password"
                name="confirmPassword"
                class="
                    block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded
                "
                placeholder="Confirm Password"
            />
            <ErrorMessage class="text-red-600" name="confirmPassword" />
        </div>

        <div class="mb-3">
            <label class="inline-block mb-2">
                Country
            </label>

            <vee-field
                as="select"
                name="country"
                class="
                    block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded
                "
            >
                <option value="Bulgaria">Bulgaria</option>
                <option value="Serbia">Serbia</option>
                <option value="Greece">Greece</option>
            </vee-field>
            <ErrorMessage class="text-red-600" name="country" />
        </div>

        <div class="mb-3 pl-6">
            <vee-field
                type="checkbox"
                name="tos"
                value="1"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded"
            />
            <label class="inline-block">
                Accept terms of service
            </label>
            <ErrorMessage class="text-red-600 block" name="tos" />
        </div>

        <button
            type="submit"
            :disabled="registrationInSubmission"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
            hover:bg-purple-700"
        >
            Submit
        </button>
    </vee-form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: "RegisterForm",
    data() {
        return {
            validationSchema: {
                name: 'required|min:3|max:100|alpha_spaces',
                email: 'required|min:3|max:100|email',
                age: 'required|min_value:18|max_value:100',
                password: 'required|min:8|max:100',
                confirmPassword: 'passwords_mismatch:@password',
                country: 'required',
                tos: 'tos',
            },
            userData: {
                country: 'Bulgaria',
            },
            registrationInSubmission: false,
            registrationShowAlert: false,
            registrationAlertVariant: 'bg-blue-500',
            registrationAlertMessage: 'Please wait! Your account is being created.',
        };
    },
    methods: {
        async register(values) {
            this.registrationShowAlert = true;
            this.registrationInSubmission = true;
            this.registrationAlertVariant = 'bg-blue-500';
            this.registrationAlertMessage = 'Please wait! Your account is being created.';

            let credentials = null;

            try {
                const auth = getAuth();

                credentials = await createUserWithEmailAndPassword(auth, values.email, values.password);
                console.log('credentials:', credentials)
            } catch (error) {
                console.log('error:', error)

                this.registrationInSubmission = false;
                this.registrationAlertVariant = 'bg-red-500';
                this.registrationAlertMessage = 'An unexpected error occured. Please try again later.';

                return;
            }

            this.registrationAlertVariant = 'bg-green-500';
            this.registrationAlertMessage = 'Success! Your account has been created.';

            console.log('values', values);
        },
    },
}
</script>

<style>

</style>