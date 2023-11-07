import React, { useState, useMemo, useEffect, useCallback } from "react";
import { advancedTable } from "../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeveloper,
  fetchDevelopers,
  deleteDeveloper,
  insertDeveloper,
  editDeveloper,
} from "../../store/reducers/developerSlice";

import { Link, useNavigate } from "react-router-dom";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "@/util/GlobalFilter";

import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "@/components/ui/FormGroup";

import {
  fetchFormers,
  fetchFormer,
  deleteFormer,
  insertFormer,
  editFormer,
} from "../../store/reducers/formerSlice";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const DisplayDevelopers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formersData, setFormersData] = useState([]);
  const developers = useSelector((state) => state.developer.records);

  const formers = useSelector((state) => state.former.records);
  const [dateNaissance, setDateNaissance] = useState(null);

  const deleteRecord = useCallback(
    (id) => dispatch(deleteDeveloper(id)),
    [dispatch]
  );

  const deleteHandler = (item) => {
    deleteRecord(item.row.original.id);
    dispatch(fetchDevelopers());
  };

  const actions = [
    {
      name: "send",
      icon: "ph:paper-plane-right",
      doit: () => {
        navigate("/invoice-add");
      },
    },
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: () => {
        navigate("/invoice-preview");
      },
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (id) => {
        navigate("/invoice-edit");
      },
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (id) => {
        return null;
      },
    },
  ];
  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "image",
      accessor: "imagePublicId",
      Cell: (row) => {
        return (
          <div>
            <span className="inline-flex items-center">
              <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                <img
                  src={row?.cell?.value}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </span>
            </span>
          </div>
        );
      },
    },
    {
      Header: "UserName",
      accessor: "username",
      Cell: (row) => {
        return <span>#{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Date Naissance",
      accessor: "dateNaissance",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "telephone",
      accessor: "telephone",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Salair",
      accessor: "salair",
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
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:pencil-square" />
              </button>
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    // Use the map function to format the date field
    return developers.map((former) => {
      return {
        ...former, // Copy all properties from the original former object
        dateNaissance: formatDate(former.dateNaissance), // Format the date
      };
    });
  }, [developers]);

  useEffect(() => {
    dispatch(fetchDevelopers());
  }, [dispatch]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const FormValidationSchema = yup.object({
    nom: yup.string().required("Nom is required"),
    prenom: yup.string().required("Prenom is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    dateNaissance: yup.date().required("date naissance is required"),
    telephone: yup.string().required("Telephone is required"),
  });

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    //console.log(data.nom);
    const promotion = {
      nom: data.nom,
      prenom: data.prenom,
      username: data.email,
      password: data.password,
      dateNaissance: data.dateNaissance,
      telephone: data.telephone,
    };

    dispatch(insertDeveloper(promotion))
      .unwrap()
      .then(() => {
        dispatch(fetchDevelopers());
        reset();
        handleModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card noborder>
        <div className="md:flex pb-6 items-center">
          <h6 className="flex-1 md:mb-0 mb-3">Developers</h6>
          <div className="md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            {/* <Button
              icon="heroicons-outline:calendar"
              text="Select date"
              className=" btn-outline-secondary dark:border-slate-700  text-slate-600 btn-sm font-normal dark:text-slate-300 "
              iconClass="text-lg"
            />
            <Button
              icon="heroicons-outline:filter"
              text="Filter"
              className=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
              iconClass="text-lg"
            /> */}
            <Button
              icon="heroicons-outline:plus-sm"
              text="Add Developer"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={handleModalOpen}
            />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
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
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
      <Modal
        activeModal={isModalOpen}
        onClose={handleModalClose}
        title="Add Developer"
        // Other props you want to pass to the Modal component
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textinput
            name="nom"
            label="nom"
            placeholder="nom"
            register={register}
            error={errors.nom}
          />
          <Textinput
            name="prenom"
            label="prenom"
            placeholder="prenom"
            register={register}
            error={errors.prenom}
          />
          <Textinput
            name="email"
            label="Email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />

          <FormGroup
            label="DATE NAISSANCE"
            id="dateNaissance"
            error={errors.dateNaissance}
          >
            <Controller
              name="dateNaissance"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  className="form-control py-2"
                  id="dateNaissance"
                  placeholder="yyyy, dd M"
                  value={dateNaissance} // Use dateNaissance as the value
                  onChange={(selectedDates) => {
                    const selectedDate = selectedDates[0]; // Assuming you want to select a single date
                    field.onChange(selectedDate); // Update the form field value
                    setDateNaissance(selectedDate); // Update the dateNaissance state
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              )}
            />
          </FormGroup>

          <Textinput
            name="password"
            label="password"
            placeholder="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <Textinput
            name="telephone"
            label="telephone"
            placeholder="telephone"
            register={register}
            error={errors.telephone}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Add</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DisplayDevelopers;
