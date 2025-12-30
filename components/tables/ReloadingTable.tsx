'use client';

import { useState, useMemo } from 'react';
import { ReloadingData } from '@/lib/types';

interface ReloadingTableProps {
  data: ReloadingData[];
}

type SortField = keyof ReloadingData;
type SortDirection = 'asc' | 'desc';

export default function ReloadingTable({ data }: ReloadingTableProps) {
  const [sortField, setSortField] = useState<SortField>('caliber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const exportToCSV = () => {
    const headers = ['Caliber', 'Bullet Weight', 'Powder', 'Powder Weight', 'Velocity', 'Pressure', 'Notes'];
    const rows = data.map(row => [
      row.caliber,
      row.bulletWeight,
      row.powder,
      row.powderWeight,
      row.velocity,
      row.pressure,
      row.notes || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reloading-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-[#bb1919]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#bb1919]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Controls */}
      <div className="p-4 bg-[#f2f2f2] border-b border-[#e4e4e4] flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Reloading Data Table</h3>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-[#bb1919] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a01616] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1a1a1a] text-white sticky top-0">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={() => handleSort('caliber')}
              >
                <div className="flex items-center gap-2">
                  Caliber
                  <SortIcon field="caliber" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={() => handleSort('bulletWeight')}
              >
                <div className="flex items-center gap-2">
                  Bullet Weight
                  <SortIcon field="bulletWeight" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={() => handleSort('powder')}
              >
                <div className="flex items-center gap-2">
                  Powder
                  <SortIcon field="powder" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={() => handleSort('powderWeight')}
              >
                <div className="flex items-center gap-2">
                  Powder Weight
                  <SortIcon field="powderWeight" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={() => handleSort('velocity')}
              >
                <div className="flex items-center gap-2">
                  Velocity
                  <SortIcon field="velocity" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                onClick={() => handleSort('pressure')}
              >
                <div className="flex items-center gap-2">
                  Pressure
                  <SortIcon field="pressure" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e4e4]">
            {sortedData.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {row.caliber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.bulletWeight}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.powder}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.powderWeight}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.velocity}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.pressure}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {row.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
