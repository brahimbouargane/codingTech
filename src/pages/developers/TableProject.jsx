import React, { useState, useMemo, useEffect } from "react";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
  },
];

const COLUMNS = [
  {
    Header: "Project nom",
    accessor: "projectName",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block min-w-[140px] text-left">
          <span className="inline-block text-center mx-auto py-1">
            {row?.cell?.value === "progress" && (
              <span className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="h-[6px] w-[6px] bg-danger-500 rounded-full inline-block ring-4 ring-opacity-30 ring-danger-500"></span>
                <span>In progress</span>
              </span>
            )}
            {row?.cell?.value === "complete" && (
              <span className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="h-[6px] w-[6px] bg-success-500 rounded-full inline-block ring-4 ring-opacity-30 ring-success-500"></span>

                <span>Complete</span>
              </span>
            )}
          </span>
        </span>
      );
    },
  },
  {
    Header: "date dubet",
    accessor: "dateDebut",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "date fin",
    accessor: "dateFin",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className=" text-center" style={{zIndex:3000}}>
          <Dropdown
            classMenuItems="right-0 w-[140px] top-[110%] "
            label={
              <span className="text-xl text-center block w-full">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800" style={{zIndex:3000}}>
              {actions.map((item, i) => (
                <Menu.Item key={i}>
                  <div className="" >
                    <div
                      className={`
                
                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                    >
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </div>
                </Menu.Item>
              ))}
            </div>
          </Dropdown>
        </div>
      );
    },
  },
];

const TableProject = () => {
  const [isReady, setIsReady] = useState(false);

  const devProject = [
    {
      projectName: "Project A",
      status: "progress",
      dateDebut: "2023-01-01",
      dateFin: "2023-02-01",
      action: "edit",
    },
    {
      projectName: "Project B",
      status: "complete",
      dateDebut: "2023-02-01",
      dateFin: "2023-03-01",
      action: "view",
    },
    {
      projectName: "Project B",
      status: "complete",
      dateDebut: "2023-02-01",
      dateFin: "2023-03-01",
      action: "view",
    },
    // Add more data as needed...
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => devProject, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const renderTable = () => {
    if (!isReady) {
      return (
        <div className="flex items-center justify-center h-40">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <table
        className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
        {...getTableProps}
      >
        {/* Your table headers... */}
        <thead className="bg-slate-100 dark:bg-slate-700">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  scope="col"
                  className="table-th"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Your table body... */}
        <tbody
          className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
          {...getTableBodyProps}
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="table-td py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    // Simulate an async operation, replace this with your actual data fetching logic
    const fetchData = async () => {
      // Your data fetching logic...
      // Simulating data fetching with setTimeout
      setTimeout(() => {
        setIsReady(true);
      }, 2000);
    };

    fetchData();
  }, []); // Run only once on mount

  return (
    <>
      <div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">{renderTable()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableProject;
