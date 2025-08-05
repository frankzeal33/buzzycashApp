import { create } from 'zustand';

interface UserProfile {
  phoneNumber: string;
  countryOfResidence:  string;
  email:  string;
  fullName:  string;
  profilePicture:  string;
  userName: string;
  kycVerified: boolean;
  gender:  string;
}

interface ProfileStore {
  userProfile: UserProfile;
  email: string;
  setProfile: (profile: UserProfile) => void;
  setEmail: (email: string) => void;
  clearProfile: () => void;
}

const defaultUserProfile: UserProfile = {
  phoneNumber: "",
  countryOfResidence: "",
  email: "",
  fullName: "",
  userName: "",
  profilePicture: "",
  kycVerified: false,
  gender: ""
};

export const useProfileStore = create<ProfileStore>((set) => ({
  userProfile: defaultUserProfile,
  email: "",

  setProfile: (profile) =>
    set(() => ({
      userProfile: profile,
    })),

  setEmail: (email) =>
    set(() => ({
      email,
    })),

  clearProfile: () =>
    set(() => ({
      userProfile: defaultUserProfile,
    })),
}));
