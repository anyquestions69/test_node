module.exports  = (data, page, limit) => {
    const { count: totalItems, rows: rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems:totalItems.length, rows, totalPages, currentPage };
  };