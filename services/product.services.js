exports.bulkUpdateProductService = async (data) => {
    const result = await Product.updateMany({ _id: data.ids }, data, {
        runValidators: true,
    });
    return result;
};
