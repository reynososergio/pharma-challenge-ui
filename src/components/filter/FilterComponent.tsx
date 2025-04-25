/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { filtersAtom } from "@/atoms/filter/filterAtom";
import { Trash, ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { FilterProps } from "@/types/filter";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";

import "@/styles/filter.css";

const FilterComponent = ({ filtersConfig, onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    const initialFilters: Record<string, string | boolean | Date> = {};
    filtersConfig.forEach(({ name, defaultValue }) => {
      initialFilters[name] = defaultValue || "";
    });

    setFilters((prevFilters) => ({
      ...initialFilters,
      ...prevFilters,
    }));
  }, []);

  useEffect(() => {
    onFilterChange(filters);
    setHasActiveFilters(
      Object.values(filters).some((value) => value !== "" && value !== false)
    );
  }, [filters]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleClearFilters = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    const clearedFilters: Record<string, string | boolean | Date> = {};
    filtersConfig.forEach(({ name }) => {
      clearedFilters[name] = "";
    });
    setFilters(clearedFilters);
  };

  return (
    <Container fluid className="filter-container">
      <div
        className="filter-header d-flex justify-content-between align-items-center pointer"
        data-testid="toggle-filters"
        aria-label="toggle-filters"
        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
      >
        <h5 className="mb-0">Filters</h5>
        <div>
          {hasActiveFilters && (
            <Button
              variant="danger"
              size="sm"
              className="me-2"
              onClick={handleClearFilters}
              data-testid="clear-filters"
              aria-label="clear-filters"
            >
              <Trash /> <span>Clear</span>
            </Button>
          )}
          <Button variant="link" className="toggle-filters">
            {isFiltersVisible ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </Button>
        </div>
      </div>

      <Collapse in={isFiltersVisible}>
        <div className="filter-body" data-testid="filter-body">
          <Form>
            <Row className="g-3">
              {filtersConfig.map((filter, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                  <Form.Group className="mb-2">
                    <Form.Label
                      htmlFor={`filter-${index}`}
                      className="filter-label"
                    >
                      {filter.label}
                    </Form.Label>
                    {filter.type === "select" && (
                      <Form.Control
                        as="select"
                        id={`filter-${index}`}
                        name={filter.name as string}
                        value={(filters[filter.name as string] as string) || ""}
                        onChange={handleChange}
                        data-testid={filter.label}
                        aria-label={filter.label}
                      >
                        {filter?.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    )}
                    {filter.type === "text" && (
                      <Form.Control
                        type="text"
                        id={`filter-${index}`}
                        name={filter.name as string}
                        value={(filters[filter.name as string] as string) || ""}
                        onChange={handleChange}
                        aria-label={filter.label}
                      />
                    )}

                    {filter.type === "checkbox" && (
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="checkbox"
                          id={`checkbox-${index}`}
                          name={filter.name as string}
                          checked={!!filters[filter.name as string]}
                          onChange={handleChange}
                          aria-label={filter.label}
                        />
                        <Form.Label
                          htmlFor={`checkbox-${index}`}
                          className="ms-2 form-label-without-bottom"
                          style={{ cursor: "pointer" }}
                        >
                          {filter.label}
                        </Form.Label>
                      </div>
                    )}
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Form>
        </div>
      </Collapse>
    </Container>
  );
};

export default FilterComponent;
