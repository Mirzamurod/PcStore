export interface IPc {
  name: string
  image: string[]
  cpu: string
  motherboard: string
  cooler: string
  ddr: string
  videocard: string
  hdd: string
  ssd_sata: string
  ssd_m2: string
  price: number
  stock_price: number
  rating: number
  category: string
  description: string
  warranty: string | number
  have: boolean
  createdAt: string
  updatedAt: string
  _id: string
}

export interface IReview {
  user: string
  name: string
  rating: number
  comment: string
}

export interface IPcsStore {
  isLoading: boolean
  pcs: IPc[]
  isError: boolean
  code: string | boolean
  err_msg: string | boolean
}

export interface IPcStore {
  isLoading: boolean
  pc: IPc | null
  isError: boolean
  reviewNum: string | number
  ratingNum: string | number
  code: string
  err_msg: string
}
