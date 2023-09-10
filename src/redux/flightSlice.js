import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  neredenAirports: [],
  nereden: "",
  secilenNereden: "",
  nereyeAirports: [],
  nereye: "",
  secilenNereye: "",

  gidisTarihi: "",
  donusTarihi: "",
  errorDate: "",
  status: "",

  category: "",
  donusCategory: "",

  flights: {
    gidenUcaklar: [],
    donenUcaklar: [],
  },

  gidisYonuError: "",
  donusYonuError: "",
};

export const getAirports = createAsyncThunk("airports", async (airportName) => {
  const response = await fetch(`/airports?airportName=${airportName}`);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();
  return data;
});

export const getNereyeAirports = createAsyncThunk(
  "nereyeAirports",
  async (airportName) => {
    const response = await fetch(`/airports?airportName=${airportName}`);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data;
  }
);

export const getFlights = createAsyncThunk("flights", async (param) => {
  const response = await fetch(`/flights?${param}`);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();
  return data;
});

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setNereden: (state, action) => {
      state.nereden = action.payload;
    },
    setSecilenNereden: (state, action) => {
      state.secilenNereden = action.payload;
    },
    setNereye: (state, action) => {
      state.nereye = action.payload;
    },
    setSecilenNereye: (state, action) => {
      state.secilenNereye = action.payload;
    },
    swapLocation: (state) => {
      const temp = state.secilenNereye;
      state.secilenNereye = state.secilenNereden;
      state.secilenNereden = temp;
    },
    setGidisTarihi: (state, action) => {
      state.gidisTarihi = action.payload;
    },
    setDonusTarihi: (state, action) => {
      if (
        state.gidisTarihi.startDate.split("-")[2] >
          action.payload.startDate.split("-")[2] &&
        action.payload.startDate
      ) {
        state.donusTarihi = state.gidisTarihi;
        state.errorDate = "Dönüş tarihi gidiş tarihinden önce olamaz";
        return;
      }
      state.donusTarihi = action.payload;
      state.errorDate = "";
    },
    swapDate: (state) => {
      const temp = state.gidisTarihi;
      state.gidisTarihi = state.donusTarihi;
      state.donusTarihi = temp;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    sortByCategory: (state) => {
      if (state.category === "price") {
        state.flights.gidenUcaklar.sort((a, b) => {
          return a.fiyat - b.fiyat;
        });
      } else if (state.category === "time") {
        state.flights.gidenUcaklar.sort((a, b) => {
          let aTime =
            a.ucus_suresi.split("h")[0] * 60 +
            a.ucus_suresi.split("h")[1].split("m")[0] * 1;
          let bTime =
            b.ucus_suresi.split("h")[0] * 60 +
            b.ucus_suresi.split("h")[1].split("m")[0] * 1;
          return aTime - bTime;
        });
      } else if (state.category === "airline") {
        state.flights.gidenUcaklar.sort((a, b) => {
          return a.havayolu.localeCompare(b.havayolu);
        });
      }
    },

    setDonusCategory: (state, action) => {
      state.donusCategory = action.payload;
    },
    sortByDonusCategory: (state) => {
      if (state.donusCategory === "price") {
        state.flights.donenUcaklar.sort((a, b) => {
          return a.fiyat - b.fiyat;
        });
      } else if (state.donusCategory === "time") {
        state.flights.donenUcaklar.sort((a, b) => {
          let aTime =
            a.ucus_suresi.split("h")[0] * 60 +
            a.ucus_suresi.split("h")[1].split("m")[0] * 1;
          let bTime =
            b.ucus_suresi.split("h")[0] * 60 +
            b.ucus_suresi.split("h")[1].split("m")[0] * 1;
          return aTime - bTime;
        });
      } else if (state.donusCategory === "airline") {
        state.flights.donenUcaklar.sort((a, b) => {
          return a.havayolu.localeCompare(b.havayolu);
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAirports.fulfilled, (state, action) => {
        // state.status = "success";
        state.neredenAirports = action.payload;
      })
      .addCase(getNereyeAirports.fulfilled, (state, action) => {
        // state.status = "success";
        state.nereyeAirports = action.payload;
      })
      .addCase(getFlights.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getFlights.fulfilled, (state, action) => {
        const { gidenUcaklar, donenUcaklar } = action.payload;
        state.status = "success";

        state.flights.gidenUcaklar = gidenUcaklar;
        state.flights.donenUcaklar = donenUcaklar;
      });
  },
});

export const {
  setNereden,
  setSecilenNereden,
  setNereye,
  setSecilenNereye,
  swapLocation,
  setGidisTarihi,
  setDonusTarihi,
  swapDate,
  checkTime,
  setCategory,
  sortByCategory,
  setDonusCategory,
  sortByDonusCategory,
} = flightSlice.actions;

export default flightSlice.reducer;
