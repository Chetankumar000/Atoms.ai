// useClubRoom.js (Zustand)
import { create } from "zustand";

const useClubRoom = create((set) => ({
  club: JSON.parse(localStorage.getItem("club")) || {},
  sport: {},
  setClub: (club) => {
    set({ club });
    localStorage.setItem("club", JSON.stringify(club));
  },
  setSport: (sport) => {
    set({ sport });
  },
}));

export default useClubRoom;
