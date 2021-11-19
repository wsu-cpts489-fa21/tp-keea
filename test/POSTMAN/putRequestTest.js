// For PUT round request
pm.test("Status code is 201", function() {
    pm.response.to.have.status(200);
});