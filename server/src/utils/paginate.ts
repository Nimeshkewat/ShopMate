import { z } from "zod";

const defaultLimit = 5;
const maxLimit = 50;

export const getPaginationParams = (query: {
  page?: number;
  limit?: number;
}) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Number(query.limit) || defaultLimit);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildPaginationMeta = (
  total: number,
  limit: number,
  page: number
) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit: limit > 0 ? limit : defaultLimit,
    total,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(maxLimit).default(defaultLimit),
});
