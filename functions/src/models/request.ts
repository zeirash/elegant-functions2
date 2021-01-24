export interface CreateUserRequest {
  username: string
  password: string
  role: string
}

export interface CreateItemRequest {
  name: string
  image_path: string[]
  desc: string
  price: PriceSetup[]
}

interface PriceSetup {
  price: number
  metric: string
  user_id: string
}