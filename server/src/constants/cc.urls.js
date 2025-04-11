const baseURL = "https://cleancloudapp.com/api"

urls = {
    customer: {
        addCustomer: "/addCustomer",
        getCustomer: "/getCustomer",
        updateCustomer: "/updateCustomer",
        deleteCustomer: "/deleteCustomer",
    },
    order: {
        getOrders: "/getOrders",
    },
}

module.exports = {
    baseURL,
    urls,
}