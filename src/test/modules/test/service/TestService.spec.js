
const expect = require('chai').expect;
const {sortUsers} = require('../../../../app/modules/test/service/TestService');

const {users} = require('../data/test');

describe('Sort Users', function() {
    it('sortUsers() should return empty object if no users are passed in', function() {
        const sortedUsers = sortUsers({});
        expect(sortedUsers.length).to.equal(0);
    });

    it('sortUsers() should return 3 users in sorted order', function() {
        const sortedUsers = sortUsers(users);
        expect(sortedUsers.length).to.equal(4);
    });
});
