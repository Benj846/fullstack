import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        launches: {
          keyArgs: false,
          merge(exsiting, incoming) {
            let launches = [];
            if (exsiting && exsiting.launches) {
              launches = launches.concat(exsiting.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  },
});

export const isLoggedInVar = makeVar(!!localStorage.getItem("token"));

export const cartItemsVar = makeVar([]);
