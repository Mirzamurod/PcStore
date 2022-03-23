import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../backend/app.js'
const should = chai.should()

chai.use(chaiHttp)
let token
const api = '/api/users/'

describe('User Test\n', () => {
    before(done => {
        chai.request(app)
            .post(`${api}login`)
            .send({ username: 'obid', password: 'microlab1M*' })
            .end((err, res) => {
                if (err) console.log(`${api}login dan ma'lumot kemayapti`)
                else token = res.body.data.token
                done()
            })
    })

    describe('', () => {
        it('Show Users', done => {
            chai.request(app)
                .get(api)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    if (err) console.log(`${api} dan ma'lumot kemayapti`)
                    else res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })
})
