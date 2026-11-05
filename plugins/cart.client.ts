// Creating the cart state early registers the post-hydration load of the saved bag.
export default defineNuxtPlugin(() => { useCart() })
