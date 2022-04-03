import expressAsyncHandler from 'express-async-handler'
import Address from '../models/addressModel.js'
import User from '../models/userModel.js'

const address = {
    // @desc    Fetch all Addresses
    // @route   GET /api/address
    // @access  Private
    getAddress: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)

        if (!user) res.status(400).json({ message: 'User not Found!!!' })
        else {
            const addresses = await Address.find({ user: user.id })
            let nimadir = []
            addresses.forEach(address => {
                nimadir.push({
                    id: address.id,
                    city: address.city,
                    district: address.district,
                    zipcode: address.zipcode,
                    defaultAddress: address.defaultAddress,
                })
            })
            res.status(200).json({ data: nimadir })
        }
    }),

    // @desc    Add Address
    // @route   POST /api/address/add
    // @access  Private
    addAddress: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)
        const address = await Address.find({ user: user.id })

        if (address.length === 0) {
            await Address.create({ user: user.id, ...req.body, defaultAddress: true })
            res.status(201).json({ message: { code: 0, message: 'Created Address' } })
        } else {
            await Address.create({ user: user.id, ...req.body })
            res.status(201).json({ message: { code: 0, message: 'Created Address' } })
        }
    }),

    // @desc    Update Address
    // @route   PUT /api/address/update
    // @access  Private
    updateAddress: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)
        const address = await Address.findById(req.body.id)
        const addresses = await Address.find({ user: user.id })
        const { district, city, zipcode, neighborhood, defaultAddress } = req.body

        // check user
        if (user) {
            // check address
            if (addresses.length !== 0 && address) {
                // check address.defaultAddress
                if (address.defaultAddress)
                    res.status(200).json({ message: { code: 0, message: 'Address Updated' } })
                else {
                    await Address.findOneAndUpdate(
                        { user: user.id, defaultAddress: true },
                        { defaultAddress: false }
                    )
                    await Address.findByIdAndUpdate(
                        req.body.id,
                        {
                            city,
                            district,
                            zipcode,
                            defaultAddress,
                            neighborhood,
                        },
                        { new: true }
                    )

                    res.status(200).json({ message: { code: 0, message: 'Address Updated' } })
                }
            } else res.status(400).json({ message: 'Address not found !!!' })
        } else res.status(400).json({ message: 'User not found !!!' })
    }),

    // @desc    Delete Address
    // @route   DELETE /api/address/delete/:addressId
    // @access  Private
    deleteAddress: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)

        if (user) {
            await Address.findByIdAndDelete(req.params.id)

            // check defaultAddress
            const address = await Address.find({ user: user.id, defaultAddress: true })
            if (address.length === 0)
                await Address.findOneAndUpdate({ user: user.id }, { defaultAddress: true })

            res.status(200).json({ message: { code: 0, message: 'Deleted Address' } })
        } else res.status(400).json({ message: 'User not found !!!' })
    }),
}

export default address
