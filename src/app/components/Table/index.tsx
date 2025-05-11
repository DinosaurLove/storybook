"use client";

import clsx from "clsx";
import Image from "next/image";
import { isEmpty, isNil } from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";

interface IHeaderData {
  label: string;
  value: string;
}

export interface IBodyData {
  [key: string]: string | number | undefined | boolean;
  isChecked?: boolean;
  id: string | number;
}

export interface ITableProps {
  zebra?: boolean;
  body: IBodyData[];
  isActiveAll?: boolean;
  header: IHeaderData[];
  showCheckbox?: boolean;
  headerTitleColor?: string;
  headerBackgroundColor?: string;
  onActiveAll?: (value: boolean) => void;
  onActiveRows?: (data: IBodyData[]) => void;
}

const Table = ({
  body,
  zebra,
  header,
  showCheckbox,
  headerTitleColor,
  isActiveAll = false,
  headerBackgroundColor,
  onActiveRows = () => {},
  onActiveAll = () => {},
}: ITableProps) => {
  const [tableBody, setTableBody] = useState<IBodyData[]>();

  const titleHeadStyle = headerTitleColor ? { color: headerTitleColor } : {};
  const headStyle = headerBackgroundColor ? { backgroundColor: headerBackgroundColor } : {};

  const handleActiveAll = () => {
    if(isEmpty(tableBody) || isNil(tableBody)) return;
    const newIsActiveAll = isActiveAll ? false : true;
    const newBody = tableBody.map((data) => ({ ...data, isChecked: newIsActiveAll }));
    setTableBody(newBody);
  };

  const handleActiveRow = (row: IBodyData) => {
    if(isEmpty(tableBody) || isNil(tableBody)) return;
    const newBody = tableBody.map((data) => ({ 
      ...data, 
      isChecked: data.id === row.id 
        ? data.isChecked ? false : true
        : data.isChecked 
    }));

    setTableBody(newBody);
  };

  const bodyData = useMemo(() => {
    if(isEmpty(tableBody) || isNil(tableBody)) { return <Image alt="no-data" width={100} height={100} src="/no-data.png" /> };
    return tableBody.map((row, rowIndex) => (
      <tr
        key={row.id ?? rowIndex}
        className={clsx(
          "hover:bg-gray-50",
          zebra ? "odd:bg-gray-100" : ""
        )}
      >
        {showCheckbox && (
          <td className="border-b border-gray-200 px-4 py-2">
            <input
              checked={row.isChecked}
              onChange={() => handleActiveRow(row)}
              className="w-5 h-5"
              type="checkbox"
            />
          </td>
        )}

        {header.map((head) => (
          <td
            key={head.value ?? rowIndex}
            className="border-b border-gray-200 px-4 py-2"
          >
            {row[head.value] ?? "---"}
          </td>
        ))}
      </tr>
    ))
  }, [tableBody])

  useEffect(() => {
    setTableBody(body);
  }, [body]);

  useEffect(() => {
    if(isEmpty(tableBody) || isNil(tableBody)) {
      onActiveAll(false);
      onActiveRows([]);
    } else {
      const dataActive = tableBody.filter((data) => data.isChecked);
      onActiveAll(dataActive.length === tableBody.length);
      onActiveRows(dataActive);
    }
  }, [tableBody])

  if (isEmpty(header)) { return <Image alt="no-data" width={100} height={100} src="/no-data.png" /> }

  return (
    <div className="overflow-auto px-3">
      <table className="w-full border border-gray-300 text-left text-sm text-gray-700">
        <thead className="bg-teal-600" style={headStyle}>
          <tr>
            {showCheckbox && (
              <th
                style={titleHeadStyle}
                className="border-b border-gray-300 px-4 py-2 font-semibold text-white"
              >
                <input
                  checked={isActiveAll}
                  onChange={handleActiveAll}
                  className="w-5 h-5"
                  type="checkbox"
                />
              </th>
            )}

            {header.map((head) => (
              <th
                key={head.value}
                style={titleHeadStyle}
                className="border-b border-gray-300 px-4 py-2 font-semibold text-white"
              >
                {head.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bodyData}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Table);
