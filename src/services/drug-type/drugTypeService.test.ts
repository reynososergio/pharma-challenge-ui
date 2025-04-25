import api from "@/api/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import { getDrugTypes } from "@/services/drug-type/drugTypeTypeService";

jest.mock("@/api/api", () => ({
  get: jest.fn(),
}));

describe("getDrugTypes", () => {
  it("should call api.get with the correct endpoint", async () => {
    const mockedResponse = { data: [{ id: 1, name: "Type A" }] };
    (api.get as jest.Mock).mockResolvedValue(mockedResponse);

    const result = await getDrugTypes();

    expect(api.get).toHaveBeenCalledWith(API_ENDPOINTS.DRUG_TYPES.LOOKUP);
    expect(result).toEqual(mockedResponse);
  });

  it("should throw an error if api.get fails", async () => {
    const errorMessage = "Network error";
    (api.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getDrugTypes()).rejects.toThrow(errorMessage);
  });
});
