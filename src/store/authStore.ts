import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const result = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: result.user });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ user: result.user });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  signInWithFacebook: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ loading: true, error: null });
      const userRef = doc(db, 'users', auth.currentUser!.uid);
      await setDoc(userRef, data, { merge: true });
      const updatedDoc = await getDoc(userRef);
      set({ user: { ...auth.currentUser, profile: updatedDoc.data() } });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));