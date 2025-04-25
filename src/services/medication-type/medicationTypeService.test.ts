import {
  getMedicationTypesLookup,
  getAllMedicationTypes,
  createMedicationType,
  deleteMedicationType,
} from "@/services/medication-type/medicationTypeService";

import api from "@/api/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import { BaseFilterRequest } from "@/types/base";
import { MedicationTypeRequest } from "@/types/medication-type";

jest.mock("@/api/api");

describe("medicationTypeService", () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call getMedicationTypesLookup", async () => {
    mockedApi.get.mockResolvedValue({ data: [] });

    const result = await getMedicationTypesLookup();

    expect(mockedApi.get).toHaveBeenCalledWith(
      API_ENDPOINTS.MEDICATION_TYPE.LOOKUP
    );
    expect(result).toEqual({ data: [] });
  });

  it("should call getAllMedicationTypes with filters", async () => {
    const filters: BaseFilterRequest = {
      page: 1,
      pageSize: 10,
    };

    mockedApi.get.mockResolvedValue({ data: [] });

    const result = await getAllMedicationTypes(filters);

    expect(mockedApi.get).toHaveBeenCalledWith(
      API_ENDPOINTS.MEDICATION_TYPE.ENTITY,
      { params: filters }
    );
    expect(result).toEqual({ data: [] });
  });

  it("should call createMedicationType", async () => {
    const payload: MedicationTypeRequest = {
      name: "Syrup",
    };

    mockedApi.post.mockResolvedValue({ data: { id: "1", ...payload } });

    const result = await createMedicationType(payload);

    expect(mockedApi.post).toHaveBeenCalledWith(
      API_ENDPOINTS.MEDICATION_TYPE.ENTITY,
      payload
    );
    expect(result).toEqual({ data: { id: "1", name: "Syrup" } });
  });

  it("should call deleteMedicationType", async () => {
    const id = "123";

    mockedApi.delete.mockResolvedValue({ status: 200 });

    const result = await deleteMedicationType(id);

    expect(mockedApi.delete).toHaveBeenCalledWith(
      `${API_ENDPOINTS.MEDICATION_TYPE.ENTITY}/${id}`
    );
    expect(result).toEqual({ status: 200 });
  });
});
