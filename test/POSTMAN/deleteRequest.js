// Postman Test for round delete
// assuming url is 'http://localhost:8081/rounds/test@mail.co/roundId:'
pm.test("Status code is 204", function() {
    pm.response.to.have.status(204);
})