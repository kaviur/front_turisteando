"use server";

export const getUser = {
  // Example action
  increment: ({ count }: { count: number }) => {
    return { count: count + 1 };
  },
};