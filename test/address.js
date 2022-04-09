import chai from 'chai'
import chaiHttp from 'chai-http'
import app from './../backend/app.js'

const should = chai.should()
chai.use(chaiHttp)

const api = '/api/address/'
let token
let addressId

describe('Address Test', () => {
    // Get Token
    before('Get User', done => {
        chai.request(app)
            .post('/api/users/login')
            .send({ email: 'obid@gmail.com', password: 'microlab1M*' })
            .end((err, res) => {
                res.should.have.status(200)
                token = res.body.data.token
                done()
            })
    })

    // Fetch all Addresses
    // GET /api/address
    it('Fetch all Addresses', done => {
        chai.request(app)
            .get(api)
            .set({ Authorization: `Bearer ${token}` })
            .end((req, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                done()
            })
    })

    // Add Address
    // POST /api/address/add
    it('Add Address', done => {
        chai.request(app)
            .post(api + 'add')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                city: 'Toshkent',
                district: 'Yunusobod',
                neighborhood: 'Guliston',
                zipcode: 12345,
            })
            .end((req, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.should.have.property('address')
                addressId = res.body.address
                done()
            })
    })

    // Update Address
    // PUT /api/address/update
    it('Update Address', done => {
        chai.request(app)
            .put(api + 'update')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                city: 'Toshkent1',
                district: 'Yunusobod1',
                neighborhood: 'Guliston1',
                zipcode: 12345,
                id: addressId,
            })
            .end((req, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    // Delete Address
    // DELETE /api/address/delete/:addressId
    it('Delete Address', done => {
        chai.request(app)
            .delete(`${api}delete/${addressId}`)
            .set({ Authorization: `Bearer ${token}` })
            .end((req, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })
})
