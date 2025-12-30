import { Metadata } from 'next';
import ReloadingTable from '@/components/tables/ReloadingTable';
import { mockReloadingData } from '@/lib/utils/mockData';

export const metadata: Metadata = {
  title: 'Reloading Data - PatronMag',
  description: 'Comprehensive reloading data for various calibers. Load data, velocities, and pressure information.',
};

export default function ReloadingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] text-white py-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-3">Reloading Data</h1>
          <p className="text-gray-300 max-w-3xl">
            Comprehensive ammunition reloading data for various calibers. 
            All data is for informational purposes only. Always consult current 
            reloading manuals and start with minimum loads.
          </p>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
        <div className="container-custom">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-yellow-800">Safety Warning</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  <strong>IMPORTANT:</strong> All reloading data should be cross-referenced 
                  with current published load manuals. Always start with minimum loads and 
                  work up carefully. Improper reloading can result in serious injury or death. 
                  Reloading is done at your own risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="container-custom pb-12">
        <ReloadingTable data={mockReloadingData} />

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-[#f2f2f2] rounded-lg">
          <h2 className="text-xl font-bold mb-4">About This Data</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              This reloading data is compiled from various sources and represents 
              loads that have been tested in specific firearms under controlled conditions.
            </p>
            <p>
              <strong>Always remember:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Different firearms may produce different pressures with the same load</li>
              <li>Start 10% below maximum listed loads</li>
              <li>Watch for pressure signs: flattened primers, difficult extraction, etc.</li>
              <li>Use the exact components listed (powder, primer, bullet, case)</li>
              <li>Keep detailed records of your loads</li>
              <li>Never exceed published maximum loads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
