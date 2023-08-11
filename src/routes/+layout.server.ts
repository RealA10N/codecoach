export const load = async ({ locals }) => {
  return { loggedInUser: locals.loggedInUser };
};
