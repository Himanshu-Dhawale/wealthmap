const WealthAnalysisPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Wealth Analysis</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Analysis Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Total Property Value
          </h3>
          <p className="text-3xl font-bold">₹24.7 Cr</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Top Owners</h3>
          <p className="text-3xl font-bold">42</p>
          <p className="text-sm text-gray-500 mt-2">With ₹1Cr+ portfolio</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Growth Areas
          </h3>
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm text-gray-500 mt-2">
            Neighborhoods with 20%+ YoY growth
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Wealth Distribution
        </h3>
        <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
          [Wealth Distribution Chart]
        </div>
      </div>
    </div>
  );
};
export default WealthAnalysisPage;