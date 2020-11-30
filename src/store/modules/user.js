const defaultGuestUser = {
    name: "Guest",
    avatar: "/assets/guest-avatar.svg",
    type: "guest"
};

export default {
    actions: {
        async fetchUser(context, { login, password }) {
            // Emulate autorization
            const data = await fetch("./assets/data/users.json");
            const users = await data.json();

            for (const user of users) {
                if (user.login.toLowerCase() == login.toLowerCase()) {
                    if (user.password == password) {
                        context.commit('updateUser', user.userInfo);
                    } else {
                        context.commit('updateError', "Error: password is incorrect!");
                    }

                    return;
                }
            }

            context.commit('updateError', "Error: there are no user with that login!");
        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
            state.errorMessage = null;
        },
        updateError(state, errorMessage) {
            state.errorMessage = errorMessage;
        },
    },
    state: {
        user: defaultGuestUser,
        errorMessage: null
    },
    getters: {
        currentUser: state => state.user,
        error: state => state.errorMessage,
    }
};