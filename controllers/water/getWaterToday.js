const getWaterToday = (req, res) => {
    const { nada } = req.body;

    return res.status(200).json({
        nada,
    });
};

module.exports = {
    getWaterToday,
};
