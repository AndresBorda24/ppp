import { useAuthStore } from "../stores/Auth"

export const useUserInfo = () => {
    const { user } = useAuthStore();
    if (!user) throw new Error("User not logged in");

    return { user };
}
