import { AttireJSON } from "../components/Attire";
export const attireTest: AttireJSON = {
  enabled: true,
  rules: [
    {
      when: { blue: "*", black: 0, red: 0, green: 0 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217961/ef2e0d4c-8dea-11e6-960d-69585778f89d.png",
    },
    {
      when: { blue: 3, black: 0, red: 1, green: 0 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217961/ef2e0d4c-8dea-11e6-960d-69585778f89d.png",
    },
    {
      when: { blue: 0, black: 0, red: 0, green: 0 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217956/ef1d928c-8dea-11e6-8b53-8d2495cdd3e9.png",
      text: "Hola jeje",
    },
    {
      when: { blue: 0, black: 0, red: 0, green: 1 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217959/ef27e822-8dea-11e6-9bb0-57892593c9d8.png",
      text: "Verde",
    },
    {
      when: { blue: 1, black: 0, red: 0, green: 0 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217958/ef245892-8dea-11e6-80f4-aeb5d1862b1c.png",
    },
    {
      when: { blue: 0, black: 1, red: 0, green: 0 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217957/ef20120a-8dea-11e6-825c-23e7773269b0.png",
    },
    {
      when: { blue: 0, black: 0, red: 1, green: 0 },
      image:
        "https://user-images.githubusercontent.com/1631752/33194059-c9794fb0-d0d5-11e7-81dc-65a0f7472a94.png",
    },
    {
      when: { blue: 0, black: 0, red: 1, green: 0 },
      image:
        "https://cloud.githubusercontent.com/assets/1631752/19217960/ef2ad3c0-8dea-11e6-8434-ff9152b76f3b.png",
    },
  ],
  borders: {
    bottom:
      "https://user-images.githubusercontent.com/1631752/37176618-94629ef6-2325-11e8-9e11-6cf6846bbbc3.png",
    bottomLeft:
      "https://user-images.githubusercontent.com/1631752/37176647-9cb96b98-2325-11e8-9244-17e65f8236bc.png",
    bottomRight:
      "https://user-images.githubusercontent.com/1631752/37176659-a85c71b6-2325-11e8-8698-952cfbdf73f5.png",
    left: "https://user-images.githubusercontent.com/1631752/37176682-c09ae398-2325-11e8-90d6-d1793b8c20fd.png",
    right:
      "https://user-images.githubusercontent.com/1631752/37176696-c8628ea0-2325-11e8-9fb0-39805f2b810d.png",
    top: "https://user-images.githubusercontent.com/1631752/37176705-d5459ee6-2325-11e8-8100-23a4b89a064c.png",
    topLeft:
      "https://user-images.githubusercontent.com/1631752/37176714-dec70f54-2325-11e8-9589-4b3feaa21a2f.png",
    topRight:
      "https://user-images.githubusercontent.com/1631752/37176725-e747cbe6-2325-11e8-8c3b-873501ce0a18.png",
  },
};
