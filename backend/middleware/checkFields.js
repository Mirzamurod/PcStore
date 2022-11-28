import expressAsyncHandler from 'express-async-handler'

const checkFields = fields1 =>
    expressAsyncHandler((req, res, next) => {
        let fields = {}
        fields1.forEach(field => (fields[field] = req.body[field]))

        // Check if empty field
        let message = {}
        // Object.entries({ username, fullname, email, password }).forEach(([key, value]) => {
        Object.entries(fields).forEach(([key, value]) => {
            if (!!!req.body[key]) message[key] = value
        })

        if (Object.keys(message).length) {
            const keys = Object.keys(message)
            keys.forEach(key => (message[key] = 'This field is required!!!'))

            // if (!!username)
            //     if (/[^A-Za-z0-9]+/g.test(username)) message.username = 'This is not Username'
            // if (!!fullname)
            //     if (!/[A-z]+\s[A-z]+/.test(fullname)) message.fullname = 'This is not Fullname'
            // if (!!email) if (!/[\w.]+@\w+\.(com|ru)/.test(email)) message.email = 'This is not Email'
            // if (!!password) {
            //     if (password.length < 8) message.password = 'Minimum 8 letters'
            //     if (password.length > 16) message.password = 'Maximum 16 letters'
            // }

            res.status(400).json({ message })
        } else next()
    })

export default checkFields
