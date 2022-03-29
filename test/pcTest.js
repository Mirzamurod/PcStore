import chaiHttp from 'chai-http'
import chai from 'chai'
import app from './../backend/app.js'

const should = chai.should()
chai.use(chaiHttp)

let token
const api = '/api/pcs/'

describe('Pcs Test', () => {
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

    // Get All Pcs
    it('Get All Pcs', done => {
        chai.request(app)
            .get(api)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.should.have.property('message')
                done()
            })
    })

    // Get Pc
    it('Get Pc', done => {
        chai.request(app)
            .get(api + '623abf9d607ee5bdf1353983')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.should.have.property('ratingNum')
                res.body.should.have.property('reviewNum')
                res.body.should.have.property('message')
                console.log(res.body.data)
                done()
            })
    })

    // Add Review
    it('Add Review', done => {
        chai.request(app)
            .post(api + 'addreview/623abf9d607ee5bdf1353983')
            .send({ rating: 5, comment: 'nima gap test' })
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    // Get Reviews
    it('Get Reviews', done => {
        chai.request(app)
            .get(api + 'reviews/623abf9d607ee5bdf1353983')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                done()
            })
    })
})
