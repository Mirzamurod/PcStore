# PcStore

> Users

| Route | HTTP Verb | Body | Access | Is Admin | Description |
| ----------------------- | ----------- | --------------------------------- | ------------------------------- | ----------- | ----------- |
| /api/users | `GET` | Empty  | Private | true | List All Users. |
| /api/users/profile | `GET` | Empty | Private | false | User Profile. |
| /api/users/add | `POST` | { username: 'john', fullname: 'John Doe', email: 'example@gmail.com', password: 'qw12QW/*' } | Public | false | Create New User. |
| /api/users/login | `GET` | { email: 'example@gmail.com', password: 'qw12QW/*' } | Public | false | Login User. |
| /api/users/update | `PUT` | { username: 'john1', fullname: 'John1 Doe', email: 'example1@gmail.com', currentPassword: 'qw12QW/*', newPassword: 'qw12QW/*1' } | Private | false | Update User Profile. |
| /api/users/delete | `DELETE` | Empty | Private | false | Delete User Profile |

> Pcs

| Route | HTTP Verb | Body | Access | Is Admin | Description |
| ----------------------- | ----------- | --------------------------------- | ------------------------------- | ----------- | ----------- |
| /api/pcs | `GET` | Empty  | Public | false | List All Pcs. |
| /api/pcs/:pcId | `GET` | Empty  | Public | false| Show Single Pc. |
| /api/pcs/addreview/:pcId | `POST` | { comment: 'very good', rating: 5 } | Private | false | Add a Review to the Pc |
| /api/pcs/reviews/:pcId | `GET` | Empty | Public | false | Show Reviews |

