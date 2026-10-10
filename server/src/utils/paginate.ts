export const getPaginationParams = (
  query: {
    page?: number;
    limit?: number;
  },
  defaultLimit = 4,
  maxLimit = 50
) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Number(query.limit) || defaultLimit, maxLimit);
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
    limit,
    total,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
