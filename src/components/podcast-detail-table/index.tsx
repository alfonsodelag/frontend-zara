import { useTable, Column } from "react-table";
import { ReactNode } from "react";

interface TableProps<Data extends Record<string, unknown>> {
  columns: Column<Data>[];
  data: Data[];
  handleRowClick: (rowData: Data) => void;
}

export default function Table<Data extends Record<string, unknown>>({
  columns,
  data,
  handleRowClick,
}: TableProps<Data>) {
  const tableClass = "border-collapse w-full";
  const tableRowClass = "hover:bg-gray-100 cursor-pointer";
  const tableHeaderClass =
    "text-left bg-gray-200 font-bold uppercase text-sm p-2";
  const tableBodyClass = "p-2 border-gray-200 border-b";

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <section className="overflow-auto">
      <table className={tableClass} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={tableRowClass}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className={`${tableHeaderClass} ${
                    column.id === "actions" ? "w-20" : ""
                  }`}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className={tableRowClass}
                onClick={() => handleRowClick(row.original as Data)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td className={tableBodyClass} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
