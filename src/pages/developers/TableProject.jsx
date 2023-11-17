import React, { useState, useMemo, useEffect } from "react";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import Tooltip from "@/components/ui/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";

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

const TableProject = ({ devProject, onDeletion }) => {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the specified URL
      const response = await axios.delete(
        `http://localhost:7777/projects/${id}`
      );
      if (response.status !== 204) {
        throw new Error("Échec de la suppression de l'éducation");
      } else {
        // Appelez la fonction de rafraîchissement du composant parent
        onDeletion();
      }
      console.log(`Education with ID ${id} deleted successfully.`);
    } catch (error) {
      // Handle errors
      console.error("Error deleting education:", error);
    }
  };

  const deleteHandler = (item) => {
    handleDelete(item.row.original.id);
  };

  const COLUMNS = [
    {
      Header: "id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
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
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <Link to={`/about-developer/${row.row.original.id}`}>
                <button className="action-btn" type="button">
                  <Icon icon="heroicons:eye" />
                </button>
              </Link>
            </Tooltip>

            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => deleteHandler(row)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if devProject exists, otherwise use static data
        const newData = devProject
          ? devProject
          : [
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
        setData(newData);
        setIsReady(true);
      } catch (error) {
        console.error("Error setting data:", error);
        setIsReady(true);
      }
    };

    fetchData();
  }, [devProject]);

  /*const devProject = [
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
  ];*/

  const columns = useMemo(() => COLUMNS, []);

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

  // Run only once on mount

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
