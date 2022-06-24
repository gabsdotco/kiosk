// @ts-nocheck
import { FC, useEffect } from 'react';

import { Column, Row, usePagination, useTable } from 'react-table';

import { Flex } from '../Flex';
import { Text } from '../Text';
import { TableEmptyState } from './TableEmptyState';

import { TablePagination } from './TablePagination';

export interface TableProps {
  data: any[];
  columns: Column<any>[];
  pagination?: boolean;
}

export const Table: FC<TableProps> = ({ columns, pagination = true, data }) => {
  const {
    page,
    rows,
    gotoPage,
    pageCount,
    prepareRow,
    headerGroups,
    getTableProps,
    getTableBodyProps,
    state: { pageIndex },
  } = useTable(
    {
      data,
      columns,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    usePagination
  );

  return data.length > 0 ? (
    <Flex direction="column" className="w-full overflow-auto gap-md">
      <Flex className="w-full overflow-auto">
        <table className="w-full overflow-auto" {...getTableProps()}>
          <thead className="border-b border-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="text-left p-md py-sm first:rounded-l-sm last:rounded-r-sm"
                    {...column.getHeaderProps()}
                  >
                    <Text weight="semibold" className="text-gray-300 truncate">
                      {column.render('Header')}
                    </Text>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {(pagination ? (page as Row[]) : rows).map((row) => {
              prepareRow(row);

              return (
                <tr className="hover:bg-gray-50" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="truncate p-md" {...cell.getCellProps()}>
                      <Text weight="normal" className="text-gray-300 truncate">
                        {cell.render('Cell')}
                      </Text>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Flex>
      {!!pagination && (
        <TablePagination
          pageCount={pageCount}
          pageIndex={pageIndex}
          onGoToPage={(page) => gotoPage(page)}
        />
      )}
    </Flex>
  ) : (
    <TableEmptyState />
  );
};
