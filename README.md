# PcStore

> Users

| Route              | HTTP Verb | Body                                                                                                                             | Access  | Admin | Description |
| -- | - | - | - | - | - |
| /api/users | `GET` | Empty | Private | true | List All Users. |
| /api/users/profile | `GET` | Empty | Private | false | User Profile. |
| /api/users/add | `POST` | { username: 'john', fullname: 'John Doe', email: 'example@gmail.com', password: 'qw12QW/*' } | Public | false | Create New User. |
| /api/users/login | `GET` | { email: 'example@gmail.com', password: 'qw12QW/*' } | Public  | false | Login User. |
| /api/users/update | `PUT` | { username: 'john1', fullname: 'John1 Doe', email: 'example1@gmail.com', currentPassword: 'qw12QW/*', newPassword: 'qw12QW/*1' } | Private | false | Update User Profile. |
| /api/users/delete | `DELETE`  | Empty | Private | false | Delete User Profile |

> Address

| Route | HTTP Verb | Body  | Access  | Description |
| - | - | - | - | - |
| /api/address | `GET` | Empty | Private | Get all Addresses of User |
| /api/address/add | `POST` | { city: 'Toshkent', district: 'Yunusobod', neighborhood: 'Guliston',  zipcode: 12345 } | Private | Add Address |
| /api/address/update | `PUT` | { city: 'Toshkent', district: 'Yunusobod', neighborhood: 'Guliston',  zipcode: 12345 } | Private | Update Address |
| /api/address/delete/:addressId | `DELETE` | Empty | Private | Delete Address |

> Pcs

| Route | HTTP Verb | Body  | Access | Admin | Description |
| - | - | - | - | - | - |
| /api/pcs | `GET` | Empty | Public | false | List All Pcs. |
| /api/pcs/:pcId | `GET` | Empty | Public | false | Show Single Pc. |

> Reviews

| Route | HTTP Verb | Body  | Access |  Description |
| - | - | - | - |  - |
| /api/reviews/:pcId | `GET` | Empty | Public |  List All Reviews on Pc. |
| /api/reviews/add | `POST` | { rating: 5, comment : 'Best', pcId: 1 } | Private |  Add Review |
| /api/reviews/update | `PUT` | { rating: 5, comment : 'Best', _id: reviewId } | Private | Update Review |
| /api/reviews/delete/:reviewId | `DELETE` | Empty | Private | Delete Review |

