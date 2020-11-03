const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

let mockUser = {
  username: 'user',
  password: '1234',
};
async function read(results) {
  return await mockRequest.get('/secret/read').set('Authorization', 'bearer ' + results.body.token);
}
async function create(results) {
  return await mockRequest.post('/secret/add').set('Authorization', 'bearer ' + results.body.token);
}

async function update(results) {
  return await mockRequest
    .put('/secret/change')
    .set('Authorization', 'bearer ' + results.body.token);
}

async function remove(results) {
  let hi;
  return await mockRequest
    .delete('/secret/remove')
    .set('Authorization', 'bearer ' + results.body.token);
}

describe('capabilities', () => {
  it('user can  read', async () => {
    let results = await mockRequest.post('/signup').send(mockUser);
    results = await mockRequest.post(`/signin`).auth(mockUser.username, '1234');
    const { status: statusRead } = await read(results);
    expect(statusRead).toEqual(200);
  });

  it('Writers can  read , create', async () => {
    mockUser = {
      username: 'writer',
      password: '1234',
      capabilities: { writers: ['read', 'create'] },
    };
    let results = await mockRequest.post('/signup').send(mockUser);
    results = await mockRequest.post(`/signin`).auth(mockUser.username, '1234');
    const { status: statusRead } = await read(results);
    const { status: statusCreate } = await create(results);
    expect(statusRead).toEqual(200);
    expect(statusCreate).toEqual(201);
  });
  it('Editors can  read , create', async () => {
    mockUser = {
      username: 'editor',
      password: '1234',
      capabilities: { editor: ['read', 'create', 'update'] },
    };
    let results = await mockRequest.post('/signup').send(mockUser);
    results = await mockRequest.post(`/signin`).auth(mockUser.username, '1234');
    const { status: statusRead } = await read(results);
    const { status: statusCreate } = await create(results);
    const { status: statusUpdate } = await update(results);
    expect(statusRead).toEqual(200);
    expect(statusCreate).toEqual(201);
    expect(statusUpdate).toEqual(200);
  });
  it('admin can  read , create', async () => {
    mockUser = {
      username: 'admin',
      password: '1234',
      capabilities: { admin: ['read', 'create', 'update', 'delete'] },
    };
    let results = await mockRequest.post('/signup').send(mockUser);
    results = await mockRequest.post(`/signin`).auth(mockUser.username, '1234');
    const { status: statusRead } = await read(results);
    const { status: statusCreate } = await create(results);
    const { status: statusUpdate } = await update(results);
    const { status: statusDelete } = await remove(results);
    expect(statusRead).toEqual(200);
    expect(statusCreate).toEqual(201);
    expect(statusUpdate).toEqual(200);
    expect(statusDelete).toEqual(200);
  });
});
