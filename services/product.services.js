exports.bulkUpdateProductService = async (data) => {
    const result = await Product.updateMany({ _id: data.ids }, data, {
        runValidators: true,
    });
    return result;
};
exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};
exports.getProductByService = async (filters, queries) => {
    const result = await Product.find({})
        .select(queries.fieldsBy)
        .sort(queries.sortBy);
    return result;
};
