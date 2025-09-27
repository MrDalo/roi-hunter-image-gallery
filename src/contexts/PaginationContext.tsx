import { createContext } from "react";
import type { UsePaginationResult } from "../types";

/**
 * Pagination context for global state management
 */
const PaginationContext = createContext<UsePaginationResult | undefined>(
  undefined
);

export default PaginationContext;
