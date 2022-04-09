import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../backend/app.js'
const should = chai.should()

chai.use(chaiHttp)
let token
const api = '/api/users/'
const account = `obid${Math.random()}@gmail.com`

describe('User Test\n', () => {
    // Add User
    // POST /api/users/add
    before(done => {
        chai.request(app)
            .post(`${api}add`)
            .send({
                username: 'obid1',
                fullname: 'Obid Xolov',
                email: account,
                password: 'microlab1M*',
            })
            .end((err, res) => {
                if (err) console.log(`${api}login dan ma'lumot kemayapti`)
                else res.should.have.status(201)

                done()
            })
    })

    // Login User
    // POST /api/users/login
    it(`User Login ${api}login`, done => {
        chai.request(app)
            .post(api + 'login')
            .send({ email: account, password: 'microlab1M*' })
            .end((err, res) => {
                res.should.have.status(200)
                token = res.body.data.token
                done()
            })
    })

    // Update User
    // PUT /api/users/update
    it(`Update User ${api}update`, done => {
        chai.request(app)
            .put(api + 'update')
            .send({
                username: `obid${Math.floor(Math.random() * 10)}`,
                fullname: 'Obid1 Xolov1',
                email: `obid${Math.random()}@gmail.com`,
                currentPassword: 'microlab1M*',
                newPassword: 'micro1M*',
            })
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    // Show Users
    // GET /api/users
    // describe('', () => {
    it('Show Users', done => {
        chai.request(app)
            .get(api)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (res.body.message === 'Not authorized as an admin')
                    console.log('Siz Adminmassiz')
                else {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    console.log(res.body)
                }
                done()
            })
    })
    // })

    // Delete User
    // DELETE /api/users/delete
    it(`Delete User ${api}delete`, done => {
        chai.request(app)
            .delete(api + 'delete')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })
})
