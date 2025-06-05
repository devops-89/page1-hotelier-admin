import { securedHotlierApi } from "./config";

export const HotlierController = {
  addHotel: async (data) => {
    try {
      const result = await securedHotlierApi.post("/hotelier/add-hotel", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getHotels: async () => {
    try {
      const result = await securedHotlierApi.get("/hotelier/fetch-all-hotel");
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateHotel: async (id, data) => {
    try {
      const result = await securedHotlierApi.post(
        `/hotelier/hotel-update?hotel_id=${id}`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
