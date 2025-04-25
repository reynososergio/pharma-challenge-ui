export const API_ENDPOINTS = {
  DRUG_TYPES: {
    ENTITY: "/drug-types",
    LOOKUP: "/drug-types/lookups",
  },
  MEDICATION: {
    ENTITY: "/medications",
    BY_TYPE: "/medications/by-type",
    BY_NAME: "/medications/by-name",
  },
  MEDICATION_TYPE: {
    ENTITY: "/medication-types",
    LOOKUP: "/medication-types/lookups",
    GET_BY_ACTIVE: "/medication-type/active",
  },
  PRODUCT_CODE: {
    IS_PRIORITY: "/product-code/is-priority",
    VERIFY: "/product-code/verify",
    SORTED: "/product-code/sorted",
    UNION: "/product-code/union",
    INTERSECTION: "/product-code/intersection",
  },
};
