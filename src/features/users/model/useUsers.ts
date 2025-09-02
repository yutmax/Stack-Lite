import { useEffect, useState } from "react";
import type { Meta } from "../../../entities/meta/types";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users?page=${currentPage}&limit=15`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data.data);
        setMeta(data.data.meta);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [currentPage]);

  return { users, loading, currentPage, meta, handleChangePage };
}
