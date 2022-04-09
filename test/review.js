import chai from 'chai'
import chaiHttp from 'chai-http'
import app from './../backend/app.js'

const should = chai.should()
chai.use(chaiHttp)

let token
const api = '/api/reviews/'

describe('Reviews Test', () => {
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

    // Get Reviews
    // GET /api/reviews/:pcId
    it('Get Reviews', done => {
        chai.request(app)
            .get(api + '623abf9d607ee5bdf1353983')
            .end((req, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.should.have.property('message')
                done()
            })
    })

    // Add Review
    // POST /api/reviews/add
    it('Add Review', done => {
        chai.request(app)
            .post(api + 'add')
            .set({ Authorization: `Bearer ${token}` })
            .send({ rating: 5, comment: 'Comment test', pcId: '623abf9d607ee5bdf1353983' })
            .end((req, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    // Update Review
    // PUT /api/reviews/update
    it('Update Review', done => {
        chai.request(app)
            .put(api + 'update')
            .set({ Authorization: `Bearer ${token}` })
            .send({ rating: 5, comment: 'Best test', _id: '624d587429bd2866892e0fed' })
            .end((req, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    // Delete Review
    // DELETE /api/reviews/delete/:reviewId
    it('Delete Review', done => {
        chai.request(app)
            .delete(api + 'delete/' + '624d587429bd2866892e0fed')
            .set({ Authorization: `Bearer ${token}` })
            .end((req, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })
})
