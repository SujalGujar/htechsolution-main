import axios from 'axios';
import React, { useEffect, useState } from 'react';

// ✅ import shadcn table components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ✅ import shadcn card components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ✅ import shadcn badge
import { Badge } from "@/components/ui/badge";

// ✅ component name starts with uppercase
const CustomerCareProductHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ no req,res in frontend - just async()
  const handleFetchData = async () => {
    try {
      setLoading(true); // show loading before fetch
      setError(null);

      const API = "/api/customerDetails/customer";
      const res = await axios.get(API);

      setData(res.data.customers);

    } catch (error) {
      console.error("error fetching data:", error);
      setError("Failed to fetch customer details"); // show error to user
    } finally {
      setLoading(false); // hide loading after fetch
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // ✅ show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading customers...</p>
      </div>
    );
  }

  // ✅ show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Card wraps the whole table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer History</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Shadcn Table */}
          <Table>
            <TableCaption>
              List of all customers — Total: {data.length}
            </TableCaption>

            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data.length === 0 ? (
                // show this if no customers found
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                // loop through each customer
                data.map((customer, index) => (
                  <TableRow key={customer._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      {/* Badge shows status with color */}
                      <Badge variant={customer.isActive ? "success" : "destructive"}>
                        {customer.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {/* Format the date nicely */}
                      {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerCareProductHistory;
