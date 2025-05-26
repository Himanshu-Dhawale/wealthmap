import { Property } from "@/types/types";
import { ScrollText, History } from "lucide-react";
import React from "react";

export const HistoryAndTransactions = ({
  selectedProperty,
}: {
  selectedProperty: Property;
}) => {
  return (
    <div className="space-y-6">
      {selectedProperty.ownershipHistory?.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 mb-3 font-semibold">
            <ScrollText className="w-4 h-4" /> Ownership History
          </h3>
          <div className="space-y-4">
            {selectedProperty.ownershipHistory.map((record, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium">{record.owner}</p>
                  {record.purchasePrice && (
                    <p className="text-sm text-gray-600">
                      ₹{record.purchasePrice.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <span>{record.startDate}</span>
                  <span>{record.endDate ?? "Present"}</span>
                </div>
                {record.source && (
                  <p className="mt-1 text-xs text-gray-500">
                    Source: {record.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction Records Section */}
      {selectedProperty.transactions?.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 mb-3 font-semibold">
            <History className="w-4 h-4" /> Transaction Records
          </h3>
          <div className="space-y-3">
            {selectedProperty.transactions.map((transaction, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium capitalize">{transaction.type}</p>
                  <p className="text-sm text-gray-600">
                    ₹{transaction.amount.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-600">{transaction.date}</p>
                {transaction.parties?.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Parties: {transaction.parties.join(", ")}
                  </p>
                )}
                {transaction.documentNumber && (
                  <p className="mt-1 text-xs text-gray-500">
                    Doc #: {transaction.documentNumber}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};