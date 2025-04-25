import { Table, Pagination, Container, Spinner } from "react-bootstrap";
import { PaginatedTableProps } from "@/types/table";
import "@/styles/paginatedTable.css";

const PaginatedTable = ({
  isPending,
  columns,
  data,
  totalPages,
  currentPage,
  onPageChange,
}: PaginatedTableProps) => {
  return (
    <Container fluid className="table-container">
      <div className="table-responsive custom-table-wrapper">
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Spinner animation="border" size="sm" /> Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col, colIndex) => (
                    <td
                      className={`text-${col.align ?? "left"}`}
                      key={colIndex}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="pagination-container">
        <Pagination>
          <Pagination.Prev
            onClick={() => onPageChange(Math.max((currentPage ?? 1) - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              onPageChange(Math.min((currentPage ?? 1) + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default PaginatedTable;
