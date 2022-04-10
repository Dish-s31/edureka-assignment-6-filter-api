const Restaurants = require('../Models/Restaurants');


exports.restaurantsFilter = (req, res) => {

    let { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;

    // default sort if value comes then sort else ascend
    sort = sort ? sort : 1;
    // if no page select in ui by user so ist page will be default page
    page = page ? page : 1;
    const itemsPerPage = 2;

    let startIndex, endIndex;

    let filterObj = {};

    mealtype && (filterObj['mealtype_id'] = mealtype);
    location && (filterObj['location_id'] = location);
    cuisine && (filterObj['cuisine_id'] = { $in: cuisine });
    lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost });



    Restaurants.find(filterObj).sort({ min_price: sort })
        .then(response => {

            startIndex = page * itemsPerPage - itemsPerPage;
            endIndex = page * itemsPerPage;

            let paginatedResponse = response.slice(startIndex, endIndex);

            res.status(200).json({
                message: "Filters applied succesfully",
                restaurant: paginatedResponse,
                totalItems: response.length,
                pageCount: Math.ceil(response.length / itemsPerPage),
                activePage: page

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};