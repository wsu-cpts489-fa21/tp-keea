// For Postman GET request test
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});