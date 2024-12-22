import React, { useState } from "react";

const Table = ({
  columns,
  data,
  className,
  onClick,
  sum,
  header,
  title,
  leftIcon,
  rightIcon,
  button,
  buttontext,
  buttonClick,
  noRowsText,
  noRowsIcon,
  ...otherProps
}) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (value) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };

  const getValue = (path, obj) => {
    const keys = path.split(".");
    let value = obj;
    for (const key of keys) {
      if (value && value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        return null;
      }
    }
    return value;
  };

  const filteredData = data.filter((item) =>
    columns.some((column) => {
      const value = getValue(column.value, item);
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  const sortedData =
    filteredData && filteredData.length > 0
      ? sortBy
        ? [...filteredData].sort((a, b) => {
            const firstValue =
              a[sortBy] !== null
                ? typeof a[sortBy] === "number"
                  ? a[sortBy]
                  : a[sortBy].toLowerCase()
                : null;
            const secondValue =
              b[sortBy] !== null
                ? typeof b[sortBy] === "number"
                  ? b[sortBy]
                  : b[sortBy].toLowerCase()
                : null;

            if (firstValue === null && secondValue !== null) {
              return sortOrder === "asc" ? 1 : -1;
            } else if (firstValue !== null && secondValue === null) {
              return sortOrder === "asc" ? -1 : 1;
            } else if (firstValue === null && secondValue === null) {
              return 0;
            }

            if (
              typeof firstValue === "number" &&
              typeof secondValue === "number"
            ) {
              return sortOrder === "asc"
                ? firstValue - secondValue
                : secondValue - firstValue;
            } else {
              return sortOrder === "asc"
                ? firstValue.localeCompare(secondValue)
                : secondValue.localeCompare(firstValue);
            }
          })
        : filteredData
      : [];

  return (
    <div
      className="relative overflow-x-auto w-full pb-5"
      style={{ maxWidth: "100%" }}
    >
      <div
        className={`border border-white rounded-2xl overflow-x-auto backdrop-blur-3xl bg-white/30-md max-h-[420px]  overflow-y-auto ${className}`}
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        {sortedData.length > 0 ? (
          <table
            className={`table-fixed min-w-full text-sm text-left rtl:text-right rounded-2xl text-one`}
          >
            <colgroup>
              {columns?.map((item, index) => (
                <col key={index} style={{ width: item.width ?? "auto" }} />
              ))}
            </colgroup>
            <thead className="text-xs uppercase bg-tansparent border-b border-white rounded-16 text-center">
              <tr>
                {columns?.map((item, index) => (
                  <th
                    scope="col"
                    className={`px-6 cursor-pointer text-white border-r bg-two border-white rounded-16 h-[48px] ${
                      item.sortable ? "group" : "cursor-default"
                    }`}
                    key={index}
                    onClick={() => item.sortable && handleSort(item.value)}
                    style={{ height: "48px" }}
                  >
                    <span className={"text-[14px]"}>{item.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData?.map((item, index) => (
                <tr
                  key={index}
                  className={`odd:bg-transparent even:bg-transparent even:backdrop-blur-3xl hover:bg-white/20 ${
                    index !== sortedData.length - 1
                      ? "border-b border-white rounded-16"
                      : ""
                  }`}
                  onClick={() => (onClick ? onClick(item.id) : null)}
                >
                  {columns.map((i, key) => (
                    <td
                      key={key}
                      className={`px-6 py-4 ${
                        i.value === "action" ? "text-center" : ""
                      } ${
                        key !== columns.length - 1
                          ? "border-r border-white rounded-16"
                          : ""
                      }`}
                    >
                      <span className={"text-[14px] font-semibold"}>
                        {i.format ? i.format(item) : getValue(i.value, item)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="flex w-full !h-[600px] justify-center items-center flex-col">
              <p className="text-black-100 text-base">
                {noRowsText ?? "Veri bulunmamaktadır"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
