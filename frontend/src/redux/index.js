import login, { userLogin, userProfile, userUpdate, userDelete, changeMode } from './user/login'
import register, { addUser } from './user/register'
import pcs, { getPcs } from './pcs/pcs'
import pc, { getPc } from './pcs/pc'
import reviews, { getReviews, addReview } from './reviews/reviews'

export {
    login,
    register,
    pcs,
    pc,
    reviews,

    // login
    userLogin,
    userProfile,
    userUpdate,
    userDelete,
    changeMode,

    // register
    addUser,

    // pcs
    getPcs,

    // pc
    getPc,

    // review
    getReviews,
    addReview,
}
